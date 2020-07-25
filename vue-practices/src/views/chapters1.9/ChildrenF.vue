<template>
	<div>
		<h3 :style="{ color: theme1.color }">F 结点</h3>
	</div>
</template>

<script>
export default {
	name: 'ChildrenF',
	inject: {
		theme1: {
			from: 'theme',
			default: () => {}
		}
	},
	data() {
		return {}
	},
	methods: {}
}
</script>
