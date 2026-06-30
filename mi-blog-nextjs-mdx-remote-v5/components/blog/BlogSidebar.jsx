"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import SearchPosts from "./SearchPosts";
import CategoryFilter from "./CategoryFilter";
import ThemeToggle from "./ThemeToggle";

export default function BlogSidebar({ posts, categories }) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todas");

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesCategory =
        selectedCategory === "Todas" || post.category === selectedCategory;

      const term = search.toLowerCase();
      const matchesSearch =
        post.title.toLowerCase().includes(term) ||
        post.description.toLowerCase().includes(term) ||
        post.tags.join(" ").toLowerCase().includes(term);

      return matchesCategory && matchesSearch;
    });
  }, [posts, search, selectedCategory]);

  return (
    <aside className="sidebar">
      <h1 className="blog-title">Mi Blog</h1>
      <p className="blog-subtitle">
        Artículos y apuntes sobre Java, Spring Boot, React, Next.js, Nest,js,
        PostgreSQL y .NET
      </p>

      <ThemeToggle />

      <div className="sidebar-section-title">Buscar</div>
      <SearchPosts value={search} onChange={setSearch} />

      <div className="sidebar-section-title">Categorías</div>
      <CategoryFilter
        categories={categories}
        value={selectedCategory}
        onChange={setSelectedCategory}
      />

      <div className="sidebar-section-title">Artículos</div>

      <div className="post-link-list">
        {filteredPosts.length === 0 ? (
          <div className="empty-message">No se encontraron artículos.</div>
        ) : (
          filteredPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="post-link-item"
            >
              <strong>{post.title}</strong>
              <div className="post-meta">{post.category}</div>
            </Link>
          ))
        )}
      </div>
    </aside>
  );
}
