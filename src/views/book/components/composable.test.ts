import { describe, expect, it } from "vitest"
import { useComposable } from "./composable"

describe("sample", () => {
  it("s", () => {
    const { state, toggle } = useComposable()

    expect(state.value).toBe(true)
  })

  it("s2", () => {
    const { state, toggle } = useComposable()

    toggle()
    expect(state.value).toBe(false)
  })
})
