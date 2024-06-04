import * as dateFns from "date-fns"
import { startOfToday } from "date-fns"

type Duration = "day" | "hour"

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

export const today = () => {
  return startOfToday().toString()
}

export const isValid = (value: string) => {
  const ymd = value.split("-")
  if (ymd.length === 3) {
    const date = dateFns.parse(value, "yyyy-MM-dd", new Date())
    return dateFns.isValid(date)
  }
  return false
}

const DATE_TEMPLATE = {
  "-": "yyyy-MM-dd",
  "/": "yyyy/MM/dd",
} as const

export const format = (date: string, template: keyof typeof DATE_TEMPLATE) => {
  return dateFns.format(date, DATE_TEMPLATE[template])
}
