<template>
  <div>
    <div style="font-size: 42px">D节点</div>
    <children-g />
    <children-h v-ant-ref="c => setChildrenRef('childrenH', c)" />
    <children-I />
  </div>
</template>

<script>
import ChildrenG from './childrenG'
import ChildrenH from './childrenH'
import ChildrenI from './childrenI'
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
    setChildrenRef: {
      default: () => {}
    }
  },
  methods: {

  }
}
</script>

