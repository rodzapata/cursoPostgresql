'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

export default function Pre({ children, ...props }) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    // lógica de copiado...
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
        {copied ? <Check size={16} /> : <Copy size={16} />}
      </button>

      <pre {...props}>{children}</pre>
    </div>
  )
}