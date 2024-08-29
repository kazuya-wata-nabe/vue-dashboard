import { Html5Qrcode, Html5QrcodeSupportedFormats } from "html5-qrcode"

export const attachCamera = async (elementId: string, formats: Html5QrcodeSupportedFormats[]) => {
  const facingMode = /(iphone|ipod|android.*mobile)/i.test(navigator.userAgent)
    ? { exact: "environment" }
    : "user"

  try {
    const formatsToSupport = formats.length > 0 ? formats : undefined
    const scanner = new Html5Qrcode(elementId, { verbose: undefined, formatsToSupport })
    const data = { scanner, config: { facingMode } }
    return { data }
  } catch (error) {
    if (error && typeof error === "object") {
      return { error }
    }
    return { error: { message: "something wrong" } }
  }
}
