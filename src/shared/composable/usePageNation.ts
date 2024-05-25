import { computed, ref } from "vue"

const RECORD_PER_PAGE = 10

const calcFrom = (total: number, current: number) => {
  return total === 0 ? total : current + 1
}

const calcTo = (total: number, from: number) => {
  const to = from + RECORD_PER_PAGE
  return to > total ? total : to - 1
}

export const usePageNation = <T>(items: () => T[]) => {
  const current = ref(0)
  const total = computed(() => items().length)

  const page = computed(() => {
    const from = calcFrom(total.value, current.value)
    return {
      from,
      to: calcTo(total.value, from),
      total: total.value,
      notHasPrev: current.value === 0,
      notHasNext: from + RECORD_PER_PAGE > total.value,
    }
  })

  const slice = (items: T[]) => {
    return items.slice(current.value, current.value + RECORD_PER_PAGE)
  }

  const pageController = {
    next: () => {
      if (current.value + RECORD_PER_PAGE < total.value) {
        current.value += RECORD_PER_PAGE
      }
    },
    prev: () => {
      if (current.value - RECORD_PER_PAGE >= 0) {
        current.value -= RECORD_PER_PAGE
      }
    },
  }

  return {
    page,
    pageController,
    slice,
  }
}
