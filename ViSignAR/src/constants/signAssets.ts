// ---------------------------------------------------------------------------
// Sign 3D model assets. Mỗi key phải khớp signId trong assets/dictionary/v1.json.
// File glb đặt tại ViSignAR/assets/signs/<signId>.glb với animation embedded.
// ---------------------------------------------------------------------------

export const SIGN_MODELS: Record<string, any> = {
  'SIGN-CHAO':     require('../../assets/signs/SIGN-CHAO.glb'),
  'SIGN-TAM_BIET': require('../../assets/signs/SIGN-TAM_BIET.glb'),
  'SIGN-GAP':      require('../../assets/signs/SIGN-GAP.glb'),
  'SIGN-LAI':      require('../../assets/signs/SIGN-LAI.glb'),
}

export const FALLBACK_SIGN_ID = 'SIGN-CHAO'

export function hasModel(signId: string): boolean {
  return signId in SIGN_MODELS
}
