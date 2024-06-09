import { fn } from "@storybook/test"
import { type Meta, type StoryObj } from "@storybook/vue3"
import { type GenericMeta } from "@/shared/__tests__/helper"
import Component from "./date-picker.vue"

const meta = {
  component: Component,
  tags: ["autodocs", "!dev"],
} satisfies GenericMeta<Meta, typeof Component>

export default meta
type Story = StoryObj<typeof meta>

const defaultArgs = {
  label: "Label",
  modelValue: "",
  "onUpdate:modelValue": fn(),
  placeholder: "Placeholder",
  errorMessage: "",
}

export const Small: Story = {
  args: {
    ...defaultArgs,
    size: "small",
  },
}

export const Medium: Story = {
  args: {
    ...defaultArgs,
    size: "medium",
  },
}

export const Large: Story = {
  args: {
    ...defaultArgs,
    size: "large",
  },
}

export const WithError: Story = {
  args: {
    ...defaultArgs,
    size: "large",
    errorMessage: "error message",
  },
}
