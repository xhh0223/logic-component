import { TreeSelectMultiple, TreeSelectItem, type TreeSelectMultipleRef } from '@/TreeSelect/src'
import React, { useMemo, useRef, useState } from 'react'

import { genTreeData, type TreeNode } from '../utils'
import './cascader.scss'

const cascader = () => {
  const classNamePrefix = 'tree-multiple-select-cascader'
  const [value, setValue] = useState<string>('')
  const [repeatTriggerUnselected, setRepeatTriggerUnselected] = useState(true)

  const treeData = useMemo(() => genTreeData(3, 2, 2), [])
  const [levels, setLevels] = useState<TreeNode[][]>([treeData])

  const ref = useRef<TreeSelectMultipleRef<{ id: number, value: string }>>(null)

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
        <TreeSelectMultiple ref={ref}>
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
                      repeatTriggerUnselected={item.children ? false : repeatTriggerUnselected}>
                      {
                        ({ isChecked }) => {
                          return <div
                            className={`${classNamePrefix}-group-item`}
                            onClick={() => {
                              const curItemLevel = ref.current?.getLevel(item.id) ?? 0
                              if (item.children?.length) {
                                levels[curItemLevel + 1] = item.children
                                setLevels(levels.slice(0, curItemLevel + 1 + 1))
                              } else {
                                ref.current?.trigger([item.id]).then(() => {
                                  setLevels(levels.slice(0, curItemLevel + 1))
                                  setValue(
                                    JSON.stringify(
                                      ref.current
                                        ?.getAll()
                                        ?.filter(item => item.isChecked)
                                        ?.map(item => ({ id: item.id, value: item.value }))
                                    ))
                                })
                              }
                            }}>
                            {!item.children && <input checked={isChecked} type='checkbox' readOnly />}
                            {item.value}
                          </div>
                        }
                      }
                    </TreeSelectItem>)
                }
              </div>
            )}
        </TreeSelectMultiple>
      </section>
    </article>
  )
}

export default cascader
