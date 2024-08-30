export type Task = {
  title: string
  assigner: string
  from: string
  to: string
  status: string
}

export const Task = (): Task => ({
  title: "new task",
  assigner: "fuga",
  from: "00:00",
  to: "01:00",
  status: "",
})
