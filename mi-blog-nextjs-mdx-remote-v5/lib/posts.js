import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { compileMDX } from 'next-mdx-remote/rsc'
import { slugify } from './utils'
import { mdxComponents } from '../components/mdx/mdx-components'
import rehypePrettyCode from 'rehype-pretty-code'

const postsDirectory = path.join(process.cwd(), 'content/posts')

function countWords(text = '') {
  return text
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]*`/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length
}

function calculateReadingTime(text = '') {
  const words = countWords(text)
  const minutes = Math.max(1, Math.ceil(words / 200))
  return `${minutes} min de lectura`
}

function extractToc(markdown = '') {
  const lines = markdown.split('\n')
  const toc = []

  for (const line of lines) {
    const match = /^(#{1,3})\s+(.*)$/.exec(line.trim())
    if (!match) continue
    const level = match[1].length
    const rawText = match[2].trim()
    if (!rawText) continue
    const text = rawText.replace(/[`*_~]/g, '')
    toc.push({ level, text, id: slugify(text) })
  }

  return toc
}

function mapPostFile(fileName) {
  const fullPath = path.join(postsDirectory, fileName)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  return {
    title: data.title,
    date: data.date,
    description: data.description,
    slug: data.slug,
    category: data.category || 'General',
    tags: data.tags || [],
    published: data.published ?? true,
    featured: data.featured ?? false,
    readingTime: calculateReadingTime(content)
  }
}

export function getAllPosts() {
  return fs.readdirSync(postsDirectory)
    .filter((fileName) => fileName.endsWith('.mdx'))
    .map(mapPostFile)
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.date) - new Date(a.date))
}

export function getPostBySlug(slug) {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`)
  if (!fs.existsSync(fullPath)) return null

  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  return {
    title: data.title,
    date: data.date,
    description: data.description,
    slug: data.slug,
    category: data.category || 'General',
    tags: data.tags || [],
    published: data.published ?? true,
    featured: data.featured ?? false,
    readingTime: calculateReadingTime(content),
    content
  }
}

export async function getPostMdxBySlug(slug) {
  const post = getPostBySlug(slug)
  if (!post) return null

  const { content } = await compileMDX({
    source: post.content,
    components: mdxComponents,
    options: {
      parseFrontmatter: false,
      mdxOptions: {
        rehypePlugins: [
          [
            rehypePrettyCode,
            {
              theme: 'github-dark',
              keepBackground: false
            }
          ]
        ]
      }
    }
  })

  return {
    ...post,
    mdxContent: content,
    toc: extractToc(post.content)
  }
}

export function getAllCategories() {
  const categories = new Set(getAllPosts().map((post) => post.category))
  return ['Todas', ...Array.from(categories)]
}

export function getAllTags() {
  const tags = new Set(getAllPosts().flatMap((post) => post.tags))
  return Array.from(tags).sort()
}

export function getPostsByCategory(categorySlug) {
  return getAllPosts().filter((post) => slugify(post.category) === categorySlug)
}

export function getPostsByTag(tagSlug) {
  return getAllPosts().filter((post) =>
    post.tags.some((tag) => slugify(tag) === tagSlug)
  )
}

export function getRelatedPosts(currentPost, limit = 3) {
  const posts = getAllPosts().filter((post) => post.slug !== currentPost.slug)

  const scored = posts.map((post) => {
    let score = 0
    if (post.category === currentPost.category) score += 3
    const sharedTags = post.tags.filter((tag) => currentPost.tags.includes(tag)).length
    score += sharedTags * 2
    return { ...post, score }
  })

  return scored
    .filter((post) => post.score > 0)
    .sort((a, b) => b.score - a.score || new Date(b.date) - new Date(a.date))
    .slice(0, limit)
}

export function getFeaturedPosts(limit = 3) {
  return getAllPosts().filter((post) => post.featured).slice(0, limit)
}
