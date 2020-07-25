<template>
  <div>
    <div style="font-size: 42px">C节点</div>
    <children-e />
    <children-f />
  </div>
</template>

<script>
import ChildrenE from './childrenE'
import ChildrenF from './childrenF'
export default {
  name: 'ChildrenC',
  components: {
    ChildrenE,
    ChildrenF
  },
  data() {
    return {
      
    }
  },
  methods: {

  }
}
</script>

