import type { Metadata } from 'next'
import { PropsWithChildren } from 'react'
import { ClerkProvider } from '@clerk/nextjs'
import { Geist, Geist_Mono } from 'next/font/google'

import '@repo/ui/globals.css'

import { Navbar } from '@/components/shared/navbar'
import { Footer } from '@/components/shared/footer'
import { ToasterProvider } from '@/components/shared/providers/toaster-provider'

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
})

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
})

export const metadata: Metadata = {
	title: 'TrendDima - Best Clothes',
	description: 'TrendDima is the best place to find the best clothes',
}

function RootLayout({ children }: PropsWithChildren) {
	return (
		<ClerkProvider>
			<html lang='en'>
				<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
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
