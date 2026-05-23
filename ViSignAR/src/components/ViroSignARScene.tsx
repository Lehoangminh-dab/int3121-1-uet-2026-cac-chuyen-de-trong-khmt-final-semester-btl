import { useEffect, useRef } from 'react'
import { StyleSheet } from 'react-native'
import {
  Viro3DObject,
  ViroARScene,
  ViroAmbientLight,
  ViroDirectionalLight,
  ViroNode,
  ViroText,
  ViroVideo,
} from '@reactvision/react-viro'
import { getSignAnimations } from '../constants/signAnimations'
import { SIGN_MODELS, SIGN_VIDEOS } from '../constants/signAssets'

interface ViroAppProps {
  currentSignId: string | null
  onFinish?: () => void
  onMissingAsset?: (signId: string) => void
}

interface ViroSignARSceneProps {
  sceneNavigator?: {
    viroAppProps?: ViroAppProps
  }
}

// Avatar dat o khoang cach co dinh truoc camera — khong bat buoc quet mat phang.

export default function ViroSignARScene({ sceneNavigator }: ViroSignARSceneProps) {
  const { currentSignId, onFinish, onMissingAsset } = sceneNavigator?.viroAppProps ?? {}
  const finishedAnimsRef = useRef<Set<string>>(new Set())
  const activeSignRef = useRef<string | null>(null)

  const modelSource = currentSignId ? SIGN_MODELS[currentSignId] : undefined
  const videoSource = currentSignId ? SIGN_VIDEOS[currentSignId] : undefined
  const animations = currentSignId ? getSignAnimations(currentSignId) : []

  useEffect(() => {
    finishedAnimsRef.current.clear()
    activeSignRef.current = currentSignId ?? null

    if (currentSignId && !modelSource && !videoSource) {
      onMissingAsset?.(currentSignId)
    }
  }, [currentSignId, modelSource, videoSource, onMissingAsset])

  const handleAnimationFinish = (animationName: string) => {
    if (!currentSignId || activeSignRef.current !== currentSignId) return

    finishedAnimsRef.current.add(animationName)
    const expected = getSignAnimations(currentSignId)
    if (expected.length === 0 || expected.every((name) => finishedAnimsRef.current.has(name))) {
      onFinish?.()
    }
  }

  const handleVideoFinish = () => {
    if (!currentSignId || activeSignRef.current !== currentSignId) return
    onFinish?.()
  }

  return (
    <ViroARScene>
      <ViroAmbientLight color="#ffffff" intensity={300} />
      <ViroDirectionalLight direction={[0, -1, -0.2]} color="#ffffff" intensity={400} />

      <ViroText
        text="Viro AR — di chuyen camera de xem avatar"
        scale={[0.4, 0.4, 0.4]}
        position={[0, 0.25, -1.3]}
        style={styles.hintText}
      />

      {currentSignId && modelSource && (
        <ViroNode position={[0, -0.35, -1.05]} dragType="FixedDistance">
          {animations.map((animationName) => (
            <Viro3DObject
              key={`${currentSignId}-${animationName}`}
              source={modelSource}
              type="GLB"
              scale={[0.16, 0.16, 0.16]}
              rotation={[-90, 0, 0]}
              animation={{
                name: animationName,
                run: true,
                loop: false,
                onFinish: () => handleAnimationFinish(animationName),
              }}
            />
          ))}
        </ViroNode>
      )}

      {currentSignId && !modelSource && videoSource && (
        <ViroNode position={[0, 0, -1.05]} dragType="FixedDistance">
          <ViroVideo
            source={videoSource}
            loop={false}
            scale={[0.4, 0.4, 0.4]}
            rotation={[-90, 0, 0]}
            onFinish={handleVideoFinish}
          />
        </ViroNode>
      )}
    </ViroARScene>
  )
}

const styles = StyleSheet.create({
  hintText: {
    fontFamily: 'Arial',
    fontSize: 18,
    color: '#ffffff',
    textAlign: 'center',
  },
})
