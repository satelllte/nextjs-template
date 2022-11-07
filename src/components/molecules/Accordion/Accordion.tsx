import * as RadixAccordion from '@radix-ui/react-accordion'
import type { AccordionProps } from './types'

export const Accordion = ({}: AccordionProps) => {
	return (
		<RadixAccordion.Root type='single' className='rounded-sm bg-red-400' collapsible>
			<RadixAccordion.Item value='1'>
				<RadixAccordion.Trigger className='w-full data-[state=open]:bg-green-400'>
					Trigger
				</RadixAccordion.Trigger>
				<RadixAccordion.Content className='overflow-hidden data-[state=open]:animate-radix-accordion-open data-[state=close]:animate-radix-accordion-close'>
					Content
				</RadixAccordion.Content>
			</RadixAccordion.Item>
		</RadixAccordion.Root>
	)
}
