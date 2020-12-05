<template>
  <div class="actions is-justify-content-center">
    <div class="field">
      <label class="checkbox">
        <input type="checkbox" checked @input="$emit('changeAnimation')">
        Show animation
      </label>
    </div>
    <div class="notification is-primary is-light">
      You can move start point, end point, and add/remove walls with left click. <br>
      And also holding down the click you can draw walls.
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
  }
}
</script>

<style scoped lang="sass">
  .actions
    display: flex
    flex-direction: column
    align-items: center
</style>