import { genTreeData } from '@src/utils'
import { Checkbox, Flex, Tag } from 'antd'
import { useEffect, useRef, useState } from 'react'

import { TreeSelectSingle, TreeSelectSingleItem, TreeSelectSingleRef } from '~logic-component/index'

const Demo2 = () => {
  const [state, setState] = useState({
    currentValue: [],
  })
  const [everyLevelData, setEveryLevelData] = useState([genTreeData([5, 3, 3])])

  const ref = useRef<TreeSelectSingleRef>()

  useEffect(() => {
    setState({ currentValue: ref.current.getAllItems() })
  }, [])

  return (
    <Flex component={'article'} vertical>
      <h2>级联</h2>
      <Flex component={'section'} vertical gap={12}>
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
                                  handler.select(id)
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
          <div>{state.currentValue?.map((i, index) => <div key={index}>{JSON.stringify(i)}</div>)}</div>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default Demo2
