import { Markdown } from '@src/component'

import apiMd from './api.md?raw'

export const apiMarkdown = <Markdown>{apiMd}</Markdown>

export const introduceMarkdown = (() => {
  const text = `
  <h1 id="title">tree-select-single</h1>
  
  封装单选逻辑的树型组件

  <h2 id="use">使用方式</h2>
  
  ~~~jsx
  import { TreeSelectSingle, TreeSelectSingleItem } from 'react-logic-component'
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
    title: 'tree-select-single',
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
  {
    key: 'api',
    title: 'API',
    href: '#api',
    children: [
      {
        key: 'api-1',
        title: '类型声明',
        href: '#api-1',
      },
      {
        key: 'api-2',
        title: 'TreeSelectSingleProps',
        href: '#api-2',
      },
      {
        key: 'api-3',
        title: 'TreeSelectSingleItemProps',
        href: '#api-3',
      },
      {
        key: 'api-4',
        title: 'useTreeSelectSingleHandler',
        href: '#api-4',
      },
    ],
  },
]

// @ts-ignore
export const components = import.meta.glob('./demo*/index.tsx', { eager: true })

export const componentsRawCodeMap = new Map<string, string>(
  // @ts-ignore
  Object.entries(import.meta.glob('./demo*/index.tsx', { eager: true, query: '?raw' })),
)
