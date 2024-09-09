import { useId as _useId } from "vue"

export const useId = (prefix: string = ""): string => {
  const id = _useId() ?? ""
  return [prefix, id].filter((v) => v !== "").join("-")
}
