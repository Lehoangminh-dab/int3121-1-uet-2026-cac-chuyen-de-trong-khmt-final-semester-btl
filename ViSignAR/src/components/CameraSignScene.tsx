import { useCallback, useEffect, useRef } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { CameraView, useCameraPermissions } from 'expo-camera'
import { Video, ResizeMode } from 'expo-av'
import type { AVPlaybackStatus } from 'expo-av'
import { Colors, FontSizes, Spacing } from '../constants/theme'
import { SIGN_MODELS, SIGN_VIDEOS } from '../constants/signAssets'
import { SignModel3D } from './SignModel3D'

// Fallback cho thiet bi khong co ARCore: camera that + avatar 3D overlay (AR mo phong).

export interface CameraSignSceneProps {
  currentSignId: string | null
  onFinish: () => void
  onMissingAsset?: (signId: string) => void
  statusMessage?: string
}

export function CameraSignScene({
  currentSignId,
  onFinish,
  onMissingAsset,
  statusMessage,
}: CameraSignSceneProps) {
  const [permission, requestPermission] = useCameraPermissions()
  const finishedRef = useRef<string | null>(null)

  useEffect(() => {
    if (permission && !permission.granted && permission.canAskAgain) {
      requestPermission()
    }
  }, [permission, requestPermission])

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

  const handleVideoStatus = (status: AVPlaybackStatus) => {
    if (!status.isLoaded) return
    if (status.didJustFinish) {
      handleFinish()
    }
  }

  const cameraReady = permission?.granted ?? false
  const modelSource = currentSignId ? SIGN_MODELS[currentSignId] : undefined
  const videoSource = currentSignId ? SIGN_VIDEOS[currentSignId] : undefined

  return (
    <View style={styles.container}>
      {cameraReady ? (
        <CameraView style={StyleSheet.absoluteFill} facing="back" />
      ) : (
        <View style={[StyleSheet.absoluteFill, styles.fallbackBg]} />
      )}

      <View style={styles.banner} pointerEvents="none">
        <Text style={styles.bannerTitle}>AR mô phỏng (camera + avatar 3D)</Text>
        <Text style={styles.bannerText}>
          Avatar hiển thị chồng lên camera. Bật &quot;Ưu tiên Viro AR&quot; trong Cài đặt để thử AR thật.
        </Text>
        {statusMessage ? <Text style={styles.bannerSub}>{statusMessage}</Text> : null}
      </View>

      <View style={styles.overlay} pointerEvents="none">
        {currentSignId && modelSource && (
          <View style={styles.signFrame}>
            <SignModel3D modelSource={modelSource} onFinish={handleFinish} />
            <Text style={styles.signLabel}>{currentSignId}</Text>
          </View>
        )}

        {currentSignId && !modelSource && videoSource && (
          <View style={styles.signFrame}>
            <Video
              source={videoSource}
              style={styles.signVideo}
              resizeMode={ResizeMode.CONTAIN}
              isLooping={false}
              shouldPlay
              onPlaybackStatusUpdate={handleVideoStatus}
            />
            <Text style={styles.signLabel}>{currentSignId}</Text>
          </View>
        )}

        {currentSignId && !modelSource && !videoSource && (
          <View style={styles.signFrame}>
            <Text style={styles.signLabel}>{currentSignId}</Text>
            <Text style={styles.signMissing}>Chưa có clip cho ký hiệu này</Text>
          </View>
        )}

        {!cameraReady && (
          <View style={styles.permissionBanner}>
            <Text style={styles.permissionText}>Cần cấp quyền camera để hiển thị ký hiệu</Text>
          </View>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  fallbackBg: {
    backgroundColor: '#0a1a3a',
  },
  banner: {
    position: 'absolute',
    top: Spacing.sm,
    left: Spacing.sm,
    right: Spacing.sm,
    zIndex: 2,
    backgroundColor: 'rgba(1, 51, 146, 0.9)',
    borderRadius: 8,
    padding: Spacing.sm,
    gap: 4,
  },
  bannerTitle: {
    color: Colors.white,
    fontSize: FontSizes.sm,
    fontWeight: '700',
    textAlign: 'center',
  },
  bannerText: {
    color: Colors.white,
    fontSize: FontSizes.sm,
    textAlign: 'center',
    opacity: 0.9,
  },
  bannerSub: {
    color: '#CCCCCC',
    fontSize: FontSizes.sm,
    textAlign: 'center',
    marginTop: 4,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.lg,
    paddingTop: 88,
  },
  signFrame: {
    width: '70%',
    aspectRatio: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.blue,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  signVideo: {
    width: '100%',
    height: '100%',
  },
  signLabel: {
    position: 'absolute',
    bottom: 8,
    color: Colors.white,
    fontSize: FontSizes.md,
    fontWeight: '700',
    letterSpacing: 1,
    backgroundColor: 'rgba(1, 51, 146, 0.85)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 6,
  },
  signMissing: {
    color: Colors.white,
    fontSize: FontSizes.sm,
    marginTop: Spacing.sm,
  },
  permissionBanner: {
    position: 'absolute',
    bottom: Spacing.lg,
    left: Spacing.lg,
    right: Spacing.lg,
    backgroundColor: 'rgba(1, 51, 146, 0.9)',
    padding: Spacing.md,
    borderRadius: 8,
  },
  permissionText: {
    color: Colors.white,
    fontSize: FontSizes.sm,
    textAlign: 'center',
  },
})
