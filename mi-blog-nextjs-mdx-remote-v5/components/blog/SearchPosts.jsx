'use client'

export default function SearchPosts({ value, onChange }) {
  return (
    <input
      className="search-input"
      type="text"
      placeholder="Buscar por título, descripción o tag..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  )
}
