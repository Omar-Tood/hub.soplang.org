import { notFound } from 'next/navigation'
import { prisma } from '@/app/lib/prisma'
import { PackageHeader } from '@/app/components/packages/PackageHeader'
import { PackageReadme } from '@/app/components/packages/PackageReadme'
import { PackageDependencies } from '@/app/components/packages/PackageDependencies'
import { PackageVersions } from '@/app/components/packages/PackageVersions'
import { PackageLicense } from '@/app/components/packages/PackageLicense'

type Props = {
  params: {
    package: string
  }
}

async function getPackage(name: string) {
  const pkg = await prisma.package.findUnique({
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
    select: {
      id: true,
      name: true,
      version: true,
      description: true,
      keywords: true,
      repository: true,
      license: true,
      readme: true,
      downloads: true,
      createdAt: true,
      updatedAt: true,
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
    notFound()
  }

  return pkg
}

export async function generateMetadata({ params }: Props) {
  const pkg = await getPackage(params.package)

  return {
    title: `${pkg.name} | Soplang Hub`,
    description: pkg.description,
  }
}

export default async function PackagePage({ params }: Props) {
  const pkg = await getPackage(params.package)

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <PackageHeader package={pkg} />

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <PackageReadme content={pkg.readme || ''} />
          </div>

          <div className="space-y-8">
            <PackageVersions packageName={pkg.name} currentVersion={pkg.version} />
            <PackageDependencies dependencies={pkg.dependencies} />
            <PackageLicense license={pkg.license || 'MIT'} />
          </div>
        </div>
      </div>
    </div>
  )
} 