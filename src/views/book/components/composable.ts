import { ref } from "vue"

export const useComposable = () => {
  const state = ref(true)

  const toggle = () => (state.value = !state.value)

  return {
    state,
    toggle,
  }
}
