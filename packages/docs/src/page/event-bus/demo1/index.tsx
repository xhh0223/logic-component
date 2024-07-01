import { Card, Flex } from 'antd'
import { useEffect, useRef, useState } from 'react'

import { EventBus, EventBusItem, EventBusRef } from '~logic-component/index'

import { EventTable, EventType } from '../const'
import SendMessageTable from './send-message-table'
const Demo1 = () => {
  const ref = useRef<EventBusRef>()
  const [, update] = useState({})
  useEffect(() => {
    ref.current.on({
      id: EventTable,
      dependency: Object.values(EventType),
      callback() {
        update({})
      },
    })
  }, [])

  return (
    <EventBus ref={ref}>
      <Flex component={'article'} vertical gap={12}>
        <h2>组件间通信</h2>
        <SendMessageTable />

        <Flex component={'section'} gap={12} wrap>
          <EventBusItem
            id={EventType.ancestor1}
            dependency={[EventType.ancestor2, EventType.ancestor3]}
            render={({ dependencyEntries }) => {
              return (
                <Card title={EventType.ancestor1}>
                  <div>依赖：{[EventType.ancestor2, EventType.ancestor3].join('、')}</div>
                  <div style={{ width: 100, minHeight: 100 }}>{JSON.stringify(dependencyEntries)}</div>
                </Card>
              )
            }}
          />
          <EventBusItem
            id={EventType.ancestor2}
            dependency={[EventType.ancestor1, EventType.ancestor3]}
            render={({ dependencyEntries }) => {
              return (
                <Card title={EventType.ancestor2}>
                  <div>依赖：{[EventType.ancestor1, EventType.ancestor3].join('、')}</div>
                  <div style={{ width: 100, minHeight: 100 }}>{JSON.stringify(dependencyEntries)}</div>
                </Card>
              )
            }}
          />
          <EventBusItem
            id={EventType.ancestor3}
            dependency={[EventType.ancestor1, EventType.ancestor2]}
            render={({ dependencyEntries }) => {
              return (
                <Card title={EventType.ancestor3}>
                  <div>依赖：{[EventType.ancestor1, EventType.ancestor2].join('、')}</div>
                  <div style={{ width: 100, minHeight: 100 }}>{JSON.stringify(dependencyEntries)}</div>
                </Card>
              )
            }}
          />
          <EventBusItem
            id={EventType.child1}
            dependency={[
              EventType.ancestor1,
              EventType.ancestor2,
              EventType.ancestor3,
              EventType.sibling1,
              EventType.sibling2,
              EventType.sibling3,
            ]}
            render={({ dependencyEntries }) => {
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
                  <div style={{ width: 100, minHeight: 100 }}>{JSON.stringify(dependencyEntries)}</div>
                </Card>
              )
            }}
          />
          <EventBusItem
            id={EventType.child2}
            dependency={[EventType.ancestor3, EventType.sibling3, EventType.child2]}
            render={({ dependencyEntries }) => {
              return (
                <Card title={EventType.child2}>
                  <div>
                    依赖：
                    {[[EventType.ancestor3, EventType.sibling3, EventType.child2]].join('、')}
                  </div>
                  <div style={{ width: 100, minHeight: 100 }}>{JSON.stringify(dependencyEntries)}</div>
                </Card>
              )
            }}
          />
          <EventBusItem
            id={EventType.child3}
            dependency={[EventType.ancestor2, EventType.sibling1, EventType.child1]}
            render={({ dependencyEntries }) => {
              return (
                <Card title={EventType.child3}>
                  <div>依赖：{[EventType.ancestor2, EventType.sibling1, EventType.child1].join('、')}</div>
                  <div style={{ width: 100, minHeight: 100 }}>{JSON.stringify(dependencyEntries)}</div>
                </Card>
              )
            }}
          />
          <EventBusItem
            id={EventType.sibling1}
            dependency={[EventType.sibling2, EventType.sibling3]}
            render={({ dependencyEntries }) => {
              return (
                <Card title={EventType.sibling1}>
                  <div>依赖：{[EventType.sibling2, EventType.sibling3].join('、')}</div>
                  <div style={{ width: 100, minHeight: 100 }}>{JSON.stringify(dependencyEntries)}</div>
                </Card>
              )
            }}
          />
          <EventBusItem
            id={EventType.sibling2}
            dependency={[EventType.ancestor1, EventType.sibling1, EventType.child1, EventType.descendant2]}
            render={({ dependencyEntries }) => {
              return (
                <Card title={EventType.sibling2}>
                  <div>
                    依赖：
                    {[EventType.ancestor1, EventType.sibling1, EventType.child1, EventType.descendant2].join('、')}
                  </div>
                  <div style={{ width: 100, minHeight: 100 }}>{JSON.stringify(dependencyEntries)}</div>
                </Card>
              )
            }}
          />
          <EventBusItem
            id={EventType.sibling3}
            dependency={[EventType.ancestor3, EventType.descendant2, EventType.sibling2]}
            render={({ dependencyEntries }) => {
              return (
                <Card title={EventType.sibling3}>
                  <div>依赖：{[EventType.ancestor3, EventType.descendant2, EventType.sibling2].join('、')}</div>
                  <div style={{ width: 100, minHeight: 100 }}>{JSON.stringify(dependencyEntries)}</div>
                </Card>
              )
            }}
          />
          <EventBusItem
            id={EventType.descendant1}
            dependency={[EventType.descendant2, EventType.descendant3]}
            render={({ dependencyEntries }) => {
              return (
                <Card title={EventType.descendant1}>
                  <div>依赖：{[EventType.descendant2, EventType.descendant3].join('、')}</div>
                  <div style={{ width: 100, minHeight: 100 }}>{JSON.stringify(dependencyEntries)}</div>
                </Card>
              )
            }}
          />
          <EventBusItem
            id={EventType.descendant2}
            dependency={[EventType.sibling2, EventType.descendant2, EventType.descendant3]}
            render={({ dependencyEntries }) => {
              return (
                <Card title={EventType.descendant2}>
                  <div>依赖：{[EventType.sibling2, EventType.descendant2, EventType.descendant3].join('、')}</div>
                  <div style={{ width: 100, minHeight: 100 }}>{JSON.stringify(dependencyEntries)}</div>
                </Card>
              )
            }}
          />
          <EventBusItem
            id={EventType.descendant3}
            dependency={[EventType.ancestor1, EventType.ancestor2, EventType.sibling2, EventType.child3]}
            render={({ dependencyEntries }) => {
              return (
                <Card title={EventType.descendant3}>
                  <div>
                    依赖：{[EventType.ancestor1, EventType.ancestor2, EventType.sibling2, EventType.child3].join('、')}
                  </div>
                  <div style={{ width: 100, minHeight: 100 }}>{JSON.stringify(dependencyEntries)}</div>
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
