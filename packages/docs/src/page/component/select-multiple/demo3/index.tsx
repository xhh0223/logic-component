import { Flex } from 'antd'
import { useEffect, useRef, useState } from 'react'

import { SelectMultiple, SelectMultipleHandler, SelectMultipleItem } from '~react-logic-component'
const Demo3 = () => {
  const [state, setState] = useState({
    currentValue: [],
  })

  const ref = useRef<SelectMultipleHandler>()

  useEffect(() => {
    setState({ currentValue: ref.current.getAllItems() })
  }, [])

  return (
    <Flex component={'section'} vertical gap={12}>
      <SelectMultiple ref={ref}>
        <Flex wrap>
          {Array.from({ length: 10 }).map((_, index) => {
            return (
              <SelectMultipleItem
                key={index}
                id={index}
                value={index}
                render={({ id, isChecked, value, handler }) => (
                  <Flex
                    style={{ width: '5em' }}
                    onClick={() => {
                      handler.select([{ id }])
                      setState({ currentValue: handler.getAllItems() })
                    }}
                  >
                    <input type="checkbox" checked={isChecked} onChange={() => {}} />
                    <div>{`第${value}项`}</div>
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
          {state.currentValue.map((i, index) => (
            <div key={index}>{JSON.stringify(i)}</div>
          ))}
        </div>
      </Flex>
    </Flex>
  )
}

export default Demo3
