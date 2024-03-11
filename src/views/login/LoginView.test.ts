import { composeStory } from "@storybook/testing-vue3"
import { render } from "@testing-library/vue"
import { test } from "vitest"
import Meta, { LoginSuccess as LoginSuccessStory } from "./LoginView.stories"

const LoginSuccess = composeStory(LoginSuccessStory, Meta)

test("Checks if the form is valid", () => {
  render(LoginSuccess())

  // fireEvent.click(buttonElement)

  // expect(isFormValid).toBeInTheDocument()
})
