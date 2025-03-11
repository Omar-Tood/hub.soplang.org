import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { prisma } from '@/app/lib/prisma'
import { randomBytes } from 'crypto'

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const apiKeys = await prisma.apiKey.findMany({
    where: { userId: session.user.id },
    select: {
      id: true,
      name: true,
      createdAt: true,
    },
  })

  return NextResponse.json(apiKeys)
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()
  const { name } = body

  if (!name) {
    return NextResponse.json({ error: 'Name is required' }, { status: 400 })
  }

  // Generate a secure random API key
  const key = `sop_${randomBytes(32).toString('hex')}`

  const apiKey = await prisma.apiKey.create({
    data: {
      name,
      key,
      userId: session.user.id,
    },
  })

  // Return the key only once
  return NextResponse.json({
    id: apiKey.id,
    name: apiKey.name,
    key,
    createdAt: apiKey.createdAt,
  })
} 