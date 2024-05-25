import { computed, ref } from "vue"

export const useModal = <T extends string>(keys: T[]) => {
  const current = ref<T>()

  const modalController = {
    open: (value: T) => (current.value = value),
    close: () => (current.value = undefined),
  }

  const isOpen = computed(() => {
    return keys.reduce(
      (acc, cur) => ({
        ...acc,
        [cur]: current.value === cur,
      }),
      {} as Record<T, boolean>,
    )
  })

  return {
    isOpen,
    modalController,
  }
}
