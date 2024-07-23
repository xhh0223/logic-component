import { CodeMemo } from '@src/layout'
import { SideAnchor } from '@src/layout/side-anchor'
import { Flex } from 'antd'
import { EventBus } from 'react-logic-component'

import { introduce } from './meta'

// @ts-ignore
const demoMetaMap = Object.entries(import.meta.glob('./demo*/meta.ts', { eager: true })).map(([key, value]) => {
  return [key.replace('meta.ts', 'index.tsx'), value]
})

const anchors = Object.values(Object.fromEntries(demoMetaMap))
  // @ts-ignore
  .filter((i) => i.Anchor)
  // @ts-ignore
  .map((i) => i.Anchor)

const index = () => {
  return (
    <EventBus>
      <Flex
        style={{
          overflow: 'auto',
          width: '100%',
          boxSizing: 'border-box',
          padding: '0 16px 100px 16px',
        }}
      >
        <Flex vertical style={{ height: 'fit-content', flexGrow: '1', width: '100%' }}>
          {introduce}
          <CodeMemo
            demoMetaMap={new Map(demoMetaMap as any)}
            // @ts-ignore
            components={import.meta.glob('./demo*/index.tsx', { eager: true })}
            componentsRawCodeMap={
              new Map<string, string>(
                // @ts-ignore
                Object.entries(import.meta.glob('./demo*/index.tsx', { eager: true, query: '?raw' })),
              )
            }
          />
        </Flex>
        <SideAnchor anchors={anchors} />
      </Flex>
    </EventBus>
  )
}

export default index
