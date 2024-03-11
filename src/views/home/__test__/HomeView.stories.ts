// import { mainLayout } from ".storybook/decorator"
import { mainLayout, sleep } from "@/__test__/helper"
import { DateFormatter } from "@/views/__shared__/date-formatter"
import { expect, spyOn, within } from "@storybook/test"
import { type Meta, type StoryObj } from "@storybook/vue3"
import HomeView from "../HomeView.vue"
import { BookQueryServiceOnMemory } from "../infra/on-memory"
import { Book } from "../model"

const meta = {
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
    await sleep(2)

    const actual = await canvas.findByText("fugafuga")
    expect(actual).toBeInTheDocument()
  },
}

const d = DateFormatter.parse
const mockQueryService = new BookQueryServiceOnMemory()
spyOn(mockQueryService, "fetch").mockResolvedValue([
  Book({
    id: "abc-1",
    title: "hogehogeaaaaaaaaahogehogeaaaaaaaaahogehogeaaaaaaaaahogehogeaaaaaaaaahogehogeaaaaaaaaa",
    borrowDate: d("2020-01-01"),
    returnDate: d("2020-02-01"),
  }),
  Book({
    id: "abc-2",
    title: "piyopiyo",
    borrowDate: d("2021-01-01"),
    returnDate: d("2021-03-10"),
  }),
])

export const Secondary: Story = {
  args: {
    queryService: mockQueryService,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await sleep(2)

    const actual = await canvas.findByText("fugafuga")
    expect(actual).toBeInTheDocument()
  },
}
