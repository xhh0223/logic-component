import { Markdown } from '@src/component'

export const introduce = (() => {
  const text = `
  # tree-select-single 
  封装单选逻辑的树型组件

  <h2>使用方式</h2>
  
  ~~~jsx
  import { TreeSelectSingle, TreeSelectSingleHandler, TreeSelectSingleItem } from 'react-logic-component'
  ~~~
  `
  return (
    <div>
      <Markdown>{text}</Markdown>
    </div>
  )
})()
