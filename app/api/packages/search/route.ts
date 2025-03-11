import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/app/lib/prisma'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('q')
  const page = Number(searchParams.get('page')) || 1
  const perPage = 10

  if (!query) {
    return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 })
  }

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
      orderBy: [
        { downloads: 'desc' },
        { createdAt: 'desc' },
      ],
      skip: (page - 1) * perPage,
      take: perPage,
      include: {
        author: {
          select: {
            name: true,
          },
        },
      },
    }),
    prisma.package.count({ where }),
  ])

  return NextResponse.json({
    packages,
    pagination: {
      total,
      pages: Math.ceil(total / perPage),
      current: page,
    },
  })
} 