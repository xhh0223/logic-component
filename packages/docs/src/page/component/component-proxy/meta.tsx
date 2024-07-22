import { Markdown } from '@src/component'

export const introduce = (() => {
  const text = `
  # component-proxy
  代理组件的props、ref等属性，可以避免与父级作用域命名冲突，且不会导致父级重新render
  
  利用useComponentProxyRef可以封装常用的组件，用于指令式调用

  <h2>使用方式</h2>
  
  ~~~jsx
  import { ComponentProxy,useComponentProxyRef } from 'react-logic-component'
  ~~~
  `
  return (
    <div>
      <Markdown>{text}</Markdown>
    </div>
  )
})()
