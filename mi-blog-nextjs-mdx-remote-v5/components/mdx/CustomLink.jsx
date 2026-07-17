import Link from "next/link";

export default function CustomLink({
  href = "",
  children,
  ...props
}) {
  const isExternal =
    href.startsWith("http://") ||
    href.startsWith("https://");

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} {...props}>
      {children}
    </Link>
  );
}