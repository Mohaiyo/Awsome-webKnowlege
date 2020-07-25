<template>
  <div>
    <spike :startTime="startTime" :endTime="endTime" />
  </div>
</template>

<script>
import Spike from './Spike'
export default {
  name: 'SpikeIndex',
  components: {
    Spike,
  },
  data() {
    return {
      startTime: new Date('2020-06-26 17:51:00'),
      endTime: new Date('2020-06-26 17:53:40')
    }
  }
}
</script>