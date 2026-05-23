import { Linking, Platform } from 'react-native'

export type ARSupportStatus = 'checking' | 'supported' | 'unsupported' | 'unknown'

export interface ARSupportInfo {
  status: ARSupportStatus
  message: string
  rawCode?: string
}

const UNSUPPORTED_MESSAGE =
  'ARCore chưa sẵn sàng trên thiết bị. App dùng chế độ AR mô phỏng (camera + avatar 3D).'

const SUPPORTED_MESSAGE =
  'ARCore sẵn sàng — mặc định dùng AR mô phỏng. Bật "Ưu tiên Viro AR" trong Cài đặt để thử AR thật.'

let lastCheck: ARSupportInfo = { status: 'checking', message: 'Chưa kiểm tra' }

export function getLastARCheck(): ARSupportInfo {
  return lastCheck
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function queryViroAROnce(): Promise<ARSupportInfo> {
  const { isARSupportedOnDevice } = await import('@reactvision/react-viro')
  const result = await isARSupportedOnDevice()
  if (result.isARSupported) {
    return { status: 'supported', message: SUPPORTED_MESSAGE, rawCode: 'SUPPORTED' }
  }
  return { status: 'unsupported', message: UNSUPPORTED_MESSAGE, rawCode: 'NOT_SUPPORTED' }
}

export async function checkARSupport(options?: { forceViro?: boolean }): Promise<ARSupportInfo> {
  if (Platform.OS === 'web') {
    lastCheck = { status: 'unsupported', message: 'AR không khả dụng trên web.', rawCode: 'WEB' }
    return lastCheck
  }

  if (options?.forceViro) {
    lastCheck = {
      status: 'supported',
      message: 'Đang dùng Viro AR (bật thủ công trong Cài đặt).',
      rawCode: 'FORCED',
    }
    return lastCheck
  }

  const attempts = 5
  for (let i = 0; i < attempts; i++) {
    try {
      const info = await queryViroAROnce()
      lastCheck = info
      if (info.status === 'supported') {
        return info
      }
      return info
    } catch (err) {
      const code = err instanceof Error ? err.message : String(err)
      console.log(`[ViSignAR] ARCore check attempt ${i + 1}/${attempts}: ${code}`)

      if (code === 'UNSUPPORTED') {
        lastCheck = { status: 'unsupported', message: UNSUPPORTED_MESSAGE, rawCode: code }
        return lastCheck
      }

      if (code === 'TRANSIENT' || code === 'UNKNOWN') {
        if (i < attempts - 1) {
          await sleep(700)
          continue
        }
        lastCheck = {
          status: 'unsupported',
          message:
            'ARCore đã cài nhưng trạng thái không rõ — dùng AR mô phỏng. Bật "Ưu tiên Viro AR" để thử AR thật.',
          rawCode: code,
        }
        return lastCheck
      }

      lastCheck = {
        status: 'unsupported',
        message: `${UNSUPPORTED_MESSAGE} (${code})`,
        rawCode: code,
      }
      return lastCheck
    }
  }

  lastCheck = { status: 'unsupported', message: UNSUPPORTED_MESSAGE, rawCode: 'TIMEOUT' }
  return lastCheck
}

export function openARCoreInstaller() {
  if (Platform.OS !== 'android') return

  const playStoreUrl = 'market://details?id=com.google.ar.core'
  const webUrl = 'https://play.google.com/store/apps/details?id=com.google.ar.core'

  Linking.openURL(playStoreUrl).catch(() => Linking.openURL(webUrl))
}

export const ARCORE_DEVICE_LIST_URL =
  'https://developers.google.com/ar/devices?hl=vi'

export function openARCoreDeviceList() {
  Linking.openURL(ARCORE_DEVICE_LIST_URL)
}
