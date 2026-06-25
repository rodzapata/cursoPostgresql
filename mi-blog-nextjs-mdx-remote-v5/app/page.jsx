import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="home-page">
      <div className="hero-card">
        <p className="hero-kicker">Blog técnico personal</p>
        <h1>Blog técnico con Next.js + MDX Remote</h1>
        <p className="hero-text">
          Publica artículos sobre Java, Spring Boot, React, Next.js, PostgreSQL, SQL Server y .NET
          usando archivos <strong>.mdx</strong> con soporte para componentes React dentro del contenido.
        </p>

        <div className="hero-actions">
          <Link href="/blog" className="primary-btn">
            Ir al blog
          </Link>
        </div>
      </div>
    </main>
  )
}
