<template>
  <div>
    <ul>
      <li>name: {{ name }}</li>
      <li>type: {{ type }}</li>
      <li>list: {{ list }}</li>
      <li>isVisible: {{ isVisible }}</li>
      <li>onChange: <a-button :type="type" @click="handleClick">change Type</a-button></li>
    </ul>  
  </div>
</template>

<script>
export default {
  name: 'PropsDemos',
  // inheritAttrs: false,
  props: {
    name: String,
    type: {
      validator: (val) => {
        return ['primary', 'dashed', 'warning', 'danger'].includes(val)
      }
    },
    list: {
      type: Array,
      default: () => []
    },
    isVisible: {
      type: Boolean,
      default: false
    },
    changeFn: {
      type: Function,
      default: () => {}
    }
  },
  methods: {
    handleClick(){
      this.changeFn(this.type === 'primary' ? 'dashed': 'danger')
    }
  }
}
</script>

