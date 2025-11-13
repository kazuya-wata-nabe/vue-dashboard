import { expect, waitFor } from "storybook/test"
import { fn, userEvent, within } from "storybook/test"
import { setup, type Meta, type StoryObj } from "@storybook/vue3-vite"
import { createAuthContext } from "@/features/auth"
import { mockApi, mockRouteTransition, registerMockApi } from "@/shared/__tests__/helper"
import LoginView from "@/views/login/index.vue"

const auth = createAuthContext({ load: fn(), save: fn(), remove: fn() })
setup((app) => {
  app.use(auth)
})
/** ログイン画面 */
const meta = {
  component: LoginView,
  tags: [""],
} satisfies Meta<typeof LoginView>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}

export const LoginSuccess: Story = {
  name: "ログイン成功したらHomeに遷移する",
  decorators: [mockRouteTransition({ current: "login" })],
  parameters: {
    ...registerMockApi([mockApi.POST("/login", { accessToken: "ok" })]),
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)
    const currentRoute = canvas.getByTestId("currentRoute")
    waitFor(() => {
      expect(currentRoute).toHaveTextContent("currentRoute: login")
    })

    await step("id input", async () => {
      await userEvent.type(canvas.getByLabelText("id"), "test@example.com")
    })

    await step("password input", async () => {
      await userEvent.type(canvas.getByLabelText("password"), "passw0rd")
    })

    await step("submit", async () => {
      await userEvent.click(canvas.getByRole("button"))
    })

    waitFor(() => {
      expect(currentRoute).toHaveTextContent("currentRoute: home")
    })
  },
}

export const LoginFailure: Story = {
  name: "ログイン失敗したらモーダルが表示される",
  parameters: {
    ...registerMockApi([mockApi.POST("/login", [], { status: "400" })]),
    screenshot: {
      delay: 1000,
    },
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)

    await step("id input", async () => {
      await userEvent.type(canvas.getByLabelText("id"), "test1")
    })

    await step("password input", async () => {
      await userEvent.type(canvas.getByLabelText("password"), "test1")
    })

    await step("submit", async () => {
      await userEvent.click(canvas.getByRole("button"))
    })

    const modal = await canvas.findByText("ログインに失敗しました")
    expect(modal).toBeInTheDocument()
  },
}
