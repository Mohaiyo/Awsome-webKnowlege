<template>
	<div>
		<a-button :disabled="disabled" @click="handleClick">{{
			done ? '已参加活动' : '立即购买'
		}}</a-button>
		<p>{{ tip }}</p>
	</div>
</template>

<script>
import { isDate, differenceInMilliseconds } from 'date-fns'
export default {
  name: 'Spike',
  props: {
    startTime: {
      required: true,
      validator(value) {
        return isDate(value)
      }
    },
     endTime: {
      required: true,
      validator(value) {
        return isDate(value)
      }
    }
  },
  data() {
    return {
      start: false,
      end: false,
      done: false,
      tip: '',
      timeGap: 0 // 服务端时间与客户端时间差
    }
  },
  computed: {
    disabled() {
      return !(this.start && !this.end && !this.done)
    }
  },
  async created() {
    const serverTime = await this.getServerTime()
    this.timeGap = Date.now() - serverTime
    console.log(this.timeGap)
    this.updateState()
    this.timeInterval = setInterval(() => {
      this.updateState()
    }, 1000);
  },
  beforeDestroy() {
    clearInterval(this.timeInterval)
  },
  updated() {
    if(this.end || this.done) {
      clearInterval(this.timeInterval)
    }
  },
  methods: {
    getServerTime() {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(new Date(Date.now() + 60 * 1000).getTime())
        }, 0);
      })
    },
    updateState() {
      const now = new Date(Date.now() - this.timeGap)
      const diffStart = differenceInMilliseconds(this.startTime, now)
      const diffEnd = differenceInMilliseconds(this.endTime, now)
      console.log('diffStart', diffStart)
      console.log('diffEnd', diffEnd)
      if (diffStart <= 0) {
        this.start = true
        this.tip = '秒杀已经开始'
      } else {
        this.tip = `距离秒杀还剩${Math.ceil(diffStart / 1000)}秒`
      }
      if (diffEnd <= 0) {
        this.end = true
        this.tip = '秒杀已经结束'
      }
    },
    handleClick() {
      alert('提交成功')
      this.done = true
    }
  }
}
</script>
