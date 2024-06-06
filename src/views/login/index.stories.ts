import { fn, userEvent, within } from "@storybook/test"
import { setup, type Meta, type StoryObj } from "@storybook/vue3"
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
  name: "ログイン成功",
  parameters: {
    ...registerMockApi([mockApi.POST("/login", { accessToken: "ok" })]),
  },
  decorators: [mockRouteTransition({ current: "login" })],
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)

    await step("id input", async () => {
      await userEvent.type(canvas.getByLabelText("id"), "test@example.com")
    })

    await step("password input", async () => {
      await userEvent.type(canvas.getByLabelText("password"), "passw0rd")
    })

    await step("submit", async () => {
      await userEvent.click(canvas.getByRole("button"))
    })
  },
}

export const LoginFailure: Story = {
  name: "ログイン失敗",
  ...registerMockApi([mockApi.POST("/login", [], { status: "400" })]),
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
  },
}
