import { Card, Flex } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { SelectMultiple, SelectMultipleItem, SelectMultipleRef } from 'react-logic-component'
const Demo6 = () => {
  const [state, setState] = useState({
    currentValue: [],
  })

  const ref = useRef<SelectMultipleRef>()

  useEffect(() => {
    setState({ currentValue: ref.current.getAllItems() })
  }, [])

  return (
    <Flex component={'article'} vertical gap={12}>
      <div className="is-bold">可勾选卡片</div>
      <Flex component={'section'} vertical gap={12}>
        <SelectMultiple ref={ref}>
          <Flex gap={12} wrap>
            {Array.from({ length: 5 }).map((_, index) => {
              return (
                <SelectMultipleItem
                  key={index}
                  id={index}
                  value={index}
                  render={({ id, isChecked, value, handler }) => (
                    <Flex
                      onClick={() => {
                        handler.select([[id]])
                        setState({ currentValue: handler.getAllItems() })
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
        </SelectMultiple>
        <Flex vertical gap={8}>
          <div>选项状态：</div>
          <div>
            {state.currentValue
              ?.filter((i) => i.isChecked)
              ?.map((i, index) => <div key={index}>{JSON.stringify(i)}</div>)}
          </div>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default Demo6
