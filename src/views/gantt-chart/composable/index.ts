import { computed, ref } from "vue"
import { Task } from "@/views/gantt-chart/types"

export const useGanttChart = () => {
  const chart = ref([
    {
      uid: crypto.randomUUID(),
      title: "foo",
      assigner: "hoge",
      from: "",
      to: "",
      status: "",
    },
    {
      uid: crypto.randomUUID(),
      title: "bar",
      assigner: "fuga",
      from: "",
      to: "",
      status: "",
    },
  ])

  const hours = computed(() =>
    Array.from({ length: 23 }, (_, i) => (i + 1).toString().padStart(2, "0")),
  )

  const addTask = () => {
    chart.value.push({
      uid: crypto.randomUUID(),
      ...Task(),
    })
  }

  return {
    hours,
    datas: computed(() => chart.value),
    addTask,
  }
}
