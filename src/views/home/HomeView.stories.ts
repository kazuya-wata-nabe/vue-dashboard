import { apiMock, mainLayout } from "@/__test__/helper"
import { ROLE } from "@/provider/auth/model/role"
import { expect, within } from "@storybook/test"
import { type Meta, type StoryObj } from "@storybook/vue3"
import HomeView from "./HomeView.vue"
import { fixture } from "./__test__/fixture"
import { BookQueryServiceOnMemory } from "./infra/on-memory"

const meta = {
  component: HomeView,
  tags: ["autodocs"],
  decorators: [mainLayout],
} satisfies Meta<typeof HomeView>

export default meta
type Story = StoryObj<typeof meta>

/** 基本の表示 */
export const Primary: Story = {
  args: {
    queryService: new BookQueryServiceOnMemory(),
    role: ROLE.admin,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const actual = await canvas.findByText("hogehoge")
    expect(actual).toBeInTheDocument()
  },
}

export const Secondary: Story = {
  args: {
    queryService: apiMock(fixture),
    role: ROLE.admin,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const actual = await canvas.findByText("piyopiyo")
    expect(actual).toBeInTheDocument()
  },
}
