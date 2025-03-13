import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import authOptions from '@/app/api/auth/[...nextauth]/route'
import { PublishForm } from '@/app/components/packages/PublishForm'

export const metadata = {
  title: 'Publish Package | Soplang Hub',
  description: 'Publish your package to Soplang Hub',
}

export default async function PublishPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/api/auth/signin')
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="mx-auto max-w-2xl">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Publish Package
          </h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
            Share your package with the Soplang community.
          </p>

          <div className="mt-8">
            <PublishForm />
          </div>
        </div>
      </div>
    </div>
  )
} 