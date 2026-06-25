export default function CodeTitle({ children }) {
  return (
    <div
      style={{
        marginTop: '20px',
        marginBottom: '-8px',
        padding: '10px 14px',
        borderRadius: '12px 12px 0 0',
        background: '#0f172a',
        color: '#e5e7eb',
        fontWeight: 700,
        fontSize: '14px'
      }}
    >
      {children}
    </div>
  )
}
