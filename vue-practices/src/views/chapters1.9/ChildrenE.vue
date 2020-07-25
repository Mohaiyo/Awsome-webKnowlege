<template>
	<div>
		<h3 :style="{ color: theme.color }">E节点</h3>
		<button @click="handleClick">改变color为green</button>
	</div>
</template>

<script>
export default {
	name: 'ChildrenE',
	inject: {
		theme: {
			default: () => {}
		}
	},
	data() {
		return {}
	},
	methods: {
		handleClick() {
			if (this.theme.changeColor) {
				this.theme.changeColor('green')
			}
		}
	}
}
</script>
