/*!
 * vue-notibar v0.3.3
 * (c) 2019-2023 Boris Maslennikov
 * Released under the MIT License.
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.VueNotibar = factory());
})(this, (function () { 'use strict';

	function ___$insertStylesToHeader(css) {
	  if (!css) {
	    return
	  }
	  if (typeof window === 'undefined') {
	    return
	  }

	  const style = document.createElement('style');

	  style.setAttribute('type', 'text/css');
	  style.innerHTML = css;
	  document.head.appendChild(style);
	  return css
	}

	___$insertStylesToHeader(".notibar-container {\n  position: fixed;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  z-index: 8;\n  margin: 8px;\n  box-sizing: border-box;\n}\n\n.notibar {\n  display: inline-block;\n  border-radius: 5px;\n  font-family: Roboto, sans-serif;\n  font-size: 16px;\n  will-change: opacity;\n  box-sizing: border-box;\n  text-align: justify;\n  position: relative;\n  max-width: 450px;\n  outline: none;\n}\n.notibar .text {\n  display: inline-block;\n  vertical-align: middle;\n  padding: 16px;\n}\n.notibar .actions {\n  display: inline-block;\n  vertical-align: middle;\n  position: absolute;\n  top: calc(50% - 18px);\n  right: 0;\n}\n.notibar .actions .dismiss {\n  border: 0;\n  background-color: transparent;\n  cursor: pointer;\n  padding: 0;\n  width: 35px;\n  height: 35px;\n  margin: 0 12px 0 0;\n  outline: none;\n  border-radius: 30px;\n}\n.notibar .actions .dismiss svg {\n  width: 24px;\n  height: 24px;\n}\n.notibar .actions .dismiss:focus, .notibar .actions .dismiss:hover {\n  background-color: rgba(255, 255, 255, 0.3);\n}\n.notibar .actions .dismiss:active {\n  background-color: rgba(255, 255, 255, 0.5);\n}\n\n.notibar-enter-active,\n.notibar-leave-active {\n  transition: opacity 0.15s cubic-bezier(0, 0, 0.2, 1) 0ms, transform 0.15s cubic-bezier(0, 0, 0.2, 1) 0ms;\n}\n\n.notibar-enter {\n  opacity: 0;\n  transform: scale(0.2);\n}\n\n.notibar-leave-to {\n  opacity: 0;\n}\n\n@media screen and (max-width: 520px) {\n  .notibar {\n    width: 100%;\n    min-width: 280px;\n  }\n}");

	var VueNotibar = {
	render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"notibar-container",style:(_vm.containerStyle)},[_c('transition',{attrs:{"name":"notibar"}},[(_vm.visible)?_c('div',{ref:"notibar",staticClass:"notibar",style:(_vm.notibarStyle),attrs:{"tabindex":"0"}},[_c('div',{staticClass:"text",style:(_vm.textStyle)},[_vm._v("\n\t\t\t\t"+_vm._s(_vm.current.text)+"\n\t\t\t")]),_vm._v(" "),_c('div',{staticClass:"actions"},[(_vm.current.options.dismiss.show)?_c('button',{staticClass:"dismiss",attrs:{"tabindex":"0"},on:{"click":_vm.dismiss}},[_c('svg',{attrs:{"xmlns":"http://www.w3.org/2000/svg","viewBox":"0 0 24 24"}},[_c('path',{attrs:{"d":"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z","fill":_vm.current.options.dismiss.color}})])]):_vm._e()])]):_vm._e()])],1)},
	staticRenderFns: [],
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
				let marginRight = this.current.options.dismiss.show ? '50px' : 'none';
				let paddingRight = this.current.options.dismiss.show ? '8px' : '16px';
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
				let dismissOptions = { dismiss: { ...this.defaultOptions.dismiss, ...opts.dismiss } };
				let mergedOptions = { ...opts, ...dismissOptions };
				return { ...this.defaultOptions, ...mergedOptions }
			},
			add(text, opts = {}) {
				let options = this.mergeOptions(opts);
				this.queue.push({ text, options });
				if(!this.visible) {
					this.showNext();
				}
			},
			showNext() {
				if(this.queue.length > 0) {
					this.current = this.queue[0];
					this.visible = true;

					this.$nextTick(() => this.$refs.notibar.focus());
					
					if(this.current.options.time) {
						this.timeout = setTimeout(this.dismiss, this.current.options.time);
					}
				}
			},
			dismiss() {
				this.visible = false;
				this.queue.splice(0, 1);
				clearTimeout(this.timeout);
				this.timeout = null;
				setTimeout(() => {
					this.current = null;
					this.showNext();
				}, 300);
			}
		}
	};

	var DefaultOptions = {
		textColor: '#FFFFFF',
		backgroundColor: '#323232',
		time: 5000,
		position: 'center',
		dismiss: {
			show: false,
			color: '#FFFFFF'
		}
	};

	var index = {
		install (Vue, options = {}) {
			let NotibarComponent = Vue.extend(VueNotibar);
			let notibar = new NotibarComponent({
				propsData: {
					defaultOptions: {
						...DefaultOptions,
						...options
					}
				}
			});
			notibar.$mount(document.body.appendChild(document.createElement('div')));
			Vue.prototype.$notibar = {
				add(text, options) {
					notibar.add(text, options);
				}
			};
		}
	};

	return index;

}));
