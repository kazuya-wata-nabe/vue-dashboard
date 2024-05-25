import FlexCol from "./flex-col.vue"
import type { Meta, StoryObj } from "@storybook/vue3"

const meta = {
  component: FlexCol,
  argTypes: {
    gap: { control: "radio", options: [8, 16, 24, 32] },
  },
  render: (args) => ({
    components: { FlexCol },
    setup() {
      return { args }
    },
    template: `
      <FlexCol v-bind="args">
        <div>hoge</div>
        <div>fuga</div>
      </FlexCol>
    `,
  }),
} satisfies Meta<typeof FlexCol>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    gap: 8,
  },
}

export const Gap16: Story = {
  args: {
    gap: 16,
  },
}

export const Gap24: Story = {
  args: {
    gap: 24,
  },
}

export const Gap32: Story = {
  args: {
    gap: 32,
  },
}
