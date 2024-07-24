import { Markdown } from '@src/component'

export const introduceMarkdown = (() => {
  const text = `
  <h1 id="title">component-proxy</h1>
  
  代理组件的props、ref等属性，可以避免与父级作用域命名冲突，且不会导致父级重新render
  
  利用useComponentProxyRef可以封装常用的组件，用于指令式调用

  <h2 id="use">使用方式</h2>
  
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

// @ts-ignore
export const demoMetaMap = Object.entries(import.meta.glob('./demo*/meta.ts', { eager: true })).map(([key, value]) => {
  return [key.replace('meta.ts', 'index.tsx'), value]
})

export const anchors = [
  {
    key: 'title',
    title: 'component-proxy',
    href: '#title',
  },
  {
    key: 'use',
    title: '使用方式',
    href: '#use',
  },
  {
    key: 'demo',
    title: '演示',
    href: '#demo',
    children: Object.values(Object.fromEntries(demoMetaMap))
      // @ts-ignore
      .filter((i) => i.Anchor)
      // @ts-ignore
      .map((i) => i.Anchor),
  },
]

// @ts-ignore
export const components = import.meta.glob('./demo*/index.tsx', { eager: true })

export const componentsRawCodeMap = new Map<string, string>(
  // @ts-ignore
  Object.entries(import.meta.glob('./demo*/index.tsx', { eager: true, query: '?raw' })),
)
