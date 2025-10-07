import { cn } from '@repo/ui/lib'
import { ComponentProps } from 'react'

/**
 * Card root component that provides a container with consistent styling and layout
 * Creates a bordered container with shadow, padding, and background styling
 * @param props - Standard div component props including className
 * @param props.className - Additional CSS classes to merge with default card styling
 * @returns JSX div element with card container styling
 */
function Card({ className, ...props }: ComponentProps<'div'>) {
	return (
		<div
			data-slot='card'
			className={cn(
				'bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm',
				className,
			)}
			{...props}
		/>
	)
}

/**
 * Card header section component for displaying titles and descriptions at the top of cards
 * Provides consistent spacing and layout for header content
 * @param props - Standard div component props including className
 * @param props.className - Additional CSS classes to merge with default header styling
 * @returns JSX div element with card header styling and padding
 */
function CardHeader({ className, ...props }: ComponentProps<'div'>) {
	return (
		<div
			data-slot='card-header'
			className={cn(
				'@container/card-header has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6 grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6',
				className,
			)}
			{...props}
		/>
	)
}

/**
 * Card title component for displaying the main heading of a card
 * Applies semibold font weight and proper line height for titles
 * @param props - Standard div component props including className
 * @param props.className - Additional CSS classes to merge with default title styling
 * @returns JSX div element with card title typography styling
 */
function CardTitle({ className, ...props }: ComponentProps<'div'>) {
	return <div data-slot='card-title' className={cn('font-semibold leading-none', className)} {...props} />
}

/**
 * Card description component for displaying secondary text content
 * Applies muted color and smaller font size for descriptive text
 * @param props - Standard div component props including className
 * @param props.className - Additional CSS classes to merge with default description styling
 * @returns JSX div element with muted description text styling
 */
function CardDescription({ className, ...props }: ComponentProps<'div'>) {
	return (
		<div data-slot='card-description' className={cn('text-muted-foreground text-sm', className)} {...props} />
	)
}

/**
 * Card action section component for displaying secondary actions at the top right of cards
 * Provides consistent spacing and layout for action content
 * @param props - Standard div component props including className
 * @param props.className - Additional CSS classes to merge with default action styling
 * @returns JSX div element with card action styling and padding
 */
function CardAction({ className, ...props }: ComponentProps<'div'>) {
	return (
		<div
			data-slot='card-action'
			className={cn('col-start-2 row-span-2 row-start-1 self-start justify-self-end', className)}
			{...props}
		/>
	)
}

/**
 * Card content section component for the main body content of cards
 * Provides consistent horizontal padding for card content areas
 * @param props - Standard div component props including className
 * @param props.className - Additional CSS classes to merge with default content styling
 * @returns JSX div element with card content padding
 */
function CardContent({ className, ...props }: ComponentProps<'div'>) {
	return <div data-slot='card-content' className={cn('px-6', className)} {...props} />
}

/**
 * Card footer section component for actions and additional content at the bottom of cards
 * Provides horizontal layout and consistent padding for footer elements
 * @param props - Standard div component props including className
 * @param props.className - Additional CSS classes to merge with default footer styling
 * @returns JSX div element with card footer styling and flexbox layout
 */
function CardFooter({ className, ...props }: ComponentProps<'div'>) {
	return (
		<div
			data-slot='card-footer'
			className={cn('[.border-t]:pt-6 flex items-center px-6', className)}
			{...props}
		/>
	)
}

export { Card, CardHeader, CardFooter, CardTitle, CardAction, CardDescription, CardContent }
