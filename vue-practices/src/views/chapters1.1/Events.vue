<template>
  <div>
    name: {{ name || '--'}}
    <br />
    <input :value="name" @change="inputHandle" />
    <br />
    <br />
    <div @click="divClickHandle">
      <a-button @click="handleClick">重置成功</a-button>
      <a-button @click.stop="handleClick">重置失败</a-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EventsComp',
  props: {
    name: String
  },
  methods: {
    inputHandle(e) {
      this.$emit('change', e.target.value)
    },
    divClickHandle() {
      this.$emit('change', '')
    },
    handleClick(e) {
      console.log(e)
      // 都会失败
      // e.stopPropagation()
    }
  }
}
</script>
