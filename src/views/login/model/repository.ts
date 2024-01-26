export type FetchParams = {
  id: string;
  password: string;
}

export interface AuthRepository {
  login(params: FetchParams): Promise<boolean>
}