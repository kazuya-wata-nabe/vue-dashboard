let id = 0

export const useId = (prefix?: string) => {
  id += 1
  return [prefix, `:${id}:`].filter(Boolean).join("-")
}
