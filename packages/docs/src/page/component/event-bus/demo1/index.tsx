import { Button, Card, Flex } from 'antd'
import { useMemo } from 'react'
import { EventBus, EventBusItem } from 'react-logic-component'

const App = () => {
  const parentComponent = useMemo(
    () => (
      <EventBusItem<number>
        key={'parent'}
        id={'parent'}
        onIds={['parent']}
        render={({ onIdsParams, handler }) => (
          <Card title={'parent'}>
            <Flex vertical gap={12} style={{ width: 200, height: 100 }}>
              <Button
                onClick={() => {
                  handler.emit([{ id: 'child', params: Math.random() }])
                }}
              >
                向子组件传递一个随机数
              </Button>
              <div>子组件传递过来的随机随机数：{onIdsParams[0]?.params}</div>
            </Flex>
          </Card>
        )}
      />
    ),
    [],
  )

  const childComponent = useMemo(
    () => (
      <EventBusItem<number>
        key={'child'}
        id={'child'}
        onIds={['child']}
        render={({ onIdsParams, handler }) => (
          <Card title={'child'}>
            <Flex vertical gap={12} style={{ width: 200, height: 100 }}>
              <Button
                onClick={() => {
                  handler.emit([{ id: 'parent', params: Math.random() }])
                }}
              >
                向父组件传递一个随机数
              </Button>
              <div>父组件传递过来的随机随机数：{onIdsParams[0]?.params}</div>
            </Flex>
          </Card>
        )}
      />
    ),
    [],
  )

  return (
    <EventBus>
      <Flex component={'article'} vertical gap={12}>
        {parentComponent}
        {childComponent}
      </Flex>
    </EventBus>
  )
}

export default App
