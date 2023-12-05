import VueNotibar from './VueNotibar.vue'
import DefaultOptions from './defaultOptions'

export default {
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
		}
	}
}