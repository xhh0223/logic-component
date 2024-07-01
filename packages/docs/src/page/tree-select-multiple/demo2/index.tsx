import { genTreeData } from '@src/utils'
import { Checkbox, Flex, Tag } from 'antd'
import { useEffect, useMemo, useRef, useState } from 'react'

import { TreeSelectMultiple, TreeSelectMultipleItem, TreeSelectMultipleRef } from '~logic-component/index'

const Demo2 = () => {
  const [isUpdate, update] = useState({})
  const map = useMemo(() => new Map(), [])

  const [everyLevelData, setEveryLevelData] = useState([genTreeData([5, 3, 3])])

  const ref = useRef<TreeSelectMultipleRef>()

  useEffect(() => {
    const ids = [...map.values()]?.filter((i) => i.isChecked)?.map((i) => i.id)
    ref.current.select([...ids.map((i) => [i, { allowRepeatSelect: true }])])
  }, [isUpdate])

  return (
    <Flex component={'article'} vertical>
      <h2>级联</h2>
      <Flex component={'section'} vertical gap={12}>
        <TreeSelectMultiple ref={ref}>
          <Flex>
            {everyLevelData.map((levelData, level) => {
              return (
                <div key={level}>
                  {levelData?.map((i) => (
                    <TreeSelectMultipleItem
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
                                  update({})
                                }}
                              >
                                {id}
                              </Tag>
                            ) : (
                              <Checkbox
                                onClick={() => {
                                  const values = handler.select([[id]])[0]
                                  map.set(values.id, values)
                                  update({})
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
        </TreeSelectMultiple>
        <Flex vertical gap={8}>
          <div>选项状态：</div>
          <div>
            {[...map.values()]
              ?.filter((i) => i.isChecked)
              ?.map((i, index) => <div key={index}>{JSON.stringify(i)}</div>)}
          </div>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default Demo2
