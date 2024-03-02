import { format, parse } from "date-fns"

type Num = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 0
type OneToNine = Exclude<Num, 0>
type YY = `19${Num}${Num}` | `20${Num}${Num}`
type MM = `0${OneToNine}` | `1${0 | 1 | 2}`
type DD = `0${OneToNine}` | `${1 | 2}${Num}` | `3${0 | 1}`

export type DateYMD = `${YY}-${MM}-${DD}`

export const DateFormatter = {
  parse: (value: DateYMD) => {
    const date = parse(value, "yyyy-MM-dd", new Date())
    if (date.toString() === "Invalid Date") {
      throw new Error(`parse error, ${value} is invalid date`)
    }
    return parse(value, "yyyy-MM-dd", new Date())
  },
  format: (value: Date) => {
    return format(value, "yyyy/MM/dd")
  },
} as const
