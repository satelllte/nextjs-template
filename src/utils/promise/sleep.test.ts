import {
	afterEach,
	beforeEach,
	describe,
	expect,
	it,
	vi,
} from 'vitest'
import { sleep } from './sleep'

describe('sleep', () => {
	let sleepEnded: boolean = false

	beforeEach(() => {
		sleepEnded = false
		vi.useFakeTimers()
	})

	afterEach(() => {
		vi.clearAllTimers()
		vi.useRealTimers()
	})

	const sleepFor = async(ms: number) => {
		await sleep(ms)
		sleepEnded = true
	}

	const assert = async(sleepEndedExpected: boolean) => {
		await Promise.resolve() // required to make underlying promises resolved
		expect(sleepEnded).toEqual(sleepEndedExpected)
	}

	it('works (100ms)', async() => {
		sleepFor(100)

		await vi.advanceTimersByTime(99)
		await assert(false)

		await vi.advanceTimersByTime(1)
		await assert(true)
	})

	it('works (9000ms)', async() => {
		sleepFor(9000)

		await vi.advanceTimersByTime(8999)
		await assert(false)

		await vi.advanceTimersByTime(1)
		await assert(true)
	})
})
