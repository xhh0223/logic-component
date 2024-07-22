import { Markdown } from '@src/component'

export const introduce = (() => {
  const text = `
  # select-multiple 
  封装多选的逻辑组件

  <h2>使用方式</h2>
  
  ~~~jsx
  import { SelectMultiple, SelectMultipleHandler, SelectMultipleItem } from 'react-logic-component'
  ~~~
  `
  return (
    <div>
      <Markdown>{text}</Markdown>
    </div>
  )
})()
