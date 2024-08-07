let internalId = 0

export const useId = (prefix: string = ""): string => {
  internalId += 1
  return [prefix, `:${internalId}:`].filter((v) => v !== "").join("-")
}
