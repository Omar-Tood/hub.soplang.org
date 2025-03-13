import { prisma } from '@/app/lib/prisma'
import { PackageCreateInput, PackageSearchResult } from '../models/Package'
import { Prisma } from '@prisma/client'

export interface SearchPackagesParams {
  query?: string
  skip?: number
  limit?: number
}

export async function getAllPackages(page = 1, limit = 10, sort = 'downloads') {
  const skip = (page - 1) * limit

  const [packages, total] = await Promise.all([
    prisma.package.findMany({
      skip,
      take: limit,
      orderBy: { [sort]: 'desc' },
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
    prisma.package.count(),
  ])

  return {
    packages,
    pagination: {
      total,
      pages: Math.ceil(total / limit),
      current: page,
    },
  }
}

export async function getPackageByName(name: string) {
  return prisma.package.findUnique({
    where: { name },
    include: {
      author: {
        select: {
          name: true,
          image: true,
        },
      },
      dependencies: true,
    },
  })
}

export async function getPackageVersions(packageName: string) {
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

export async function searchPackages({ query, skip = 0, limit = 10 }: SearchPackagesParams) {
  const where: Prisma.PackageWhereInput = query
    ? {
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
    : {}

  const [packages, total] = await Promise.all([
    prisma.package.findMany({
      where,
      skip,
      take: limit,
      orderBy: { downloads: 'desc' },
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
      pages: Math.ceil(total / limit),
      current: Math.floor(skip / limit) + 1,
    },
  }
}

export async function getPackageById(id: string) {
  return prisma.package.findUnique({
    where: { id },
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
  })
}

export async function createPackage(data: PackageCreateInput) {
  return prisma.package.create({
    data,
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
  })
}

export async function updatePackage(id: string, data: Partial<PackageCreateInput>) {
  return prisma.package.update({
    where: { id },
    data,
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
  })
}

export async function deletePackage(id: string) {
  return prisma.package.delete({
    where: { id },
  })
}

export async function incrementDownloads(id: string) {
  return prisma.package.update({
    where: { id },
    data: {
      downloads: {
        increment: 1,
      },
    },
  })
}

export async function getNewPackages(limit = 5) {
  return prisma.package.findMany({
    take: limit,
    orderBy: {
      createdAt: 'desc',
    },
    select: {
      name: true,
      version: true,
      createdAt: true,
    },
  })
}

export async function getMostDownloadedPackages(limit = 5) {
  return prisma.package.findMany({
    take: limit,
    orderBy: {
      downloads: 'desc',
    },
    select: {
      name: true,
      version: true,
      downloads: true,
    },
  })
}

export async function getRecentlyUpdatedPackages(limit = 5) {
  return prisma.package.findMany({
    take: limit,
    orderBy: {
      updatedAt: 'desc',
    },
    select: {
      name: true,
      version: true,
      updatedAt: true,
    },
  })
} 