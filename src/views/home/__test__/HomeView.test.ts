import { render } from "@testing-library/vue"

import { composeStory } from "@storybook/vue3"

import { expect } from "@storybook/test"
import { test, vi } from "vitest"
import Meta, { Secondary } from "./HomeView.stories"
import { fixture2 } from "./mock-repository"

test("Login View", async () => {
  const ViewOk = composeStory(Secondary, Meta)
  vi.spyOn(ViewOk.args.queryService!, "fetch").mockResolvedValue(fixture2)

  const { findByText } = render(ViewOk())

  const actual = await findByText("fugafuga")
  expect(actual).toBeInTheDocument()
})
