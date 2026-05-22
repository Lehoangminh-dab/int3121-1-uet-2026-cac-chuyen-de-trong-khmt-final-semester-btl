// ---------------------------------------------------------------------------
// Sign video assets map. Filled by role B (Content Engineer).
// Mỗi key phải khớp tuyệt đối với `signId` trong assets/dictionary/v1.json.
// File mp4 đặt tại ViSignAR/assets/signs/<signId>.mp4
// ---------------------------------------------------------------------------

export const SIGN_VIDEOS: Record<string, any> = {
  'SIGN-DEMO': require('../../assets/signs/SIGN-DEMO.mp4'),
}

export function hasVideo(signId: string): boolean {
  return signId in SIGN_VIDEOS
}
