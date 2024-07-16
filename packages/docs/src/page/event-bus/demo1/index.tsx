import { Card, Flex } from 'antd'
import { useRef } from 'react'
import { EventBus, EventBusItem, EventBusRef } from 'react-logic-component'

import { EventType } from '../const'
import SendMessageTable from './send-message-table'
const Demo1 = () => {
  const ref = useRef<EventBusRef>()

  return (
    <EventBus ref={ref}>
      <Flex component={'article'} vertical gap={12}>
        <h3>组件间通信</h3>
        <SendMessageTable />

        <Flex component={'section'} gap={12} wrap>
          <EventBusItem
            id={EventType.ancestor1}
            onIds={[EventType.ancestor2, EventType.ancestor3]}
            render={({ onIdsEntries }) => {
              return (
                <Card title={EventType.ancestor1}>
                  <div>依赖：{[EventType.ancestor2, EventType.ancestor3].join('、')}</div>
                  <div style={{ width: 100, minHeight: 100 }}>{JSON.stringify(onIdsEntries)}</div>
                </Card>
              )
            }}
          />
          <EventBusItem
            id={EventType.ancestor2}
            onIds={[EventType.ancestor1, EventType.ancestor3]}
            render={({ onIdsEntries }) => {
              return (
                <Card title={EventType.ancestor2}>
                  <div>依赖：{[EventType.ancestor1, EventType.ancestor3].join('、')}</div>
                  <div style={{ width: 100, minHeight: 100 }}>{JSON.stringify(onIdsEntries)}</div>
                </Card>
              )
            }}
          />
          <EventBusItem
            id={EventType.ancestor3}
            onIds={[EventType.ancestor1, EventType.ancestor2]}
            render={({ onIdsEntries }) => {
              return (
                <Card title={EventType.ancestor3}>
                  <div>依赖：{[EventType.ancestor1, EventType.ancestor2].join('、')}</div>
                  <div style={{ width: 100, minHeight: 100 }}>{JSON.stringify(onIdsEntries)}</div>
                </Card>
              )
            }}
          />
          <EventBusItem
            id={EventType.child1}
            onIds={[
              EventType.ancestor1,
              EventType.ancestor2,
              EventType.ancestor3,
              EventType.sibling1,
              EventType.sibling2,
              EventType.sibling3,
            ]}
            render={({ onIdsEntries }) => {
              return (
                <Card title={EventType.child1}>
                  <div>
                    依赖：
                    {[
                      EventType.ancestor1,
                      EventType.ancestor2,
                      EventType.ancestor3,
                      EventType.sibling1,
                      EventType.sibling2,
                      EventType.sibling3,
                    ].join('、')}
                  </div>
                  <div style={{ width: 100, minHeight: 100 }}>{JSON.stringify(onIdsEntries)}</div>
                </Card>
              )
            }}
          />
          <EventBusItem
            id={EventType.child2}
            onIds={[EventType.ancestor3, EventType.sibling3, EventType.child2]}
            render={({ onIdsEntries }) => {
              return (
                <Card title={EventType.child2}>
                  <div>
                    依赖：
                    {[[EventType.ancestor3, EventType.sibling3, EventType.child2]].join('、')}
                  </div>
                  <div style={{ width: 100, minHeight: 100 }}>{JSON.stringify(onIdsEntries)}</div>
                </Card>
              )
            }}
          />
          <EventBusItem
            id={EventType.child3}
            onIds={[EventType.ancestor2, EventType.sibling1, EventType.child1]}
            render={({ onIdsEntries }) => {
              return (
                <Card title={EventType.child3}>
                  <div>依赖：{[EventType.ancestor2, EventType.sibling1, EventType.child1].join('、')}</div>
                  <div style={{ width: 100, minHeight: 100 }}>{JSON.stringify(onIdsEntries)}</div>
                </Card>
              )
            }}
          />
          <EventBusItem
            id={EventType.sibling1}
            onIds={[EventType.sibling2, EventType.sibling3]}
            render={({ onIdsEntries }) => {
              return (
                <Card title={EventType.sibling1}>
                  <div>依赖：{[EventType.sibling2, EventType.sibling3].join('、')}</div>
                  <div style={{ width: 100, minHeight: 100 }}>{JSON.stringify(onIdsEntries)}</div>
                </Card>
              )
            }}
          />
          <EventBusItem
            id={EventType.sibling2}
            onIds={[EventType.ancestor1, EventType.sibling1, EventType.child1, EventType.descendant2]}
            render={({ onIdsEntries }) => {
              return (
                <Card title={EventType.sibling2}>
                  <div>
                    依赖：
                    {[EventType.ancestor1, EventType.sibling1, EventType.child1, EventType.descendant2].join('、')}
                  </div>
                  <div style={{ width: 100, minHeight: 100 }}>{JSON.stringify(onIdsEntries)}</div>
                </Card>
              )
            }}
          />
          <EventBusItem
            id={EventType.sibling3}
            onIds={[EventType.ancestor3, EventType.descendant2, EventType.sibling2]}
            render={({ onIdsEntries }) => {
              return (
                <Card title={EventType.sibling3}>
                  <div>依赖：{[EventType.ancestor3, EventType.descendant2, EventType.sibling2].join('、')}</div>
                  <div style={{ width: 100, minHeight: 100 }}>{JSON.stringify(onIdsEntries)}</div>
                </Card>
              )
            }}
          />
          <EventBusItem
            id={EventType.descendant1}
            onIds={[EventType.descendant2, EventType.descendant3]}
            render={({ onIdsEntries }) => {
              return (
                <Card title={EventType.descendant1}>
                  <div>依赖：{[EventType.descendant2, EventType.descendant3].join('、')}</div>
                  <div style={{ width: 100, minHeight: 100 }}>{JSON.stringify(onIdsEntries)}</div>
                </Card>
              )
            }}
          />
          <EventBusItem
            id={EventType.descendant2}
            onIds={[EventType.sibling2, EventType.descendant2, EventType.descendant3]}
            render={({ onIdsEntries }) => {
              return (
                <Card title={EventType.descendant2}>
                  <div>依赖：{[EventType.sibling2, EventType.descendant2, EventType.descendant3].join('、')}</div>
                  <div style={{ width: 100, minHeight: 100 }}>{JSON.stringify(onIdsEntries)}</div>
                </Card>
              )
            }}
          />
          <EventBusItem
            id={EventType.descendant3}
            onIds={[EventType.ancestor1, EventType.ancestor2, EventType.sibling2, EventType.child3]}
            render={({ onIdsEntries }) => {
              return (
                <Card title={EventType.descendant3}>
                  <div>
                    依赖：{[EventType.ancestor1, EventType.ancestor2, EventType.sibling2, EventType.child3].join('、')}
                  </div>
                  <div style={{ width: 100, minHeight: 100 }}>{JSON.stringify(onIdsEntries)}</div>
                </Card>
              )
            }}
          />
        </Flex>
      </Flex>
    </EventBus>
  )
}

export default Demo1
