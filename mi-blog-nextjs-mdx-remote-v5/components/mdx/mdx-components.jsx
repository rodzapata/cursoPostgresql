import Alert from './Alert'
import CodeTitle from './CodeTitle'
import Pre from './Pre'
import { slugify } from '../../lib/utils'
import CustomLink from './CustomLink'

function Heading({ as: Tag, children }) {
  const text = Array.isArray(children) ? children.join('') : String(children ?? '')
  const id = slugify(text)
  return <Tag id={id}>{children}</Tag>
}

export const mdxComponents = {
  h1: (props) => <Heading as="h1" {...props} />,
  h2: (props) => <Heading as="h2" {...props} />,
  h3: (props) => <Heading as="h3" {...props} />,
  pre: (props) => <Pre {...props} />,
  a: CustomLink,
  Alert,
  CodeTitle
}