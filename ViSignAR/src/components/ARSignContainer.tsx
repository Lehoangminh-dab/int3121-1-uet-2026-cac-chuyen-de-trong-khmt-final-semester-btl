import { StyleSheet, View } from 'react-native'
import { ViroARSceneNavigator } from '@reactvision/react-viro'
import { ARSignScene } from './ARSignScene'
import { setCurrentSign, waitForVideoFinish } from './arSignBus'

const FALLBACK_CLIP_MS = 4500

export function ARSignContainer() {
  return (
    <View style={styles.container}>
      <ViroARSceneNavigator
        autofocus
        worldAlignment="Camera"
        initialScene={{ scene: ARSignScene }}
        style={styles.scene}
      />
    </View>
  )
}

export async function playSequence(signIds: string[], delayMs: number = 1000): Promise<void> {
  for (let i = 0; i < signIds.length; i++) {
    const signId = signIds[i]
    setCurrentSign(signId)
    await waitForVideoFinish(FALLBACK_CLIP_MS)
    setCurrentSign(null)
    if (i < signIds.length - 1) {
      await sleep(delayMs)
    }
  }
}

export function clearCurrentSign() {
  setCurrentSign(null)
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scene: { flex: 1 },
})
