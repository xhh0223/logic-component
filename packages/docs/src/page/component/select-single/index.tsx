import { Markdown } from '@src/component'
import { AnchorID } from '@src/constant'
import { CodeMemo } from '@src/layout'
import { genRandomNumber } from '@src/utils'
import { useEffect } from 'react'

import { useEventBus } from '~react-logic-component'

// @ts-ignore
const metaModules = Object.entries(import.meta.glob('./demo*/meta.ts', { eager: true })).map(([key, value]) => {
  // @ts-ignore
  const Anchor = value.Anchor
  Anchor.key = `${Anchor.key}-${genRandomNumber()}`
  // @ts-ignore
  return [key.replace('meta.ts', 'index.tsx'), { ...value, Anchor }]
})

const index = () => {
  const eventBus = useEventBus()

  useEffect(() => {
    eventBus.emit([
      {
        id: AnchorID.component,
        params: Object.values(Object.fromEntries(metaModules))
          // @ts-ignore
          .filter((i) => i.Anchor)
          // @ts-ignore
          .map((i) => i.Anchor),
      },
    ])
  }, [])

  return (
    <div>
      <Markdown>{`# select-single  \n 复用单选逻辑的组件`}</Markdown>
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
