'use client'

import { SearchIcon } from 'lucide-react'
import { KeyboardEvent, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@repo/ui/components'

export const SearchBar = () => {
	const router = useRouter()
	const searchParams = useSearchParams()

	const [value, setValue] = useState<string>('')

	const handleSearch = (searchValue: string) => {
		const params = new URLSearchParams(searchParams)
		params.set('search', searchValue)
		router.push(`/products?${params.toString()}`, { scroll: false })
	}

	const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			handleSearch(value)
		}
	}

	return (
		<InputGroup>
			<InputGroupInput
				placeholder='Search...'
				value={value}
				onKeyDown={handleKeyDown}
				onChange={(e) => setValue(e.target.value)}
			/>

			<InputGroupAddon align='inline-start'>
				<SearchIcon />
			</InputGroupAddon>
		</InputGroup>
	)
}
