import { publicLayout } from "@/__test__/helper"
import { userEvent, within } from "@storybook/test"
import { type Meta, type StoryObj } from "@storybook/vue3"
import { default as LoginView } from "./LoginView.vue"
import { AuthRepositoryOnMemory } from "./infra/on-memory"

const meta = {
  component: LoginView,
  args: {
    repository: new AuthRepositoryOnMemory(),
  },
  tags: ["autodocs"],
  decorators: [publicLayout],
} satisfies Meta<typeof LoginView>

export default meta
type Story = StoryObj<typeof meta>

/** 基本の表示 */
export const Primary: Story = {}

/** ログイン成功 */
export const LoginSuccess: Story = {
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

    // await step("assert", async () => {
    //   await waitFor(async () => {
    //     await expect(args).toBeCalledWith(
    //       {
    //         username: "name",
    //       },
    //       expect.anything(),
    //     )
    //   })
    // })
  },
}
