export interface AuthStorage {
  load(): Promise<boolean>
  save(): Promise<void>
  remove(): Promise<void>
}
