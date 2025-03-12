import { DocsLayout } from '@/app/components/docs/DocsLayout'
import { CodeBlock } from '@/app/components/docs/CodeBlock'

export const metadata = {
  title: 'Documentation | Soplang Hub',
  description: 'Learn how to use Soplang Hub to manage and publish packages.',
}

export default function DocsPage() {
  return (
    <DocsLayout>
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <h1>Introduction to Soplang Hub</h1>
        
        <p>
          Welcome to Soplang Hub, the official package registry for Soplang. This documentation
          will help you get started with using Soplang Hub to manage and publish packages
          for your Soplang projects.
        </p>

        <h2>What is Soplang Hub?</h2>
        
        <p>
          Soplang Hub is a modern package registry designed specifically for Soplang packages.
          It provides a secure and efficient way to:
        </p>

        <ul>
          <li>Publish and share Soplang packages</li>
          <li>Manage package dependencies</li>
          <li>Control package versions</li>
          <li>Ensure package security</li>
        </ul>

        <h2>Quick Start</h2>

        <p>
          To get started with Soplang Hub, you'll need to:
        </p>

        <ol>
          <li>
            <strong>Install the Soplang CLI</strong>
            <CodeBlock
              language="bash"
              code="npm install -g @soplang/cli"
            />
          </li>
          <li>
            <strong>Configure your environment</strong>
            <CodeBlock
              language="bash"
              code="sop login"
            />
          </li>
          <li>
            <strong>Create a new package</strong>
            <CodeBlock
              language="bash"
              code="sop init my-package"
            />
          </li>
        </ol>

        <h2>Package Configuration</h2>

        <p>
          Every Soplang package requires a <code>sop.toml</code> file in its root directory.
          This file contains metadata about your package:
        </p>

        <CodeBlock
          language="toml"
          code={`[package]
name = "my-package"
version = "1.0.0"
description = "A sample Soplang package"
license = "MIT"
author = "username"

[dependencies]
another-package = "^1.2.0"`}
        />

        <h2>Next Steps</h2>

        <p>
          Now that you have a basic understanding of Soplang Hub, you can:
        </p>

        <ul>
          <li>Learn more about <a href="/docs/packages/create">creating packages</a></li>
          <li>Understand how to <a href="/docs/packages/publish">publish packages</a></li>
          <li>Read about <a href="/docs/packages/dependencies">managing dependencies</a></li>
          <li>Check out the <a href="/docs/cli">CLI documentation</a></li>
        </ul>

        <div className="not-prose my-8 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-100 dark:border-purple-800">
          <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-100 mb-2">
            Need Help?
          </h3>
          <p className="text-purple-800 dark:text-purple-200">
            If you run into any issues or have questions, check out our{' '}
            <a href="/docs/help" className="text-purple-600 dark:text-purple-400 hover:underline">
              help section
            </a>
            {' '}or join our{' '}
            <a href="https://discord.gg/soplang" className="text-purple-600 dark:text-purple-400 hover:underline">
              Discord community
            </a>.
          </p>
        </div>
      </div>
    </DocsLayout>
  )
} 