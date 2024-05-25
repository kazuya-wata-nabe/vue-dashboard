import Meta, { Primary } from "./book-form.stories"
import { composeStory } from "@storybook/vue3"
import { render } from "@testing-library/vue"
import { test } from "vitest"

const FormOK = composeStory(Primary, Meta)

test("Validates form", async () => {
  render(FormOK())
  await FormOK.play?.()
})
