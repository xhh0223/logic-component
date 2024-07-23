import { AnchorID } from '@src/constant'
import { CodeMemo } from '@src/layout'
import { genRandomNumber } from '@src/utils'
import { useEffect } from 'react'
import { useEventBus } from 'react-logic-component'

import { introduce } from './meta'

// @ts-ignore
const metaModules = Object.entries(import.meta.glob('./demo*/meta.ts', { eager: true })).map(([key, value]) => {
  // @ts-ignore
  const Anchor = value.Anchor
  Anchor.key = `${Anchor.key}-${genRandomNumber()}`
  Anchor.href = `${Anchor.href}-${genRandomNumber()}`
  // @ts-ignore
  return [key.replace('meta.ts', 'index.tsx'), { ...value, Anchor }]
})

const Anchors = Object.values(Object.fromEntries(metaModules))
  // @ts-ignore
  .filter((i) => i.Anchor)
  // @ts-ignore
  .map((i) => i.Anchor)

const index = () => {
  const eventBus = useEventBus()

  useEffect(() => {
    eventBus.emit([
      {
        id: AnchorID.component,
        params: Anchors,
      },
    ])
  }, [])

  return (
    <div>
      {introduce}
      <CodeMemo
        metasMap={new Map(metaModules as any)}
        // @ts-ignore
        components={import.meta.glob('./demo*/index.tsx', { eager: true })}
        componentsRawMap={
          new Map<string, string>(
            // @ts-ignore
            Object.entries(import.meta.glob('./demo*/index.tsx', { eager: true, query: '?raw' })),
          )
        }
      />
    </div>
  )
}

export default index
