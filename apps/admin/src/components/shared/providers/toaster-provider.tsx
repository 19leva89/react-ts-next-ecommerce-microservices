'use client'

import { Toaster } from '@repo/ui/components'

export const ToasterProvider = () => {
	return <Toaster position='bottom-right' expand={false} richColors />
}
