import { prisma } from '@/app/lib/prisma'
import { UserRole } from '../models/User'

export async function getUserById(id: string) {
  return prisma.user.findUnique({
    where: { id },
  })
}

export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email },
  })
}

export async function getUserPackages(userId: string) {
  return prisma.package.findMany({
    where: { authorId: userId },
    orderBy: { createdAt: 'desc' },
  })
}

export async function updateUserRole(userId: string, role: UserRole) {
  return prisma.user.update({
    where: { id: userId },
    data: { role },
  })
}

export async function getStats() {
  const [totalPackages, totalDownloads] = await Promise.all([
    prisma.package.count(),
    prisma.package.aggregate({
      _sum: {
        downloads: true,
      },
    }),
  ])

  return {
    packages: totalPackages,
    downloads: totalDownloads._sum.downloads || 0,
  }
} 