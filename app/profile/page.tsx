import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { prisma } from '@/app/lib/prisma'
import { PackageList } from '@/app/components/packages/PackageList'
import { ApiKeys } from '@/app/components/profile/ApiKeys'

export const metadata = {
  title: 'Profile | Soplang Hub',
  description: 'Manage your Soplang Hub profile and packages',
}

async function getUserPackages(userId: string) {
  const [packages, total] = await Promise.all([
    prisma.package.findMany({
      where: { authorId: userId },
      orderBy: { createdAt: 'desc' },
      include: {
        author: {
          select: {
            name: true,
          },
        },
      },
    }),
    prisma.package.count({
      where: { authorId: userId },
    }),
  ])

  return {
    packages,
    pagination: {
      total,
      pages: 1,
      current: 1,
    },
  }
}

export default async function ProfilePage() {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    redirect('/api/auth/signin')
  }

  const { packages, pagination } = await getUserPackages(session.user.id)

  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Your Profile
            </h1>
            <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
              Manage your packages and API keys
            </p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                  Your Packages
                </h2>
                <div className="mt-4">
                  <PackageList packages={packages} pagination={pagination} />
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <ApiKeys />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 