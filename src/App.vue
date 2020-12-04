<template>
  <div id="app">
    <div class="field is-grouped is-grouped-multiline">
      <div class="control">
        <div class="tags has-addons">
          <span class="tag is-dark">Time elapsed</span>
          <span class="tag is-info">{{ timeElapsed }} ms</span>
        </div>
      </div>
      <div class="control">
        <div class="tags has-addons">
          <span class="tag is-dark">Operations</span>
          <span class="tag is-success">{{ cellsProcessed.length  }}</span>
        </div>
      </div>
    </div>

    <mapViewer :map="map"
               :startPosition="startPosition"
               :endPosition="endPosition"
               :path="path"
               :cellsProcessed="cellsProcessed"
               @clickCell="clickCell"
    ></mapViewer>
    <hr>
    <action-buttons :processing="processing"
                    @start="start"
                    @updateClickCallback="(payload) => clickCallback = payload"
                    @cleanWalls="cleanWalls"
                    @loadMap="loadMap"
    ></action-buttons>
  </div>
</template>

<script>
import mapExample from "./maps/mapExample.json"
import PathGenerator from "./pathGenerator"
import ActionButtons from './components/ActionButtons'
import MapViewer from './components/MapViewer'


export default {
  name: "App",
  components: {
    ActionButtons,
    MapViewer
  },
  data() {
    return {
      map: null,
      startPosition: "",
      endPosition: "",
      path: [],
      cellsProcessed: [],
      clickCallback: undefined,
      timeElapsed: 0,
      processing: false
    }
  },
  methods: {
    start: async function () {
      this.processing = true
      this.cleanPath()
      let startX = parseInt(this.startPosition.split('_')[1])
      let startY = parseInt(this.startPosition.split('_')[0])
      let exitX = parseInt(this.endPosition.split('_')[1])
      let exitY = parseInt(this.endPosition.split('_')[0])
      let generator = new PathGenerator([startX, startY], [exitX, exitY], this.map)
      let startTime = new Date()
      generator.generate()
      this.timeElapsed = Math.round(new Date() - startTime)
      await Promise.all(generator.cells.map(async (x) => {
        await new Promise(r => setTimeout(r, 25))
        this.cellsProcessed.push(x)
      }))
      this.path = generator.path
      this.processing = false
    },
    clickCell: function (payload) {
      this.cleanPath()
      this.[this.clickCallback](payload)
    },
    addWall: function (payload) {
      let newVal = this.map[payload.y][payload.x] === 0 ? 1 : 0
      this.$set(this.map[payload.y], payload.x, newVal)
    },
    moveStart: function (payload) {
      this.startPosition = `${payload.y}_${payload.x}`
    },
    moveEnd: function (payload) {
      this.endPosition = `${payload.y}_${payload.x}`
    },
    cleanWalls: function () {
      this.cleanPath()
      this.map = this.map.map((x => { return x.map(() => { return 0 }) }))
    },
    cleanPath: function () {
      this.cellsProcessed = []
      this.path = []
    },
    loadMap: function () {
      this.cleanPath()
      let newInstanceMap = JSON.parse(JSON.stringify(mapExample))
      this.map = newInstanceMap.map
      this.startPosition = newInstanceMap.start
      this.endPosition = newInstanceMap.end
    },
  },
  created () {
    this.loadMap()
  },
}
</script>

<style>
html {
  background: #d4d4d4;
}
#app {
  display: flex;
  margin: 30px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
}
</style>
