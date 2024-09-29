import { isAfter, subMinutes, today } from "@/shared/lib/date"

export type JWT = {
  expire: string
  accessToken: string
  refreshToken: string
}

export const isExpired = (credential: JWT) => {
  const expire = subMinutes(credential.expire, 5)
  return isAfter(expire, today())
}

export type Refresh = (jwt: JWT) => Promise<JWT | undefined>

export const refresh = async (jwt: JWT): Promise<JWT | undefined> => {
  // TODO: implements
  const res = await fetch("/refresh", { headers: { Authenticated: jwt.accessToken } })
  if (res.status === 200) {
    return await res.json()
  }
}
