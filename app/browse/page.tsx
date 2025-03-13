import { PackageList } from '@/app/components/packages/PackageList'
import { PackageFilters } from '@/app/components/packages/PackageFilters'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Browse All Packages | Soplang Hub',
  description: 'Browse all packages available on Soplang Hub',
}

// Dummy data for testing
const dummyPackages = [
  {
    id: '1',
    name: 'react-hooks',
    version: '1.0.0',
    description: 'A collection of useful React hooks',
    downloads: 1234567,
    createdAt: new Date(),
    updatedAt: new Date(),
    author: {
      name: 'John Doe',
      image: 'https://github.com/johndoe.png',
    },
    license: 'MIT',
    stars: 1234,
    isVerified: true,
    categories: ['frontend', 'react', 'hooks'],
    maintenance: 'active',
  },
  {
    id: '2',
    name: 'state-machine',
    version: '2.1.0',
    description: 'Simple state machine implementation',
    downloads: 987654,
    createdAt: new Date(),
    updatedAt: new Date(),
    author: {
      name: 'Jane Smith',
      image: 'https://github.com/janesmith.png',
    },
    license: 'Apache-2.0',
    stars: 567,
    isVerified: true,
    categories: ['state-management', 'typescript'],
    maintenance: 'active',
  },
  {
    id: '3',
    name: 'data-structures',
    version: '3.0.0',
    description: 'Common data structures implemented in TypeScript',
    downloads: 543210,
    createdAt: new Date(),
    updatedAt: new Date(),
    author: {
      name: 'Alice Johnson',
      image: 'https://github.com/alicejohnson.png',
    },
    license: 'BSD-3-Clause',
    stars: 890,
    isVerified: false,
    categories: ['algorithms', 'typescript', 'education'],
    maintenance: 'stable',
  },
  {
    id: '4',
    name: 'bitflags',
    version: '2.9.0',
    description: 'A macro to generate structures which behave like bitflags',
    downloads: 564262242,
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-03-05'),
    author: { 
      name: 'Rust Team',
      image: 'https://avatars.githubusercontent.com/u/5430905',
    },
    license: 'MIT',
    stars: 987,
    isVerified: true,
    categories: ['bit-manipulation', 'macros'],
    maintenance: 'stable',
  },
  {
    id: '5',
    name: 'base64',
    version: '0.22.1',
    description: 'encodes and decodes base64 as bytes or utf8',
    downloads: 509280506,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-02-20'),
    author: { 
      name: 'Marshall Pierce',
      image: 'https://avatars.githubusercontent.com/u/1309829',
    },
    license: 'MIT',
    stars: 756,
    isVerified: false,
    categories: ['encoding', 'web'],
    maintenance: 'actively-maintained',
  },
  {
    id: '6',
    name: 'experimental-pkg',
    version: '0.1.0',
    description: 'An experimental package showcasing new features',
    downloads: 1205,
    createdAt: new Date('2024-03-10'),
    updatedAt: new Date('2024-03-14'),
    author: { 
      name: 'John Doe',
      image: '/images/placeholder.png',
    },
    license: 'MIT',
    stars: 12,
    isVerified: false,
    categories: ['experimental', 'testing'],
    maintenance: 'experimental',
  },
]

export default function BrowsePage() {
  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              All Packages
            </h1>
            <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
              Browse and discover packages for your Soplang projects
            </p>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Displaying 1-50 of 174,187 total packages
            </div>
          </div>
        </div>

        <div className="mt-8 flow-root">
          <PackageFilters />
          <PackageList 
            packages={dummyPackages} 
            pagination={{
              total: 174187,
              pages: Math.ceil(174187 / 50),
              current: 1,
            }} 
          />
        </div>
      </div>
    </div>
  )
} 