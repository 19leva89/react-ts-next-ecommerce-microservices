import Link from 'next/link'
import Image from 'next/image'

export const Footer = () => {
	return (
		<div className='mt-16 flex flex-col items-center gap-8 rounded-lg bg-gray-800 p-8 md:flex-row md:items-start md:justify-between md:gap-0'>
			<div className='flex flex-col items-center gap-4 md:items-start'>
				<Link href='/' className='flex items-center'>
					<Image src='/logo.png' alt='TrendLama' width={36} height={36} />
					<p className='text-md hidden font-medium tracking-wider text-white md:block'>TRENDLAMA.</p>
				</Link>

				<p className='text-sm text-gray-400'>© 2025 Trendlama.</p>

				<p className='text-sm text-gray-400'>All rights reserved.</p>
			</div>

			<div className='flex flex-col items-center gap-4 text-sm text-gray-400 md:items-start'>
				<p className='text-sm text-amber-50'>Links</p>
				<Link href='/'>Homepage</Link>
				<Link href='/'>Contact</Link>
				<Link href='/'>Terms of Service</Link>
				<Link href='/'>Privacy Policy</Link>
			</div>

			<div className='flex flex-col items-center gap-4 text-sm text-gray-400 md:items-start'>
				<p className='text-sm text-amber-50'>Links</p>
				<Link href='/'>All Products</Link>
				<Link href='/'>New Arrivals</Link>
				<Link href='/'>Best Sellers</Link>
				<Link href='/'>Sale</Link>
			</div>

			<div className='flex flex-col items-center gap-4 text-sm text-gray-400 md:items-start'>
				<p className='text-sm text-amber-50'>Links</p>
				<Link href='/'>About</Link>
				<Link href='/'>Contact</Link>
				<Link href='/'>Blog</Link>
				<Link href='/'>Affiliate Program</Link>
			</div>
		</div>
	)
}
