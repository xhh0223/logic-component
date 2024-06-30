import { Flex } from 'antd'
import { useEffect, useRef, useState } from 'react'

import { SelectSingle, SelectSingleItem, SelectSingleRef } from '~logic-component/index'
const Demo4 = () => {
  const [state, setState] = useState({
    currentValue: [],
  })

  const ref = useRef<SelectSingleRef>()

  useEffect(() => {
    setState({ currentValue: ref.current.getAllItems() })
  }, [])

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
                        handler.select(id, { allowRepeatSelect: false })
                        setState({ currentValue: handler.getAllItems() })
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
          <div>{state.currentValue?.map((i, index) => <div key={index}>{JSON.stringify(i)}</div>)}</div>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default Demo4
