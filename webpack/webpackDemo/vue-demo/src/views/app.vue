<template>
  <div>
    <div :class="$style.red">{{ hi }}</div>
    <div :class="$style.bold">{{ message }}</div>
    <div>
      <input v-model="message" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      hi: 'hi wayne,',
      message: 'hello vue webpack demo'
    }
  },
  created() {
    console.log(this.$style)
  },
}
</script>

<style module>
.red {
  color: red;
}
.bold {
  font-weight: bold;
}
</style>