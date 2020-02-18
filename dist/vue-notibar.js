/*!
 * vue-notibar v0.3.0
 * (c) 2019-2020 Boris Maslennikov
 * Released under the MIT License.
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = global || self, global.VueNotibar = factory());
}(this, (function () { 'use strict';

	var script = {
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

	function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
	    if (typeof shadowMode !== 'boolean') {
	        createInjectorSSR = createInjector;
	        createInjector = shadowMode;
	        shadowMode = false;
	    }
	    // Vue.extend constructor export interop.
	    const options = typeof script === 'function' ? script.options : script;
	    // render functions
	    if (template && template.render) {
	        options.render = template.render;
	        options.staticRenderFns = template.staticRenderFns;
	        options._compiled = true;
	        // functional template
	        if (isFunctionalTemplate) {
	            options.functional = true;
	        }
	    }
	    // scopedId
	    if (scopeId) {
	        options._scopeId = scopeId;
	    }
	    let hook;
	    if (moduleIdentifier) {
	        // server build
	        hook = function (context) {
	            // 2.3 injection
	            context =
	                context || // cached call
	                    (this.$vnode && this.$vnode.ssrContext) || // stateful
	                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
	            // 2.2 with runInNewContext: true
	            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
	                context = __VUE_SSR_CONTEXT__;
	            }
	            // inject component styles
	            if (style) {
	                style.call(this, createInjectorSSR(context));
	            }
	            // register component module identifier for async chunk inference
	            if (context && context._registeredComponents) {
	                context._registeredComponents.add(moduleIdentifier);
	            }
	        };
	        // used by ssr in case component is cached and beforeCreate
	        // never gets called
	        options._ssrRegister = hook;
	    }
	    else if (style) {
	        hook = shadowMode
	            ? function (context) {
	                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
	            }
	            : function (context) {
	                style.call(this, createInjector(context));
	            };
	    }
	    if (hook) {
	        if (options.functional) {
	            // register for functional component in vue file
	            const originalRender = options.render;
	            options.render = function renderWithStyleInjection(h, context) {
	                hook.call(context);
	                return originalRender(h, context);
	            };
	        }
	        else {
	            // inject component registration as beforeCreate hook
	            const existing = options.beforeCreate;
	            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
	        }
	    }
	    return script;
	}

	const isOldIE = typeof navigator !== 'undefined' &&
	    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
	function createInjector(context) {
	    return (id, style) => addStyle(id, style);
	}
	let HEAD;
	const styles = {};
	function addStyle(id, css) {
	    const group = isOldIE ? css.media || 'default' : id;
	    const style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
	    if (!style.ids.has(id)) {
	        style.ids.add(id);
	        let code = css.source;
	        if (css.map) {
	            // https://developer.chrome.com/devtools/docs/javascript-debugging
	            // this makes source maps inside style tags work properly in Chrome
	            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
	            // http://stackoverflow.com/a/26603875
	            code +=
	                '\n/*# sourceMappingURL=data:application/json;base64,' +
	                    btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
	                    ' */';
	        }
	        if (!style.element) {
	            style.element = document.createElement('style');
	            style.element.type = 'text/css';
	            if (css.media)
	                style.element.setAttribute('media', css.media);
	            if (HEAD === undefined) {
	                HEAD = document.head || document.getElementsByTagName('head')[0];
	            }
	            HEAD.appendChild(style.element);
	        }
	        if ('styleSheet' in style.element) {
	            style.styles.push(code);
	            style.element.styleSheet.cssText = style.styles
	                .filter(Boolean)
	                .join('\n');
	        }
	        else {
	            const index = style.ids.size - 1;
	            const textNode = document.createTextNode(code);
	            const nodes = style.element.childNodes;
	            if (nodes[index])
	                style.element.removeChild(nodes[index]);
	            if (nodes.length)
	                style.element.insertBefore(textNode, nodes[index]);
	            else
	                style.element.appendChild(textNode);
	        }
	    }
	}

	/* script */
	const __vue_script__ = script;

	/* template */
	var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"notibar-container",style:(_vm.containerStyle)},[_c('transition',{attrs:{"name":"notibar"}},[(_vm.visible)?_c('div',{staticClass:"notibar",style:(_vm.notibarStyle)},[_c('div',{staticClass:"text",style:(_vm.textStyle)},[_vm._v("\n\t\t\t\t"+_vm._s(_vm.current.text)+"\n\t\t\t")]),_vm._v(" "),_c('div',{staticClass:"actions"},[(_vm.current.options.dismiss.show)?_c('button',{staticClass:"dismiss",on:{"click":_vm.dismiss}},[_c('svg',{attrs:{"xmlns":"http://www.w3.org/2000/svg","viewBox":"0 0 24 24"}},[_c('path',{attrs:{"d":"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z","fill":_vm.current.options.dismiss.color}}),_vm._v(" "),_c('path',{attrs:{"d":"M0 0h24v24H0z","fill":"none"}})])]):_vm._e()])]):_vm._e()])],1)};
	var __vue_staticRenderFns__ = [];

	  /* style */
	  const __vue_inject_styles__ = function (inject) {
	    if (!inject) return
	    inject("data-v-77584a54_0", { source: ".notibar-container{position:fixed;left:0;right:0;bottom:0;z-index:8;margin:8px;box-sizing:border-box}.notibar{display:inline-block;border-radius:5px;font-family:Roboto,sans-serif;font-size:16px;will-change:opacity;box-sizing:border-box;text-align:justify;position:relative;max-width:450px}.notibar .text{display:inline-block;vertical-align:middle;padding:16px}.notibar .actions{display:inline-block;vertical-align:middle;position:absolute;top:calc(50% - 18px);right:0}.notibar .actions .dismiss{border:0;background-color:transparent;cursor:pointer;padding:0;width:35px;height:35px;margin:0 12px 0 0;outline:0;border-radius:30px}.notibar .actions .dismiss svg{width:24px;height:24px}.notibar .actions .dismiss:hover{background-color:rgba(255,255,255,.3)}.notibar .actions .dismiss:active{background-color:rgba(255,255,255,.5)}.notibar-enter-active,.notibar-leave-active{transition:opacity .15s cubic-bezier(0,0,.2,1) 0s,transform .15s cubic-bezier(0,0,.2,1) 0s}.notibar-enter{opacity:0;transform:scale(.2)}.notibar-leave-to{opacity:0}@media screen and (max-width:520px){.notibar{width:100%;min-width:280px}}", map: undefined, media: undefined });

	  };
	  /* scoped */
	  const __vue_scope_id__ = undefined;
	  /* module identifier */
	  const __vue_module_identifier__ = undefined;
	  /* functional template */
	  const __vue_is_functional_template__ = false;
	  /* style inject SSR */
	  
	  /* style inject shadow dom */
	  

	  
	  const __vue_component__ = normalizeComponent(
	    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
	    __vue_inject_styles__,
	    __vue_script__,
	    __vue_scope_id__,
	    __vue_is_functional_template__,
	    __vue_module_identifier__,
	    false,
	    createInjector,
	    undefined,
	    undefined
	  );

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
			let NotibarComponent = Vue.extend(__vue_component__);
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

})));
