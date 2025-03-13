import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/app/lib/prisma'
import { Prisma } from '@prisma/client'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('q') || ''
  const page = parseInt(searchParams.get('page') || '1')
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

  return NextResponse.json({
    packages,
    total,
    page,
    perPage,
    totalPages: Math.ceil(total / perPage),
  })
} 