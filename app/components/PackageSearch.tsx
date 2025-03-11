'use client'

import { useState } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation'

export function PackageSearch() {
  const [query, setQuery] = useState('')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/packages/search?q=${encodeURIComponent(query.trim())}`)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </div>
        <input
          type="text"
          name="search"
          id="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="block w-full rounded-lg border-0 py-4 pl-11 pr-4 text-gray-900 bg-white/10 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-white/20 dark:text-white sm:text-sm sm:leading-6"
          placeholder="Type 'S' or '/' to search..."
        />
        <button
          type="submit"
          className="absolute right-2 top-2 rounded-md bg-white/10 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-white/20"
        >
          Search
        </button>
      </div>
    </form>
  )
} 