import { Package } from '@prisma/client'
import { ClipboardDocumentIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import { toast } from 'react-hot-toast'

type PackageWithAuthor = Package & {
  author: {
    name: string | null
    image: string | null
  }
}

type PackageHeaderProps = {
  package: PackageWithAuthor
}

export function PackageHeader({ package: pkg }: PackageHeaderProps) {
  const copyInstallCommand = () => {
    navigator.clipboard.writeText(`sop install ${pkg.name}`)
    toast.success('Copied to clipboard')
  }

  return (
    <div>
      <div className="md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h1 className="text-3xl font-bold leading-7 text-gray-900 dark:text-white sm:truncate sm:text-4xl sm:tracking-tight">
            {pkg.name}
          </h1>
          <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400">
            <span>v{pkg.version}</span>
            <span className="mx-2">•</span>
            <span>{pkg.downloads.toLocaleString()} downloads</span>
            {pkg.license && (
              <>
                <span className="mx-2">•</span>
                <span>{pkg.license}</span>
              </>
            )}
          </div>
        </div>
        <div className="mt-4 flex md:ml-4 md:mt-0">
          <button
            type="button"
            onClick={copyInstallCommand}
            className="inline-flex items-center gap-x-1.5 rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            <ClipboardDocumentIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
            Copy Install Command
          </button>
        </div>
      </div>

      {pkg.description && (
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">{pkg.description}</p>
      )}

      <div className="mt-6 flex items-center">
        <div className="flex-shrink-0">
          <Image
            className="h-10 w-10 rounded-full"
            src={pkg.author.image || '/images/placeholder.png'}
            alt=""
            width={40}
            height={40}
          />
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium text-gray-900 dark:text-white">
            {pkg.author.name}
          </p>
          <div className="flex space-x-1 text-sm text-gray-500 dark:text-gray-400">
            <time dateTime={pkg.createdAt.toISOString()}>
              Published {new Date(pkg.createdAt).toLocaleDateString()}
            </time>
          </div>
        </div>
      </div>

      <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-8">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">Installation</h2>
        <div className="mt-4">
          <div className="relative">
            <pre className="overflow-x-auto rounded-lg bg-gray-900 p-4">
              <code className="text-sm text-white">sop install {pkg.name}</code>
            </pre>
            <button
              type="button"
              onClick={copyInstallCommand}
              className="absolute right-2 top-2 rounded-md bg-white/10 p-2 text-white hover:bg-white/20"
            >
              <ClipboardDocumentIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 