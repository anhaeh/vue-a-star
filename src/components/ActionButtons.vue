<template>
  <div class="actions is-justify-content-center">
    <div class="field">
      <label class="checkbox">
        <input type="checkbox" v-model="showAnimation">
        Show animation
      </label>
    </div>
    <div class="notification is-primary is-light">
      You can drag and drop start point and end point.<br>
      You can add/remove walls with left click or also holding down the click.
    </div>
    <div class="field is-grouped">
      <div class="control">
        <button class="button is-link"
                @click="$emit('start', showAnimation)"
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
      showAnimation: true
    }
  }
}
</script>

<style scoped lang="sass">
  .actions
    display: flex
    flex-direction: column
    align-items: center
</style>