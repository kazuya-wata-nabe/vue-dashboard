import { format, isAfter, isBefore, isSameDay, parse, startOfToday } from "date-fns"

abstract class DateWrapper {
  abstract isSame(date: DateWrapper): boolean
  abstract isBefore(date: DateWrapper): boolean
  abstract isAfter(date: DateWrapper): boolean
  abstract toString(): string
}
export class DateYMD implements DateWrapper {
  private constructor(readonly value: Date) {}

  static valueOf(value: string) {
    const d = parse(value, "yyyy-MM-dd", new Date())
    return new DateYMD(d)
  }
  static today() {
    return new DateYMD(startOfToday())
  }

  toString(): string {
    return format(this.value, "yyyy/MM/dd")
  }

  toISOString(): string {
    return this.value.toISOString()
  }

  isSame(date: DateYMD): boolean {
    return isSameDay(this.value, date.value)
  }

  isBefore(date: DateYMD): boolean {
    return isBefore(this.value, date.value)
  }
  isAfter(date: DateYMD): boolean {
    return isAfter(this.value, date.value)
  }
}
