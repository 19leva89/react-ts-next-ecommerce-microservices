'use client'

import { cn } from '@repo/ui/lib'
import { ComponentProps } from 'react'
import * as SeparatorPrimitive from '@radix-ui/react-separator'

/**
 * Separator component for visual division with configurable orientation
 * Handles horizontal and vertical line separation with accessibility considerations
 * @param props - Separator component props
 * @param props.className - Additional CSS classes for styling customization
 * @param props.orientation - Line orientation ('horizontal' or 'vertical')
 * @param props.decorative - Whether separator is purely decorative for accessibility
 * @param props.props - All other props forwarded to SeparatorPrimitive.Root
 * @returns JSX element with separator line based on orientation
 */
function Separator({
	className,
	orientation = 'horizontal',
	decorative = true,
	...props
}: ComponentProps<typeof SeparatorPrimitive.Root>) {
	return (
		<SeparatorPrimitive.Root
			data-slot='separator-root'
			decorative={decorative}
			orientation={orientation}
			className={cn(
				'bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=vertical]:h-full data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-px',
				className,
			)}
			{...props}
		/>
	)
}

export { Separator }
