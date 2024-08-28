export const readCode = async (image: ImageBitmapSource) => {
  if ("BarcodeDetector" in window) {
    const reader = new BarcodeDetector()
    const result = await reader.detect(image)
    return result
  }
}
