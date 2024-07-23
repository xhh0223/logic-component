import { Markdown } from '@src/component'

export const introduce = (() => {
  const text = `
  # select-single 
  封装单选逻辑的组件

  <h2>使用方式</h2>
  
  ~~~jsx
  import { SelectSingle, SelectSingleHandler, SelectSingleItem } from 'react-logic-component'
  ~~~
  `
  return (
    <div>
      <Markdown>{text}</Markdown>
    </div>
  )
})()
