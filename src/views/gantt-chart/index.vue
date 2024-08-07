<script lang="ts" setup>
// TODO: refactor
import { FlexRow, FlexCol } from "@/shared/parts"
import TaskItem from "./components/task-item.vue"
import { useGanttChart } from "./composable"

defineOptions({ name: "GanttChart" })

const { datas, hours, addTask } = useGanttChart()
</script>

<template>
  <div class="container">
    <!-- -->
    <div class="sub-container" id="left">
      <div class="title">task</div>
      <div class="button-container">
        <button @click="addTask">add task</button>
      </div>
      <FlexCol>
        <TaskItem v-for="data in datas" :key="data.uid" v-bind="data" />
      </FlexCol>
    </div>
    <!-- -->
    <div class="sub-container scroll" id="right">
      <div class="title">hours</div>
      <FlexRow class="hour-container">
        <FlexRow class="col" v-for="hour in hours" :key="hour">
          {{ hour }}
        </FlexRow>
      </FlexRow>
      <FlexCol>
        <div class="task-item">a</div>
        <div class="task-item">a</div>
      </FlexCol>
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

.task-item {
  height: 30px;
}
</style>
