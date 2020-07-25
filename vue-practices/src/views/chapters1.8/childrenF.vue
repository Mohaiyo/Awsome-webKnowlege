<template>
  <div>
    <div style="font-size: 22px">F节点</div>
    <button @click="getARef">获取A Ref</button>
    <button @click="getHRef">获取H Ref</button>
  </div>
</template>

<script>
export default {
  name: 'ChildrenF',
  inject: {
    getParentRef: {
      from: 'getRef',
      default: () => {}
    },
    getParentChildrenRef: {
      from: 'getChildrenRef',
      default: () => {}
    }
  },
  data() {
    return {
      
    }
  },
  methods: {
    getARef() {
      console.log(this.getParentRef())
    },
    getHRef() {
      console.log(this.getParentChildrenRef("childrenH"))
    }
  }
}
</script>

