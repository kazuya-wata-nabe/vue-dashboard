import { type Meta, type StoryObj } from "@storybook/vue3"
import SubmitButton from "./submit-button.vue"

const meta = {
  tags: ["autodocs", "!dev"],
  component: SubmitButton,
  args: {
    default: "aaa",
  },
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
