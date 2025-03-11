import { CodeBlock } from '@/app/components/docs/CodeBlock'

export const metadata = {
  title: 'API Documentation | Soplang Hub',
  description: 'Learn how to use the Soplang Hub API',
}

const endpoints = [
  {
    title: 'List Packages',
    method: 'GET',
    path: '/api/packages',
    description: 'Get a list of all packages.',
    code: `curl -X GET "https://soplanghub.io/api/packages?page=1"`,
  },
  {
    title: 'Search Packages',
    method: 'GET',
    path: '/api/packages/search',
    description: 'Search for packages by name, description, or keywords.',
    code: `curl -X GET "https://soplanghub.io/api/packages/search?q=example"`,
  },
  {
    title: 'Get Package',
    method: 'GET',
    path: '/api/packages/:name',
    description: 'Get details about a specific package.',
    code: `curl -X GET "https://soplanghub.io/api/packages/example-package"`,
  },
  {
    title: 'Publish Package',
    method: 'POST',
    path: '/api/packages',
    description: 'Publish a new package.',
    code: `curl -X POST "https://soplanghub.io/api/packages" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -F "package=@package.tar.gz" \\
  -F "description=An example package" \\
  -F "keywords=example,test" \\
  -F "repository=https://github.com/username/example"`,
  },
  {
    title: 'Update Package',
    method: 'PATCH',
    path: '/api/packages/:name',
    description: 'Update package metadata.',
    code: `curl -X PATCH "https://soplanghub.io/api/packages/example-package" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "description": "Updated description",
    "keywords": ["example", "test"],
    "repository": "https://github.com/username/example"
  }'`,
  },
  {
    title: 'Delete Package',
    method: 'DELETE',
    path: '/api/packages/:name',
    description: 'Delete a package.',
    code: `curl -X DELETE "https://soplanghub.io/api/packages/example-package" \\
  -H "Authorization: Bearer YOUR_API_KEY"`,
  },
]

export default function ApiDocsPage() {
  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            API Documentation
          </h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
            Learn how to use the Soplang Hub API to manage packages programmatically.
          </p>

          <div className="mt-8 space-y-8">
            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Authentication</h2>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                All API requests must include an API key in the Authorization header:
              </p>
              <CodeBlock
                code={`Authorization: Bearer YOUR_API_KEY`}
                language="bash"
                className="mt-4"
              />
              <p className="mt-4 text-gray-600 dark:text-gray-400">
                You can create an API key in your{' '}
                <a href="/profile" className="text-blue-600 hover:text-blue-500">
                  profile settings
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Rate Limiting</h2>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                API requests are limited to 100 requests per minute per API key. The following headers
                are included in all responses:
              </p>
              <ul className="mt-4 list-disc list-inside text-gray-600 dark:text-gray-400">
                <li>X-RateLimit-Limit: Maximum number of requests per minute</li>
                <li>X-RateLimit-Remaining: Number of requests remaining</li>
                <li>X-RateLimit-Reset: Time when the rate limit resets (Unix timestamp)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Endpoints</h2>
              <div className="mt-4 space-y-6">
                {endpoints.map((endpoint) => (
                  <div key={endpoint.path} className="rounded-lg bg-gray-50 dark:bg-gray-800 p-6">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      {endpoint.title}
                    </h3>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="inline-flex items-center rounded-md bg-blue-50 dark:bg-blue-900 px-2 py-1 text-xs font-medium text-blue-700 dark:text-blue-200">
                        {endpoint.method}
                      </span>
                      <code className="text-sm text-gray-600 dark:text-gray-400">
                        {endpoint.path}
                      </code>
                    </div>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">{endpoint.description}</p>
                    <CodeBlock code={endpoint.code} language="bash" className="mt-4" />
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
} 