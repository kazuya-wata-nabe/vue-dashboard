export const readCode = async (image: ImageBitmapSource) => {
  if ("BarcodeDetector" in window) {
    const reader = new BarcodeDetector()
    const result = await reader.detect(image)
    return result
  }
}

const constraints = {
  audio: false,
  video: {
    width: 300,
    facingMode: {
      exact: "environment",
    },
  },
}

export const attachCamera = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints)
    return { stream }
  } catch (error) {
    return { error }
  }
}
