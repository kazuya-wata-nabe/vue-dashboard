import type { Meta, StoryObj } from "@storybook/vue3"
import FlexRow from "@/shared/components/parts/box/flex-row.vue"

const meta = {
  component: FlexRow,
  argTypes: {
    gap: { control: "radio", options: ["8", "16", "24", "32"] },
  },
  render: (args) => ({
    components: { FlexRow },
    setup: () => ({ args }),
    template: `
      <FlexRow v-bind="args">
        <div>hoge</div>
        <div>fuga</div>
      </FlexRow>
    `,
  }),
} satisfies Meta<typeof FlexRow>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    gap: "8",
  },
}

export const Gap16: Story = {
  args: {
    gap: "16",
  },
}
export const Gap24: Story = {
  args: {
    gap: "24",
  },
}

export const Gap32: Story = {
  args: {
    gap: "32",
  },
}
