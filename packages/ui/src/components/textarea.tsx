import { cn } from '@repo/ui/lib'
import { ComponentProps } from 'react'

/**
 * Textarea component with responsive sizing and comprehensive interaction states
 * Handles focus management, validation styling, disabled states, and responsive typography
 * @param props - Textarea component props
 * @param props.className - Additional CSS classes for styling customization
 * @param props.props - All other props forwarded to textarea HTML element
 * @returns JSX element with textarea field and data-slot attribute
 */
function Textarea({ className, ...props }: ComponentProps<'textarea'>) {
	return (
		<textarea
			data-slot='textarea'
			className={cn(
				'border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 field-sizing-content shadow-xs flex min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base outline-none transition-[color,box-shadow] focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
				className,
			)}
			{...props}
		/>
	)
}

export { Textarea }
