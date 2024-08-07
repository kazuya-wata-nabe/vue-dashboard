import { computed, ref } from "vue"

const OUT_OF_RANGE = -1

type Options = {
  name: string
  value: string
}

const decrement = (current: number, length: number) => (current <= 0 ? length - 1 : current - 1)
const increment = (current: number, length: number) => (current >= length - 1 ? 0 : current + 1)

export const useInteract = <T extends Options>(getOptions: () => T[]) => {
  const isOpen = ref(false)
  const listBoxFocus = ref(false)

  const currentIndex = ref(OUT_OF_RANGE)
  const state = computed(() => ({
    isOpen: isOpen.value,
    currentIndex: currentIndex.value,
  }))

  const open = () => (isOpen.value = !isOpen.value)
  const close = () => (isOpen.value = false)

  const preAction = () => (isOpen.value = true)
  const updateIndex = (index?: number) => (currentIndex.value = index ?? OUT_OF_RANGE)
  const onComboBoxBlur = () => !listBoxFocus.value && (isOpen.value = false)
  const onListBoxFocus = () => (listBoxFocus.value = true)
  const onListBoxBlur = () => (listBoxFocus.value = false)

  const onKeyDownUp = () => {
    preAction()
    currentIndex.value = decrement(currentIndex.value, getOptions().length)
  }

  const onKeyDownDown = () => {
    preAction()
    currentIndex.value = increment(currentIndex.value, getOptions().length)
  }

  const reset = () => {
    currentIndex.value = OUT_OF_RANGE
    isOpen.value = false
  }

  const onKeyDownEnter = (callback: (value: T["value"] | undefined) => void) => {
    preAction()
    callback(getOptions()[currentIndex.value]?.value)
    reset()
  }

  return {
    state,
    open,
    close,
    reset,
    updateIndex,
    onComboBoxBlur,
    onListBoxFocus,
    onListBoxBlur,
    onKeyDownUp,
    onKeyDownDown,
    onKeyDownEnter,
  }
}
