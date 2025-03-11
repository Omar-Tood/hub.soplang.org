import { prisma } from '@/app/lib/prisma'
import { PackageCreateInput, PackageSearchResult } from '../models/Package'

export async function getAllPackages(page = 1, limit = 10, sort = 'downloads') {
  const skip = (page - 1) * limit
  const orderBy: any = {}
  
  switch (sort) {
    case 'downloads':
      orderBy.downloads = 'desc'
      break
    case 'newest':
      orderBy.createdAt = 'desc'
      break
    case 'updated':
      orderBy.updatedAt = 'desc'
      break
    case 'name':
      orderBy.name = 'asc'
      break
    default:
      orderBy.downloads = 'desc'
  }

  const [packages, total] = await Promise.all([
    prisma.package.findMany({
      skip,
      take: limit,
      orderBy,
      include: {
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

export async function searchPackages(query: string, page = 1, limit = 10): Promise<{
  packages: PackageSearchResult[]
  pagination: {
    total: number
    pages: number
    current: number
  }
}> {
  const skip = (page - 1) * limit

  const where = {
    OR: [
      { name: { contains: query, mode: 'insensitive' } },
      { description: { contains: query, mode: 'insensitive' } },
      { keywords: { has: query } },
    ],
  }

  const [packages, total] = await Promise.all([
    prisma.package.findMany({
      where,
      skip,
      take: limit,
      orderBy: { downloads: 'desc' },
      include: {
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

  const results = packages.map((pkg) => ({
    id: pkg.id,
    name: pkg.name,
    version: pkg.version,
    description: pkg.description,
    downloads: pkg.downloads,
    authorName: pkg.author.name,
    authorImage: pkg.author.image,
    createdAt: pkg.createdAt,
    updatedAt: pkg.updatedAt,
  }))

  return {
    packages: results,
    pagination: {
      total,
      pages: Math.ceil(total / limit),
      current: page,
    },
  }
}

export async function createPackage(data: PackageCreateInput) {
  return prisma.package.create({
    data,
  })
}

export async function updatePackage(id: string, data: Partial<PackageCreateInput>) {
  return prisma.package.update({
    where: { id },
    data,
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