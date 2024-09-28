import type { ZodTypeAny } from "zod"

export class Helper {
  private constructor(readonly schema: ZodTypeAny) {}
}
