<template>
	<transition name="notibar">
		<div v-if="visible" v-html="html" class="notibar" :style="style"></div>
	</transition>
</template>

<script>
export default {
	props: {
		defaultOptions: Object
	},
	data() {
		return {
			html: null,
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
		show(html, opts = {}) {
			if(!this.timer) {
				this.options = { ...this.defaultOptions, ...opts };
				this.html = html;
				this.visible = true;
				this.timer = setTimeout(_ => {
					this.visible = false;
					this.timer = null;
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
			bottom: 0;
			border-radius: 0;
			left: 0;
			transform: none;
		}
	}
</style>