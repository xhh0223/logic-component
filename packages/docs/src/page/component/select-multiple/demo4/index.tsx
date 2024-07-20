import { Flex } from 'antd'
import { useEffect, useRef, useState } from 'react'

import { SelectMultiple, SelectMultipleHandler, SelectMultipleItem } from '~react-logic-component'
const Demo4 = () => {
  const [state, setState] = useState({
    currentValue: [],
  })

  const ref = useRef<SelectMultipleHandler>()

  useEffect(() => {
    setState({ currentValue: ref.current.getAllItems() })
  }, [])

  return (
    <Flex component={'article'} vertical gap={12}>
      <div className="is-bold">checkbox(重复点击不可取消)</div>
      <Flex component={'section'} vertical gap={12}>
        <SelectMultiple ref={ref}>
          <Flex vertical>
            {Array.from({ length: 10 }).map((_, index) => {
              return (
                <SelectMultipleItem
                  key={index}
                  id={index}
                  value={index}
                  render={({ id, isChecked, value, handler }) => (
                    <Flex
                      onClick={() => {
                        handler.select([{ id, options: { allowRepeatSelect: true } }])
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

export default Demo4
