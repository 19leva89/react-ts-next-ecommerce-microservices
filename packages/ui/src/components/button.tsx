import { LoaderIcon } from 'lucide-react'
import { Slot } from '@radix-ui/react-slot'
import { Children, ComponentProps, isValidElement } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '../lib'

const buttonVariants = cva(
	"focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium outline-none transition-all focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
	{
		variants: {
			variant: {
				default: 'text-primary-foreground shadow-xs bg-gray-800 hover:bg-gray-900',
				destructive:
					'bg-destructive shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60 text-white',
				outline:
					'bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 border',
				secondary: 'bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80',
				ghost: 'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
				link: 'text-primary underline-offset-4 hover:underline',
			},
			size: {
				default: 'h-9 px-4 py-2 has-[>svg]:px-3',
				sm: 'h-8 gap-1.5 rounded-md px-3 has-[>svg]:px-2.5',
				lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
				xl: 'h-12 rounded-md px-8 has-[>svg]:px-8',
				icon: 'size-9',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	},
)

/**
 * Button component with variant styling, loading states, and polymorphic rendering capabilities
 * Supports different visual variants, sizes, loading indicators, and can render as child components
 * @param props - Component props including styling, behavior, and polymorphic options
 * @param props.className - Additional CSS classes to merge with variant styling
 * @param props.variant - Button style variant (e.g., default, destructive, outline)
 * @param props.size - Button size variant (e.g., sm, md, lg)
 * @param props.asChild - If true, renders as Slot component for polymorphic behavior
 * @param props.children - Button content, can include icons and text
 * @param props.disabled - Whether the button is disabled
 * @param props.loading - Whether to show loading spinner and disable interaction
 * @returns JSX element with button or Slot component based on asChild prop
 */
function Button({
	className,
	variant,
	size,
	asChild = false,
	children,
	disabled,
	loading,
	...props
}: ComponentProps<'button'> &
	VariantProps<typeof buttonVariants> & {
		asChild?: boolean
		loading?: boolean
	}) {
	const Comp = asChild ? Slot : 'button'
	const childArray = Children.toArray(children)

	let content

	if (loading) {
		if (childArray.length === 2 && isValidElement(childArray[0])) {
			// If two parts are passed (icon + text), replace the first one with Loader
			content = (
				<>
					<LoaderIcon className='size-5 animate-spin text-white' />
					{childArray[1]}
				</>
			)
		} else {
			// If there is no icon, just add Loader to the left
			content = (
				<>
					<LoaderIcon className='size-5 animate-spin text-white' />
					{children}
				</>
			)
		}
	} else {
		content = children
	}

	return (
		<Comp
			data-slot='button'
			disabled={disabled || loading}
			className={cn(buttonVariants({ variant, size, className }))}
			{...props}
		>
			{content}
		</Comp>
	)
}

export { Button, buttonVariants }
