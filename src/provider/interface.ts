export interface AuthStorage {
  load(): Promise<boolean>
  save(): Promise<void>
}
