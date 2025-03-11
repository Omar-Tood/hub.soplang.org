import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { prisma } from '@/app/lib/prisma'
import { createHash } from 'crypto'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('q')
  const page = Number(searchParams.get('page')) || 1
  const perPage = 10

  const where = query
    ? {
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } },
        ],
      }
    : {}

  const [packages, total] = await Promise.all([
    prisma.package.findMany({
      where,
      orderBy: { downloads: 'desc' },
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

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const formData = await request.formData()
    const packageFile = formData.get('package') as File
    const description = formData.get('description') as string
    const keywords = (formData.get('keywords') as string)?.split(',').map((k) => k.trim()) || []
    const repository = formData.get('repository') as string

    if (!packageFile) {
      return NextResponse.json({ error: 'Package file is required' }, { status: 400 })
    }

    // Read package file and parse sop.toml
    const buffer = Buffer.from(await packageFile.arrayBuffer())
    const sha256 = createHash('sha256').update(buffer).digest('hex')

    // TODO: Parse sop.toml from package file
    // For now, using dummy data
    const packageData = {
      name: 'example-package',
      version: '1.0.0',
      description,
      keywords,
      repository,
      sha256,
      authorId: session.user.id,
    }

    // Check if package version already exists
    const existingPackage = await prisma.package.findFirst({
      where: {
        name: packageData.name,
        version: packageData.version,
      },
    })

    if (existingPackage) {
      return NextResponse.json(
        { error: 'Package version already exists' },
        { status: 400 }
      )
    }

    // Create package
    const pkg = await prisma.package.create({
      data: packageData,
    })

    // TODO: Upload package file to S3

    return NextResponse.json(pkg)
  } catch (error) {
    console.error('Failed to publish package:', error)
    return NextResponse.json(
      { error: 'Failed to publish package' },
      { status: 500 }
    )
  }
} 