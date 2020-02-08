<template>
	<transition name="notibar">
		<div 
			v-if="visible"
			:style="style"
			class="notibar"
		>
			{{ text }}
		</div>
	</transition>
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
			timer: null,
			options: null
		}
	},
	computed: {
		style() {
			return `background-color: ${this.options.backgroundColor};`+
				   `color: ${this.options.textColor};`;
		}
	},
	methods: {
		show(text, opts = {}) {
			if(!this.timer) {
				this.$emit('onShow');
				this.options = { ...this.defaultOptions, ...opts };
				this.text = text;
				this.visible = true;
				this.timer = setTimeout(() => {
					this.text = null;
					this.visible = false;
					this.timer = null;
					this.options = null;
					this.$emit('onHide');
				}, this.options.time);
			}
		}
	}
}
</script>

<style>
	.notibar {
		position: fixed;
		left: 50%;
		bottom: 20px;
		transform: translateX(-50%);
		z-index: 10;
		border-radius: 5px;
		padding: 16px;
		font-family: Roboto, sans-serif;
		font-size: 16px;
		will-change: opacity;
		box-sizing: border-box;
	}

	.notibar-enter-active, .notibar-leave-active {
		transition: all .2s ease;
	}

	.notibar-enter, .notibar-leave-to {
		opacity: 0;
		transform: translateY(100%) translateX(-50%);
	}

	@media screen and (max-width: 576px) {
		.notibar {
			margin-left: 20px;
			width: calc(100% - 40px);
			transform: none;
			left: 0;
		}
	}
</style>