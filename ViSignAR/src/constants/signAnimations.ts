// Ten clip animation trong file GLB (Blender export).
// Viro chi ho tro 1 clip / Viro3DObject — voi 2 tay dung 2 object chong nhau.

export const SIGN_ANIMATIONS: Record<string, string[]> = {
  'SIGN-CHAO': ['Hand_LeftAction', 'Hand_RightAction'],
  'SIGN-TAM_BIET': ['Hand_RightAction'],
  'SIGN-GAP': ['Hand_LeftAction', 'Hand_RightAction'],
  'SIGN-LAI': ['Hand_LeftAction', 'Hand_RightAction'],
}

export function getSignAnimations(signId: string): string[] {
  return SIGN_ANIMATIONS[signId] ?? []
}
