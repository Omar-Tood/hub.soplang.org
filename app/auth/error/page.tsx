'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

export default function AuthErrorPage() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  const getErrorMessage = (error: string | null) => {
    switch (error) {
      case 'Configuration':
        return 'There is a problem with the server configuration. Please try again later.'
      case 'AccessDenied':
        return 'Access was denied to your account. Please contact support if you believe this is an error.'
      case 'Verification':
        return 'The verification link was invalid or has expired. Please try signing in again.'
      default:
        return 'An error occurred during authentication. Please try again.'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white dark:bg-gray-800 px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <div className="text-center">
              <ExclamationTriangleIcon className="mx-auto h-12 w-12 text-red-500" />
              <h1 className="mt-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Authentication Error
              </h1>
              <p className="mt-2 text-base text-gray-600 dark:text-gray-300">
                {getErrorMessage(error)}
              </p>
              <div className="mt-6">
                <Link
                  href="/auth/signin"
                  className="text-sm font-semibold text-purple-600 dark:text-purple-400 hover:text-purple-500 dark:hover:text-purple-300"
                >
                  Try signing in again
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 