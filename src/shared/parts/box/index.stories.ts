import { type Meta, type StoryObj } from "@storybook/vue3"
import * as Components from "./index"

const meta = {
  tags: ["!autodocs", "!dev", "!test"],
} satisfies Meta<object>

export default meta

type Story = StoryObj<typeof meta>

export const FlexCol: Story = {
  render: () => ({
    components: { ...Components },
    template: `
      <FlexRow gap="8">
        <FlexCol gap="8">
          gap: 8
          <div>hoge</div>
        </FlexCol>
        <FlexCol gap="16">
          gap: 16
          <div>hoge</div>
        </FlexCol>
        <FlexCol gap="24">
          gap: 24
          <div>hoge</div>
        </FlexCol>
        <FlexCol gap="32">
          gap: 32
          <div>hoge</div>
        </FlexCol>
      </FlexRow>
    `,
  }),
}

export const FlexRow: Story = {
  render: () => ({
    components: { ...Components },
    template: `
      <FlexCol gap="8">
        <FlexRow gap="8">
          gap: &nbsp;&nbsp;8
          <div>hoge</div>
        </FlexRow>
        <FlexRow gap="16">
          gap: 16
          <div>hoge</div>
        </FlexRow>
        <FlexRow gap="24">
          gap: 24
          <div>hoge</div>
        </FlexRow>
        <FlexRow gap="32">
          gap: 32
          <div>hoge</div>
        </FlexRow>
      </FlexCol>
    `,
  }),
}
