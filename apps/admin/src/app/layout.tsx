import { cn } from '@repo/ui/lib'
import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import { PropsWithChildren } from 'react'
import { ClerkProvider } from '@clerk/nextjs'

import '@repo/ui/globals.css'

const nunito = Nunito({
	subsets: ['cyrillic'],
	variable: '--font-nunito',
	weight: ['400', '500', '600', '700', '800', '900'],
})

export const metadata: Metadata = {
	title: 'E-commerce Admin dashboard',
	description: 'Admin dashboard for E-commerce app',
}

async function RootLayout({ children }: PropsWithChildren) {
	return (
		<ClerkProvider>
			<html lang='en' suppressHydrationWarning>
				<body className={cn(nunito.className, 'antialiased')}>{children}</body>
			</html>
		</ClerkProvider>
	)
}

export default RootLayout
