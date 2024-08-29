<script lang="ts" setup>
import { computed, ref } from "vue"
import { Html5Qrcode, Html5QrcodeSupportedFormats as Formats } from "html5-qrcode"
import FlexCol from "@/shared/parts/box/flex-col.vue"
import FlexRow from "@/shared/parts/box/flex-row.vue"
import { attachCamera } from "./functions"

defineOptions({ name: "BarCode" })

const scanner = ref<Html5Qrcode>()
const barcodeValues = ref<string[]>([])

const currentState = ref({
  camera: false,
  delay: 500,
  formats: new Array<Formats>(),
  exclude: false,
})
const label = computed(() => (currentState.value.camera ? "終了" : "開始"))
const fps = computed(() => 1000 / currentState.value.delay)

const onClickReset = () => {
  barcodeValues.value = []
}

const onClickCameraToggle = async () => {
  currentState.value.camera ? cameraOff() : cameraOn()
}

const cameraOn = async () => {
  const { data, error } = await attachCamera("reader", currentState.value.formats)
  if (error) {
    alert(error)
  } else {
    scanner.value = data.scanner
    scanner.value.start(
      data.config,
      { fps: fps.value },
      (decodedText: string) => {
        barcodeValues.value.unshift(decodedText)
      },
      (error) => {
        cameraOff()
        alert(error)
      },
    )
    currentState.value.camera = true
  }
}

const cameraOff = async () => {
  scanner.value?.stop()
  currentState.value.camera = false
}

const SPEEDS = Array.from({ length: 10 }, (_, i) => 500 * (i + 1))
const FORMATS = [Formats.CODE_128, Formats.CODE_39, Formats.QR_CODE] as const
</script>

<template>
  <FlexCol gap="8">
    <FlexRow>Barcode API サンプル</FlexRow>

    <FlexCol>
      <FlexRow>特定フォーマットだけ読み込む</FlexRow>
      <FlexRow wrap gap="8">
        <FlexRow v-for="format in FORMATS" :key="format" style="width: fit-content">
          <label :for="`${format}`">
            <input
              type="checkbox"
              :id="`${format}`"
              :value="format"
              v-model="currentState.formats"
            />
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

    <div id="reader" width="600px"></div>
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
