<script lang="ts" setup>
const toGrid = (doc: Element) => {
  const container = document.createElement("div")
  const left = document.createElement("div")
  const right = document.createElement("div")
  container.classList.add("doc-container", "grid")
  left.classList.add("left")
  right.classList.add("right")

  const children = [...doc.childNodes]
  const leftChildren = children.slice(0, 2)
  const rightChildren = children.slice(2)
  for (const child of leftChildren) {
    left.append(child)
  }
  for (const child of rightChildren) {
    right.append(child)
  }
  container.append(left, right)
  doc.append(container)
}

const run = () => {
  const doc = document.querySelector(".vp-doc > div")
  if (!doc) return

  const docContainer = doc?.querySelector(".doc-container")
  if (docContainer) {
    docContainer.classList.toggle("grid")
  } else {
    toGrid(doc)
  }
}
</script>

<template>
  <div class="toggle-wrapper">
    <button @click="run">縦横チェンジ</button>
  </div>
</template>

<style lang="css" scoped>
.toggle-wrapper {
  display: flex;
  justify-content: center;
}
</style>

<style lang="css">
.doc-container {
  &.grid {
    display: grid;
    grid-template-columns: 800px 1fr;
    gap: 8px;
    width: 1240px;

    & > .left {
      max-height: 800px;
      overflow-y: auto;
    }

    & > .right {
      max-height: 800px;
      overflow-y: auto;
    }
  }
}
</style>
