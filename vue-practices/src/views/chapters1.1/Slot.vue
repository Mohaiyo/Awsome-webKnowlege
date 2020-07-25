<template>
	<div>
		<div>
			default:
			<slot></slot>
		</div>
		<div>
			title:
			<slot name="title"></slot>
		</div>
		<div>
			item
			<slot name="item" v-bind="{ value: 'vue' }"></slot>
		</div>
    <div>
      <slot name="user" v-bind="user">{{ user.lastName }}</slot>
    </div>
	</div>
</template>

<script>
export default {
	name: 'SlotCom',
	props: {
		url: String
	},
	mounted() {

	},
	data() {
		return {
      user: {
        lastName: 'wayne',
        firstName: 'liang'
      }
    }
	},
	methods: {}
}
</script>
