import type { Meta, StoryObj } from "@storybook/vue3-vite"
import Component from "@/views/book/edit/index.vue"

/** 登録フォーム */
const meta = {
  component: Component,
  tags: [""],
  args: {
    id: "1",
  },
} satisfies Meta<typeof Component>

export default meta
type Story = StoryObj<typeof meta>

/** 基本の表示 */
export const Primary: Story = {}
