import { type Meta, type StoryObj } from "@storybook/vue3-vite"
import Component from "./index.vue"

const meta = {
  component: Component,
} satisfies Meta<typeof Component>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
