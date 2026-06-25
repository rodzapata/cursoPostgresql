import Link from 'next/link'
import { formatDate } from '../../lib/utils'

export default function RelatedPosts({ posts }) {
  if (!posts || posts.length === 0) {
    return null
  }

  return (
    <section className="related-section">
      <h2>Posts relacionados</h2>

      <div className="post-list">
        {posts.map((post) => (
          <div key={post.slug} className="related-item">
            <h3>
              <Link href={`/blog/${post.slug}`}>{post.title}</Link>
            </h3>

            <div className="post-meta">
              {formatDate(post.date)} · {post.category} · {post.readingTime}
            </div>

            <p className="post-description">{post.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
