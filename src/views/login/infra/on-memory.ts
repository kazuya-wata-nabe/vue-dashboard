import type { FetchParams, LoginRepository } from "../model"

const users = [{ id: "test1", password: "test1" }]

export class AuthRepositoryOnMemory implements LoginRepository {
  async login(params: FetchParams) {
    await new Promise((resolve) => setTimeout(() => resolve(""), 1 * 1000))

    const user = users.find((user) => user.id === params.id && user.password === params.password)
    if (!user) {
      throw new Error("ng")
    }
    return true
  }
}
