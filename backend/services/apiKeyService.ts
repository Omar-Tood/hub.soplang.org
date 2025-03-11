import { prisma } from '@/app/lib/prisma'
import { ApiKeyCreateInput } from '../models/ApiKey'
import crypto from 'crypto'

export async function getUserApiKeys(userId: string) {
  return prisma.apiKey.findMany({
    where: { userId },
    select: {
      id: true,
      name: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
}

export async function createApiKey(data: ApiKeyCreateInput) {
  const key = crypto.randomBytes(32).toString('hex')
  
  const apiKey = await prisma.apiKey.create({
    data: {
      ...data,
      key,
    },
  })
  
  return apiKey
}

export async function deleteApiKey(id: string, userId: string) {
  return prisma.apiKey.deleteMany({
    where: {
      id,
      userId,
    },
  })
}

export async function validateApiKey(key: string) {
  return prisma.apiKey.findUnique({
    where: { key },
    include: {
      user: {
        select: {
          id: true,
          role: true,
        },
      },
    },
  })
} 