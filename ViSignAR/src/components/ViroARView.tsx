import { StyleSheet, Text, View } from 'react-native'
import { ViroARSceneNavigator } from '@reactvision/react-viro'
import { Colors, FontSizes, Spacing } from '../constants/theme'
import ViroSignARScene from './ViroSignARScene'

export interface ViroARViewProps {
  currentSignId: string | null
  onFinish: () => void
  onMissingAsset?: (signId: string) => void
  hasAsset: boolean
  statusMessage?: string
}

export function ViroARView({
  currentSignId,
  onFinish,
  onMissingAsset,
  hasAsset,
  statusMessage,
}: ViroARViewProps) {
  return (
    <View style={styles.container}>
      <ViroARSceneNavigator
        autofocus
        style={styles.arView}
        initialScene={{ scene: ViroSignARScene as unknown as () => React.JSX.Element }}
        viroAppProps={{
          currentSignId,
          onFinish,
          onMissingAsset,
        }}
      />

      <View style={styles.hud} pointerEvents="none">
        <Text style={styles.hudTitle}>Viro AR — avatar hiển thị trước camera</Text>
        {statusMessage ? <Text style={styles.hudSub}>{statusMessage}</Text> : null}
        {currentSignId && hasAsset && (
          <Text style={styles.signLabel}>{currentSignId}</Text>
        )}
        {currentSignId && !hasAsset && (
          <Text style={styles.signMissing}>Chưa có clip cho ký hiệu này</Text>
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
  arView: {
    flex: 1,
  },
  hud: {
    position: 'absolute',
    top: Spacing.sm,
    left: Spacing.sm,
    right: Spacing.sm,
    alignItems: 'center',
    gap: Spacing.xs,
  },
  hudTitle: {
    color: Colors.white,
    fontSize: FontSizes.sm,
    textAlign: 'center',
    backgroundColor: 'rgba(1, 51, 146, 0.85)',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: 8,
  },
  hudSub: {
    color: '#CCCCCC',
    fontSize: FontSizes.sm,
    textAlign: 'center',
    paddingHorizontal: Spacing.sm,
  },
  signLabel: {
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
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: 6,
  },
})
