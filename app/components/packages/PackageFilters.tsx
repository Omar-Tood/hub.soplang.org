'use client'

import { Fragment, useState } from 'react'
import { Menu, Transition, Switch } from '@headlessui/react'
import {
  ChevronDownIcon,
  FunnelIcon,
  ArrowsUpDownIcon,
  TagIcon,
  ClockIcon,
  ArrowDownTrayIcon,
  XMarkIcon,
} from '@heroicons/react/20/solid'
import { useRouter, useSearchParams } from 'next/navigation'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

const sortOptions = [
  { name: 'Recent Downloads', value: 'recent-downloads', icon: ArrowDownTrayIcon },
  { name: 'All-Time Downloads', value: 'all-time-downloads', icon: ArrowDownTrayIcon },
  { name: 'Recently Updated', value: 'recently-updated', icon: ClockIcon },
  { name: 'Alphabetical', value: 'alphabetical', icon: TagIcon },
]

const filters = {
  categories: [
    { value: 'all', label: 'All Categories' },
    { value: 'web', label: 'Web Development' },
    { value: 'cli', label: 'CLI Tools' },
    { value: 'database', label: 'Database' },
    { value: 'testing', label: 'Testing' },
    { value: 'utils', label: 'Utilities' },
  ],
  maintenance: [
    { value: 'all', label: 'All Status' },
    { value: 'actively-maintained', label: 'Actively Maintained' },
    { value: 'stable', label: 'Stable' },
    { value: 'experimental', label: 'Experimental' },
  ],
}

export function PackageFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [showVerifiedOnly, setShowVerifiedOnly] = useState(false)

  const currentSort = searchParams.get('sort') || 'recent-downloads'
  const currentCategory = searchParams.get('category') || 'all'
  const currentMaintenance = searchParams.get('maintenance') || 'all'

  const handleSort = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('sort', value)
    router.push(`/browse?${params.toString()}`)
  }

  const handleFilter = (type: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set(type, value)
    router.push(`/browse?${params.toString()}`)
  }

  const handleVerifiedToggle = (checked: boolean) => {
    setShowVerifiedOnly(checked)
    const params = new URLSearchParams(searchParams.toString())
    if (checked) {
      params.set('verified', 'true')
    } else {
      params.delete('verified')
    }
    router.push(`/browse?${params.toString()}`)
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-6">
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div className="flex flex-1 items-center space-x-4">
          {/* Sort Dropdown */}
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button className="group inline-flex items-center justify-center rounded-md bg-white dark:bg-gray-700 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <ArrowsUpDownIcon 
                  className="mr-2 h-5 w-5 flex-none text-gray-400 group-hover:text-gray-500" 
                  aria-hidden="true" 
                />
                Sort by
                <ChevronDownIcon
                  className="ml-2 h-5 w-5 flex-none text-gray-400 group-hover:text-gray-500"
                  aria-hidden="true"
                />
              </Menu.Button>
            </div>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute left-0 z-10 mt-2 w-56 origin-top-left rounded-md bg-white dark:bg-gray-700 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  {sortOptions.map((option) => (
                    <Menu.Item key={option.value}>
                      {({ active }) => (
                        <button
                          onClick={() => handleSort(option.value)}
                          className={`
                            flex items-center px-4 py-2 text-sm w-full
                            ${active 
                              ? 'bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-white' 
                              : 'text-gray-700 dark:text-gray-200'
                            }
                            ${currentSort === option.value ? 'font-medium' : ''}
                          `}
                        >
                          <option.icon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                          {option.name}
                        </button>
                      )}
                    </Menu.Item>
                  ))}
                </div>
              </Menu.Items>
            </Transition>
          </Menu>

          {/* Category Filter */}
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button className="group inline-flex items-center justify-center rounded-md bg-white dark:bg-gray-700 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <TagIcon 
                  className="mr-2 h-5 w-5 flex-none text-gray-400 group-hover:text-gray-500" 
                  aria-hidden="true" 
                />
                Category
                <ChevronDownIcon
                  className="ml-2 h-5 w-5 flex-none text-gray-400 group-hover:text-gray-500"
                  aria-hidden="true"
                />
              </Menu.Button>
            </div>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute left-0 z-10 mt-2 w-56 origin-top-left rounded-md bg-white dark:bg-gray-700 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  {filters.categories.map((category) => (
                    <Menu.Item key={category.value}>
                      {({ active }) => (
                        <button
                          onClick={() => handleFilter('category', category.value)}
                          className={`
                            flex items-center px-4 py-2 text-sm w-full
                            ${active 
                              ? 'bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-white' 
                              : 'text-gray-700 dark:text-gray-200'
                            }
                            ${currentCategory === category.value ? 'font-medium' : ''}
                          `}
                        >
                          {category.label}
                        </button>
                      )}
                    </Menu.Item>
                  ))}
                </div>
              </Menu.Items>
            </Transition>
          </Menu>

          {/* Maintenance Status Filter */}
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button className="group inline-flex items-center justify-center rounded-md bg-white dark:bg-gray-700 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <ClockIcon 
                  className="mr-2 h-5 w-5 flex-none text-gray-400 group-hover:text-gray-500" 
                  aria-hidden="true" 
                />
                Status
                <ChevronDownIcon
                  className="ml-2 h-5 w-5 flex-none text-gray-400 group-hover:text-gray-500"
                  aria-hidden="true"
                />
              </Menu.Button>
            </div>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute left-0 z-10 mt-2 w-56 origin-top-left rounded-md bg-white dark:bg-gray-700 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  {filters.maintenance.map((status) => (
                    <Menu.Item key={status.value}>
                      {({ active }) => (
                        <button
                          onClick={() => handleFilter('maintenance', status.value)}
                          className={`
                            flex items-center px-4 py-2 text-sm w-full
                            ${active 
                              ? 'bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-white' 
                              : 'text-gray-700 dark:text-gray-200'
                            }
                            ${currentMaintenance === status.value ? 'font-medium' : ''}
                          `}
                        >
                          {status.label}
                        </button>
                      )}
                    </Menu.Item>
                  ))}
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>

        {/* Verified Toggle */}
        <div className="flex items-center">
          <Switch
            checked={showVerifiedOnly}
            onChange={handleVerifiedToggle}
            className={`${
              showVerifiedOnly ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-600'
            } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
          >
            <span className="sr-only">Show verified packages only</span>
            <span
              className={`${
                showVerifiedOnly ? 'translate-x-5' : 'translate-x-0'
              } pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
            />
          </Switch>
          <span className="ml-3 text-sm text-gray-600 dark:text-gray-300">
            Verified packages only
          </span>
        </div>
      </div>

      {/* Active Filters */}
      <div className="mt-4 flex flex-wrap gap-2">
        {currentCategory !== 'all' && (
          <span className="inline-flex items-center rounded-full bg-blue-50 dark:bg-blue-900/50 px-3 py-1 text-sm font-medium text-blue-700 dark:text-blue-200">
            {filters.categories.find(c => c.value === currentCategory)?.label}
            <button
              type="button"
              onClick={() => handleFilter('category', 'all')}
              className="ml-1 inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full hover:bg-blue-200 dark:hover:bg-blue-800 focus:bg-blue-500 focus:outline-none"
            >
              <span className="sr-only">Remove filter</span>
              <XMarkIcon className="h-4 w-4" />
            </button>
          </span>
        )}
        {currentMaintenance !== 'all' && (
          <span className="inline-flex items-center rounded-full bg-blue-50 dark:bg-blue-900/50 px-3 py-1 text-sm font-medium text-blue-700 dark:text-blue-200">
            {filters.maintenance.find(m => m.value === currentMaintenance)?.label}
            <button
              type="button"
              onClick={() => handleFilter('maintenance', 'all')}
              className="ml-1 inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full hover:bg-blue-200 dark:hover:bg-blue-800 focus:bg-blue-500 focus:outline-none"
            >
              <span className="sr-only">Remove filter</span>
              <XMarkIcon className="h-4 w-4" />
            </button>
          </span>
        )}
      </div>
    </div>
  )
} 