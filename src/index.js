import Notibar from './Notibar.vue'
import DefaultOptions from './defaultOptions'

export default {
	install (Vue, options = {}) {

		let NotibarComponent = Vue.extend(Notibar);
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
			show(html, options) {
				notibar.show(html, options);
			}
		}
	}
}