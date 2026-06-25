import Link from 'next/link'
import { slugify } from '../../lib/utils'

export default function TagCloud({ tags }) {
  if (!tags || tags.length === 0) {
    return <p className="empty-message">No hay tags disponibles.</p>
  }

  return (
    <div className="tag-list">
      {tags.map((tag) => (
        <Link key={tag} href={`/blog/tag/${slugify(tag)}`} className="tag">
          #{tag}
        </Link>
      ))}
    </div>
  )
}
