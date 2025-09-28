import { twMerge } from 'tailwind-merge'
import { clsx, type ClassValue } from 'clsx'

/**
 * Utility function that combines clsx and tailwind-merge for conditional CSS class handling
 * Merges class names while resolving Tailwind CSS conflicts intelligently
 * @param inputs - Array of class values (strings, objects, arrays, etc.) to be processed
 * @returns Merged and deduplicated class string with Tailwind conflicts resolved
 */
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}
