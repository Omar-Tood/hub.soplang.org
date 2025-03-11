import React from 'react'
import { PackageSearch } from '@/app/components/PackageSearch'
import { TrendingPackages } from '@/app/components/TrendingPackages'
import { Stats } from '@/app/components/Stats'
import { NewPackages } from '@/app/components/packages/NewPackages'
import { MostDownloaded } from '@/app/components/packages/MostDownloaded'
import { JustUpdated } from '@/app/components/packages/JustUpdated'
import { ArrowDownTrayIcon, BookOpenIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

export default async function Home() {
  return (
    <main>
      {/* Hero Section */}
      <div className="w-full bg-gray-900 dark:bg-black">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              The Soplang Hub
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              The official package registry for Soplang
            </p>
            <div className="mt-10">
              <PackageSearch />
            </div>
            <div className="mt-10 flex items-center justify-center gap-6">
              <Link
                href="/packages"
                className="rounded-lg bg-white/10 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/20"
              >
                <div className="flex items-center gap-2">
                  <ArrowDownTrayIcon className="h-5 w-5" />
                  Install Packages
                </div>
              </Link>
              <Link
                href="/docs"
                className="rounded-lg bg-white/10 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/20"
              >
                <div className="flex items-center gap-2">
                  <BookOpenIcon className="h-5 w-5" />
                  Documentation
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <Stats />

      {/* Package Lists */}
      <div className="w-full bg-white dark:bg-gray-900 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">New Packages</h2>
              <NewPackages />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Most Downloaded</h2>
              <MostDownloaded />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Just Updated</h2>
              <JustUpdated />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
} 