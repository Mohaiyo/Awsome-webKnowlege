<template>
	<div>
		{{ info }}
		<input type="text" :value="info.name" @input="changeMessage" />
	</div>
</template>

<script>
import proxy from './proxy'
export default {
	name: 'Children',
	props: {
		info: Object
	},
	data() {
		return {}
	},
	created() {
		this.temp = { name: ''}
		Object.keys(this.temp).forEach(key => {
			proxy(this.info, this.temp, key)
		})
	},
	methods: {
		changeMessage(e) {
			// window.isUpdatefromChildren = true
			// this.info.name = e.target.value
			// this.$forceUpdate()
			this.$emit('change', e.target.value)
		}
	}
}
</script>
