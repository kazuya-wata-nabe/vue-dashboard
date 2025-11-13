import { expect, within } from "storybook/test"
import { type Meta, type StoryObj } from "@storybook/vue3-vite"
import { extendMockApi, mockApi, mockDate, registerMockApi } from "@/shared/__tests__/helper"
import { dummyBooks1, dummyBooks2 } from "@/views/home/__tests__/fixture"
import Component from "@/views/home/index.vue"

const meta = {
  component: Component,
  tags: ["autodocs"],
  decorators: [mockDate("2021-03-10")],
  parameters: {
    ...registerMockApi([
      mockApi.GET("/books", dummyBooks1), //
    ]),
  },
} satisfies Meta<typeof Component>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}

export const Secondary: Story = {
  name: "返却期限切れ",
  parameters: {
    ...extendMockApi(meta, [
      mockApi.GET("/books", dummyBooks2, { delay: 500 }), //
    ]),
  },
  decorators: [mockDate("2021-03-11")],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const actual = await canvas.findByText("2021/03/10")
    await expect(actual).toBeInTheDocument()
    await expect(actual.classList).toContain("over")
  },
}
