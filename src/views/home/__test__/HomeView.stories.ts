import { expect, fn, within } from "@storybook/test"
import { type Meta, type StoryObj } from "@storybook/vue3"
import HomeView from "../HomeView.vue"
import { BookQueryServiceOnMemory } from "../infra/on-memory"
import type { Book } from "../model"
import { fixture } from "./mock-repository"

const queryService = new BookQueryServiceOnMemory()
const meta = {
  component: HomeView,
  args: {
    queryService,
  },
  tags: ["autodocs"],
} satisfies Meta<typeof HomeView>

export default meta
type Story = StoryObj<typeof meta>

/** 基本の表示 */
export const Primary: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const actual = await canvas.findByText("hogehoge")
    expect(actual).toBeInTheDocument()
  },
}

const mockHelper = (data: Book[]) =>
  fn().mockImplementation(() => ({
    fetch: async () => data,
  }))()

export const Secondary: Story = {
  args: {
    queryService: mockHelper(fixture),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const actual = await canvas.findByText("piyopiyo")
    expect(actual).toBeInTheDocument()
  },
}
