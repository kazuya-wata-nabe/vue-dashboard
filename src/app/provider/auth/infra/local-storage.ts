import type { AuthStorage } from "@/features/auth"

const KEY_AUTH = "auth"

export class LocalStorage implements AuthStorage {
  async load(): Promise<boolean> {
    return !!localStorage.getItem(KEY_AUTH)
  }
  async save() {
    localStorage.setItem(KEY_AUTH, "ok")
  }
  async remove() {
    localStorage.removeItem(KEY_AUTH)
  }
}
