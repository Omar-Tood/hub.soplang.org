import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'
import { 
  ArrowDownTrayIcon, 
  ClockIcon, 
  StarIcon,
  ShieldCheckIcon,
  TagIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/outline'

interface Package {
  id: string
  name: string
  version: string
  description: string
  downloads: number
  createdAt: Date
  updatedAt: Date
  license: string
  author: {
    name: string
    image?: string
  }
  stars?: number
  isVerified?: boolean
  categories?: string[]
  maintenance?: string
}

interface PaginationProps {
  total: number
  pages: number
  current: number
}

interface PackageListProps {
  packages: Package[]
  pagination: PaginationProps
}

export function PackageList({ packages, pagination }: PackageListProps) {
  return (
    <div className="mt-8">
      <div className="space-y-4">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className="bg-white dark:bg-gray-800 px-6 py-6 shadow sm:rounded-lg hover:shadow-md dark:hover:bg-gray-750 transition-all duration-200"
          >
            <div className="space-y-4">
              {/* Header */}
              <div className="sm:flex sm:items-center sm:justify-between">
                <div className="sm:flex sm:items-center">
                  <div>
                    <div className="flex items-center">
                      <Link
                        href={`/packages/${pkg.name}`}
                        className="text-xl font-semibold text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        {pkg.name}
                      </Link>
                      <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                        v{pkg.version}
                      </span>
                      {pkg.isVerified && (
                        <ShieldCheckIcon 
                          className="ml-2 h-5 w-5 text-green-500" 
                          aria-label="Verified package"
                        />
                      )}
                    </div>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                      {pkg.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Stats and Info */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center">
                  <ArrowDownTrayIcon className="mr-1.5 h-5 w-5 flex-shrink-0" />
                  <span>{pkg.downloads.toLocaleString()} downloads</span>
                </div>

                <div className="flex items-center">
                  <ClockIcon className="mr-1.5 h-5 w-5 flex-shrink-0" />
                  <span>Updated {formatDistanceToNow(pkg.updatedAt, { addSuffix: true })}</span>
                </div>

                <div className="flex items-center">
                  <DocumentTextIcon className="mr-1.5 h-5 w-5 flex-shrink-0" />
                  <span>{pkg.license || 'MIT'}</span>
                </div>

                {pkg.stars !== undefined && (
                  <div className="flex items-center">
                    <StarIcon className="mr-1.5 h-5 w-5 flex-shrink-0" />
                    <span>{pkg.stars.toLocaleString()} stars</span>
                  </div>
                )}

                {pkg.maintenance && (
                  <div className="flex items-center">
                    <span className={`
                      inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
                      ${pkg.maintenance === 'actively-maintained' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                        : pkg.maintenance === 'stable'
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                      }
                    `}>
                      {pkg.maintenance}
                    </span>
                  </div>
                )}
              </div>

              {/* Categories */}
              {pkg.categories && pkg.categories.length > 0 && (
                <div className="flex items-center gap-2">
                  <TagIcon className="h-4 w-4 text-gray-400" />
                  <div className="flex flex-wrap gap-2">
                    {pkg.categories.map((category) => (
                      <span
                        key={category}
                        className="inline-flex items-center rounded-full bg-gray-100 dark:bg-gray-700 px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:text-gray-200"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <nav className="mt-8 flex items-center justify-between border-t border-gray-200 dark:border-gray-700 px-4 sm:px-0">
        <div className="flex w-0 flex-1">
          <button
            disabled={pagination.current === 1}
            className="inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed dark:text-gray-400 dark:hover:border-gray-600 dark:hover:text-gray-300"
          >
            Previous
          </button>
        </div>
        <div className="hidden md:flex">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Showing page <span className="font-medium">{pagination.current}</span> of{' '}
            <span className="font-medium">{pagination.pages}</span>
          </p>
        </div>
        <div className="flex w-0 flex-1 justify-end">
          <button
            disabled={pagination.current === pagination.pages}
            className="inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed dark:text-gray-400 dark:hover:border-gray-600 dark:hover:text-gray-300"
          >
            Next
          </button>
        </div>
      </nav>
    </div>
  )
} 