import Component from "@/views/book/edit/index.vue"
import { expect, userEvent, within } from "@storybook/test"
import type { Meta, StoryObj } from "@storybook/vue3"

/** 登録フォーム */
const meta = {
  component: Component,
  tags: [""],
} satisfies Meta<typeof Component>

export default meta
type Story = StoryObj<typeof meta>

/** 基本の表示 */
export const Primary: Story = {
  args: {
    id: "1",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByLabelText("タイトル")
    await userEvent.type(input, "hogehoge")

    expect(input).toHaveValue("hogehoge")

    expect(await canvas.findByText("必須項目です")).toBeInTheDocument()
  },
}
