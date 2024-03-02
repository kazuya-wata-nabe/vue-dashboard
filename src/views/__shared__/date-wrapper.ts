export class DateWrapper {
  private constructor(private value: Date) {}

  static valueOf(value: string) {
    const d = new Date(value)
    return new DateWrapper(d)
  }
}
