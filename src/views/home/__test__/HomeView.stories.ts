import { mainLayout } from "@/__test__/helper"
import { expect, within } from "@storybook/test"
import { type Meta, type StoryObj } from "@storybook/vue3"
import HomeView from "../HomeView.vue"
import { BookQueryServiceOnMemory } from "../infra/on-memory"

const meta = {
  title: "views/home/HomeView",
  component: HomeView,
  args: {
    queryService: new BookQueryServiceOnMemory(),
  },
  tags: ["autodocs"],
  decorators: [mainLayout()],
} satisfies Meta<typeof HomeView>

export default meta
type Story = StoryObj<typeof meta>

/** 基本の表示 */
export const Primary: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const actual = await canvas.findByText("fugafuga")
    expect(actual).toBeInTheDocument()
  },
}

const service = new BookQueryServiceOnMemory()
export const Secondary: Story = {
  args: {
    queryService: service,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const actual = await canvas.findByText("piyopiyo")
    expect(actual).toBeInTheDocument()
  },
}
