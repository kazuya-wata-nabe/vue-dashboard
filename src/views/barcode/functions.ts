export const readCode = async (image: ImageBitmapSource) => {
  const reader = new BarcodeDetector()
  const result = await reader.detect(image)
  return result
}

const constraints = {
  audio: false,
  video: {
    width: 300,
  },
}

export const attachCamera = async () => {
  if (!("BarcodeDetector" in window)) {
    return { error: "バーコードAPIが使えないブラウザです" }
  }

  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints)
    return { stream }
  } catch (error) {
    return { error }
  }
}
