<template>
  <img :class="[this.name, 'entity']"
       :src="image"
       @click.stop
  >
</template>

<script>
export default {
  name: 'Entity',
  props: {
    name: {
      required: true
    }
  },
  computed: {
    image: function () {
      return require(`../assets/${this.name}.png`)
    }
  }
}
</script>

<style scoped lang="sass">
  .entity
    width: 100%
    height: 100%
    object-fit: contain
    img
      z-index: 1
</style>