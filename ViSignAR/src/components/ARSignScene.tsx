import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import { Colors, FontSizes, Spacing } from '../constants/theme'
import { SIGN_MODELS, SIGN_VIDEOS } from '../constants/signAssets'
import { useSettings } from '../hooks/useSettings'
import { checkARSupport, type ARSupportStatus } from '../services/arSupport'
import { ARSceneErrorBoundary } from './ARSceneErrorBoundary'

const CameraSignScene = lazy(() =>
  import('./CameraSignScene').then((m) => ({ default: m.CameraSignScene })),
)
const ViroARView = lazy(() =>
  import('./ViroARView').then((m) => ({ default: m.ViroARView })),
)

export interface ARSignSceneProps {
  currentSignId: string | null
  onFinish: () => void
  onMissingAsset?: (signId: string) => void
}

export function ARSignScene({ currentSignId, onFinish, onMissingAsset }: ARSignSceneProps) {
  const { forceViroAR } = useSettings()
  const [arStatus, setArStatus] = useState<ARSupportStatus>('checking')
  const [arMessage, setArMessage] = useState('')
  const finishedRef = useRef<string | null>(null)

  useEffect(() => {
    let active = true
    setArStatus('checking')

    checkARSupport({ forceViro: forceViroAR })
      .then((info) => {
        if (!active) return
        const arCoreReady = info.status === 'supported'
        setArStatus(arCoreReady ? 'supported' : 'unsupported')
        setArMessage(info.message)
      })
      .catch(() => {
        if (!active) return
        setArStatus('unsupported')
        setArMessage('Không kiểm tra được ARCore.')
      })

    return () => {
      active = false
    }
  }, [forceViroAR])

  useEffect(() => {
    finishedRef.current = null
    if (!currentSignId) return

    const hasAsset = Boolean(SIGN_MODELS[currentSignId] || SIGN_VIDEOS[currentSignId])
    if (!hasAsset) {
      onMissingAsset?.(currentSignId)
    }
  }, [currentSignId, onMissingAsset])

  const handleFinish = useCallback(() => {
    if (!currentSignId || finishedRef.current === currentSignId) return
    finishedRef.current = currentSignId
    onFinish()
  }, [currentSignId, onFinish])

  const hasAsset = currentSignId
    ? Boolean(SIGN_MODELS[currentSignId] || SIGN_VIDEOS[currentSignId])
    : false

  const useViroAR = forceViroAR && arStatus === 'supported'

  const simulatedFallback = (
    <CameraSignScene
      currentSignId={currentSignId}
      onFinish={handleFinish}
      onMissingAsset={onMissingAsset}
      statusMessage={arMessage}
    />
  )

  if (arStatus === 'checking') {
    return (
      <View style={styles.loading}>
        <ActivityIndicator color={Colors.blue} size="large" />
        <Text style={styles.loadingText}>Đang kiểm tra ARCore…</Text>
      </View>
    )
  }

  return (
    <Suspense
      fallback={
        <View style={styles.loading}>
          <ActivityIndicator color={Colors.blue} size="large" />
          <Text style={styles.loadingText}>Đang tải scene…</Text>
        </View>
      }
    >
      {useViroAR ? (
        <ARSceneErrorBoundary key="viro-on" fallback={simulatedFallback}>
          <ViroARView
            currentSignId={currentSignId}
            onFinish={handleFinish}
            onMissingAsset={onMissingAsset}
            hasAsset={hasAsset}
            statusMessage={arMessage}
          />
        </ARSceneErrorBoundary>
      ) : (
        simulatedFallback
      )}
    </Suspense>
  )
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    backgroundColor: Colors.black,
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.md,
  },
  loadingText: {
    color: Colors.white,
    fontSize: FontSizes.sm,
  },
})
