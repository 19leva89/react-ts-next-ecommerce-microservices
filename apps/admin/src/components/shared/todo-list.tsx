'use client'

import { useState } from 'react'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'

import {
	Button,
	Calendar,
	Card,
	Checkbox,
	Popover,
	PopoverContent,
	PopoverTrigger,
	ScrollArea,
} from '@/components/ui'

export const TodoList = () => {
	const [open, setOpen] = useState<boolean>(false)
	const [date, setDate] = useState<Date | undefined>(new Date())

	return (
		<div>
			<h1 className='mb-6 text-lg font-medium'>Todo List</h1>

			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button className='w-full'>
						<CalendarIcon />

						{date ? format(date, 'PPP') : <span>Pick a date</span>}
					</Button>
				</PopoverTrigger>

				<PopoverContent className='w-auto p-0'>
					<Calendar
						mode='single'
						selected={date}
						onSelect={(date) => {
							setDate(date)
							setOpen(false)
						}}
					/>
				</PopoverContent>
			</Popover>

			{/* LIST */}
			<ScrollArea className='max-h-100 mt-4 overflow-y-auto'>
				<div className='flex flex-col gap-4'>
					{/* LIST ITEM */}
					<Card className='p-4'>
						<div className='flex items-center gap-4'>
							<Checkbox id='item1' checked />

							<label htmlFor='item1' className='text-muted-foreground text-sm'>
								Lorem ipsum dolor sit, amet consectetur adipisicing elit.
							</label>
						</div>
					</Card>

					{/* LIST ITEM */}
					<Card className='p-4'>
						<div className='flex items-center gap-4'>
							<Checkbox id='item1' checked />

							<label htmlFor='item1' className='text-muted-foreground text-sm'>
								Lorem ipsum dolor sit, amet consectetur adipisicing elit.
							</label>
						</div>
					</Card>

					{/* LIST ITEM */}
					<Card className='p-4'>
						<div className='flex items-center gap-4'>
							<Checkbox id='item1' />

							<label htmlFor='item1' className='text-muted-foreground text-sm'>
								Lorem ipsum dolor sit, amet consectetur adipisicing elit.
							</label>
						</div>
					</Card>

					{/* LIST ITEM */}
					<Card className='p-4'>
						<div className='flex items-center gap-4'>
							<Checkbox id='item1' />

							<label htmlFor='item1' className='text-muted-foreground text-sm'>
								Lorem ipsum dolor sit, amet consectetur adipisicing elit.
							</label>
						</div>
					</Card>

					{/* LIST ITEM */}
					<Card className='p-4'>
						<div className='flex items-center gap-4'>
							<Checkbox id='item1' />

							<label htmlFor='item1' className='text-muted-foreground text-sm'>
								Lorem ipsum dolor sit, amet consectetur adipisicing elit.
							</label>
						</div>
					</Card>

					{/* LIST ITEM */}
					<Card className='p-4'>
						<div className='flex items-center gap-4'>
							<Checkbox id='item1' />

							<label htmlFor='item1' className='text-muted-foreground text-sm'>
								Lorem ipsum dolor sit, amet consectetur adipisicing elit.
							</label>
						</div>
					</Card>

					{/* LIST ITEM */}
					<Card className='p-4'>
						<div className='flex items-center gap-4'>
							<Checkbox id='item1' />

							<label htmlFor='item1' className='text-muted-foreground text-sm'>
								Lorem ipsum dolor sit, amet consectetur adipisicing elit.
							</label>
						</div>
					</Card>

					{/* LIST ITEM */}
					<Card className='p-4'>
						<div className='flex items-center gap-4'>
							<Checkbox id='item1' />

							<label htmlFor='item1' className='text-muted-foreground text-sm'>
								Lorem ipsum dolor sit, amet consectetur adipisicing elit.
							</label>
						</div>
					</Card>

					{/* LIST ITEM */}
					<Card className='p-4'>
						<div className='flex items-center gap-4'>
							<Checkbox id='item1' checked />

							<label htmlFor='item1' className='text-muted-foreground text-sm'>
								Lorem ipsum dolor sit, amet consectetur adipisicing elit.
							</label>
						</div>
					</Card>

					{/* LIST ITEM */}
					<Card className='p-4'>
						<div className='flex items-center gap-4'>
							<Checkbox id='item1' checked />

							<label htmlFor='item1' className='text-muted-foreground text-sm'>
								Lorem ipsum dolor sit, amet consectetur adipisicing elit.
							</label>
						</div>
					</Card>

					{/* LIST ITEM */}
					<Card className='p-4'>
						<div className='flex items-center gap-4'>
							<Checkbox id='item1' checked />

							<label htmlFor='item1' className='text-muted-foreground text-sm'>
								Lorem ipsum dolor sit, amet consectetur adipisicing elit.
							</label>
						</div>
					</Card>

					{/* LIST ITEM */}
					<Card className='p-4'>
						<div className='flex items-center gap-4'>
							<Checkbox id='item1' checked />

							<label htmlFor='item1' className='text-muted-foreground text-sm'>
								Lorem ipsum dolor sit, amet consectetur adipisicing elit.
							</label>
						</div>
					</Card>

					{/* LIST ITEM */}
					<Card className='p-4'>
						<div className='flex items-center gap-4'>
							<Checkbox id='item1' checked />

							<label htmlFor='item1' className='text-muted-foreground text-sm'>
								Lorem ipsum dolor sit, amet consectetur adipisicing elit.
							</label>
						</div>
					</Card>
				</div>
			</ScrollArea>
		</div>
	)
}
