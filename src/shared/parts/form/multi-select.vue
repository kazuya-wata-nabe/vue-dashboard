<script setup lang="ts" generic="T extends { code: string; name: string }">
import { computed, ref } from "vue"
import Multiselect from "@vueform/multiselect"
import "@vueform/multiselect/themes/default.css"

const props = defineProps<{
  size: "small" | "medium" | "large"
  label: string
  placeholder: string
  errorMessage?: string
  options: T[] | undefined
}>()

const classes = computed(() => ({
  [`${props.size}`]: props.size,
}))

const id = `select-${crypto.randomUUID()}`
const model = defineModel<T["code"][] | undefined>({ required: true, default: [] })

const isCheckedAll = computed(() => model.value?.length === props.options?.length)

const multiselect = ref<Multiselect>()

const onClickAll = () => {
  const method = model.value?.length === props.options?.length ? "clear" : "selectAll"
  multiselect?.value?.[method]()
}

const makeLabel = (values: object | T[]) => {
  if (!Array.isArray(values)) return ""
  return values.map((value: T) => value.name).join(",")
}

/** @see {@link https://github.com/vueform/multiselect} */
const config = computed(() => ({
  label: "name",
  trackBy: "code",
  valueProp: "code",
  canClear: false,
  closeOnSelect: false,
  hideSelected: false,
  noOptionsText: "",
  classes: {
    container: classes.value,
  },
}))
</script>

<template>
  <label :for="id">{{ label }}</label>

  <Multiselect
    ref="multiselect"
    v-bind="{ ...config, ...$attrs }"
    :id="id"
    mode="multiple"
    placeholder="選択してください"
    v-model="model"
    :options="options"
  >
    <template #multiplelabel="{ values }">
      <div class="select-container">
        <div class="select-label">{{ makeLabel(values) }}</div>
      </div>
    </template>

    <template #beforelist>
      <div class="checkbox-container multiselect-option">
        <input
          :id="`${id}-all`"
          type="checkbox"
          class="checkbox all"
          :checked="isCheckedAll"
          @click="onClickAll"
        />
        <label :for="`${id}-all`" class="checkbox-label">全て</label>
      </div>
    </template>

    <template #option="{ option }">
      <div class="checkbox-container">
        <input type="checkbox" class="checkbox" :checked="model?.includes(option.code)" />
        <label class="checkbox-label">{{ option.name }}</label>
      </div>
    </template>
  </Multiselect>

  <p class="p-form-item__alert">{{ errorMessage }}</p>
</template>

<style>
.checkbox-container {
  width: 100%;
  & .checkbox {
    &:not(.all) {
      pointer-events: none;
    }
  }
  & .checkbox-label {
    /** 22pxはc-check-box__inputのwidth */
    width: calc(100% - 22px);
    cursor: pointer;
  }
}

.select-container {
  align-items: center;
  box-sizing: border-box;
  display: flex;
  width: 100%;
  height: 100%;
  left: 0;
  padding-left: var(--ms-px, 0.875rem);
  position: absolute;
  top: 0;

  & .select {
    white-space: nowrap;
    text-overflow: ellipsis;
    max-width: 90%;
    overflow: hidden;
    line-clamp: 1;
    -webkit-box-orient: vertical;
  }
}

.multiselect-option {
  &.is-selected,
  .is-pointed,
  &:not(:hover) {
    color: unset;
    background-color: unset;
  }
  &:hover {
    background-color: #f3f4f6;
  }
}
</style>
