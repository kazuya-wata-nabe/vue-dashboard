import type { AuthRepository, FetchParams } from "@/views/login/model/repository";

const users = [
  { id: "test1", password: "test1" }
];

export class AuthRepositoryOnMemory implements AuthRepository {
  async login(params: FetchParams) {
    await new Promise(resolve => setTimeout(() => resolve(""), 1 * 1000))

    const user = users.find(user => user.id === params.id && user.password === params.password)
    return !!user;
  }
}