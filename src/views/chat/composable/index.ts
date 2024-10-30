import { computed, ref } from "vue"

export const useInteract = () => {
  const client = ref<WebSocket>()

  const connection = computed(() => ({
    open: client.value?.readyState === WebSocket.OPEN,
    connecting: client.value?.readyState === WebSocket.CONNECTING,
    closed: client.value === undefined || client.value?.readyState === WebSocket.CLOSED,
  }))

  const onClickChatOpen = () => {
    const ws = new WebSocket("wss://chat.example.com")
    ws.addEventListener("open", () => ws.send("ping"))
    ws.addEventListener("message", (event) => {
      console.debug("server says:", event.data)
    })
    client.value = ws
  }

  const onClickChatClose = () => {
    client.value?.close()
  }

  return {
    connection,
    onClickChatOpen,
    onClickChatClose,
  }
}
