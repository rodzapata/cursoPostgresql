import { notFound } from 'next/navigation'
import Link from 'next/link'
import BlogSidebar from '../../../components/blog/BlogSidebar'
import PostToc from '../../../components/blog/PostToc'
import RelatedPosts from '../../../components/blog/RelatedPosts'
import {
  getAllCategories,
  getAllPosts,
  getPostMdxBySlug,
  getRelatedPosts
} from '../../../lib/posts'
import { formatDate, slugify } from '../../../lib/utils'

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const post = await getPostMdxBySlug(slug)
  if (!post) return { title: 'Artículo no encontrado' }
  return { title: post.title, description: post.description }
}

export default async function PostPage({ params }) {
  const { slug } = await params
  const post = await getPostMdxBySlug(slug)
  if (!post) notFound()

  const posts = getAllPosts()
  const categories = getAllCategories()
  const relatedPosts = getRelatedPosts(post)

  return (
    <div className="blog-layout">
      <BlogSidebar posts={posts} categories={categories} />

      <main className="content-area">
        <div className="article-layout">
          <article className="post-article">
            <header className="post-header">
              <h1>{post.title}</h1>
              <div className="post-meta">
                {formatDate(post.date)} · {post.category}
              </div>

              <div className="post-badges">
                <span className="badge reading-time">{post.readingTime}</span>
                <Link href={`/blog/categoria/${slugify(post.category)}`} className="badge">
                  {post.category}
                </Link>
              </div>

              <p className="post-description">{post.description}</p>

              <div className="post-tags">
                {post.tags.map((tag) => (
                  <Link key={tag} href={`/blog/tag/${slugify(tag)}`} className="tag">
                    #{tag}
                  </Link>
                ))}
              </div>
            </header>

            <div className="markdown-content">{post.mdxContent}</div>

            <RelatedPosts posts={relatedPosts} />
          </article>

          <PostToc toc={post.toc} />
        </div>
      </main>
    </div>
  )
}
