import { Markdown } from '@src/component'

import content from './index.md?raw'

const index = () => {
  return <Markdown>{content}</Markdown>
}

export default index
