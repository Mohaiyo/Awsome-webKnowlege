<template>
	<div>
		<ChildrenA1 />
	</div>
</template>

<script>
// import ChildrenA from './ChildrenA'
import ChildrenA1 from './ChildrenA_a'
export default {
	name: 'Index',
	components: {
		// ChildrenA
		ChildrenA1
	},
	provide() {
		return {
			setChildrenRef: (name, ref) => {
				return (this[name] = ref)
			},
			getChildrenRef: (name) => {
				return this[name]
			},
			getRef: () => {
				return this
			}
		}
	},
	data() {
		return {
			color: 'blue'
		}
	},
	methods: {
		geteH3Ref() {
			console.log(this.childrenE)
		}
	}
}
</script>
