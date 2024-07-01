import { Flex } from 'antd'
import { useRef, useState } from 'react'

import { SelectSingle, SelectSingleItem, SelectSingleRef } from '~logic-component/index'
const Demo4 = () => {
  const [state, setState] = useState({
    currentValue: undefined,
  })

  const ref = useRef<SelectSingleRef>()

  return (
    <Flex component={'article'} vertical>
      <h2>checkbox</h2>
      <Flex component={'section'} vertical gap={12}>
        <SelectSingle ref={ref}>
          <Flex vertical>
            {Array.from({ length: 10 }).map((_, index) => {
              return (
                <SelectSingleItem
                  key={index}
                  id={index}
                  value={index}
                  render={({ id, isChecked, value, handler }) => (
                    <Flex
                      onClick={() => {
                        const value = handler.select(id, { allowRepeatSelect: false })
                        setState({ currentValue: value })
                      }}
                    >
                      <div>{`第${value}项`}</div>
                      <input type="checkbox" checked={isChecked} onChange={() => {}} />
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

export default Demo4
