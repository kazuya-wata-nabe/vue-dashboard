<script setup lang="ts">
/**
 * @see {@link https://vue3datepicker.com/installation/}
 */
import { computed, onMounted, ref } from "vue"
import { VField } from "vuetify/components/VField"
import { VInput } from "vuetify/components/VInput"
import { VTextField } from "vuetify/components/VTextField"
import VueDatePicker, { type VueDatePickerProps } from "@vuepic/vue-datepicker"
import "@vuepic/vue-datepicker/dist/main.css"

const props = defineProps<{
  size: "small" | "medium" | "large"
  label: string
  placeholder: string
  errorMessage?: string | undefined
}>()

const WeekOfDay = {
  sunday: 0,
  saturday: 6,
} as const

const HeaderColor = {
  [WeekOfDay.sunday]: "sunday",
  [WeekOfDay.saturday]: "saturday",
} as const

const config = computed(
  (): VueDatePickerProps => ({
    locale: "ja",
    enableTimePicker: false,
    autoApply: true,
    yearFirst: true,
    format: "yyyy/MM/dd",
    weekStart: WeekOfDay.sunday,
    clearable: false,
    modelType: "yyyy-MM-dd",
  }),
)

const emits = defineEmits<{
  change: [value: { target: { value: string } }]
}>()

const datePicker = ref<InstanceType<typeof VueDatePicker>>()

const model = defineModel<string | undefined>({ required: true })

const open = () => {
  datePicker.value?.openMenu()
}

const classes = computed(() => ({
  "date-picker": true,
  [props.size]: true,
}))

const headerColor = (index: number) => {
  if (index === WeekOfDay.sunday) return HeaderColor[index]
  if (index === WeekOfDay.saturday) return HeaderColor[index]
  return ""
}

const getDayClass = (date: Date) => {
  const weekOfDay = date.getDay()
  if (weekOfDay === WeekOfDay.sunday) return "sunday"
  if (weekOfDay === WeekOfDay.saturday) return "saturday"
  return ""
}

const handleUpdate = (value: string) => {
  emits("change", { target: { value } })
}
</script>

<template>
  <VTextField
    :class="classes"
    :label="label"
    :model-value="model"
    :error-messages="errorMessage"
    @click="open"
  >
  </VTextField>

  <VueDatePicker
    ref="datePicker"
    v-bind="config"
    v-model="model"
    :day-class="getDayClass"
    @update:model-value="handleUpdate"
  >
    <template #year="year">{{ year.text }}年</template>
    <template #month="month">
      {{ month.text }}
    </template>
    <template #calendar-header="{ index, day }">
      <div :class="['header-color', headerColor(index)]">
        {{ day }}
      </div>
    </template>
    <template #dp-input> </template>
  </VueDatePicker>
</template>

<style scoped></style>

<style>
:root {
  --calendar--red: red;
  --calendar--blue: blue;
}
.dp__input_wrap {
  .v-text-field input {
    min-height: unset;
  }
  .date-input {
    &.small {
      width: 100px;
    }
    &.medium {
      width: 200px;
    }
    &.large {
      width: 300px;
    }
  }
}

.dp__month_year_wrap {
  padding: 0 10px;
  &:has(> .dp__month_year_select) {
    gap: 15px;
    justify-content: center;
  }
}

button.dp__month_year_select {
  pointer-events: none;
  width: auto;
}

.dp__calendar_header_item {
  & > .header-color {
    &.sunday {
      color: var(--calendar--red);
    }
    &.saturday {
      color: var(--calendar--blue);
    }
  }
}

.dp__cell_inner {
  &.sunday {
    &:not(.dp__active_date):not(.dp__cell_offset) {
      color: var(--calendar--red);
    }
  }
  &.saturday {
    &:not(.dp__active_date):not(.dp__cell_offset) {
      color: var(--calendar--blue);
    }
  }
}
</style>
