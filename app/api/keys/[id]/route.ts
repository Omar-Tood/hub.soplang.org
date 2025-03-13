import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import authOptions from '@/app/api/auth/[...nextauth]/route'
import { prisma } from '@/app/lib/prisma'

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const apiKey = await prisma.apiKey.findUnique({
    where: { id: params.id },
    select: { userId: true },
  })

  if (!apiKey) {
    return NextResponse.json({ error: 'API key not found' }, { status: 404 })
  }

  if (apiKey.userId !== session.user.id) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  await prisma.apiKey.delete({
    where: { id: params.id },
  })

  return new NextResponse(null, { status: 204 })
} 