export default function Alert({ type = 'info', children }) {
  const map = {
    info: { title: 'Info', color: '#2563eb' },
    success: { title: 'Correcto', color: '#16a34a' },
    warning: { title: 'Importante', color: '#d97706' }
  }

  const config = map[type] || map.info

  return (
    <div
      style={{
        borderLeft: `4px solid ${config.color}`,
        padding: '14px 16px',
        borderRadius: '10px',
        background: 'rgba(148,163,184,0.08)',
        margin: '18px 0'
      }}
    >
      <strong>{config.title}:</strong> {children}
    </div>
  )
}
