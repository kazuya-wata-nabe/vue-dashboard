import { type Meta, type StoryObj } from "@storybook/vue3"
import { SubmitButton } from "./index"

const meta = {
  tags: ["autodocs", "!dev"],
  render: (args) => ({
    components: { SubmitButton },
    setup: () => {
      return { args }
    },
    template: `
    <div style="width: 200px">
      <SubmitButton v-bind="args">Hoge</SubmitButton>
    </div>
    `,
  }),
} satisfies Meta<typeof SubmitButton>

export default meta

type Story = StoryObj<typeof meta>

export const IsSubmittingFalse: Story = {
  args: {
    isSubmitting: false,
  },
}

export const IsSubmittingTrue: Story = {
  args: {
    isSubmitting: true,
  },
}
