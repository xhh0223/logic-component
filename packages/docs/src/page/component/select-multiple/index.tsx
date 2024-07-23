import { CodeMemo } from '@src/layout'
import { SideAnchor } from '@src/layout/side-anchor'
import { Flex } from 'antd'
import { EventBus } from 'react-logic-component'

import { anchors, components, componentsRawCodeMap, demoMetaMap, introduce } from './meta'

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
            components={components}
            componentsRawCodeMap={componentsRawCodeMap}
          />
        </Flex>
        <SideAnchor anchors={anchors} />
      </Flex>
    </EventBus>
  )
}

export default index
