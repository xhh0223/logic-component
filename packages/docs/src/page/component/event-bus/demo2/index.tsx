import { Button, Card, Flex } from 'antd'
import { useMemo } from 'react'
import { EventBus, EventBusItem } from 'react-logic-component'

const App = () => {
  const brother1 = useMemo(
    () => (
      <EventBusItem<number>
        key={'brother1'}
        id={'brother1'}
        onIds={['brother2', 'brother3']}
        render={({ onIdsParams, handler }) => (
          <Card title={'brother1 (依赖brother2、brother3的数据)'}>
            <Flex vertical gap={12} style={{ width: 280, height: 100 }}>
              <Button
                onClick={() => {
                  handler.emit([{ id: 'brother1', params: Math.random() }])
                }}
              >
                向依赖brother1的组件传递一个随机数
              </Button>
              <div>brother2、brother3传递过来的随机随机数：{JSON.stringify(onIdsParams)}</div>
            </Flex>
          </Card>
        )}
      />
    ),
    [],
  )
  const brother2 = useMemo(
    () => (
      <EventBusItem<number>
        key={'brother2'}
        id={'brother2'}
        onIds={['brother1', 'brother3']}
        render={({ onIdsParams, handler }) => (
          <Card title={'brother2 (依赖brother1、brother3的数据)'}>
            <Flex vertical gap={12} style={{ width: 280, height: 100 }}>
              <Button
                onClick={() => {
                  handler.emit([{ id: 'brother2', params: Math.random() }])
                }}
              >
                向依赖brother2的组件传递一个随机数
              </Button>
              <div>brother2、brother3传递过来的随机随机数：{JSON.stringify(onIdsParams)}</div>
            </Flex>
          </Card>
        )}
      />
    ),
    [],
  )
  const brother3 = useMemo(
    () => (
      <EventBusItem<number>
        key={'brother3'}
        id={'brother3'}
        onIds={['brother1', 'brother2']}
        render={({ onIdsParams, handler }) => (
          <Card title={'brother3 (依赖brother1、brother2的数据)'}>
            <Flex vertical gap={12} style={{ width: 280, height: 100 }}>
              <Button
                style={{ fontSize: 12 }}
                onClick={() => {
                  handler.emit([{ id: 'brother3', params: Math.random() }])
                }}
              >
                向依赖brother3的组件 传递一个随机数
              </Button>
              <div>brother1、brother2传递过来的随机随机数：{JSON.stringify(onIdsParams)}</div>
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
        {brother1}
        {brother2}
        {brother3}
      </Flex>
    </EventBus>
  )
}

export default App
