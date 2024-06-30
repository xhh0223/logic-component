import { Flex } from 'antd'
import { useEffect, useRef, useState } from 'react'

import { SelectSingle, SelectSingleItem, SelectSingleRef } from '~logic-component/index'
const Demo3 = () => {
  const [state, setState] = useState({
    currentValue: [],
  })
  const ref = useRef<SelectSingleRef>()

  useEffect(() => {
    setState({ currentValue: ref.current.getAllItems() })
  }, [])

  return (
    <Flex component={'article'} vertical>
      <h2>select</h2>
      <Flex component={'section'} vertical gap={12}>
        <SelectSingle ref={ref}>
          <select
            name="select"
            onChange={(v) => {
              const id = Number(v.currentTarget.value)
              ref.current.select(id)
              setState({ currentValue: ref.current.getAllItems() })
            }}
          >
            {Array.from({ length: 10 }).map((_, index) => {
              return (
                <SelectSingleItem
                  key={index}
                  id={index}
                  value={index}
                  render={({ id, value }) => <option label={`第${value}项`} value={id} />}
                />
              )
            })}
          </select>
        </SelectSingle>
        <Flex vertical gap={8}>
          <div>选项状态：</div>
          <div>{state.currentValue?.map((i, index) => <div key={index}>{JSON.stringify(i)}</div>)}</div>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default Demo3
