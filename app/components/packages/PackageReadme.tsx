'use client'

import ReactMarkdown from 'react-markdown'

type PackageReadmeProps = {
  content: string
}

export function PackageReadme({ content }: PackageReadmeProps) {
  if (!content) {
    return (
      <div className="rounded-lg bg-gray-50 dark:bg-gray-800 p-6">
        <p className="text-gray-500 dark:text-gray-400">No README provided.</p>
      </div>
    )
  }

  return (
    <div className="prose prose-blue dark:prose-invert max-w-none">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  )
} 