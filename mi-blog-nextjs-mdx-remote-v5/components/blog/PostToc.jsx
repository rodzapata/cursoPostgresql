export default function PostToc({ toc }) {
  if (!toc || toc.length === 0) {
    return null
  }

  return (
    <aside className="toc-card">
      <h3>Contenido</h3>

      <div className="toc-list">
        {toc.map((item) => (
          <a
            key={`${item.id}-${item.level}`}
            href={`#${item.id}`}
            className={`toc-link level-${item.level}`}
          >
            {item.text}
          </a>
        ))}
      </div>
    </aside>
  )
}
