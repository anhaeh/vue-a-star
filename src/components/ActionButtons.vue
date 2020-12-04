<template>
  <div class="actions">
    <div class="field">
      <label class="label" for="action">Action click</label>
      <div class="select" id="action">
        <select v-model="action"
                @change="notifyClickAction"
        >
          <option v-for="(action, key) in clickActions"
                  :key="key"
                  :value="action.value"
          >
            {{ action.text }}
          </option>
        </select>
      </div>
    </div>
    <div class="field is-grouped">
      <div class="control">
        <button class="button is-link"
                @click="$emit('start')"
                :disabled="processing"
        >
          Start
        </button>
      </div>
      <div class="control">
        <button class="button is-link is-light"
                @click="$emit('cleanWalls')"
                :disabled="processing"
        >
          Clean walls
        </button>
      </div>
      <div class="control">
        <button class="button is-link is-light"
                @click="$emit('loadMap')"
                :disabled="processing"
        >
          Reload map
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ActionButtons',
  props: {
    processing: {
      required: true
    }
  },
  data () {
    return {
      action: 'addWall',
      clickActions: [
        {
          text: 'Edit walls',
          value: 'addWall',
          callback: 'addWall'
        },
        {
          text: 'Move start',
          value: 'start',
          callback: 'moveStart'
        },
        {
          text: 'Move end',
          value: 'end',
          callback: 'moveEnd'
        }
      ]
    }
  },
  methods: {
    notifyClickAction: function () {
      this.$emit('updateClickCallback', this.clickActions.find(x => x.value === this.action).callback)
    }
  },
  mounted() {
    this.notifyClickAction()
  }
}
</script>

<style scoped>

</style>