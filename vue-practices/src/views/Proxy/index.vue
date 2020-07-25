<template>
	<div>
		<children :info="info" @change="handleProxyChange" />
	</div>
</template>

<script>
import Children from './Children'
export default {
	name: 'Proxy',
	components: {
		Children
	},
	data() {
		return {
      info: {}
    }
	},
	methods: {
		handleProxyChange(val) {
			window.isUpdatefromChildren = false
			this.info.name = val
			this.info = {
				name: val
			}
		}
	}
}
</script>
