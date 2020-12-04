<template>
  <div class="map">
    <div class="row" v-for="(row, rowIdx) in map" :key="'row' + rowIdx">
      <Cell
          v-for="(cell, cellIdx) in row"
          :key="rowIdx + '_' + cellIdx"
          :is-start="startPosition === `${rowIdx}_${cellIdx}`"
          :is-end="endPosition === `${rowIdx}_${cellIdx}`"
          :id="rowIdx + '_' + cellIdx"
          :value="cell"
          :mouse-down="mouseDown"
          @clickCell="(payload) => $emit('clickCell', payload)"
      ></Cell>
    </div>
  </div>
</template>

<script>
import Cell from './Cell'

export default {
  name: 'MapViewer',
  props: {
    map: {
      required: true,
      type: Array
    },
    startPosition: {
      required: true,
      type: String
    },
    endPosition: {
      required: true,
      type: String
    },
    path: {
      required: true,
      type: Array
    },
    cellsProcessed: {
      required: true,
      type: Array
    },
  },
  components: {
    Cell
  },
  data () {
    return {
      mouseDown: false
    }
  },
  created() {
    window.addEventListener("mousedown", () => {
      if (['entity', 'cell'].includes(event.target.classList[0])) {
        event.preventDefault();
        this.mouseDown = true
      }
    },  true)
    window.addEventListener("mouseup", () => { this.mouseDown = false },  true)
  }
}
</script>

<style scoped lang="sass">
  .map
    overflow: auto
    display: flex
    justify-content: center
    flex-direction: column
    .row
      display: flex
</style>