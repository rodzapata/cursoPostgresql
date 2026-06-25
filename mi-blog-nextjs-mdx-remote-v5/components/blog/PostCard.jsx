import Link from 'next/link'
import { formatDate, slugify } from '../../lib/utils'

export default function PostCard({ post }) {
  return (
    <article className="post-card">
      <h3>
        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
      </h3>

      <div className="post-meta">
        {formatDate(post.date)} · {post.category} · {post.readingTime}
      </div>

      <p className="post-description">{post.description}</p>

      <div className="post-tags">
        {post.tags.map((tag) => (
          <Link key={tag} href={`/blog/tag/${slugify(tag)}`} className="tag">
            #{tag}
          </Link>
        ))}
      </div>
    </article>
  )
}
