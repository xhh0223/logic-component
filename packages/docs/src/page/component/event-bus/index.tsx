import { CodeMemo } from '@src/layout'

const index = () => {
  return (
    <CodeMemo
      // @ts-ignore
      components={import.meta.glob('./demo*/index.tsx', { eager: true })}
      componentsRawMap={
        new Map<string, string>(
          // @ts-ignore
          Object.entries(import.meta.glob('./demo*/index.tsx', { eager: true, query: '?raw' })),
        )
      }
    />
  )
}

export default index
