import { useCallback, useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { ARSignScene } from './ARSignScene'
import { getSignFallbackMs, hasSignAsset } from '../constants/signAssets'

// ---------------------------------------------------------------------------
// Container AR — ViroReact (ARCore/ARKit) + playSequence bridge.
//
// Contract:
//   playSequence(signIds: string[], delayMs: number) => Promise<void>
//   - Cap nhat currentSignId vao ARSignScene
//   - Cho onFinish tu model 3D hoac didJustFinish tu Video (overlay)
//   - Fallback timeout neu asset missing hoac loi loaded
// ---------------------------------------------------------------------------

const FALLBACK_CLIP_MS = 1500

let setCurrentSignIdGlobal: ((id: string | null) => void) | null = null
let resolveCurrentClip: (() => void) | null = null

function consumeResolve() {
  const r = resolveCurrentClip
  resolveCurrentClip = null
  if (r) r()
}

export function ARSignContainer() {
  const [currentSignId, setCurrentSignId] = useState<string | null>(null)

  useEffect(() => {
    setCurrentSignIdGlobal = setCurrentSignId
    return () => {
      setCurrentSignIdGlobal = null
    }
  }, [])

  const handleFinish = useCallback(() => {
    consumeResolve()
  }, [])

  const handleMissing = useCallback(() => {
    // missing asset -> let fallback timeout in playSequence resolve
  }, [])

  return (
    <View style={styles.container}>
      <ARSignScene
        currentSignId={currentSignId}
        onFinish={handleFinish}
        onMissingAsset={handleMissing}
      />
    </View>
  )
}

export async function playSequence(signIds: string[], delayMs: number = 1000): Promise<void> {
  for (let i = 0; i < signIds.length; i++) {
    const signId = signIds[i]
    setCurrentSignIdGlobal?.(signId)

    const timeoutMs = hasSignAsset(signId) ? getSignFallbackMs(signId) : FALLBACK_CLIP_MS / 2

    await new Promise<void>((resolve) => {
      resolveCurrentClip = resolve
      setTimeout(() => {
        if (resolveCurrentClip === resolve) {
          resolveCurrentClip = null
          resolve()
        }
      }, timeoutMs)
    })

    setCurrentSignIdGlobal?.(null)

    if (i < signIds.length - 1) {
      await sleep(delayMs)
    }
  }
}

export function clearCurrentSign() {
  setCurrentSignIdGlobal?.(null)
  consumeResolve()
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
