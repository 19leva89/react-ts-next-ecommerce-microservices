import { cookies } from 'next/headers'
import { PropsWithChildren } from 'react'
import { SidebarProvider } from '@repo/ui/components'

import { Navbar } from '@/components/shared/navbar'
import { AppSidebar } from '@/components/shared/app-sidebar'
import { QueryProvider } from '@/components/shared/providers/query-provider'
import { ThemeProvider } from '@/components/shared/providers/theme-provider'
import { ToasterProvider } from '@/components/shared/providers/toaster-provider'

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
