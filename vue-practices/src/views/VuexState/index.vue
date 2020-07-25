<template>
  <div>
    <a-button @click="handleClick(-2)">减2</a-button>
    count: {{ count }}
    <a-button @click="handleClick(2)">加2</a-button>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'VuexState',
  data() {
    return {
      
    }
  },
  computed: {
    ...mapState(['count'])
  },
  methods: {
    ...mapMutations(['increment']),
    handleClick(payload) {
      this.increment(payload - 0)
    }
  },
}
</script>