// ---------------------------------------------------------------------------
// Sign assets map — video (mp4) hoặc model 3D (glb).
// Key phải khớp tuyệt đối với `signId` trong assets/dictionary/v1.json.
// ---------------------------------------------------------------------------

export const SIGN_VIDEOS: Record<string, number> = {
  // TODO(B): Bổ sung mp4 khi video sẵn sàng. Ví dụ:
  // 'SIGN-CAM_ON': require('../../assets/signs/SIGN-CAM_ON.mp4'),
}

export const SIGN_MODELS: Record<string, number> = {
  'SIGN-CHAO': require('../../assets/models/SIGN-CHAO.glb'),
  'SIGN-TAM_BIET': require('../../assets/models/SIGN-TAM_BIET.glb'),
  'SIGN-GAP': require('../../assets/models/SIGN-GAP.glb'),
  'SIGN-LAI': require('../../assets/models/SIGN-LAI.glb'),
}

export function hasVideo(signId: string): boolean {
  return signId in SIGN_VIDEOS
}

export function hasModel(signId: string): boolean {
  return signId in SIGN_MODELS
}

export function hasSignAsset(signId: string): boolean {
  return hasVideo(signId) || hasModel(signId)
}

export function getSignFallbackMs(signId: string): number {
  if (hasModel(signId)) return 3500
  if (hasVideo(signId)) return 1500
  return 750
}
