'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

function extractCode(children) {
  if (!children) return ''

  const codeChild = children?.props?.children

  if (typeof codeChild === 'string') return codeChild

  if (Array.isArray(codeChild)) {
    return codeChild
      .map((item) => {
        if (typeof item === 'string') return item
        if (typeof item?.props?.children === 'string') return item.props.children
        return ''
      })
      .join('')
  }

  if (typeof children === 'string') return children

  return ''
}

export default function Pre({ children, ...props }) {
  const [copied, setCopied] = useState(false)
  const code = extractCode(children)

  async function handleCopy() {
    if (!code) return

    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)

      setTimeout(() => {
        setCopied(false)
      }, 1800)
    } catch (error) {
      console.error('No se pudo copiar el código:', error)
    }
  }

  return (
    <div className="code-block-wrapper">
      <button
        type="button"
        onClick={handleCopy}
        className={`copy-code-button ${copied ? 'is-copied' : ''}`}
        aria-label={copied ? 'Código copiado' : 'Copiar código'}
        title={copied ? 'Código copiado' : 'Copiar código'}
      >
        {copied ? (
          <Check size={16} strokeWidth={2.4} />
        ) : (
          <Copy size={16} strokeWidth={2} />
        )}
      </button>

      <pre className="mdx-pre" {...props}>
        {children}
      </pre>
    </div>
  )
}
