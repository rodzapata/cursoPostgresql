import Link from 'next/link'
import { slugify } from '../../lib/utils'

export default function CategoryLinks({ categories }) {
  const filtered = categories.filter((category) => category !== 'Todas')

  if (filtered.length === 0) {
    return <p className="empty-message">No hay categorías disponibles.</p>
  }

  return (
    <div className="category-list">
      {filtered.map((category) => (
        <Link
          key={category}
          href={`/blog/categoria/${slugify(category)}`}
          className="tag"
        >
          {category}
        </Link>
      ))}
    </div>
  )
}
