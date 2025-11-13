import { type Meta, type StoryObj } from "@storybook/vue3-vite"
import SubmitButton from "./submit-button.vue"

/**
 * aaaaa
 */
const meta = {
  tags: ["autodocs", "!dev"],
  component: SubmitButton,
  args: {
    size: "small",
    default: "aaa",
  },
} satisfies Meta<typeof SubmitButton>

export default meta

/**
 * hogehoge
 */
type Story = StoryObj<typeof meta>

export const IsSubmittingFalse: Story = {
  name: "ボタンを押してない場合",
  args: {
    isSubmitting: false,
  },
}

export const IsSubmittingTrue: Story = {
  name: "ボタンを押下後にAPIリクエスト中の場合",
  args: {
    isSubmitting: true,
  },
}
