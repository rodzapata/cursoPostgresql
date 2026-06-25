import { notFound } from 'next/navigation'
import BlogSidebar from '../../../../components/blog/BlogSidebar'
import PostCard from '../../../../components/blog/PostCard'
import { getAllCategories, getAllPosts, getPostsByCategory } from '../../../../lib/posts'
import { slugify } from '../../../../lib/utils'

export async function generateStaticParams() {
  return getAllCategories()
    .filter((category) => category !== 'Todas')
    .map((category) => ({
      slug: slugify(category)
    }))
}

export default async function CategoryPage({ params }) {
  const { slug } = await params
  const posts = getAllPosts()
  const categories = getAllCategories()
  const categoryPosts = getPostsByCategory(slug)

  if (categoryPosts.length === 0) {
    notFound()
  }

  const categoryName = categoryPosts[0].category

  return (
    <div className="blog-layout">
      <BlogSidebar posts={posts} categories={categories} />

      <main className="content-area">
        <section className="blog-header-card">
          <h1>Categoría: {categoryName}</h1>
          <p className="post-description">
            Artículos publicados dentro de la categoría {categoryName}.
          </p>
        </section>

        <div className="post-list">
          {categoryPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </main>
    </div>
  )
}
