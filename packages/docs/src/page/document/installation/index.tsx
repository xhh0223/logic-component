import { MarkDown } from '@src/component'

import content from './index.md?raw'

const index = () => {
  return <MarkDown>{content}</MarkDown>
}

export default index
