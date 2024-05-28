import LoginView from "./login-view.vue"
import { userEvent, within } from "@storybook/test"
import { type Meta, type StoryObj } from "@storybook/vue3"

/** ログイン画面 */
const meta = {
  component: LoginView,
  tags: ["autodocs"],
  decorators: [],
} satisfies Meta<typeof LoginView>

export default meta
type Story = StoryObj<typeof meta>

/** 基本の表示 */
export const Primary: Story = {
  name: "正常系",
}

/**
 * mock環境では以下の場合にログイン成功となる
 *
 * |id|password|
 * |---|---|
 * |test1|test1|
 * |test2|test2|
 */
export const LoginSuccess: Story = {
  name: "ログイン成功",
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
