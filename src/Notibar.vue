<template>
	<div class="notibar-container" :style="containerStyle">
		<transition name="notibar">
			<div v-if="visible" ref="notibar" :style="notibarStyle" class="notibar" tabindex="0">
				<div class="text" :style="textStyle">
					{{ current.text }}
				</div>
				<div class="actions">
					<button v-if="current.options.dismiss.show" class="dismiss" tabindex="0" @click="dismiss">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
							<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" :fill="current.options.dismiss.color" />
						</svg>
					</button>
				</div>
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
			queue: [],
			current: null,
			timeout: null
		}
	},
	computed: {
		textStyle() {
			let marginRight = this.current.options.dismiss.show ? '50px' : 'none'
			let paddingRight = this.current.options.dismiss.show ? '8px' : '16px'
			if(this.current) {
				return `margin-right: ${marginRight};`+
					`padding-right: ${paddingRight};`
			}
			return ''
		},
		containerStyle() {
			if(this.current) {
				return `text-align: ${this.current.options.position}`
			}
			return ''
		},
		notibarStyle() {
			if(this.current) {
				return `background-color: ${this.current.options.backgroundColor};` +
					`color: ${this.current.options.textColor};`;
			}
			return ''
		}
	},
	methods: {
		mergeOptions(opts) {
			let dismissOptions = { dismiss: { ...this.defaultOptions.dismiss, ...opts.dismiss } }
			let mergedOptions = { ...opts, ...dismissOptions }
			return { ...this.defaultOptions, ...mergedOptions }
		},
		add(text, opts = {}) {
			let options = this.mergeOptions(opts)
			this.queue.push({ text, options })
			if(!this.visible) {
				this.showNext()
			}
		},
		showNext() {
			if(this.queue.length > 0) {
				this.current = this.queue[0]
				this.visible = true

				this.$nextTick(() => this.$refs.notibar.focus())
				
				if(this.current.options.time) {
					this.timeout = setTimeout(this.dismiss, this.current.options.time)
				}
			}
		},
		dismiss() {
			this.visible = false
			this.queue.splice(0, 1)
			clearTimeout(this.timeout)
			this.timeout = null
			setTimeout(() => {
				this.current = null
				this.showNext()
			}, 300)
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
	}

	.notibar {
		display: inline-block;
		border-radius: 5px;
		font-family: Roboto, sans-serif;
		font-size: 16px;
		will-change: opacity;
		box-sizing: border-box;
		text-align: justify;
		position: relative;
		max-width: 450px;
		outline: none;

		.text {
			display: inline-block;
			vertical-align: middle;
			padding: 16px;
		}

		.actions {
			display: inline-block;
			vertical-align: middle;
			position: absolute;
			top: calc(50% - 18px);
			right: 0;

			.dismiss {
				border: 0;
				background-color: transparent;
				cursor: pointer;
				padding: 0;
				width: 35px;
				height: 35px;
				margin: 0 12px 0 0;
				outline: none;
				border-radius: 30px;

				svg {
					width: 24px;
					height: 24px;
				}

				&:focus,
				&:hover {
					background-color: rgba($color: #FFF, $alpha: 0.3);
				}

				&:active {
					background-color: rgba($color: #FFF, $alpha: 0.5);
				}
			}
		}
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

	@media screen and (max-width: 520px) {
		.notibar {
			width: 100%;
			min-width: 280px;
		}
	}
</style>