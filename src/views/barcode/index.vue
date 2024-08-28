<script lang="ts" setup>
import { ref } from "vue"
import FlexCol from "@/shared/parts/box/flex-col.vue"
import FlexRow from "@/shared/parts/box/flex-row.vue"
import { readCode } from "./functions"

defineOptions({ name: "BarCode" })

const image = ref<HTMLImageElement>()

const onSelect = async (event: Event) => {
  if (!(event.target instanceof HTMLInputElement)) return

  const [file] = event.target.files ?? []

  const img = new Image()
  if (file) {
    img.src = URL.createObjectURL(file)
    img.addEventListener("load", async () => {
      const result = await readCode(img)
      console.debug(result)
    })
  }
}

const onClick = () => {
  if (image.value) {
    readCode(image.value).then((value) => console.debug(value))
  }
}
</script>

<template>
  <FlexCol>
    <FlexRow>サンプル</FlexRow>
    <FlexRow>Barcode API</FlexRow>
    <input type="file" aria-label="select" @change="onSelect" />
    <button @click="onClick">click</button>
  </FlexCol>
</template>
