import { type Meta, type StoryObj } from "@storybook/vue3"
import { FlexCol, FlexRow } from "@/shared/components/parts"

const meta = {
  tags: [""],
  render: () => ({
    components: { FlexCol, FlexRow },
  }),
}

export default meta

type Story = StoryObj<typeof meta>

export const Flex: Story = {
  render: () => ({
    template: `
      <FlexCol gap="8">
        hoge
      </FlexCol>
    `,
  }),
}
