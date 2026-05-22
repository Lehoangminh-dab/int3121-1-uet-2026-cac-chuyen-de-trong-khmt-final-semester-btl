type SignListener = (id: string | null) => void

let listeners: SignListener[] = []
let currentSignId: string | null = null
let videoFinishedResolver: (() => void) | null = null

export function subscribeCurrentSign(fn: SignListener): () => void {
  listeners.push(fn)
  fn(currentSignId)
  return () => {
    listeners = listeners.filter((l) => l !== fn)
  }
}

export function setCurrentSign(id: string | null) {
  currentSignId = id
  listeners.forEach((l) => l(id))
}

export function waitForVideoFinish(timeoutMs: number): Promise<void> {
  return new Promise((resolve) => {
    videoFinishedResolver = resolve
    const t = setTimeout(() => {
      if (videoFinishedResolver === resolve) {
        videoFinishedResolver = null
        resolve()
      }
    }, timeoutMs)
    const wrapped = videoFinishedResolver
    videoFinishedResolver = () => {
      clearTimeout(t)
      if (videoFinishedResolver === wrapped) videoFinishedResolver = null
      wrapped()
    }
  })
}

export function notifyVideoFinished() {
  videoFinishedResolver?.()
}
