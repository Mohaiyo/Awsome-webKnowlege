<template>
  <div id="app">
    {{count}}
    <button @click="$store.commit('increment', 2)">count+2</button>
  </div>
</template>

<script>
export default {
  name: 'app',
  computed: {
    count() {
      return this.$store.state.count
    }
  }
}
</script>

<style>
</style>