import { apiMock, mainLayout } from "@/__test__/helper"
import { ROLE } from "@/provider/auth/model/role"
import { expect, within } from "@storybook/test"
import { type Meta, type StoryObj } from "@storybook/vue3"
import { DateYMD } from "../__shared__/date-wrapper"
import HomeView from "./HomeView.vue"
import { fixture } from "./__test__/fixture"
import { BookQueryServiceOnMemory } from "./infra/on-memory"

/** ホーム画面 */
const meta = {
  component: HomeView,
  tags: ["autodocs"],
  decorators: [mainLayout(ROLE.ADMIN)],
} satisfies Meta<typeof HomeView>

export default meta
type Story = StoryObj<typeof meta>

/** 基本の表示 */
export const Primary: Story = {
  args: {
    queryService: new BookQueryServiceOnMemory(),
    today: DateYMD.valueOf("2021-03-01"),
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
    queryService: apiMock(fixture),
    today: DateYMD.valueOf("2021-03-11"),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const title = await canvas.findByText("piyopiyo")
    expect(title).toBeInTheDocument()

    const actual = await canvas.findByText("2021/03/10")
    expect(actual).toBeInTheDocument()
    expect(actual.classList).toContain("is-over")
  },
}
