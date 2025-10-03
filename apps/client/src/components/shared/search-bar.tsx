'use client'

import { useState } from 'react'
import { SearchIcon } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'

export const SearchBar = () => {
	const router = useRouter()
	const searchParams = useSearchParams()

	const [value, setValue] = useState<string>('')

	const handleSearch = (value: string) => {
		const params = new URLSearchParams(searchParams)
		params.set('search', value)
		router.push(`/products?${params.toString()}`, { scroll: false })
	}

	return (
		<div className='hidden items-center gap-2 rounded-md px-2 py-1 shadow-md ring-1 ring-gray-200 sm:flex'>
			<SearchIcon className='size-4 text-gray-500' />

			<input
				id='search'
				placeholder='Search...'
				onChange={(e) => setValue(e.target.value)}
				onKeyDown={(e) => {
					if (e.key === 'Enter') {
						handleSearch(value)
					}
				}}
				className='text-sm outline-0'
			/>
		</div>
	)
}
