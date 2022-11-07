import { Disclosure as HeadlessDisclosure, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { Button } from '@/components/atoms/Button'
import type { DisclosureProps } from './types'

export const Disclosure = ({
	name,
	children,
	defaultExpanded = false
}: DisclosureProps) => {
	return (
		<HeadlessDisclosure defaultOpen={defaultExpanded}>
			{({ open }) => (
				<>
					<HeadlessDisclosure.Button as={Button} className='flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75'>
						<span>{name}</span>
						<ChevronDownIcon
							className={`${
								open ? 'rotate-180 transform' : ''
							} h-5 w-5 text-purple-500`}
						/>
					</HeadlessDisclosure.Button>
					<Transition
						show={open}
						enter='transition duration-100 ease-out'
						enterFrom='transform scale-95 opacity-0'
						enterTo='transform scale-100 opacity-100'
						leave='transition duration-75 ease-out'
						leaveFrom='transform scale-100 opacity-100'
						leaveTo='transform scale-95 opacity-0'
					>
						<HeadlessDisclosure.Panel static className='px-4 pt-4 pb-2 text-sm text-gray-500'>
							{children}
						</HeadlessDisclosure.Panel>
					</Transition>
				</>
			)}
		</HeadlessDisclosure>
	)
}
