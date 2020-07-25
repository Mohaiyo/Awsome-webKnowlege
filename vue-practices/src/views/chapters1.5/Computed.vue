<template>
	<div>
		<div>reverseMessage1: {{ reverseMessage1 }}</div>
		<div>reverseMessage2: {{ reverseMessage2() }}</div>
		<div>message: {{ message }}</div>
		<div>now: {{ now }}</div>
		<div>
			<label for="message">
				信息：
				<input id="message" v-model="message" />
			</label>
		</div>
		<button @click="() => $forceUpdate()">forceUpdate</button>
	</div>
</template>

<script>
export default {
	name: 'Computed',
	data() {
		return {
			message: ''
		}
	},
	computed: {
		reverseMessage1() {
      console.log("执行reversedMessage1");
			return this.message
				.split('')
				.reverse()
				.join('')
		},
		now() {
			return Date.now()
		}
	},
	methods: {
		reverseMessage2() {
      console.log("执行reversedMessage2");
			return this.message
				.split('')
				.reverse()
				.join('')
		}
	}
}
</script>
