import { composeStory } from "@storybook/vue3"
import { render } from "@testing-library/vue"
import { test } from "vitest"
import Meta, { Primary } from "@/views/book/add/__tests__/index.stories"

const FormOK = composeStory(Primary, Meta)

test("Validates form", async () => {
  render(FormOK())
  await FormOK.play?.()
})
