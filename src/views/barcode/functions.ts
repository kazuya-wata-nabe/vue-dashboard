import { Html5Qrcode } from "html5-qrcode"

export const readCode = async (image: ImageBitmapSource, formats: BarcodeFormat[]) => {
  const reader = formats.length > 0 ? new BarcodeDetector({ formats }) : new BarcodeDetector()
  const result = await reader.detect(image)
  return result
}

export const attachCamera = async (elementId: string) => {
  const facingMode = /(iphone|ipod|android.*mobile)/i.test(navigator.userAgent)
    ? { exact: "environment" }
    : "user"

  try {
    const cameras = await Html5Qrcode.getCameras()
    console.debug(cameras)
    const camera = cameras[0]
    if (!camera) {
      throw new Error("camera disabled")
    }

    const scanner = new Html5Qrcode(elementId)
    const data = { scanner, config: { facingMode } }
    return { data }
  } catch (error) {
    if (error && typeof error === "object") {
      return { error }
    }
    return { error: { message: "something wrong" } }
  }
}
