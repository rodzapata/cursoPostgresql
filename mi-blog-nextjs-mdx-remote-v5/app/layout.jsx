import './globals.css'

export const metadata = {
  title: 'Mi Blog Técnico',
  description: 'Blog técnico personal con Next.js + MDX Remote'
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
