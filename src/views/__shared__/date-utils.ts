import { format, isAfter, isBefore, parse, startOfToday } from "date-fns"

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

const DateFormatTemplate = {
  "yyyy/MM/dd": "yyyy/MM/dd",
} as const

type DateFormatTemplate = (typeof DateFormatTemplate)[keyof typeof DateFormatTemplate]

export const DateUtils = {
  today: () => startOfToday(),
  parse: (value: string) => parseValue(value),
  format: (date: Date, template = DateFormatTemplate["yyyy/MM/dd"]) => format(date, template),
  isBefore: (a: DateArg, b: DateArg) => isBefore(parseValue(a), parseValue(b)),
  isAfter: (a: DateArg, b: DateArg) => isAfter(parseValue(a), parseValue(b)),
} as const
