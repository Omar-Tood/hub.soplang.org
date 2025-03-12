'use client'

import { DocumentTextIcon } from '@heroicons/react/24/outline'

type PackageLicenseProps = {
  license: string
}

export function PackageLicense({ license = 'MIT' }: PackageLicenseProps) {
  return (
    <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex items-center">
          <DocumentTextIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
          <h3 className="ml-3 text-lg font-medium leading-6 text-gray-900 dark:text-white">
            License Information
          </h3>
        </div>
        <div className="mt-4">
          <div className="flex items-center">
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
              License Type:
            </span>
            <span className="ml-2 text-sm text-gray-900 dark:text-white">
              {license}
            </span>
          </div>
          {license === 'MIT' && (
            <div className="mt-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                The MIT License is a permissive free software license that allows you to:
              </p>
              <ul className="mt-2 list-disc pl-5 text-sm text-gray-500 dark:text-gray-400">
                <li>Use the software commercially</li>
                <li>Modify the software</li>
                <li>Distribute the software</li>
                <li>Use and modify the software privately</li>
              </ul>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                The only requirement is that the license and copyright notice must be included with the software.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 