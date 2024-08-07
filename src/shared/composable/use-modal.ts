import { computed, ref } from "vue"

/**
 * モーダルの開閉制御するための関数
 * @example
 * // エラーモーダルの開閉
 * const { modal } = useModal(["error"])
 * modal.open("error")
 * @example
 * // step1モーダル -> step2モーダル
 * ```
 * const { isOpen, modal } = useModal(["step1", "step2"])
 * const onClickStep1 = modal.open("step1")
 * const onClickStep2 = modal.open("step2")
 * <div v-if="isOpen.step1" ＠close="modal.close"></div>
 * <div v-if="isOpen.step2" ＠close="modal.close"></div>
 * ```
 */
export const useModal = <T extends string>(keys: T[]) => {
  const current = ref<T>()

  const modal = {
    open: (value: T) => (current.value = value),
    close: () => (current.value = undefined),
  }

  const isOpen = computed(() => {
    const entries = keys.map((cur) => [cur, current.value === cur])
    return Object.fromEntries(entries) as Record<T, boolean>
  })

  return {
    isOpen,
    modal,
  }
}
