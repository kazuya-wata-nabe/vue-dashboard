<script setup lang="ts">
import { FlexCol } from "@/shared/parts"
import { useInteract } from "./composable"

defineOptions({ name: "ChatView" })

const { connection, onClickChatOpen, onClickChatClose } = useInteract()
</script>

<template>
  <main>
    <FlexCol gap="32">
      connection: {{ connection }}

      <button :disabled="connection.connecting" @click="onClickChatOpen">chat open</button>
      <button :disabled="false" @click="onClickChatClose">chat close</button>
    </FlexCol>
  </main>
</template>

<style scoped>
main {
  margin: 0 auto;
}

.header {
  height: 100px;
  place-content: center;
}
</style>
