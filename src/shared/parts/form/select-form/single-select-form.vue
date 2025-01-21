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
  controller,
  reset,
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
  controller.close()
}
</script>

<template>
  <div class="select-form">
    <div :id="labelID">{{ label }}</div>
    <div
      :aria-activedescendant="activedescendant"
      :aria-controls="listBoxID"
      :aria-expanded="state.isOpen"
      aria-haspopup="listbox"
      role="combobox"
      tabindex="0"
      @blur="onComboBoxBlur"
      @click="controller.open"
      @keydown.prevent.down="onKeyDownDown"
      @keydown.prevent.enter="handleEnter"
      @keydown.prevent.esc="reset"
      @keydown.prevent.up="onKeyDownUp"
    >
      <div>{{ displayValue }}</div>
      <svg
        aria-hidden="true"
        focusable="false"
        height="16"
        style="forced-color-adjust: auto"
        width="18"
      >
        <polygon
          class="arrow"
          fill="currentcolor"
          fill-opacity="0.75"
          points="3,6 15,6 9,14"
          stroke-width="0"
        />
      </svg>
    </div>
    <ul
      :aria-expanded="state.isOpen"
      :aria-hidden="state.isOpen"
      :aria-labelledby="labelID"
      role="listbox"
      tabindex="-1"
      @blur="onListBoxBlur"
      @focus="onListBoxFocus"
      @mouseleave="onListBoxBlur"
      @mouseover="onListBoxFocus"
    >
      <template v-for="(option, index) in options" :key="option.value">
        <li
          :id="`${optionID}-${index}`"
          :aria-selected="state.currentIndex === index"
          role="option"
          tabindex="0"
          :value="option.value"
          @click="handleSelect(option.value)"
          @focus="updateIndex(index)"
          @keydown.prevent.enter="handleSelect(option.value)"
          @mouseover="updateIndex(index)"
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
