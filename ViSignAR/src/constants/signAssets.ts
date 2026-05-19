// ---------------------------------------------------------------------------
// Sign video assets map. Filled by role B (Content Engineer).
// Mỗi key phải khớp tuyệt đối với `signId` trong assets/dictionary/v1.json.
// File mp4 đặt tại ViSignAR/assets/signs/<signId>.mp4
// ---------------------------------------------------------------------------

export const SIGN_VIDEOS: Record<string, any> = {
  // TODO(B): Bổ sung 23 entries khi video sẵn sàng. Ví dụ:
  // 'SIGN-CHAO': require('../../assets/signs/SIGN-CHAO.mp4'),
  // 'SIGN-CAM_ON': require('../../assets/signs/SIGN-CAM_ON.mp4'),
}

export function hasVideo(signId: string): boolean {
  return signId in SIGN_VIDEOS
}
