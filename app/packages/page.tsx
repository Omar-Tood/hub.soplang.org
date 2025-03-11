import { prisma } from '@/app/lib/prisma'
import Link from 'next/link'
import { PackageList } from '@/app/components/packages/PackageList'
import { PackageFilters } from '@/app/components/packages/PackageFilters'

export const metadata = {
  title: 'Packages | Soplang Hub',
  description: 'Browse and discover Soplang packages',
}

type SearchParams = {
  sort?: string
  filter?: string
  page?: string
}

async function getPackages(searchParams: SearchParams) {
  const page = Number(searchParams.page) || 1
  const perPage = 10

  const where = {}
  const orderBy: any = {}

  // Apply filters
  if (searchParams.filter === 'popular') {
    orderBy.downloads = 'desc'
  } else if (searchParams.filter === 'new') {
    orderBy.createdAt = 'desc'
  }

  // Get total count for pagination
  const total = await prisma.package.count({ where })

  // Get packages
  const packages = await prisma.package.findMany({
    where,
    orderBy,
    skip: (page - 1) * perPage,
    take: perPage,
    include: {
      author: {
        select: {
          name: true,
        },
      },
    },
  })

  return {
    packages,
    pagination: {
      total,
      pages: Math.ceil(total / perPage),
      current: page,
    },
  }
}

export default async function PackagesPage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const { packages, pagination } = await getPackages(searchParams)

  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Packages
            </h1>
            <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
              Browse and discover packages for your Soplang projects
            </p>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <Link
              href="/publish"
              className="block rounded-md bg-blue-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Publish Package
            </Link>
          </div>
        </div>

        <div className="mt-8 flow-root">
          <PackageFilters />
          <PackageList packages={packages} pagination={pagination} />
        </div>
      </div>
    </div>
  )
} 