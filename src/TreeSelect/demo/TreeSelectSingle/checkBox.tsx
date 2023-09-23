import { TreeSelectSingle, TreeSelectItem, type TreeSelectSingleRef } from '@/TreeSelect/src'
import React, { useCallback, useMemo, useRef, useState } from 'react'

import { genTreeData, type TreeNode } from '../utils'
import './checkBox.scss'

const index = () => {
  const classNamePrefix = 'tree-single-select-check-box'
  const [value, setValue] = useState<string>('')
  const [repeatTriggerUnselected, setRepeatTriggerUnselected] = useState(true)
  const treeData = useMemo(() => genTreeData(3, 2, 2), [])

  const ref = useRef<TreeSelectSingleRef<{ id: number, value: string }>>(null)

  const renderTree = useCallback((tree: TreeNode[]) => {
    return tree?.map((item) => {
      return <TreeSelectItem
        key={item.id}
        id={item.id}
        value={item.id}
        parentId={item.parentId}
        repeatTriggerUnselected={repeatTriggerUnselected}
      >
        {({ isChecked }) => {
          return <section>
            <div onClick={() => {
              ref.current?.trigger(item.id).then(res => {
                if (res?.isChecked) {
                  setValue(JSON.stringify(res.value))
                }
              })
            }}>
              <label htmlFor={`tree-single-${item.id}`}>{item.id}</label>
              <input name={`tree-single-${item.id}`} type='checkbox' checked={isChecked} readOnly />
            </div>
            <div className={`${classNamePrefix}-group`}>
              {renderTree(item?.children ?? [])}
            </div>
          </section>
        }}
      </TreeSelectItem>
    })
  }, [repeatTriggerUnselected])

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
          {renderTree(treeData)}
        </TreeSelectSingle>
      </section>
    </article>
  )
}

export default index
