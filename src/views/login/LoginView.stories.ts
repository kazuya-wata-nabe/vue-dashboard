import AuthProvider from "@/provider/auth/AuthProvider.vue"
import { userEvent, within } from "@storybook/test"
import { type Meta, type StoryObj } from "@storybook/vue3"
import LoginView from "./LoginView.vue"
import { AuthRepositoryOnMemory } from "./infra/on-memory"

const meta = {
  component: LoginView,
  tags: ["autodocs"],
  args: {
    repository: new AuthRepositoryOnMemory(),
  },
  render: () => ({
    components: { LoginView, AuthProvider },
    setup: (args) => args,
    template: "<AuthProvider><LoginView v-bind='args' /></AuthProvider>",
  }),
} satisfies Meta<typeof LoginView>

export default meta
type Story = StoryObj<typeof meta>

/** 基本の表示 */
export const Primary: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    // idはdom apiのidを被るのでxxx-id or aria-labelにするよう警告が出る
    await userEvent.type(canvas.getByLabelText("id"), "test1")
    await userEvent.type(canvas.getByLabelText("password"), "test1")

    await userEvent.type(canvas.getByRole("button"))

    // expect(await canvas.findByText("必須項目です")).toBeInTheDocument()
  },
}
