import * as dateFns from "date-fns"
import { startOfToday } from "date-fns"

type Duration = "day" | "hour"
type DateArg = string | Date

const parseValue = (value: DateArg) => {
  if (typeof value === "object") {
    return value
  }
  const template = value.slice(4, 5) === "-" ? "yyyy-MM-dd" : "yyyy/MM/dd"
  const d = dateFns.parse(value, template, new Date())
  if (d.toString() === "Invalid Date") {
    throw new Error(`日付の形式をISOにしてください: ${value}`)
  }
  return d
}

export const isSame = (a: string, b: string, duration: Duration) => {
  switch (duration) {
    case "day":
      return dateFns.isSameDay(a, b)
    case "hour":
      return dateFns.isSameHour(a, b)
    default: {
      throw new Error(duration satisfies never)
    }
  }
}

export const isAfter = (a: string | Date, b: string | Date) => {
  return dateFns.isAfter(a, b)
}

export const today = () => startOfToday().toString()
export const parse = (value: string) => parseValue(value)
