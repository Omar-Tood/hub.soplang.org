'use client'

import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { KeyIcon, TrashIcon } from '@heroicons/react/24/outline'

type ApiKey = {
  id: string
  name: string
  key: string
  createdAt: string
}

export function ApiKeys() {
  const [isCreating, setIsCreating] = useState(false)
  const [keyName, setKeyName] = useState('')
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([])
  const [newKey, setNewKey] = useState<string | null>(null)

  const createApiKey = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsCreating(true)

    try {
      const response = await fetch('/api/keys', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: keyName }),
      })

      if (!response.ok) {
        throw new Error('Failed to create API key')
      }

      const data = await response.json()
      setNewKey(data.key)
      setApiKeys((keys) => [...keys, data])
      setKeyName('')
      toast.success('API key created')
    } catch (error) {
      toast.error('Failed to create API key')
    } finally {
      setIsCreating(false)
    }
  }

  const deleteApiKey = async (id: string) => {
    try {
      const response = await fetch(`/api/keys/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete API key')
      }

      setApiKeys((keys) => keys.filter((key) => key.id !== id))
      toast.success('API key deleted')
    } catch (error) {
      toast.error('Failed to delete API key')
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">API Keys</h2>
        <button
          type="button"
          onClick={() => setIsCreating(true)}
          className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          Create Key
        </button>
      </div>

      {isCreating && (
        <form onSubmit={createApiKey} className="mt-4">
          <div className="flex gap-4">
            <input
              type="text"
              value={keyName}
              onChange={(e) => setKeyName(e.target.value)}
              placeholder="Key name"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 dark:bg-gray-800 dark:text-white dark:ring-gray-700 dark:placeholder:text-gray-500 sm:text-sm sm:leading-6"
            />
            <button
              type="submit"
              className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Create
            </button>
          </div>
        </form>
      )}

      {newKey && (
        <div className="mt-4 rounded-md bg-blue-50 dark:bg-blue-900 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <KeyIcon className="h-5 w-5 text-blue-400" aria-hidden="true" />
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-blue-800 dark:text-blue-200">
                New API Key Created
              </p>
              <p className="mt-2 text-sm text-blue-700 dark:text-blue-300">
                Make sure to copy your API key now. You won't be able to see it again!
              </p>
              <div className="mt-2">
                <input
                  type="text"
                  readOnly
                  value={newKey}
                  className="block w-full rounded-md border-0 bg-white/50 dark:bg-gray-800/50 py-1.5 text-blue-900 dark:text-blue-100 shadow-sm ring-1 ring-inset ring-blue-300 dark:ring-blue-700 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mt-6 flow-root">
        <ul role="list" className="-my-5 divide-y divide-gray-200 dark:divide-gray-700">
          {apiKeys.map((key) => (
            <li key={key.id} className="py-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{key.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Created {new Date(key.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => deleteApiKey(key.id)}
                  className="rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-gray-800 dark:text-gray-500 dark:hover:text-gray-400"
                >
                  <span className="sr-only">Delete API key</span>
                  <TrashIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
} 