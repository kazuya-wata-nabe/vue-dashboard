import { computed, ref } from "vue"

export type SortCondition = "asc" | "desc" | "none"

export const SORT_ARROW = {
  asc: "up",
  desc: "down",
  none: "",
} as const
export type Comparators<T extends object> = Record<keyof T, Orders<string>>

type Orders<T extends string> = Record<T, number>

const toggleSortCondition = (arrow: SortCondition | undefined) => {
  if (arrow === "asc") return "desc"
  if (arrow === "desc") return "asc"
  return "asc"
}

const sortAsc = <T>(a: T, b: T) => (a < b ? -1 : 1)
const sortDesc = <T>(a: T, b: T) => (a < b ? 1 : -1)
const makeCompValue = (value: unknown, order: Record<string, number>) => {
  if (typeof value === "string" && order[value] !== undefined) {
    return order[value]
  }
  return value
}

const comparator =
  <T extends object>(key: keyof T, currentCondition: SortCondition, comparators: Comparators<T>) =>
  (a: T, b: T) => {
    const order = comparators[key]
    const valueA = makeCompValue(a[key], order)
    const valueB = makeCompValue(b[key], order)

    if (currentCondition === "desc") {
      return sortDesc(valueA, valueB)
    }
    return sortAsc(valueA, valueB)
  }

export const useSort = <T extends object = never>(comparators: Comparators<T>) => {
  const data = ref<T[]>()
  const current = ref<[keyof T, SortCondition]>()

  const updateCurrentSortKey = (key: keyof T) => {
    const [currentKey, arrow] = current.value ?? []
    if (currentKey !== key) {
      current.value = [key, "asc"]
    } else {
      current.value = [key, toggleSortCondition(arrow)]
    }
  }

  const setData = (_data: T[]) => (data.value = _data)

  const sortedData = computed(() => {
    const items: T[] = data.value ?? []
    const [key, condition] = current.value ?? []
    if (!key || !condition) return items

    return [...items].sort(comparator(key, condition, comparators))
  })

  const sortCondition = computed(() => {
    const [key, direction] = current.value ?? ["", "none"]
    const fields = Object.keys(comparators) as (keyof T)[]

    return fields.map((field) => [field, key === field ? direction : "none"] as const)
  })

  return {
    sortedData,
    sortCondition,
    setData,
    updateCurrentSortKey,
  }
}
