<template>
  <div>
    <div style="font-size: 42px">C节点</div>
    <children-e />
    <children-f />
  </div>
</template>

<script>
import ChildrenE from './ChildrenE'
import ChildrenF from './ChildrenF'
export default {
  name: 'ChildrenC',
  components: {
    ChildrenE,
    ChildrenF
  },
  // provide(){
  //   return {
  //     theme: {
  //       color: 'blue'
  //     }
  //   }
  // },
  data() {
    return {
      
    }
  },
  methods: {

  }
}
</script>

