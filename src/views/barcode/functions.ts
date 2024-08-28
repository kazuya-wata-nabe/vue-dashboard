export const readCode = async (image: ImageBitmapSource) => {
  const reader = new BarcodeDetector()
  const result = await reader.detect(image)
  return result
}

export const attachCamera = async () => {
  if (!("BarcodeDetector" in window)) {
    return { error: "バーコードAPIが使えないブラウザです" }
  }

  const facingMode = /iphone|ipod|android/i.test(navigator.userAgent)
    ? { exact: "environment" }
    : "user"

  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: { facingMode },
    })
    return { stream }
  } catch (error) {
    return { error }
  }
}
