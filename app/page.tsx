import React from 'react'
import { PackageSearch } from '@/app/components/PackageSearch'
import { TrendingPackages } from '@/app/components/TrendingPackages'
import { Stats } from '@/app/components/Stats'
import { NewPackages } from '@/app/components/packages/NewPackages'
import { MostDownloaded } from '@/app/components/packages/MostDownloaded'
import { JustUpdated } from '@/app/components/packages/JustUpdated'
import { ArrowDownTrayIcon, BookOpenIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { Hero } from '@/app/components/Hero'

export default function HomePage() {
  return (
    <main>
      <Hero />

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