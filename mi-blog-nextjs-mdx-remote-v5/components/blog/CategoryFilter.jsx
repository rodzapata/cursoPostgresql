'use client'

export default function CategoryFilter({ categories, value, onChange }) {
  return (
    <select
      className="category-select"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {categories.map((category) => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
    </select>
  )
}
