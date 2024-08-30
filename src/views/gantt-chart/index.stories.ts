import { type Meta, type StoryObj } from "@storybook/vue3"
import Component from "./index.vue"

/** ログイン画面 */
const meta = {
  component: Component,
  tags: [""],
} satisfies Meta<typeof Component>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
