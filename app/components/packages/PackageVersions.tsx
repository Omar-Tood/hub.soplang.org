import { prisma } from '@/app/lib/prisma'
import Link from 'next/link'

type PackageVersionsProps = {
  packageName: string
  currentVersion: string
}

async function getVersions(packageName: string) {
  return prisma.package.findMany({
    where: { name: packageName },
    select: {
      version: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
}

export async function PackageVersions({ packageName, currentVersion }: PackageVersionsProps) {
  const versions = await getVersions(packageName)

  return (
    <div className="rounded-lg bg-gray-50 dark:bg-gray-800 p-6">
      <h2 className="text-lg font-medium text-gray-900 dark:text-white">Versions</h2>
      <ul className="mt-4 space-y-3">
        {versions.map((version) => (
          <li key={version.version} className="flex items-center justify-between">
            <Link
              href={`/packages/${packageName}/versions/${version.version}`}
              className={`text-sm ${
                version.version === currentVersion
                  ? 'font-medium text-blue-600 dark:text-blue-400'
                  : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              v{version.version}
            </Link>
            <time
              dateTime={version.createdAt.toISOString()}
              className="text-sm text-gray-500 dark:text-gray-400"
            >
              {new Date(version.createdAt).toLocaleDateString()}
            </time>
          </li>
        ))}
      </ul>
    </div>
  )
} 