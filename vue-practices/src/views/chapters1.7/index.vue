<template>
	<div>
		<button @click="show = !show">{{ show ? '销毁' : '加载' }}</button>
		<button
			v-if="show"
			v-append-text="`hello wayne ${number} `"
			@click="number++"
		>
			添加
		</button>
	</div>
</template>

<script>
export default {
	name: 'ChapterSeven',
	directives: {
		appendText: {
			bind() {
				console.log('bind')
			},
			inserted(el, binding) {
				el.appendChild(document.createTextNode(binding.value))
			},
			update() {
				console.log('update')
			},
			componentUpdated(el, binding) {
				el.removeChild(el.childNodes[el.childNodes.length - 1])
				el.appendChild(document.createTextNode(binding.value))
				console.log('componentUpdated')
			},
			unbind() {
				console.log('unbind')
			}
		}
	},
	data() {
		return {
			show: true,
			number: 1
		}
	}
}
</script>
