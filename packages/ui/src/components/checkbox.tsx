'use client'

import { cn } from '@repo/ui/lib'
import { ComponentProps } from 'react'
import { CheckIcon } from 'lucide-react'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'

/**
 * Checkbox component with styled appearance and accessibility features
 * Handles checked/unchecked states with focus management and validation styling
 * @param props - Checkbox component props
 * @param props.className - Additional CSS classes for styling customization
 * @param props.props - All other props forwarded to CheckboxPrimitive.Root
 * @returns JSX element with checkbox input and check indicator
 */
function Checkbox({ className, ...props }: ComponentProps<typeof CheckboxPrimitive.Root>) {
	return (
		<CheckboxPrimitive.Root
			data-slot='checkbox'
			className={cn(
				'border-input dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive shadow-xs peer size-4 shrink-0 rounded-[4px] border outline-none transition-shadow focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50',
				className,
			)}
			{...props}
		>
			<CheckboxPrimitive.Indicator
				data-slot='checkbox-indicator'
				className='flex items-center justify-center text-current transition-none'
			>
				<CheckIcon className='size-3.5' />
			</CheckboxPrimitive.Indicator>
		</CheckboxPrimitive.Root>
	)
}

export { Checkbox }
