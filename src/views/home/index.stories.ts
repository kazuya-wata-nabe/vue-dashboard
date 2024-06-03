import { expect, within } from "@storybook/test"
import { type Meta, type StoryObj } from "@storybook/vue3"
import { extendMockApi, mockApi, mockDate, registerMockApi } from "@/__tests__/helper"
import { dummyBooks1, dummyBooks2 } from "@/views/home/__tests__/fixture"
import Component from "@/views/home/index.vue"

/**
 * ホーム画面
 *
 * 返却期限 > 本日の表示は期限超過と見なし<br>
 * 返却期限を赤文字で表示する
 */
const meta = {
  component: Component,
  tags: [""],
  args: {},
  parameters: {
    ...registerMockApi([
      mockApi.GET("/books", dummyBooks1), //
    ]),
  },
  decorators: [mockDate("2021-03-10")],
} satisfies Meta<typeof Component>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}

export const WithValidQuery: Story = {
  name: "クエリパラメータあり",
  args: {
    date: "2022-11-11",
  },
  parameters: {
    ...extendMockApi(meta, [
      mockApi.GET("/books", dummyBooks2, { delay: 500 }), //
    ]),
  },
  decorators: [mockDate("2021-03-11")],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const actual = await canvas.findByText("2021/03/10")
    expect(actual).toBeInTheDocument()
    expect(actual.classList).toContain("over")
  },
}

export const WithInvalidQuery: Story = {
  name: "不正な日付はクエリパラメータなしで扱う",
  args: {
    date: "hoge",
  },
  parameters: {
    ...extendMockApi(meta, [
      mockApi.GET("/books", dummyBooks2, { delay: 500 }), //
    ]),
  },
  decorators: [mockDate("2021-03-11")],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const actual = await canvas.findByText("2021/03/10")
    expect(actual).toBeInTheDocument()
    expect(actual.classList).toContain("over")
  },
}

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
    expect(actual).toBeInTheDocument()
    expect(actual.classList).toContain("over")
  },
}
