<script lang="ts" setup>
import { computed, ref } from "vue"
import FlexCol from "@/shared/parts/box/flex-col.vue"
import FlexRow from "@/shared/parts/box/flex-row.vue"
import { attachCamera, readCode } from "./functions"

defineOptions({ name: "BarCode" })

const video = ref<HTMLVideoElement>()
const barcodeValues = ref<string[]>([])

const currentState = ref({
  camera: false,
  delay: 500,
  formats: new Array<BarcodeFormat>(),
  exclude: false,
})
const label = computed(() => (currentState.value.camera ? "終了" : "開始"))

const onClickReset = () => {
  barcodeValues.value = []
}

const onClickCameraToggle = async () => {
  currentState.value.camera ? cameraOff() : cameraOn()
}

const loadedmetadata = async () => {
  if (!video.value) return

  await video.value?.play()

  while (currentState.value.camera) {
    await new Promise((resolve) => setTimeout(resolve, currentState.value.delay))

    const result = await readCode(video.value, currentState.value.formats)
    for (const barcode of result) {
      barcodeValues.value.unshift(barcode.rawValue)
    }
  }
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

const SPEEDS = Array.from({ length: 10 }, (_, i) => 500 * (i + 1))
const FORMATS = ["code_128", "code_39", "qr_code"] as const
</script>

<template>
  <FlexCol gap="8">
    <FlexRow>Barcode API サンプル</FlexRow>

    <FlexCol>
      <FlexRow>特定フォーマットだけ読み込む</FlexRow>
      <FlexRow wrap gap="8">
        <FlexRow v-for="format in FORMATS" :key="format" style="width: fit-content">
          <label :for="format">
            <input type="checkbox" :id="format" :value="format" v-model="currentState.formats" />
            {{ format }}
          </label>
        </FlexRow>
      </FlexRow>
    </FlexCol>

    <FlexRow>
      <label for="delay">
        読み込み速度(ms)
        <select v-model="currentState.delay">
          <option v-for="speed in SPEEDS" :key="speed">
            {{ speed }}
          </option>
        </select>
      </label>
    </FlexRow>

    <FlexRow gap="8"> 読み取り結果 <button @click="onClickReset">リセット</button> </FlexRow>

    <FlexCol class="barcode">
      <li v-for="(value, index) in barcodeValues" :key="`${value}-${index}`">{{ value }}</li>
    </FlexCol>

    <button @click="onClickCameraToggle">読み込み{{ label }}</button>

    <div class="reader">
      <video ref="video" autoplay playsinline><track kind="captions" /></video>
    </div>
  </FlexCol>
</template>

<style scoped>
.barcode {
  height: 100px;
  border: solid 1px;
  overflow-y: scroll;

  & li::before {
    content: "・";
  }
}
</style>
