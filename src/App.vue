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
               :show-cell-cost="showCellCost"
               @updateClickCallback="(payload) => clickCallback = payload"
               @clickCell="clickCell"
    ></mapViewer>
    <hr>
    <action-buttons :processing="processing"
                    @start="start"
                    @cleanWalls="cleanWalls"
                    @loadMap="loadMap"
    ></action-buttons>
    <article v-if="error" class="message is-danger">
      <div class="message-header">
        <p>Error</p>
      </div>
      <div class="message-body">
        Unable to find a valid path. Please check other combination.
      </div>
    </article>
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
      startPosition: undefined,
      endPosition: undefined,
      path: [],
      cellsProcessed: [],
      clickCallback: undefined,
      timeElapsed: 0,
      processing: false,
      showCellCost: false,
      error: true
    }
  },
  methods: {
    start: async function (options) {
      this.error = false
      this.showCellCost = options.showCellCost
      this.processing = true
      this.cleanPath()
      let startTime = new Date()

      /** Generate the path **/
      let generator = new PathGenerator(this.startPosition, this.endPosition, this.map)
      try {
        generator.generate()
      }
      catch (e) {
        this.error = true
        this.processing = false
        return
      }

      this.timeElapsed = Math.round(new Date() - startTime)
      if (options.showAnimation) {
        await Promise.all(generator.cells.map(async (x) => {
          await new Promise(r => setTimeout(r, 25))
          this.cellsProcessed.push(x)
        }))
      } else {
        this.cellsProcessed = generator.cells
      }
      this.path = generator.path
      this.processing = false
    },
    clickCell: function (payload) {
      if (!this.processing) {
        this.cleanPath()
        this[this.clickCallback](payload)
      }
    },
    addWall: function (payload) {
      let newVal = this.map[payload.y][payload.x] === 0 ? 1 : 0
      this.$set(this.map[payload.y], payload.x, newVal)
    },
    moveStart: function (payload) {
      this.startPosition = payload
    },
    moveEnd: function (payload) {
      this.endPosition = payload
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

<style lang="sass">
html
  background: #d4d4d4

#app
  display: flex
  margin: 30px
  align-items: center
  justify-content: center
  flex-direction: column
  text-align: center

.message
  position: fixed
  bottom: 1rem
  right: 1rem
</style>
