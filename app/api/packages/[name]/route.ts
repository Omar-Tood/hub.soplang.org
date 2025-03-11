import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { prisma } from '@/app/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: { name: string } }
) {
  const pkg = await prisma.package.findUnique({
    where: { name: params.name },
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

  if (!pkg) {
    return NextResponse.json({ error: 'Package not found' }, { status: 404 })
  }

  // Increment download count
  if (request.headers.get('x-download-request') === 'true') {
    await prisma.package.update({
      where: { id: pkg.id },
      data: { downloads: { increment: 1 } },
    })
  }

  return NextResponse.json(pkg)
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { name: string } }
) {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const pkg = await prisma.package.findUnique({
    where: { name: params.name },
    select: { authorId: true },
  })

  if (!pkg) {
    return NextResponse.json({ error: 'Package not found' }, { status: 404 })
  }

  if (pkg.authorId !== session.user.id && session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const body = await request.json()
  const { description, keywords, repository } = body

  const updatedPackage = await prisma.package.update({
    where: { name: params.name },
    data: {
      description,
      keywords,
      repository,
    },
  })

  return NextResponse.json(updatedPackage)
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { name: string } }
) {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const pkg = await prisma.package.findUnique({
    where: { name: params.name },
    select: { authorId: true },
  })

  if (!pkg) {
    return NextResponse.json({ error: 'Package not found' }, { status: 404 })
  }

  if (pkg.authorId !== session.user.id && session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  // TODO: Delete package file from S3

  await prisma.package.delete({
    where: { name: params.name },
  })

  return new NextResponse(null, { status: 204 })
} 