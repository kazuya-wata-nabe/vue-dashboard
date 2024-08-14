import { computed, onMounted, ref } from "vue"
import { Task } from "@/views/gantt-chart/types"

const hours = Array.from({ length: 23 }, (_, i) => (i + 1).toString().padStart(2, "0"))

type WithUid = Task & {
  uid: ReturnType<typeof crypto.randomUUID>
  width: number
}

const parseInt = (value: string) => Number.parseInt(value.replace(":", ""), 10)

const calcWidth = (data: Task) => {
  const from = parseInt(data.from)
  const to = parseInt(data.to)
  return to - from
}

const convert = (data: Task) => {
  return { ...data, uid: crypto.randomUUID(), width: calcWidth(data) }
}

const dummy = [
  {
    title: "foo",
    assigner: "hoge",
    from: "00:00",
    to: "01:00",
    status: "",
  },
  {
    title: "bar",
    assigner: "fuga",
    from: "03:00",
    to: "05:00",
    status: "",
  },
] as const

export const useGanttChart = () => {
  const chart = ref<WithUid[]>([])

  const addTask = () => {
    chart.value.push(convert(Task()))
  }

  const datas = computed(() => chart.value)

  onMounted(() => {
    chart.value = dummy.map((d) => convert(d))
  })

  return {
    hours,
    datas,
    addTask,
  }
}
