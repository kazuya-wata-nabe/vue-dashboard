import { isAfter, isBefore, parse, startOfToday } from "date-fns"

type DateArg = string | Date
const parseValue = (value: DateArg) => {
  if (typeof value === "object") {
    return value
  }
  const template = value.slice(4, 5) === "-" ? "yyyy-MM-dd" : "yyyy/MM/dd"
  const d = parse(value, template, new Date())
  if (d.toString() === "Invalid Date") {
    throw new Error(`日付の書式をISOにしてください: ${value}`)
  }
  return d
}

export const DateUtils = {
  today: () => startOfToday(),
  parse: (value: string) => parseValue(value),
  isBefore: (a: DateArg, b: DateArg) => isBefore(parseValue(a), parseValue(b)),
  isAfter: (a: DateArg, b: DateArg) => isAfter(a, b),
} as const
