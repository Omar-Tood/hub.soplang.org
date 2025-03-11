import { prisma } from '@/app/lib/prisma'
import Link from 'next/link'

async function getTrendingPackages() {
  return prisma.package.findMany({
    take: 5,
    orderBy: {
      downloads: 'desc',
    },
    select: {
      name: true,
      description: true,
      downloads: true,
      version: true,
      author: {
        select: {
          name: true,
        },
      },
    },
  })
}

export async function TrendingPackages() {
  const packages = await getTrendingPackages()

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Trending Packages</h2>
      <div className="grid gap-6">
        {packages.map((pkg) => (
          <Link
            key={pkg.name}
            href={`/packages/${pkg.name}`}
            className="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{pkg.name}</h3>
              <span className="text-sm text-gray-500 dark:text-gray-400">v{pkg.version}</span>
            </div>
            {pkg.description && (
              <p className="mt-2 text-gray-600 dark:text-gray-300">{pkg.description}</p>
            )}
            <div className="mt-4 flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
              <span>{pkg.downloads.toLocaleString()} downloads</span>
              {pkg.author?.name && <span>by {pkg.author.name}</span>}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
} 