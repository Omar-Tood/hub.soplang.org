import Link from 'next/link'
import { ChevronRightIcon } from '@heroicons/react/20/solid'
import { packageController } from '@/backend/api'

async function getNewPackages() {
  return packageController.getNewPackages()
}

export async function NewPackages() {
  const packages = await getNewPackages()

  return (
    <div className="space-y-4">
      {packages.map((pkg) => (
        <Link
          key={pkg.name}
          href={`/packages/${pkg.name}`}
          className="block rounded-lg bg-gray-50 dark:bg-gray-800 p-4 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">{pkg.name}</h3>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">v{pkg.version}</p>
            </div>
            <ChevronRightIcon className="h-5 w-5 text-gray-400" />
          </div>
        </Link>
      ))}
    </div>
  )
} 