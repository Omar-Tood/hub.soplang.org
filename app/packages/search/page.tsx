import { PackageList } from '@/app/components/packages/PackageList'
import { PackageFilters } from '@/app/components/packages/PackageFilters'
import { prisma } from '@/app/lib/prisma'
import { Prisma } from '@prisma/client'

type SearchParams = {
  q?: string
  page?: string
}

export function generateMetadata({ searchParams }: { searchParams: SearchParams }) {
  return {
    title: `Search: ${searchParams.q || ''} | Soplang Hub`,
    description: `Search results for "${searchParams.q}" on Soplang Hub`,
  }
}

async function searchPackages(searchParams: SearchParams) {
  const query = searchParams.q || ''
  const page = parseInt(searchParams.page || '1')
  const perPage = 10

  const where: Prisma.PackageWhereInput = {
    OR: [
      {
        name: {
          contains: query,
          mode: Prisma.QueryMode.insensitive,
        },
      },
      {
        description: {
          contains: query,
          mode: Prisma.QueryMode.insensitive,
        },
      },
      {
        keywords: {
          hasSome: [query],
        },
      },
    ],
  }

  const [packages, total] = await Promise.all([
    prisma.package.findMany({
      where,
      orderBy: [
        { downloads: 'desc' },
        { createdAt: 'desc' },
      ],
      skip: (page - 1) * perPage,
      take: perPage,
      select: {
        id: true,
        name: true,
        version: true,
        description: true,
        keywords: true,
        repository: true,
        license: true,
        downloads: true,
        createdAt: true,
        updatedAt: true,
        author: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    }),
    prisma.package.count({ where }),
  ])

  return {
    packages,
    pagination: {
      total,
      pages: Math.ceil(total / perPage),
      current: page,
    },
  }
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const { packages, pagination } = await searchPackages(searchParams)

  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Search Results
            </h1>
            <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
              {pagination.total} packages found for "{searchParams.q}"
            </p>
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