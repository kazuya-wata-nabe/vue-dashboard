import { expect, userEvent, within } from "@storybook/test"
import { type Meta, type StoryObj } from "@storybook/vue3"
import Component from "./single-select-form.vue"

const meta = {
  component: Component,
  args: {
    modelValue: undefined,
    options: [
      { name: "ああああ", value: "aaa" },
      { name: "いいいいい", value: "bbb" },
      { name: "ううう", value: "ccc" },
    ],
  },

  tags: [""],
  decorators: [],
} satisfies Meta<typeof Component>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    label: "ユーザ一覧",
  },
  parameters: {
    screenshot: {
      delay: 1000,
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const select = await canvas.findByLabelText("ユーザ一覧")
    expect(select).toBeInTheDocument()

    const options = await canvas.findAllByRole("option")
    await userEvent.click(options[0]!)
    await userEvent.click(options[1]!)
  },
}
