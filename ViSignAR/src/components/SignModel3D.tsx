import { Suspense, useEffect, useRef } from 'react'
import { StyleSheet, View } from 'react-native'
import { Canvas } from '@react-three/fiber/native'
import { useAnimations, useGLTF } from '@react-three/drei/native'
import type { GLTF } from 'three-stdlib'
import * as THREE from 'three'
import { SIGN_MODELS } from '../constants/signAssets'

type ModelSource = (typeof SIGN_MODELS)[string]

interface AnimatedModelProps {
  modelSource: ModelSource
  onFinish: () => void
}

function AnimatedModel({ modelSource, onFinish }: AnimatedModelProps) {
  const group = useRef<THREE.Group>(null)
  const finishedRef = useRef(false)
  const gltf = useGLTF(modelSource as never) as GLTF
  const { actions, mixer } = useAnimations(gltf.animations, group)

  useEffect(() => {
    finishedRef.current = false

    const actionList = Object.values(actions).filter(
      (action): action is THREE.AnimationAction => Boolean(action),
    )

    if (actionList.length === 0) {
      const timer = setTimeout(onFinish, 1500)
      return () => clearTimeout(timer)
    }

    let completed = 0
    let maxDuration = 0

    const handleFinished = () => {
      completed += 1
      if (completed >= actionList.length && !finishedRef.current) {
        finishedRef.current = true
        onFinish()
      }
    }

    for (const action of actionList) {
      action.reset()
      action.setLoop(THREE.LoopOnce, 1)
      action.clampWhenFinished = true
      action.play()
      maxDuration = Math.max(maxDuration, action.getClip().duration)
    }

    mixer.addEventListener('finished', handleFinished)
    const fallback = setTimeout(handleFinished, (maxDuration + 0.35) * 1000)

    return () => {
      mixer.removeEventListener('finished', handleFinished)
      clearTimeout(fallback)
      actionList.forEach((action) => action.stop())
    }
  }, [actions, mixer, modelSource, onFinish])

  return (
    <group ref={group}>
      <primitive object={gltf.scene} scale={1} position={[0, -1, 0]} />
    </group>
  )
}

export interface SignModel3DProps {
  modelSource: ModelSource
  onFinish: () => void
}

export function SignModel3D({ modelSource, onFinish }: SignModel3DProps) {
  return (
    <View style={styles.canvasWrap}>
      <Canvas
        camera={{ position: [0, 1.2, 2.2], fov: 45 }}
        gl={{ alpha: true }}
        style={styles.canvas}
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[2, 4, 2]} intensity={1.5} />
        <Suspense fallback={null}>
          <AnimatedModel key={modelSource} modelSource={modelSource} onFinish={onFinish} />
        </Suspense>
      </Canvas>
    </View>
  )
}

const styles = StyleSheet.create({
  canvasWrap: {
    width: '100%',
    height: '100%',
  },
  canvas: {
    flex: 1,
  },
})
