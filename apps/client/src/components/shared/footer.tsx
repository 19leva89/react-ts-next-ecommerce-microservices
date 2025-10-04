import Link from 'next/link'
import Image from 'next/image'

export const Footer = () => {
	return (
		<div className='mt-16 flex flex-col items-center gap-8 rounded-lg bg-gray-800 p-8 md:flex-row md:items-start md:justify-between md:gap-0'>
			<div className='flex flex-col items-center justify-between gap-4 md:items-start'>
				<Link href='/' className='flex flex-1 items-center gap-2'>
					<Image src='/logo.png' alt='DimaTrend' width={36} height={36} />

					<p className='text-md hidden font-medium uppercase tracking-wider text-white md:block'>DimaTrend</p>
				</Link>

				<div>
					<p className='text-sm text-gray-400'>© 2025 DimaTrend</p>

					<p className='text-sm text-gray-400'>All rights reserved</p>
				</div>
			</div>

			<div className='flex flex-col items-center gap-4 text-sm text-gray-400 md:items-start'>
				<p className='text-sm text-amber-50'>Links</p>

				<Link href='/' className='hover:text-white'>
					Homepage
				</Link>

				<Link href='/' className='hover:text-white'>
					Contact
				</Link>

				<Link href='/' className='hover:text-white'>
					Terms of service
				</Link>

				<Link href='/' className='hover:text-white'>
					Privacy policy
				</Link>
			</div>

			<div className='flex flex-col items-center gap-4 text-sm text-gray-400 md:items-start'>
				<p className='text-sm text-amber-50'>Links</p>

				<Link href='/' className='hover:text-white'>
					All products
				</Link>

				<Link href='/' className='hover:text-white'>
					New arrivals
				</Link>

				<Link href='/' className='hover:text-white'>
					Best sellers
				</Link>

				<Link href='/' className='hover:text-white'>
					Sale
				</Link>
			</div>

			<div className='flex flex-col items-center gap-4 text-sm text-gray-400 md:items-start'>
				<p className='text-sm text-amber-50'>Links</p>

				<Link href='/' className='hover:text-white'>
					About
				</Link>

				<Link href='/' className='hover:text-white'>
					Contact
				</Link>

				<Link href='/' className='hover:text-white'>
					Blog
				</Link>

				<Link href='/' className='hover:text-white'>
					Affiliate program
				</Link>
			</div>
		</div>
	)
}
