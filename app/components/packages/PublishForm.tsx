'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import { ArrowUpTrayIcon } from '@heroicons/react/24/outline'

export function PublishForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [file, setFile] = useState<File | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!file) {
      toast.error('Please select a package file')
      return
    }

    setIsSubmitting(true)
    const formData = new FormData(e.currentTarget)
    formData.append('package', file)

    try {
      const response = await fetch('/api/packages', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to publish package')
      }

      const data = await response.json()
      toast.success('Package published successfully')
      router.push(`/packages/${data.name}`)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to publish package')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div>
        <label
          htmlFor="package"
          className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
        >
          Package File
        </label>
        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-300 dark:border-gray-700 px-6 py-10">
          <div className="text-center">
            <ArrowUpTrayIcon
              className="mx-auto h-12 w-12 text-gray-400"
              aria-hidden="true"
            />
            <div className="mt-4 flex text-sm leading-6 text-gray-600 dark:text-gray-400">
              <label
                htmlFor="file-upload"
                className="relative cursor-pointer rounded-md bg-white dark:bg-gray-900 font-semibold text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2 hover:text-blue-500"
              >
                <span>Upload a file</span>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  className="sr-only"
                  accept=".tar.gz,.tgz"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs leading-5 text-gray-600 dark:text-gray-400">
              .tar.gz or .tgz up to 50MB
            </p>
          </div>
        </div>
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
        >
          Description
        </label>
        <div className="mt-2">
          <textarea
            id="description"
            name="description"
            rows={3}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 dark:bg-gray-800 dark:text-white dark:ring-gray-700 dark:placeholder:text-gray-500 sm:text-sm sm:leading-6"
            placeholder="A brief description of your package"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="keywords"
          className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
        >
          Keywords
        </label>
        <div className="mt-2">
          <input
            type="text"
            name="keywords"
            id="keywords"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 dark:bg-gray-800 dark:text-white dark:ring-gray-700 dark:placeholder:text-gray-500 sm:text-sm sm:leading-6"
            placeholder="Comma-separated keywords"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="repository"
          className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
        >
          Repository URL
        </label>
        <div className="mt-2">
          <input
            type="url"
            name="repository"
            id="repository"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 dark:bg-gray-800 dark:text-white dark:ring-gray-700 dark:placeholder:text-gray-500 sm:text-sm sm:leading-6"
            placeholder="https://github.com/username/repository"
          />
        </div>
      </div>

      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Publishing...' : 'Publish Package'}
        </button>
      </div>
    </form>
  )
} 