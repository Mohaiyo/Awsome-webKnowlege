<template>
  <div>
    {{ log('render')}}
    {{ now }}
    <button @click="start = !start">{{ start ? '停止' : '开始' }}</button>
  </div>
</template>


<script>
import { format } from 'date-fns'
export default {
  name: 'Clock',
  data() {
    console.log('data')
    this.format = format
    this.log = window.console.log
    return {
      now: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
      start: false
    }
  },
  watch: {
    start() {
      this.startClock()
    }
  },
  beforeCreate() {
    console.log('beforeCreate')
  },
  created() {
    console.log('created')
  },
  beforeMount() {
    this.log('beforeMount')
  },
  mounted() {
    this.log('mounted')
  },
  beforeUpdate() {
    this.log('beforeUpdate')
  },
  updated() {
    this.log('updated')
  },
  beforeDestroy() {
    this.log('beforeDestroy')
  },
  destroyed() {
    this.log('destoryed')
  },
  methods: {
    startClock() {
      clearInterval(this.interval)
      if (this.start) {
        this.interval = setInterval(() => {
          this.now = format(new Date(), 'yyyy-MM-dd HH:mm:ss')
        }, 3000);
      }
    }
  },
}
</script>