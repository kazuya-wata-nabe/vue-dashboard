export type Task = {
  title: string
  assigner: string
  from: string
  to: string
  status: string
}

export const Task = (): Task => ({
  title: "bar",
  assigner: "fuga",
  from: "",
  to: "",
  status: "",
})
