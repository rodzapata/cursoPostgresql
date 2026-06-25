'use client'

import { useState } from 'react'

export default function Pre(props) {
  const [copied, setCopied] = useState(false)

  const code =
    props.children?.props?.children || ''

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(String(code))
      setCopied(true)

      setTimeout(() => {
        setCopied(false)
      }, 2000)
    } catch (error) {
      console.error('Error al copiar:', error)
    }
  }

  return (
    <div style={{ position: 'relative', margin: '16px 0' }}>
      <button
        onClick={handleCopy}
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          border: 'none',
          borderRadius: '8px',
          padding: '6px 10px',
          cursor: 'pointer',
          background: '#334155',
          color: '#fff',
          fontSize: '12px'
        }}
      >
        {copied ? 'Copiado' : 'Copiar'}
      </button>

      <pre {...props} />
    </div>
  )
}