<template>
  <div>
    name: {{ name }}
    <br />
    <a-button @click="handleChange">change name</a-button>
    <br />
    <!-- {{ slotDefault }} -->
    <VNodes :vnodes="slotDefault" />
    <br />
    <VNodes :vnodes="slotTitle" />
    <br />
    <VNodes :vnodes="slotScopeItem({ value: 'vue' })" />
    <br />
  </div>
</template>

<script>
export default {
  name: 'BigPropsCom',
  components: {
    VNodes: {
      functional: true,
      render: (h, ctx) => ctx.props.vnodes
    }
  },
	props: {
    name: String,
    onChange: {
      type: Function,
      default: () => {}
    },
    slotDefault: Array,
    slotTitle: Array,
    slotScopeItem: {
      type: Function,
      default: () => {}
    }
	},
	methods: {
    handleChange() {
      this.onChange('Hello Vue')
    }
  }
}
</script>
