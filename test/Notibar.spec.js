import { mount } from '@vue/test-utils'
import Notibar from '../src/Notibar'

describe('Notibar', () => {
	test('is a Vue instance', () => {
		const wrapper = mount(Notibar)
		expect(wrapper.isVueInstance()).toBeTruthy()
	})
})