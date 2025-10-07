'use client'

import { cn } from '@repo/ui/lib'
import { ComponentProps } from 'react'
import { CheckIcon, ChevronRightIcon, CircleIcon } from 'lucide-react'
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'

/**
 * Main dropdown menu component wrapper for dropdown functionality
 * Handles dropdown state management and accessibility features
 * @param props - Dropdown menu component props
 * @param props.props - All other props forwarded to DropdownMenuPrimitive.Root
 * @returns JSX element with dropdown menu root container
 */
function DropdownMenu({ ...props }: ComponentProps<typeof DropdownMenuPrimitive.Root>) {
	return <DropdownMenuPrimitive.Root data-slot='dropdown-menu' {...props} />
}

/**
 * Dropdown menu portal component for rendering content outside DOM hierarchy
 * Handles portal rendering to avoid z-index and overflow issues
 * @param props - Dropdown menu portal component props
 * @param props.props - All other props forwarded to DropdownMenuPrimitive.Portal
 * @returns JSX element with portal container
 */
function DropdownMenuPortal({ ...props }: ComponentProps<typeof DropdownMenuPrimitive.Portal>) {
	return <DropdownMenuPrimitive.Portal data-slot='dropdown-menu-portal' {...props} />
}

/**
 * Dropdown menu trigger component that opens the dropdown when activated
 * Handles click events to trigger dropdown opening with proper accessibility
 * @param props - Dropdown menu trigger component props
 * @param props.props - All other props forwarded to DropdownMenuPrimitive.Trigger
 * @returns JSX element with dropdown trigger button
 */
function DropdownMenuTrigger({ ...props }: ComponentProps<typeof DropdownMenuPrimitive.Trigger>) {
	return <DropdownMenuPrimitive.Trigger data-slot='dropdown-menu-trigger' {...props} />
}

/**
 * Dropdown menu content component that contains the dropdown items
 * Handles positioned dropdown content with animations and side offset configuration
 * @param props - Dropdown menu content component props
 * @param props.className - Additional CSS classes for styling customization
 * @param props.sideOffset - Distance from trigger element in pixels
 * @param props.props - All other props forwarded to DropdownMenuPrimitive.Content
 * @returns JSX element with styled dropdown content container
 */
function DropdownMenuContent({
	className,
	sideOffset = 4,
	...props
}: ComponentProps<typeof DropdownMenuPrimitive.Content>) {
	return (
		<DropdownMenuPrimitive.Portal>
			<DropdownMenuPrimitive.Content
				data-slot='dropdown-menu-content'
				sideOffset={sideOffset}
				className={cn(
					'bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 max-h-(--radix-dropdown-menu-content-available-height) origin-(--radix-dropdown-menu-content-transform-origin) z-50 min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border p-1 shadow-md',
					className,
				)}
				{...props}
			/>
		</DropdownMenuPrimitive.Portal>
	)
}

/**
 * Dropdown menu group component for organizing related menu items
 * Handles grouped dropdown items with proper semantic structure
 * @param props - Dropdown menu group component props
 * @param props.props - All other props forwarded to DropdownMenuPrimitive.Group
 * @returns JSX element with grouped menu items container
 */
function DropdownMenuGroup({ ...props }: ComponentProps<typeof DropdownMenuPrimitive.Group>) {
	return <DropdownMenuPrimitive.Group data-slot='dropdown-menu-group' {...props} />
}

/**
 * Dropdown menu item component for individual selectable options
 * Handles interactive menu selection with hover states, variants and inset styling
 * @param props - Dropdown menu item component props
 * @param props.className - Additional CSS classes for styling customization
 * @param props.inset - Whether to add left indentation for nested appearance
 * @param props.variant - Visual variant style ('default' or 'destructive')
 * @param props.props - All other props forwarded to DropdownMenuPrimitive.Item
 * @returns JSX element with selectable menu item
 */
function DropdownMenuItem({
	className,
	inset,
	variant = 'default',
	...props
}: ComponentProps<typeof DropdownMenuPrimitive.Item> & {
	inset?: boolean
	variant?: 'default' | 'destructive'
}) {
	return (
		<DropdownMenuPrimitive.Item
			data-slot='dropdown-menu-item'
			data-inset={inset}
			data-variant={variant}
			className={cn(
				"focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground outline-hidden relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm data-[disabled]:pointer-events-none data-[inset]:pl-8 data-[disabled]:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
				className,
			)}
			{...props}
		/>
	)
}

/**
 * Dropdown menu checkbox item component for toggle-able options
 * Handles checkbox state with visual indicator and checked state management
 * @param props - Dropdown menu checkbox item component props
 * @param props.className - Additional CSS classes for styling customization
 * @param props.children - Content to render inside checkbox item
 * @param props.checked - Current checked state of checkbox
 * @param props.props - All other props forwarded to DropdownMenuPrimitive.CheckboxItem
 * @returns JSX element with checkbox menu item and check indicator
 */
function DropdownMenuCheckboxItem({
	className,
	children,
	checked,
	...props
}: ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem>) {
	return (
		<DropdownMenuPrimitive.CheckboxItem
			data-slot='dropdown-menu-checkbox-item'
			className={cn(
				"focus:bg-accent focus:text-accent-foreground outline-hidden relative flex cursor-default select-none items-center gap-2 rounded-sm py-1.5 pl-8 pr-2 text-sm data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
				className,
			)}
			checked={checked}
			{...props}
		>
			<span className='pointer-events-none absolute left-2 flex size-3.5 items-center justify-center'>
				<DropdownMenuPrimitive.ItemIndicator>
					<CheckIcon className='size-4' />
				</DropdownMenuPrimitive.ItemIndicator>
			</span>
			{children}
		</DropdownMenuPrimitive.CheckboxItem>
	)
}

/**
 * Dropdown menu radio group component for mutually exclusive options
 * Handles radio button group functionality with single selection enforcement
 * @param props - Dropdown menu radio group component props
 * @param props.props - All other props forwarded to DropdownMenuPrimitive.RadioGroup
 * @returns JSX element with radio group container
 */
function DropdownMenuRadioGroup({ ...props }: ComponentProps<typeof DropdownMenuPrimitive.RadioGroup>) {
	return <DropdownMenuPrimitive.RadioGroup data-slot='dropdown-menu-radio-group' {...props} />
}

/**
 * Dropdown menu radio item component for single-select options within group
 * Handles radio selection with visual indicator and mutual exclusivity
 * @param props - Dropdown menu radio item component props
 * @param props.className - Additional CSS classes for styling customization
 * @param props.children - Content to render inside radio item
 * @param props.props - All other props forwarded to DropdownMenuPrimitive.RadioItem
 * @returns JSX element with radio menu item and selection indicator
 */
function DropdownMenuRadioItem({
	className,
	children,
	...props
}: ComponentProps<typeof DropdownMenuPrimitive.RadioItem>) {
	return (
		<DropdownMenuPrimitive.RadioItem
			data-slot='dropdown-menu-radio-item'
			className={cn(
				"focus:bg-accent focus:text-accent-foreground outline-hidden relative flex cursor-default select-none items-center gap-2 rounded-sm py-1.5 pl-8 pr-2 text-sm data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
				className,
			)}
			{...props}
		>
			<span className='pointer-events-none absolute left-2 flex size-3.5 items-center justify-center'>
				<DropdownMenuPrimitive.ItemIndicator>
					<CircleIcon className='size-2 fill-current' />
				</DropdownMenuPrimitive.ItemIndicator>
			</span>
			{children}
		</DropdownMenuPrimitive.RadioItem>
	)
}

/**
 * Dropdown menu label component for section headings and descriptions
 * Handles non-interactive text labels with optional inset styling
 * @param props - Dropdown menu label component props
 * @param props.className - Additional CSS classes for styling customization
 * @param props.inset - Whether to add left indentation to match nested items
 * @param props.props - All other props forwarded to DropdownMenuPrimitive.Label
 * @returns JSX element with menu section label
 */
function DropdownMenuLabel({
	className,
	inset,
	...props
}: ComponentProps<typeof DropdownMenuPrimitive.Label> & {
	inset?: boolean
}) {
	return (
		<DropdownMenuPrimitive.Label
			data-slot='dropdown-menu-label'
			data-inset={inset}
			className={cn('px-2 py-1.5 text-sm font-medium data-[inset]:pl-8', className)}
			{...props}
		/>
	)
}

/**
 * Dropdown menu separator component for visual division between sections
 * Handles horizontal line separation with consistent border styling
 * @param props - Dropdown menu separator component props
 * @param props.className - Additional CSS classes for styling customization
 * @param props.props - All other props forwarded to DropdownMenuPrimitive.Separator
 * @returns JSX element with horizontal separator line
 */
function DropdownMenuSeparator({
	className,
	...props
}: ComponentProps<typeof DropdownMenuPrimitive.Separator>) {
	return (
		<DropdownMenuPrimitive.Separator
			data-slot='dropdown-menu-separator'
			className={cn('bg-border -mx-1 my-1 h-px', className)}
			{...props}
		/>
	)
}

/**
 * Dropdown menu shortcut component for displaying keyboard shortcuts
 * Handles keyboard shortcut text with proper spacing and muted styling
 * @param props - Dropdown menu shortcut component props
 * @param props.className - Additional CSS classes for styling customization
 * @param props.props - All other props forwarded to span element
 * @returns JSX element with keyboard shortcut text
 */
function DropdownMenuShortcut({ className, ...props }: ComponentProps<'span'>) {
	return (
		<span
			data-slot='dropdown-menu-shortcut'
			className={cn('text-muted-foreground ml-auto text-xs tracking-widest', className)}
			{...props}
		/>
	)
}

/**
 * Dropdown menu sub component for nested submenu functionality
 * Handles nested dropdown menu state and positioning management
 * @param props - Dropdown menu sub component props
 * @param props.props - All other props forwarded to DropdownMenuPrimitive.Sub
 * @returns JSX element with submenu container
 */
function DropdownMenuSub({ ...props }: ComponentProps<typeof DropdownMenuPrimitive.Sub>) {
	return <DropdownMenuPrimitive.Sub data-slot='dropdown-menu-sub' {...props} />
}

/**
 * Dropdown menu sub trigger component that opens nested submenus
 * Handles submenu trigger with chevron indicator and inset styling options
 * @param props - Dropdown menu sub trigger component props
 * @param props.className - Additional CSS classes for styling customization
 * @param props.inset - Whether to add left indentation for nested appearance
 * @param props.children - Content to render inside sub trigger
 * @param props.props - All other props forwarded to DropdownMenuPrimitive.SubTrigger
 * @returns JSX element with submenu trigger and chevron icon
 */
function DropdownMenuSubTrigger({
	className,
	inset,
	children,
	...props
}: ComponentProps<typeof DropdownMenuPrimitive.SubTrigger> & {
	inset?: boolean
}) {
	return (
		<DropdownMenuPrimitive.SubTrigger
			data-slot='dropdown-menu-sub-trigger'
			data-inset={inset}
			className={cn(
				'focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground outline-hidden flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm data-[inset]:pl-8',
				className,
			)}
			{...props}
		>
			{children}
			<ChevronRightIcon className='ml-auto size-4' />
		</DropdownMenuPrimitive.SubTrigger>
	)
}

/**
 * Dropdown menu sub content component for nested submenu items
 * Handles positioned submenu content with animations and proper z-index layering
 * @param props - Dropdown menu sub content component props
 * @param props.className - Additional CSS classes for styling customization
 * @param props.props - All other props forwarded to DropdownMenuPrimitive.SubContent
 * @returns JSX element with styled submenu content container
 */
function DropdownMenuSubContent({
	className,
	...props
}: ComponentProps<typeof DropdownMenuPrimitive.SubContent>) {
	return (
		<DropdownMenuPrimitive.SubContent
			data-slot='dropdown-menu-sub-content'
			className={cn(
				'bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-dropdown-menu-content-transform-origin) z-50 min-w-[8rem] overflow-hidden rounded-md border p-1 shadow-lg',
				className,
			)}
			{...props}
		/>
	)
}

export {
	DropdownMenu,
	DropdownMenuPortal,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuLabel,
	DropdownMenuItem,
	DropdownMenuCheckboxItem,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuSub,
	DropdownMenuSubTrigger,
	DropdownMenuSubContent,
}
