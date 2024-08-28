<script lang="ts" setup>
import { computed, ref } from "vue"
import FlexCol from "@/shared/parts/box/flex-col.vue"
import FlexRow from "@/shared/parts/box/flex-row.vue"
import { attachCamera, readCode } from "./functions"

defineOptions({ name: "BarCode" })

const video = ref<HTMLVideoElement>()
const barcodeValues = ref<string[]>([])
const currentState = ref({ camera: false })
const label = computed(() => (currentState.value.camera ? "OFF" : "ON"))

const onClickReset = () => {
  barcodeValues.value = []
}

const onClickCameraToggle = async () => {
  currentState.value.camera ? cameraOff() : cameraOn()
}

const loadedmetadata = async () => {
  if (!video.value) return

  await video.value?.play()
  const result = await readCode(video.value)
  barcodeValues.value = (result ?? []).map((barcode) => barcode.rawValue)
}

const cameraOn = async () => {
  const { stream, error } = await attachCamera()
  if (stream && video.value) {
    video.value.srcObject = stream
    video.value.addEventListener("loadedmetadata", loadedmetadata)
    currentState.value.camera = true
  } else {
    alert(error)
  }
}

const cameraOff = async () => {
  const stream = video.value?.srcObject
  if (!video.value || !(stream instanceof MediaStream)) return

  for (const track of stream.getTracks()) {
    track.stop()
  }
  // eslint-disable-next-line unicorn/no-null
  video.value.srcObject = null
  currentState.value.camera = false
  video.value.removeEventListener("loadedmetadata", loadedmetadata)
}
</script>

<template>
  <FlexCol gap="8">
    <FlexRow>Barcode API サンプル</FlexRow>
    <FlexRow gap="8">読み取り結果 <button @click="onClickReset">リセット</button></FlexRow>
    <FlexCol class="barcode">
      <li v-for="value in barcodeValues" :key="value">{{ value }}</li>
    </FlexCol>

    <button @click="onClickCameraToggle">カメラ{{ label }}</button>

    <div class="reader">
      <video ref="video" autoplay playsinline><track kind="captions" /></video>
    </div>
  </FlexCol>
</template>

<style scoped>
.barcode {
  height: 100px;
  border: solid 1px;
  & li::before {
    content: "・";
  }
}
</style>
