import { notFound } from 'next/navigation'
import BlogSidebar from '../../../../components/blog/BlogSidebar'
import PostCard from '../../../../components/blog/PostCard'
import { getAllCategories, getAllPosts, getAllTags, getPostsByTag } from '../../../../lib/posts'
import { slugify } from '../../../../lib/utils'

export async function generateStaticParams() {
  return getAllTags().map((tag) => ({
    slug: slugify(tag)
  }))
}

export default async function TagPage({ params }) {
  const { slug } = await params
  const posts = getAllPosts()
  const categories = getAllCategories()
  const tagPosts = getPostsByTag(slug)

  if (tagPosts.length === 0) {
    notFound()
  }

  const tagName =
    tagPosts.flatMap((post) => post.tags).find((tag) => slugify(tag) === slug) || slug

  return (
    <div className="blog-layout">
      <BlogSidebar posts={posts} categories={categories} />

      <main className="content-area">
        <section className="blog-header-card">
          <h1>Tag: #{tagName}</h1>
          <p className="post-description">
            Artículos relacionados con el tag {tagName}.
          </p>
        </section>

        <div className="post-list">
          {tagPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </main>
    </div>
  )
}
