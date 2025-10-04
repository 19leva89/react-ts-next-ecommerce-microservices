import { cn } from '@repo/ui/lib'
import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import { PropsWithChildren } from 'react'
import { ClerkProvider } from '@clerk/nextjs'

import '@repo/ui/globals.css'

import { Footer, Navbar } from '@/components/shared'
import { ToasterProvider } from '@/components/shared/providers'

const nunito = Nunito({
	subsets: ['cyrillic'],
	variable: '--font-nunito',
	weight: ['400', '500', '600', '700', '800', '900'],
})

export const metadata: Metadata = {
	title: 'DimaTrend - Best Clothes',
	description: 'DimaTrend is the best place to find the best clothes',
}

function RootLayout({ children }: PropsWithChildren) {
	return (
		<ClerkProvider>
			<html lang='en' suppressHydrationWarning>
				<body className={cn(nunito.className, 'antialiased')}>
					<div className='mx-auto p-4 sm:max-w-xl sm:px-0 md:max-w-2xl lg:max-w-3xl xl:max-w-6xl'>
						<Navbar />

						{children}

						<Footer />
					</div>

					<ToasterProvider />
				</body>
			</html>
		</ClerkProvider>
	)
}

export default RootLayout
