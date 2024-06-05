import { type Meta, type StoryObj } from "@storybook/vue3"
import { SubmitButton } from "./index"

const meta = {
  render: () => ({
    components: { SubmitButton },
  }),
  tags: ["autodocs", "!dev"],
} satisfies Meta<{}>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  render: () => ({
    components: { SubmitButton },
    template: `
      <div>
        <SubmitButton />
      </div>
    `,
  }),
}
