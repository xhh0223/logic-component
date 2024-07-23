import { Markdown } from '@src/component'

export const introduce = (() => {
  const text = `
  # tree-select-multiple
  封装多选逻辑的树型组件

  <h2>使用方式</h2>
  
  ~~~jsx
  import { TreeSelectMultiple, TreeSelectMultipleHandler, TreeSelectMultipleItem } from 'react-logic-component'
  ~~~
  `
  return (
    <div>
      <Markdown>{text}</Markdown>
    </div>
  )
})()
