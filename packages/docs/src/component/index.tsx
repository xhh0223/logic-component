import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
export const MarkDown = (props: { children: string }) => {
  return <Markdown remarkPlugins={[remarkGfm]}>{props.children}</Markdown>
}
