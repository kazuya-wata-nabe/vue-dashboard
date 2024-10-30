import { type Meta, type StoryObj } from "@storybook/vue3"
import { wsHandlers } from "@/app/mocks/ws-handlers"
import Component from "./index.vue"

const meta = {
  component: Component,
  tags: [""],
  parameters: {
    msw: {
      handlers: wsHandlers,
    },
  },
} satisfies Meta<typeof Component>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
