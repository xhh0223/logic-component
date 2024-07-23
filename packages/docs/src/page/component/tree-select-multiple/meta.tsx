import { Markdown } from '@src/component'

export const introduce = (() => {
  const text = `
  <h1 id="title">tree-select-multiple</h1>
  
  封装多选逻辑的树型组件

  <h2 id="use">使用方式</h2>
  
  ~~~jsx
  import { TreeSelectMultiple, TreeSelectMultipleItem } from 'react-logic-component'
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
    title: 'tree-select-multiple',
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
