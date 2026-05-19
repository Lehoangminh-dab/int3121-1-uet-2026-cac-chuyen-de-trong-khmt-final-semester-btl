import { ViroARScene, ViroAmbientLight, ViroBox, ViroNode } from '@reactvision/react-viro'

// ---------------------------------------------------------------------------
// AR scene cho ViSignAR. Skeleton bước A1/A2 — hiện hiển thị ViroBox đỏ test.
// Role C sẽ thay ViroBox bằng ViroVideo + SIGN_VIDEOS[currentSignId].
// ---------------------------------------------------------------------------

interface ARSignSceneProps {
  currentSignId?: string | null
  onFinish?: () => void
}

export function ARSignScene(_props: ARSignSceneProps) {
  return (
    <ViroARScene>
      <ViroAmbientLight color="#FFFFFF" />
      <ViroNode position={[0, 0, -1.2]}>
        <ViroBox
          position={[0, 0, 0]}
          scale={[0.3, 0.3, 0.3]}
          materials={['boxRed']}
        />
      </ViroNode>
    </ViroARScene>
  )
}
