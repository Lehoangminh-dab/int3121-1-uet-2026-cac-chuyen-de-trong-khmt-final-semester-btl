import { useEffect, useRef } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { CameraView, useCameraPermissions } from 'expo-camera'
import { Video, ResizeMode } from 'expo-av'
import type { AVPlaybackStatus } from 'expo-av'
import { Colors, FontSizes, Spacing } from '../constants/theme'
import { SIGN_VIDEOS } from '../constants/signAssets'

// ---------------------------------------------------------------------------
// AR scene: camera passthrough lam background, video clip ky hieu chong len
// chinh giua man hinh. Bridge giu nguyen playSequence(signIds, delayMs) qua
// ARSignContainer.
// ---------------------------------------------------------------------------

export interface ARSignSceneProps {
  currentSignId: string | null
  onFinish: () => void
  onMissingAsset?: (signId: string) => void
}

export function ARSignScene({ currentSignId, onFinish, onMissingAsset }: ARSignSceneProps) {
  const [permission, requestPermission] = useCameraPermissions()
  const videoRef = useRef<Video | null>(null)
  const finishedRef = useRef<string | null>(null)

  useEffect(() => {
    if (permission && !permission.granted && permission.canAskAgain) {
      requestPermission()
    }
  }, [permission, requestPermission])

  useEffect(() => {
    finishedRef.current = null
    if (currentSignId && !SIGN_VIDEOS[currentSignId]) {
      onMissingAsset?.(currentSignId)
    }
  }, [currentSignId, onMissingAsset])

  const handleStatus = (status: AVPlaybackStatus) => {
    if (!status.isLoaded) return
    if (status.didJustFinish && currentSignId && finishedRef.current !== currentSignId) {
      finishedRef.current = currentSignId
      onFinish()
    }
  }

  const cameraReady = permission?.granted ?? false
  const source = currentSignId ? SIGN_VIDEOS[currentSignId] : null

  return (
    <View style={styles.container}>
      {cameraReady ? (
        <CameraView style={StyleSheet.absoluteFill} facing="back" />
      ) : (
        <View style={[StyleSheet.absoluteFill, styles.fallbackBg]} />
      )}

      <View style={styles.overlay} pointerEvents="none">
        {currentSignId && source && (
          <View style={styles.signFrame}>
            <Video
              ref={(r) => {
                videoRef.current = r
              }}
              source={source}
              style={styles.signVideo}
              resizeMode={ResizeMode.CONTAIN}
              isLooping={false}
              shouldPlay
              onPlaybackStatusUpdate={handleStatus}
            />
            <Text style={styles.signLabel}>{currentSignId}</Text>
          </View>
        )}

        {currentSignId && !source && (
          <View style={styles.signFrame}>
            <Text style={styles.signLabel}>{currentSignId}</Text>
            <Text style={styles.signMissing}>Chưa có clip cho ký hiệu này</Text>
          </View>
        )}

        {!cameraReady && (
          <View style={styles.permissionBanner}>
            <Text style={styles.permissionText}>
              Cần cấp quyền camera để hiển thị ký hiệu chồng lên khung hình thực
            </Text>
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
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.lg,
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
