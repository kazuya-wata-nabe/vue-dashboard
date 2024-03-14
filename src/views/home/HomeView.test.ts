import { render } from "@testing-library/vue"

import { composeStory } from "@storybook/vue3"

import { apiMock } from "@/__test__/helper"
import { expect } from "@storybook/test"
import { test, vi } from "vitest"
import Meta, { Secondary } from "./HomeView.stories"
import { fixture2, fixture3 } from "./__test__/fixture"

test("Login View", async () => {
  const ViewOk = composeStory(Secondary, Meta)
  vi.spyOn(ViewOk.args.queryService!, "fetch").mockResolvedValue(fixture2)

  const { findByText } = render(ViewOk())

  const actual = await findByText("fugafuga")
  expect(actual).toBeInTheDocument()
})

test("Login View2", async () => {
  const ViewOk = composeStory(Secondary, Meta)
  const mock = apiMock(fixture3)
  const { findByText } = render(ViewOk, { props: { queryService: mock } })

  const actual = await findByText("hogehoge")
  expect(actual).toBeInTheDocument()
})
