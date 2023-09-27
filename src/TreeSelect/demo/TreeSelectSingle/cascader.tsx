import { TreeSelectSingle, TreeSelectItem, type TreeSelectSingleRef } from '@/TreeSelect/src'
import React, { useMemo, useRef, useState } from 'react'

import { genTreeData, type TreeNode } from '../utils'
import './cascader.scss'

const cascader = () => {
  const classNamePrefix = 'tree-single-select-cascader'
  const [value, setValue] = useState<string>('')
  const [repeatTriggerUnselected, setRepeatTriggerUnselected] = useState(true)

  const treeData = useMemo(() => genTreeData(3, 2, 2), [])
  const [levels, setLevels] = useState<TreeNode[][]>([treeData])

  const ref = useRef<TreeSelectSingleRef<{ id: number, value: string }>>(null)

  return (
    <article className={classNamePrefix}>
      <section>当前值：{value}</section>
      <section className={`${classNamePrefix}-operator`}>
        <button
          onClick={() => {
            setRepeatTriggerUnselected(false)
          }}
        >
          允许重复点击
        </button>
        <button
          onClick={() => {
            setRepeatTriggerUnselected(true)
          }}
        >
          重复点击，取消选中
        </button>
      </section>
      <section className={`${classNamePrefix}-select`}>
        <TreeSelectSingle ref={ref}>
          {
            levels.map((level, index) =>
              <div key={index} className={`${classNamePrefix}-group`}>
                {
                  level?.map((item) =>
                    <TreeSelectItem
                      key={item.id}
                      id={item.id}
                      parentId={item.parentId}
                      value={item.value}
                      repeatTriggerUnselected={repeatTriggerUnselected}
                    >
                      {
                        ({ isChecked }) => {
                          return <div className={`${classNamePrefix}-group-item`} onClick={() => {
                            ref.current?.trigger(item.id).then((res) => {
                              const curItemLevel = ref.current?.getLevel(item.id)
                              if (res?.isChecked) {
                                setValue(JSON.stringify(res.value))
                              } else {
                                setValue("")
                              }
                              if (item.children?.length && curItemLevel) {
                                levels[curItemLevel] = item.children
                                setLevels(res?.isChecked ? levels.slice(0, curItemLevel + 1) : levels.slice(0, curItemLevel))
                              }
                            })
                          }}>
                            <input checked={isChecked} type='checkbox' readOnly />
                            {item.value}
                          </div>
                        }
                      }
                    </TreeSelectItem>)
                }
              </div>
            )}
        </TreeSelectSingle>
      </section>
    </article>
  )
}

export default cascader
