<template>
  <div>
    <div style="font-size: 42px">D节点</div>
    <children-g />
    <children-h />
    <children-I />
  </div>
</template>

<script>
import ChildrenG from './ChildrenG'
import ChildrenH from './ChildrenH'
import ChildrenI from './ChildrenI'
export default {
  name: 'ChildrenD',
  components: {
    ChildrenG,
    ChildrenH,
    ChildrenI
  },
  data() {
    return {
      
    }
  },
  inject: {

  },
  methods: {

  }
}
</script>

