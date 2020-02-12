<template>
	<div class="notibar-container">
		<transition name="notibar">
			<div v-if="visible" :style="style" class="notibar">
				{{ queue[0].text }}
			</div>
		</transition>
	</div>
</template>

<script>
export default {
	props: {
		defaultOptions: {
			type: Object,
			default: null
		}
	},
	data() {
		return {
			text: null,
			visible: false,
			queue: []
		}
	},
	computed: {
		style() {
			let options = this.queue[0].options
			return `background-color: ${options.backgroundColor};`+
				   `color: ${options.textColor};`
		}
	},
	methods: {
		add(text, opts = {}) {
			let options = { ...this.defaultOptions, ...opts }
			this.queue.push({ text, options })
			if(!this.visible) {
				this.showNext()
			}
		},
		showNext() {
			if(this.queue.length > 0) {
				this.visible = true
				setTimeout(() => {
					this.visible = false
					this.queue.splice(0, 1)
					setTimeout(() => this.showNext(), 300)
				}, this.queue[0].options.time)
			}
		}
	}
}
</script>

<style lang="scss">
	.notibar-container {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 8;
		margin: 8px;
		box-sizing: border-box;
		pointer-events: none;
		text-align: center;
	}

	.notibar {
		display: inline-block;
		border-radius: 5px;
		padding: 16px;
		font-family: Roboto, sans-serif;
		font-size: 16px;
		will-change: opacity;
		box-sizing: border-box;
		pointer-events: none;
		text-align: center;
	}

	.notibar-enter-active,
	.notibar-leave-active {
		transition: opacity .15s cubic-bezier(0,0,.2,1) 0ms,
					transform .15s cubic-bezier(0,0,.2,1) 0ms;
	}

	.notibar-enter {
		opacity: 0;
		transform: scale(0.2)
	}

	.notibar-leave-to {
		opacity: 0;
	}

	@media screen and (max-width: 576px) {
		.notibar {
			width: 100%;
		}
	}
</style>