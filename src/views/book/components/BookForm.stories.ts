import { expect, userEvent, within } from "@storybook/test"
import type { Meta, StoryObj } from "@storybook/vue3"
import BookForm from "./BookForm.vue"

/** 登録フォーム */
const meta = {
  component: BookForm,
  tags: ["autodocs"],
} satisfies Meta<typeof BookForm>

export default meta
type Story = StoryObj<typeof meta>

/** 基本の表示 */
export const Primary: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByLabelText("タイトル")
    await userEvent.type(input, "hogehoge")

    expect(input).toHaveValue("hogehoge")

    expect(await canvas.findByText("必須項目です")).toBeInTheDocument()
  },
}
