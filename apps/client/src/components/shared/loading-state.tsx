import { cn } from '@repo/ui/lib'
import { Spinner } from '@repo/ui/components'

interface Props {
	title: string
	description: string
	className?: string
}

export const LoadingState = ({ title, description, className }: Props) => {
	return (
		<div className='flex flex-1 items-center justify-center px-8 py-4'>
			<div
				className={cn(
					'bg-primary-foreground flex flex-col items-center justify-center gap-y-6 rounded-xl p-10 shadow-sm',
					className,
				)}
			>
				<Spinner className='size-6' />

				<div className='flex flex-col gap-y-2 text-center'>
					<h6 className='text-lg font-medium'>{title}</h6>

					<p className='text-sm'>{description}</p>
				</div>
			</div>
		</div>
	)
}
