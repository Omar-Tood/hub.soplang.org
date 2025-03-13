import React from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'

export interface CodeBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  code: string
  language: string
}

export const CodeBlock = ({ code, language, className, ...props }: CodeBlockProps) => {
  return (
    <div className={className} {...props}>
      <SyntaxHighlighter
        language={language}
        style={oneDark}
        customStyle={{
          margin: 0,
          borderRadius: '0.5rem',
          padding: '1rem',
          backgroundColor: 'rgb(31, 41, 55)',
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  )
} 