import { ArrowDownTrayIcon, CubeIcon } from '@heroicons/react/24/outline'
import { userController } from '@/backend/api'

async function getStats() {
  return userController.getStats()
}

export async function Stats() {
  const stats = await getStats()

  return (
    <div className="w-full bg-gray-800 dark:bg-black py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <dl className="grid grid-cols-2 gap-x-8 gap-y-16 text-center">
          <div className="mx-auto flex max-w-xs flex-col gap-y-4">
            <dt className="text-base leading-7 text-gray-400">Total Downloads</dt>
            <dd className="order-first text-3xl font-semibold tracking-tight text-white sm:text-5xl">
              <div className="flex items-center justify-center gap-2">
                <ArrowDownTrayIcon className="h-8 w-8" />
                {stats.downloads.toLocaleString()}
              </div>
            </dd>
          </div>
          <div className="mx-auto flex max-w-xs flex-col gap-y-4">
            <dt className="text-base leading-7 text-gray-400">Total Packages</dt>
            <dd className="order-first text-3xl font-semibold tracking-tight text-white sm:text-5xl">
              <div className="flex items-center justify-center gap-2">
                <CubeIcon className="h-8 w-8" />
                {stats.packages.toLocaleString()}
              </div>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  )
} 