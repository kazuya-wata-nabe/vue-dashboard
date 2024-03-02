import { inject, provide, type InjectionKey } from "vue"

type WithLoader = <T, U = unknown>(
  command: () => Promise<T>,
  onSuccess: (data: T) => T,
  onFailure: (err: unknown) => U,
) => Promise<void>

export type Context = {
  withLoader: WithLoader
}

const key = Symbol() as InjectionKey<Context>

export const provideLoader = (context: Context) => {
  provide(key, context)
}

export const useLoader = () => {
  const ctx = inject(key)
  if (ctx === undefined) {
    throw new Error("failed inject")
  }

  return { withLoader: ctx.withLoader }
}
