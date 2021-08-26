<template>
  <div>
    <div :class="$style.red">{{ hi }}</div>
    <div :class="$style.bold">{{ message }}</div>
    <div>
      <input v-model="message" />
    </div>
    <custom-table />
  </div>
</template>

<script>
import customTable from '../components/table.vue'
export default {
  name: 'app',
  components: {
    customTable
  },
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