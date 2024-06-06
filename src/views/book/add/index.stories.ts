import { expect, userEvent, within } from "@storybook/test"
import type { Meta, StoryObj } from "@storybook/vue3"
import Component from "@/views/book/add/index.vue"

/** 登録フォーム */
const meta = {
  component: Component,
  tags: [""],
} satisfies Meta<typeof Component>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}

export const InValidInput: Story = {
  name: "未入力で登録すると必須エラーを表示する",
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole("button", { name: "登録" })
    await userEvent.click(button)

    const errors = await canvas.findAllByText("必須項目です")

    expect(errors).toHaveLength(3)
  },
}
