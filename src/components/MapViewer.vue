<template>
  <div class="map">
    <div class="row" v-for="(row, rowIdx) in map" :key="'row' + rowIdx">
      <Cell
          v-for="(cell, cellIdx) in row"
          :key="rowIdx + '_' + cellIdx"
          :is-start="startPosition.x === cellIdx && startPosition.y === rowIdx"
          :is-end="endPosition.x === cellIdx && endPosition.y === rowIdx"
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
      type: Object
    },
    endPosition: {
      required: true,
      type: Object
    },
    path: {
      required: true,
      type: Array
    },
    cellsProcessed: {
      required: true,
      type: Array
    },
    showCellCost: {
      required: false,
      type: Boolean
    }
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
    const mapping = {
      player: 'moveStart',
      chest: 'moveEnd',
      cell__action: 'addWall'
    }
    window.addEventListener("mousedown", () => {
      let classEvent = event.target.classList[0]
      if (['player', 'chest', 'cell__action'].includes(classEvent)) {
        event.preventDefault();
        this.$emit('updateClickCallback', mapping[classEvent])
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