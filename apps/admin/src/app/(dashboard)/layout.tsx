import { cookies } from 'next/headers'
import { PropsWithChildren } from 'react'
import { SidebarProvider } from '@repo/ui/components'

import { AppSidebar, Navbar } from '@/components/shared'
import { QueryProvider, ThemeProvider, ToasterProvider } from '@/components/shared/providers'

async function RootLayout({ children }: PropsWithChildren) {
	const cookieStore = await cookies()
	const defaultOpen = cookieStore.get('sidebar_state')?.value === 'true'

	return (
		<QueryProvider>
			<div className='flex'>
				<ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
					<SidebarProvider defaultOpen={defaultOpen}>
						<AppSidebar />

						<main className='w-full'>
							<Navbar />

							<div className='px-4'>{children}</div>
						</main>
					</SidebarProvider>
				</ThemeProvider>
			</div>

			<ToasterProvider />
		</QueryProvider>
	)
}

export default RootLayout
