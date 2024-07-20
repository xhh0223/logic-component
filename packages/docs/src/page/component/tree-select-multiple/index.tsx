import { AnchorID } from '@src/constant'
import { CodeMemo } from '@src/layout'
import { useEffect } from 'react'

import { useEventBus } from '~react-logic-component'

// @ts-ignore
const metaModules = import.meta.glob('./demo*/meta.ts', { eager: true })

const index = () => {
  const eventBus = useEventBus()

  useEffect(() => {
    eventBus.emit([
      {
        id: AnchorID.component,
        params: Object.values(metaModules)
          // @ts-ignore
          .filter((i) => i.Anchor)
          // @ts-ignore
          .map((i) => i.Anchor),
      },
    ])
  }, [])

  return (
    <CodeMemo
      metasMap={
        new Map(
          //@ts-ignore
          Object.entries(import.meta.glob('./demo*/meta.ts', { eager: true })).map(([key, value]) => {
            return [key.replace('meta.ts', 'index.tsx'), value]
          }),
        )
      }
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
