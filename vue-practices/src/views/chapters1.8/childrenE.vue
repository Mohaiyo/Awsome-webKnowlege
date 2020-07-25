<template>
  <div>
    <h3 style="font-size: 22px" v-ant-ref="c => setChildrenRef('childrenE', c)">E节点</h3>
  </div>
</template>

<script>
export default {
  name: 'ChildrenE',
  inject: {
    setChildrenRef: {
      default: () => {}
    }
  },
  data() {
    return {
      
    }
  },
  methods: {

  }
}
</script>

