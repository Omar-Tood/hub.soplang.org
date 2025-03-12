'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  BookOpenIcon,
  ChevronRightIcon,
  CommandLineIcon,
  CubeIcon,
  KeyIcon,
  ShieldCheckIcon,
  CodeBracketIcon,
} from '@heroicons/react/24/outline'

const navigation = [
  {
    name: 'Getting Started',
    href: '/docs',
    icon: BookOpenIcon,
    children: [
      { name: 'Introduction', href: '/docs' },
      { name: 'Quick Start', href: '/docs/quick-start' },
      { name: 'Installation', href: '/docs/installation' },
    ],
  },
  {
    name: 'Package Management',
    href: '/docs/packages',
    icon: CubeIcon,
    children: [
      { name: 'Creating Packages', href: '/docs/packages/create' },
      { name: 'Publishing Packages', href: '/docs/packages/publish' },
      { name: 'Updating Packages', href: '/docs/packages/update' },
      { name: 'Dependencies', href: '/docs/packages/dependencies' },
    ],
  },
  {
    name: 'CLI Commands',
    href: '/docs/cli',
    icon: CommandLineIcon,
    children: [
      { name: 'CLI Overview', href: '/docs/cli' },
      { name: 'Package Commands', href: '/docs/cli/packages' },
      { name: 'Project Commands', href: '/docs/cli/project' },
    ],
  },
  {
    name: 'Authentication',
    href: '/docs/auth',
    icon: KeyIcon,
    children: [
      { name: 'Authentication', href: '/docs/auth' },
      { name: 'API Keys', href: '/docs/auth/api-keys' },
      { name: 'Permissions', href: '/docs/auth/permissions' },
    ],
  },
  {
    name: 'Security',
    href: '/docs/security',
    icon: ShieldCheckIcon,
    children: [
      { name: 'Best Practices', href: '/docs/security' },
      { name: 'Package Signing', href: '/docs/security/signing' },
      { name: 'Vulnerability Scanning', href: '/docs/security/scanning' },
    ],
  },
  {
    name: 'API Reference',
    href: '/docs/api',
    icon: CodeBracketIcon,
    children: [
      { name: 'REST API', href: '/docs/api' },
      { name: 'Authentication', href: '/docs/api/auth' },
      { name: 'Packages', href: '/docs/api/packages' },
      { name: 'Users', href: '/docs/api/users' },
    ],
  },
]

export function DocsLayout({ children }: { children: React.ReactNode }) {
  const [openSections, setOpenSections] = useState<string[]>(['Getting Started'])
  const pathname = usePathname()

  const toggleSection = (name: string) => {
    setOpenSections((prev) =>
      prev.includes(name)
        ? prev.filter((section) => section !== name)
        : [...prev, name]
    )
  }

  return (
    <div className="flex min-h-screen bg-white dark:bg-gray-900">
      {/* Sidebar */}
      <div className="fixed inset-y-0 z-50 flex w-72 flex-col">
        {/* Sidebar component */}
        <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-6 pb-4">
          <div className="flex h-16 shrink-0 items-center">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 via-purple-500 to-blue-500 rounded-lg transform -rotate-12" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">Docs</span>
            </Link>
          </div>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((section) => (
                    <li key={section.name}>
                      <button
                        onClick={() => toggleSection(section.name)}
                        className={`
                          flex items-center w-full gap-x-3 rounded-lg p-2 text-sm leading-6
                          ${pathname.startsWith(section.href)
                            ? 'bg-gray-50 dark:bg-gray-800 text-purple-600 dark:text-purple-400'
                            : 'text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                          }
                        `}
                      >
                        <section.icon className="h-6 w-6 shrink-0" />
                        {section.name}
                        <ChevronRightIcon
                          className={`ml-auto h-5 w-5 shrink-0 transform transition-transform duration-200
                            ${openSections.includes(section.name) ? 'rotate-90' : ''}
                          `}
                        />
                      </button>
                      {openSections.includes(section.name) && (
                        <motion.ul
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-1 px-8 space-y-1"
                        >
                          {section.children.map((child) => (
                            <li key={child.name}>
                              <Link
                                href={child.href}
                                className={`
                                  block rounded-lg py-2 pl-4 pr-3 text-sm leading-6
                                  ${pathname === child.href
                                    ? 'bg-gray-50 dark:bg-gray-800 text-purple-600 dark:text-purple-400'
                                    : 'text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                                  }
                                `}
                              >
                                {child.name}
                              </Link>
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Main content */}
      <main className="pl-72 flex-1">
        <div className="px-8 py-12 max-w-4xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  )
} 