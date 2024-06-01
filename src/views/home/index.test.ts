import { expect } from "@storybook/test"
import { composeStory } from "@storybook/vue3"
import { cleanup, render } from "@testing-library/vue"
import { afterEach, test, vi } from "vitest"
import { fixture2 } from "@/views/home/__tests__/fixture"
import Meta, { Primary, Secondary } from "@/views/home/__tests__/home-view.stories"

afterEach(cleanup)

test("storyの再利用サンプル", async () => {
  const ViewOk = composeStory(Primary, Meta)
  const { findByText } = render(ViewOk)

  const actual = await findByText("hogehoge")
  expect(actual).toBeInTheDocument()
})

test("apiのモックサンプル", async () => {
  const ViewOk = composeStory(Primary, Meta)
  const mock = vi.fn(() => ({ fetch: vi.fn().mockResolvedValue(fixture2) }))()

  const { findByText } = render(ViewOk, { props: { queryService: mock } })

  const actual = await findByText("piyopiyo")
  expect(actual).toBeInTheDocument()
})

test("返却期限切れの場合は返却期限が赤文字で表示されること", async () => {
  const ViewOk = composeStory(Secondary, Meta)

  const { findByText } = render(ViewOk)

  const actual = await findByText("fugafuga")
  expect(actual).toBeInTheDocument()

  await ViewOk.play?.()
})
