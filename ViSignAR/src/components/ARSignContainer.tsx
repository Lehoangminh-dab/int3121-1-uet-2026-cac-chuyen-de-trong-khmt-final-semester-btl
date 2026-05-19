import { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { ViroARSceneNavigator, ViroMaterials } from '@reactvision/react-viro'
import { ARSignScene } from './ARSignScene'

// ---------------------------------------------------------------------------
// Container AR — thay UnityView. Skeleton bước A2.
//
// Contract giữ nguyên với pipeline hiện hữu (playback.ts, speech-to-sign.tsx):
//   playSequence(signIds: string[], delayMs: number) => Promise<void>
//
// Role C sẽ hoàn thiện: nối ViroVideo.onFinish vào resolveCurrentClip.
// ---------------------------------------------------------------------------

ViroMaterials.createMaterials({
  boxRed: {
    diffuseColor: '#013392',
  },
})

const FALLBACK_CLIP_MS = 1500

let setCurrentSignIdGlobal: ((id: string | null) => void) | null = null
let resolveCurrentClip: (() => void) | null = null

export function ARSignContainer() {
  const [currentSignId, setCurrentSignId] = useState<string | null>(null)

  useEffect(() => {
    setCurrentSignIdGlobal = setCurrentSignId
    return () => {
      setCurrentSignIdGlobal = null
    }
  }, [])

  return (
    <View style={styles.container}>
      <ViroARSceneNavigator
        autofocus
        initialScene={{
          scene: () => (
            <ARSignScene
              currentSignId={currentSignId}
              onFinish={() => {
                resolveCurrentClip?.()
                resolveCurrentClip = null
              }}
            />
          ),
        }}
        style={styles.scene}
      />
    </View>
  )
}

export async function playSequence(signIds: string[], delayMs: number = 1000): Promise<void> {
  for (let i = 0; i < signIds.length; i++) {
    const signId = signIds[i]
    setCurrentSignIdGlobal?.(signId)

    // TODO(C): chờ event onFinish thật từ ViroVideo. Hiện dùng timeout fallback.
    await new Promise<void>((resolve) => {
      resolveCurrentClip = resolve
      setTimeout(() => {
        if (resolveCurrentClip === resolve) {
          resolveCurrentClip = null
          resolve()
        }
      }, FALLBACK_CLIP_MS)
    })

    setCurrentSignIdGlobal?.(null)

    if (i < signIds.length - 1) {
      await sleep(delayMs)
    }
  }
}

export function clearCurrentSign() {
  setCurrentSignIdGlobal?.(null)
  resolveCurrentClip?.()
  resolveCurrentClip = null
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scene: {
    flex: 1,
  },
})
