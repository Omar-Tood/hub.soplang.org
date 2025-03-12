'use client'

import { DocumentTextIcon } from '@heroicons/react/24/outline'

type PackageLicenseProps = {
  license: string
}

export function PackageLicense({ license = 'MIT' }: PackageLicenseProps) {
  return (
    <div className="bg-gradient-to-br from-white via-purple-50/10 to-indigo-50/20 dark:from-gray-900 dark:via-purple-900/10 dark:to-indigo-900/20 shadow-xl rounded-xl border border-purple-100/50 dark:border-purple-800/30">
      <div className="px-6 py-6">
        <div className="flex items-center">
          <div className="p-2 bg-purple-100 dark:bg-purple-900/40 rounded-lg">
            <DocumentTextIcon className="h-6 w-6 text-purple-600 dark:text-purple-300" aria-hidden="true" />
          </div>
          <h3 className="ml-3 text-lg font-semibold text-gray-900 dark:text-white">
            License Information
          </h3>
        </div>
        <div className="mt-6">
          <div className="flex items-center bg-purple-50/50 dark:bg-purple-900/20 rounded-lg px-4 py-2 border border-purple-100/50 dark:border-purple-700/30">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
              License Type:
            </span>
            <span className="ml-2 text-sm font-semibold text-purple-600 dark:text-purple-300">
              {license}
            </span>
          </div>
          {license === 'MIT' && (
            <div className="mt-6 space-y-4">
              <div className="bg-indigo-50/50 dark:bg-indigo-900/20 rounded-lg px-4 py-3 border border-indigo-100/50 dark:border-indigo-700/30">
                <p className="text-sm font-medium text-indigo-700 dark:text-indigo-200">
                  The MIT License is a permissive free software license that allows you to:
                </p>
              </div>
              <ul className="grid gap-2">
                {[
                  'Use the software commercially',
                  'Modify the software',
                  'Distribute the software',
                  'Use and modify the software privately'
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <svg className="h-5 w-5 text-purple-500 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-gray-700 dark:text-gray-200">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 bg-purple-50/50 dark:bg-purple-900/20 rounded-lg px-4 py-3 border border-purple-100/50 dark:border-purple-700/30">
                <p className="text-sm font-medium text-purple-700 dark:text-purple-200">
                  The only requirement is that the license and copyright notice must be included with the software.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 