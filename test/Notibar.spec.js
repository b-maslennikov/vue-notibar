import { mount } from '@vue/test-utils'
import Notibar from '../src/Notibar'
import DefaultOptions from '../src/defaultOptions'

describe('Notibar', () => {

	let wrapper
	let container

	beforeEach(() => {
		jest.useFakeTimers()
		wrapper = mount(Notibar, {
			propsData: {
				defaultOptions: DefaultOptions
			}
		})
		container = wrapper.find('div.notibar-container')
	})

	test('is a Vue instance', () => {
		expect(wrapper.isVueInstance()).toBeTruthy()
	})

	describe('Container', () => {

		test('is exists by default', () => {
			expect(container).toBeTruthy()
		})

		test('has no child by default', () => {
			expect(container.text()).toBe('')
		})
	})

	describe('Notibar item', () => {
		test('become visible after triggering show() method', () => {
			wrapper.vm.add('')
			expect(wrapper.vm.visible).toBeTruthy()
		})
	
		test('become invisible in the end', async () => {
			wrapper.vm.add('')
			jest.runAllTimers()
			expect(wrapper.vm.visible).not.toBeTruthy()
		})

		test('shows correct message', async () => {
			let message = 'this is test message!'
			wrapper.vm.add(message)
			await wrapper.vm.$nextTick()
			expect(wrapper.vm.queue[0].text).toBe(message)
			expect(container.find('div.notibar').text()).toBe(message)
		})

		test('uses timeout from the provided `options.time` in show() method', () => {
			wrapper.vm.add('', { time: 1234})
			expect(setTimeout).toHaveBeenCalledTimes(1)
			expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1234)
		})
	})

	describe('Queue', () => {
		test('is empty by default', () => {
			expect(wrapper.vm.queue.length).toBe(0)
		})
		test('has 1 element after first add() call', () => {
			wrapper.vm.add('')
			expect(wrapper.vm.queue.length).toBe(1)
		})
		test('has 2 elements after two add() calls', () => {
			wrapper.vm.add('')
			wrapper.vm.add('')
			expect(wrapper.vm.queue.length).toBe(2)
		})
		test('has no elements after timeout', () => {
			wrapper.vm.add('')
			jest.runAllTimers()
			expect(wrapper.vm.queue.length).toBe(0)
		})
		test('has delay between shows', async () => {
			wrapper.vm.add('')
			wrapper.vm.add('')
			expect(wrapper.vm.queue.length).toBe(2)
			jest.advanceTimersByTime(5000)
			expect(wrapper.vm.queue.length).toBe(1)
			jest.advanceTimersByTime(5000)
			expect(wrapper.vm.queue.length).toBe(1)
			jest.advanceTimersByTime(300)
			expect(wrapper.vm.queue.length).toBe(0)
		})

		test('show snackbars in the queue one by one', async () => {
			expect(wrapper.vm.queue.length).toBe(0)
			wrapper.vm.add('')
			expect(wrapper.vm.queue.length).toBe(1)
			wrapper.vm.add('')
			expect(wrapper.vm.queue.length).toBe(2)
			jest.advanceTimersByTime(5000)
			jest.advanceTimersByTime(300)
			expect(wrapper.vm.queue.length).toBe(1)
			jest.advanceTimersByTime(5000)
			expect(wrapper.vm.queue.length).toBe(0)
		})
	})

	describe('Options', () => {
		test('provided by user in show() method are used', () => {
			let opts = {
				textColor: '#FF00FF',
				backgroundColor: '#CC00CC',
				time: 4500
			}
			wrapper.vm.add('', opts)
			expect(wrapper.vm.queue[0].options).toMatchObject(opts)
		});
	
		test('are used for the style attribute', async () => {
			wrapper.vm.add('')
			await wrapper.vm.$nextTick()
			let styleAttr = container.find('div.notibar').attributes('style')
			expect(styleAttr).toContain('background-color:')
			expect(styleAttr).toContain(' color:')
		})
	})
})