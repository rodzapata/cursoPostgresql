import BlogSidebar from '../../components/blog/BlogSidebar'
import PostCard from '../../components/blog/PostCard'
import CategoryLinks from '../../components/blog/CategoryLinks'
import TagCloud from '../../components/blog/TagCloud'
import {
  getAllCategories,
  getAllPosts,
  getAllTags,
  getFeaturedPosts
} from '../../lib/posts'

export default function BlogPage() {
  const posts = getAllPosts()
  const categories = getAllCategories()
  const tags = getAllTags()
  const featuredPosts = getFeaturedPosts(3)

  return (
    <div className="blog-layout">
      <BlogSidebar posts={posts} categories={categories} />

      <main className="content-area">
        <section className="blog-header-card">
          <h1>Blog técnico</h1>
          <p className="post-description">
            Un espacio para documentar apuntes, tutoriales y comparativas sobre Java,
            Spring Boot, React, Next.js, PostgreSQL, SQL Server y .NET.
          </p>
        </section>

        <div className="blog-grid">
          <section>
            <h2 className="section-title">Todos los artículos</h2>

            <div className="post-list">
              {posts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          </section>

          <aside className="right-column">
            <section className="panel-card">
              <h3>Artículos destacados</h3>
              <div className="post-list">
                {featuredPosts.length === 0 ? (
                  <p className="empty-message">No hay artículos destacados.</p>
                ) : (
                  featuredPosts.map((post) => <PostCard key={post.slug} post={post} />)
                )}
              </div>
            </section>

            <section className="panel-card">
              <h3>Categorías</h3>
              <CategoryLinks categories={categories} />
            </section>

            <section className="panel-card">
              <h3>Tags</h3>
              <TagCloud tags={tags} />
            </section>
          </aside>
        </div>
      </main>
    </div>
  )
}
