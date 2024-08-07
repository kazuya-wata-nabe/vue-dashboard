<script lang="ts" setup>
import { computed } from "vue"
import { useId } from "@/shared/composable/use-id"
import { useInteract } from "./use-interact"

const props = defineProps<{
  label: string
  options: { name: string; value: string }[]
}>()

const id = useId()
const labelID = `${id}-label`
const listBoxID = `${id}-listbox`
const optionID = `${id}-option`

const {
  state,
  open,
  reset,
  close,
  updateIndex,
  onListBoxFocus,
  onListBoxBlur,
  onComboBoxBlur,
  onKeyDownUp,
  onKeyDownDown,
  onKeyDownEnter,
} = useInteract(() => props.options)

const model = defineModel<string | undefined>({ required: true })

const displayValue = computed(() => {
  const selected = props.options.find((option) => model.value === option.value)
  return selected?.name ?? "選択してください"
})

const activedescendant = computed(() => {
  return model.value ? `${optionID}-${model.value}` : undefined
})

const handleEnter = () => onKeyDownEnter((value) => value && (model.value = value))

const handleSelect = (value: string) => {
  model.value = value
  close()
}
</script>

<template>
  <div class="select-form">
    <div :id="labelID">{{ label }}</div>
    <div
      role="combobox"
      tabindex="0"
      :aria-expanded="state.isOpen"
      aria-haspopup="listbox"
      :aria-activedescendant="activedescendant"
      :aria-controls="listBoxID"
      @click="open"
      @blur="onComboBoxBlur"
      @keydown.prevent.up="onKeyDownUp"
      @keydown.prevent.down="onKeyDownDown"
      @keydown.prevent.enter="handleEnter"
      @keydown.prevent.esc="reset"
    >
      <div>{{ displayValue }}</div>
      <svg
        width="18"
        height="16"
        aria-hidden="true"
        focusable="false"
        style="forced-color-adjust: auto"
      >
        <polygon
          class="arrow"
          stroke-width="0"
          fill-opacity="0.75"
          fill="currentcolor"
          points="3,6 15,6 9,14"
        />
      </svg>
    </div>
    <ul
      role="listbox"
      tabindex="-1"
      :aria-labelledby="labelID"
      :aria-expanded="state.isOpen"
      :aria-hidden="state.isOpen"
      @mouseover="onListBoxFocus"
      @focus="onListBoxFocus"
      @mouseleave="onListBoxBlur"
      @blur="onListBoxBlur"
    >
      <template v-for="(option, index) in options" :key="option.value">
        <li
          role="option"
          tabindex="0"
          :id="`${optionID}-${index}`"
          :value="option.value"
          :aria-selected="state.currentIndex === index"
          @click="handleSelect(option.value)"
          @keydown.prevent.enter="handleSelect(option.value)"
          @mouseover="updateIndex(index)"
          @focus="updateIndex(index)"
        >
          {{ option.name }}
        </li>
      </template>
    </ul>
  </div>
</template>

<style scoped>
.select-form {
  width: 200px;
  position: relative;
}

div[role="combobox"] {
  display: flex;
  width: 90%;
  overflow: hidden;
}

svg {
  position: absolute;
  right: 0;
  transform: translate(-2px, 2px);
}

div[role="combobox"],
ul {
  width: 100%;
  border: solid 1px;
}

ul {
  position: absolute;
  max-height: 100px;
  border-top: none;
  position: absolute;
  overflow-x: hidden;
  overflow-y: auto;

  &:not([aria-hidden="true"]) {
    height: 0;
    border: none;
  }
}

li[role="option"][aria-selected="true"] {
  background: whitesmoke;
}
</style>
