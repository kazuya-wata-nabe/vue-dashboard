import * as dateFns from "date-fns"

const DATE_TEMPLATE = {
  "-": "yyyy-MM-dd",
  "/": "yyyy/MM/dd",
} as const
export const dateFormatter = (date: string, template: keyof typeof DATE_TEMPLATE) => {
  return dateFns.format(date, DATE_TEMPLATE[template])
}

const NUMBER_TEMPLATE = {
  ",": (n: number) => n.toLocaleString(),
}
export const numberFormatter = (n: number, template: ",") => {
  return NUMBER_TEMPLATE[template](n)
}
