import { expect, within } from "@storybook/test"
import { type Meta, type StoryObj } from "@storybook/vue3"
import { apiMock, mainLayout } from "@/__test__/helper"
import { ROLE } from "@/provider/auth/model/role"
import HomeView from "./HomeView.vue"
import { fixture1 } from "./__test__/fixture"
import { BookQueryServiceOnMemory } from "./infra/on-memory"

/**
 * ホーム画面
 *
 * 返却期限 > 本日の表示は期限超過と見なし<br>
 * 返却期限を赤文字で表示する
 */
const meta = {
  component: HomeView,
  tags: ["autodocs"],
  decorators: [mainLayout(ROLE.ADMIN)],
} satisfies Meta<typeof HomeView>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    queryService: new BookQueryServiceOnMemory(),
    today: "2021-03-10",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const actual = await canvas.findByText("hogehoge")
    expect(actual).toBeInTheDocument()
  },
}

export const Secondary: Story = {
  name: "返却期限切れ",
  args: {
    queryService: apiMock(fixture1),
    today: "2021-03-11",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const actual = await canvas.findByText("2021/03/10")
    expect(actual).toBeInTheDocument()
    expect(actual.classList).toContain("is-over")
  },
}
