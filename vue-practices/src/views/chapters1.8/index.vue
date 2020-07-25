<template>
  <div>
    <div style="font-size: 48px">A节点</div>
    <button @click="geteH3Ref">获取E h3 Ref</button>
    <children-b />
    <children-c />
    <children-d />
  </div>
</template>

<script>
import ChildrenB from './childrenB'
import ChildrenC from './childrenC'
import ChildrenD from './childrenD'
export default {
  name: 'Index',
  components: {
    ChildrenB,
    ChildrenC,
    ChildrenD
  },
  provide() {
    return {
      setChildrenRef: (name, ref) => {
        return this[name] = ref
      },
      getChildrenRef: (name) => {
        return this[name]
      },
      getRef: () => {
        return this
      }
    }
  },
  data() {
    return {
      color: "blue"
    }
  },
  methods: {
    geteH3Ref() {
      console.log(this.childrenE)
    }
  }
}
</script>

