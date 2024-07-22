import { genTreeData } from '@src/utils'
import { Checkbox, Flex, Tag } from 'antd'
import { useLayoutEffect, useRef, useState } from 'react'

import { TreeSelectSingle, TreeSelectSingleHandler, TreeSelectSingleItem } from '~react-logic-component'

const App = () => {
  const [state, setState] = useState({
    currentValue: undefined,
  })
  const [everyLevelData, setEveryLevelData] = useState([genTreeData([5, 3, 3])])

  const ref = useRef<TreeSelectSingleHandler>()

  useLayoutEffect(() => {
    if (state.currentValue?.isChecked) {
      ref.current.select(state.currentValue.id, { allowRepeatSelect: true })
    }
  }, [everyLevelData])

  return (
    <Flex component={'section'} vertical gap={12} style={{ maxHeight: 500, overflow: 'auto' }}>
      <TreeSelectSingle ref={ref}>
        <Flex>
          {everyLevelData.map((levelData, level) => {
            return (
              <div key={level}>
                {levelData?.map((i) => (
                  <TreeSelectSingleItem
                    key={i.id}
                    id={i.id}
                    render={({ handler, isChecked, childrenIds, id }) => {
                      return (
                        <Flex gap={16}>
                          {childrenIds ? (
                            <Tag
                              onClick={() => {
                                everyLevelData.splice(level + 1, everyLevelData.length - (level + 1))
                                everyLevelData[level + 1] = i.children
                                setEveryLevelData([...everyLevelData])
                              }}
                            >
                              {id}
                            </Tag>
                          ) : (
                            <Checkbox
                              onClick={() => {
                                const value = handler.select(id)
                                setState({
                                  currentValue: value,
                                })
                              }}
                              checked={isChecked}
                            >
                              {id}
                            </Checkbox>
                          )}
                        </Flex>
                      )
                    }}
                    parentId={i.parentId}
                    childrenIds={i.children?.map((i) => i.id)}
                  />
                ))}
              </div>
            )
          })}
        </Flex>
      </TreeSelectSingle>
      <Flex vertical gap={8}>
        <div>选项状态：</div>
        <div>
          <div>{JSON.stringify(state.currentValue)}</div>
        </div>
      </Flex>
    </Flex>
  )
}

export default App
