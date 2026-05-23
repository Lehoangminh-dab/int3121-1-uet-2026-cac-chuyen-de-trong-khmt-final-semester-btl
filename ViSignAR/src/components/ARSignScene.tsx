import { useEffect, useState } from 'react'
import {
  ViroARScene,
  ViroAmbientLight,
  ViroDirectionalLight,
  Viro3DObject,
  ViroNode,
  ViroText,
} from '@reactvision/react-viro'
import { SIGN_MODELS, FALLBACK_SIGN_ID } from '../constants/signAssets'
import { subscribeCurrentSign, notifyVideoFinished } from './arSignBus'

const MODEL_POSITION: [number, number, number] = [0, -0.4, -1.2]
const MODEL_SCALE: [number, number, number] = [0.5, 0.5, 0.5]
const ANIMATION_DURATION_MS = 4000

export function ARSignScene() {
  const [currentSignId, setCurrentSignId] = useState<string | null>(null)

  useEffect(() => subscribeCurrentSign(setCurrentSignId), [])

  useEffect(() => {
    if (!currentSignId) return
    const t = setTimeout(notifyVideoFinished, ANIMATION_DURATION_MS)
    return () => clearTimeout(t)
  }, [currentSignId])

  const source = currentSignId
    ? (SIGN_MODELS[currentSignId] ?? SIGN_MODELS[FALLBACK_SIGN_ID])
    : null

  return (
    <ViroARScene>
      <ViroAmbientLight color="#FFFFFF" intensity={500} />
      <ViroDirectionalLight color="#FFFFFF" direction={[0, -1, -0.2]} intensity={800} />
      <ViroNode position={MODEL_POSITION}>
        {source ? (
          <Viro3DObject
            key={currentSignId}
            source={source}
            type="GLB"
            scale={MODEL_SCALE}
            rotation={[0, 0, 0]}
            transformBehaviors={['billboardY']}
            animation={{ run: true, loop: false }}
            onError={notifyVideoFinished}
          />
        ) : (
          <ViroText
            text="Nhan Bat dau va noi"
            width={2}
            height={0.4}
            style={{ fontSize: 22, color: '#FFFFFF', textAlign: 'center' }}
          />
        )}
      </ViroNode>
    </ViroARScene>
  )
}
