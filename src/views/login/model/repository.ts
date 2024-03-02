export type FetchParams = {
  id: string
  password: string
}

export interface LoginRepository {
  login(params: FetchParams): Promise<boolean>
}
