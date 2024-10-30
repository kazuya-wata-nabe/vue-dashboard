import { ws } from "msw"

const chat = ws.link("wss://chat.example.com")

export const wsHandlers = [
  chat.addEventListener("connection", ({ client }) => {
    console.debug("hello, from server")

    client.addEventListener("message", (event) => {
      if (event.data === "ping") {
        client.send("pong")
      }
    })

    client.addEventListener("close", () => {
      client.close()
      console.debug("server is closed")
    })
  }),
]
