<script lang="ts" setup>
// TODO: refactor
import { FlexRow } from "@/shared/parts"
import SubmitButton from "@/shared/parts/button/submit-button.vue"
import TaskItem from "./components/task-item.vue"

defineOptions({ name: "GanttChart" })

const hours = Array.from({ length: 23 }, (_, i) => (i + 1).toString().padStart(2, "0"))
</script>

<template>
  <div class="container">
    <div class="sub-container">
      <div class="title">task</div>
      <div class="button-container">
        <button>add task</button>
      </div>
      <TaskItem title="bar" assigner=""></TaskItem>
      <TaskItem title="bar" assigner=""></TaskItem>
    </div>
    <div class="sub-container scroll">
      <div class="title">hours</div>
      <FlexRow class="hour-container">
        <FlexRow class="col" v-for="hour in hours" :key="hour">
          {{ hour }}
        </FlexRow>
      </FlexRow>
      <div>a</div>
      <div>a</div>
    </div>
  </div>
</template>

<style scoped>
.container {
  border: solid 1px;
  display: grid;
  grid-template-columns: 200px 1fr;
  width: 100%;
  height: 80vh;
}

.sub-container {
  display: grid;
  grid-template-rows: 30px 50px 1fr;
}

.button-container {
  height: 25px;
  width: 100px;
}

.title {
  font-weight: 800;
  padding: 0 0 0 4px;
}

.scroll {
  overflow-y: hidden;
  overflow-x: scroll;
}

.col {
  justify-content: center;
  min-width: 40px;
}
</style>
