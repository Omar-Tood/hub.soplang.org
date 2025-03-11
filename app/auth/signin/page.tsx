import { getProviders } from 'next-auth/react'
import { SignInForm } from '@/app/components/auth/SignInForm'

export const metadata = {
  title: 'Sign In | Soplang Hub',
  description: 'Sign in to Soplang Hub',
}

export default async function SignInPage() {
  const providers = await getProviders()

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h1 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-white">
            Sign in to Soplang Hub
          </h1>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white dark:bg-gray-800 px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <SignInForm providers={providers} />
          </div>
        </div>
      </div>
    </div>
  )
} 