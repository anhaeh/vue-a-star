<template>
  <div
    :class="['cell', { '--is-wall': isWall } ,{ '--path': isInPath }, { '--processed': processed }]"
    @click="click()"
    @dragover.prevent
    @mouseover="mouseDown ? click() : undefined"
  >
    <entity v-if="isStart || isEnd" :name="isStart ? 'player' : 'chest'"></entity>
  </div>
</template>
<script>
import entity from './Entity'


export default {
  props: ["id", "value", "isStart", "isEnd", "mouseDown"],
  components: {
    entity
  },
  methods: {
    click: function () {
      this.$emit('clickCell', {
        x: this.id.split('_')[1],
        y: this.id.split('_')[0]
      })
    },
    move: function () {
      if (!this.isStart && this.value === 0) {
        this.$emit("move", this.id);
      }
    },
  },
  computed: {
    isInPath: function () {
      return this.$parent.path.find(cell => this.id === `${cell.y}_${cell.x}`)
    },
    processed: function () {
      return this.$parent.cellsProcessed.find(cell => this.id === `${cell.y}_${cell.x}`)
    },
    isWall: function () {
      return this.value === 1
    }
  },
};
</script>

<style scoped lang="sass">
.cell
  height: 32px
  min-width: 32px
  border-color: rgb(50, 50, 50)
  border-style: solid
  border-width: 1px
  cursor: pointer
  background-repeat: no-repeat
  background-image: url("../assets/floor.png")
  background-size: contain
  &.--is-wall
    background-image: url("../assets/wall.png")
  &.--path
    filter: hue-rotate(200deg) !important
  &.--processed
    filter: brightness(0.7)
</style>
