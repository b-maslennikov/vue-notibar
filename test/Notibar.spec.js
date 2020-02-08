import { mount } from '@vue/test-utils'
import Notibar from '../src/Notibar'
import DefaultOptions from '../src/defaultOptions'

describe('Notibar', () => {

	let wrapper

	beforeEach(() => {
		jest.useFakeTimers()
		wrapper = mount(Notibar, {
			propsData: {
				defaultOptions: DefaultOptions
			}
		})
	})

	test('is a Vue instance', () => {
		expect(wrapper.isVueInstance()).toBeTruthy()
	})

	test('is invisible by default', () => {
		expect(wrapper.vm.visible).not.toBeTruthy()
		expect(wrapper.isEmpty()).toBeTruthy()
	})

	test('become visible after triggering show() method', () => {
		wrapper.vm.show('')
		expect(wrapper.vm.visible).toBeTruthy()
	})

	test('become invisible in the end', async () => {
		wrapper.vm.show('')
		jest.runAllTimers()
		expect(wrapper.vm.visible).not.toBeTruthy()
	})
	
	test('emmits \'onShow\' on show and \'onHide\' on hide', async () => {

		let onShowFunc = jest.fn();
		let onHideFunc = jest.fn();

		wrapper.vm.show('', { onShow: onShowFunc, onHide: onHideFunc })
		jest.runAllTimers();
		expect(onShowFunc).toHaveBeenCalled();
		expect(onHideFunc).toHaveBeenCalled();
	})

	test('not emmits \'onShow\' on show and \'onHide\' on hide by default', async () => {
		let onShowFunc = jest.fn();
		let onHideFunc = jest.fn();

		wrapper.vm.show('')
		jest.runAllTimers();
		expect(onShowFunc).not.toHaveBeenCalled();
		expect(onHideFunc).not.toHaveBeenCalled();
	})

	test('shows correct message', async () => {
		let message = 'this is test message!'
		wrapper.vm.show(message)
		await wrapper.vm.$nextTick()
		expect(wrapper.vm.text).toBe(message)
		expect(wrapper.find('div').text()).toBe(message)
	})

	test('uses user provided options in show() method', () => {
		let opts = {
			textColor: '#FF00FF',
			backgroundColor: '#CC00CC',
			time: 4500
		}
		wrapper.vm.show('', opts)
		expect(wrapper.vm.options).toMatchObject(opts)
	});

	test('sets style attribute', async () => {
		wrapper.vm.show('')
		await wrapper.vm.$nextTick()
		let styleAttr = wrapper.attributes().style
		expect(styleAttr).toContain('background-color:')
		expect(styleAttr).toContain(' color:')
	})

	test('sets timeout once on show() method call', () => {
		wrapper.vm.show('', { time: 1234})
		expect(setTimeout).toHaveBeenCalledTimes(1)
		expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1234)
	})

	test('resets options after hide', async () => {
		expect(wrapper.vm.options).toBeNull()
		wrapper.vm.show('', { time: 100})
		expect(wrapper.vm.options).not.toBeNull()
		jest.runAllTimers()
		expect(wrapper.vm.options).toBeNull()
	})
})