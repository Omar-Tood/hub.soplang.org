import { PackageDependency } from '@prisma/client'
import Link from 'next/link'

type PackageDependenciesProps = {
  dependencies: PackageDependency[]
}

export function PackageDependencies({ dependencies }: PackageDependenciesProps) {
  if (dependencies.length === 0) {
    return null
  }

  return (
    <div className="rounded-lg bg-gray-50 dark:bg-gray-800 p-6">
      <h2 className="text-lg font-medium text-gray-900 dark:text-white">Dependencies</h2>
      <ul className="mt-4 space-y-3">
        {dependencies.map((dep) => (
          <li key={dep.id} className="flex items-center justify-between">
            <Link
              href={`/packages/${dep.dependencyName}`}
              className="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
            >
              {dep.dependencyName}
            </Link>
            <span className="text-sm text-gray-500 dark:text-gray-400">{dep.versionRange}</span>
          </li>
        ))}
      </ul>
    </div>
  )
} 