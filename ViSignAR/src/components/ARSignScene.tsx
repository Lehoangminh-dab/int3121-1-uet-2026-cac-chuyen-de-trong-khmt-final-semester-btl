import { useEffect, useState } from 'react'
import {
  ViroARScene,
  ViroAmbientLight,
  ViroVideo,
  ViroNode,
  ViroText,
} from '@reactvision/react-viro'
import { SIGN_VIDEOS } from '../constants/signAssets'
import { subscribeCurrentSign, notifyVideoFinished } from './arSignBus'

const VIDEO_WIDTH = 0.8
const VIDEO_HEIGHT = 0.8
const VIDEO_POSITION: [number, number, number] = [0, -0.2, -1.2]

export function ARSignScene() {
  const [currentSignId, setCurrentSignId] = useState<string | null>(null)

  useEffect(() => subscribeCurrentSign(setCurrentSignId), [])

  const source = currentSignId
    ? (SIGN_VIDEOS[currentSignId] ?? SIGN_VIDEOS['SIGN-DEMO'])
    : null

  return (
    <ViroARScene>
      <ViroAmbientLight color="#FFFFFF" />
      <ViroNode position={VIDEO_POSITION}>
        {source ? (
          <ViroVideo
            key={currentSignId}
            source={source}
            width={VIDEO_WIDTH}
            height={VIDEO_HEIGHT}
            loop={false}
            paused={false}
            onFinish={notifyVideoFinished}
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
