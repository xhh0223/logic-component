import { Card, Flex } from 'antd'
import { useRef, useState } from 'react'

import { SelectSingle, SelectSingleItem, SelectSingleRef } from '~logic-component/index'
const Demo6 = () => {
  const [state, setState] = useState({
    currentValue: undefined,
  })

  const ref = useRef<SelectSingleRef>()

  return (
    <Flex component={'article'} vertical>
      <h3>可勾选卡片</h3>
      <Flex component={'section'} vertical gap={12}>
        <SelectSingle ref={ref}>
          <Flex gap={12} wrap style={{ width: 924 }}>
            {Array.from({ length: 5 }).map((_, index) => {
              return (
                <SelectSingleItem
                  key={index}
                  id={index}
                  value={index}
                  render={({ id, isChecked, value, handler }) => (
                    <Flex
                      onClick={() => {
                        const value = handler.select(id)
                        setState({ currentValue: value })
                      }}
                    >
                      <Card
                        title={<div>{`第${value}项`}</div>}
                        style={{ width: 300 }}
                        extra={<input type="checkbox" checked={isChecked} onChange={() => {}} />}
                      >
                        内容:{value}
                      </Card>
                    </Flex>
                  )}
                />
              )
            })}
          </Flex>
        </SelectSingle>
        <Flex vertical gap={8}>
          <div>选项状态：</div>
          <div>{JSON.stringify(state.currentValue)}</div>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default Demo6
