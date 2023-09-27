import { TreeSelectMultiple, TreeSelectItem, type TreeSelectMultipleRef } from '@/TreeSelect/src'
import React, { useCallback, useMemo, useRef, useState } from 'react'

import { genTreeData, type TreeNode } from '../utils'
import './checkBox.scss'

const checkBox = () => {
  const classNamePrefix = 'tree-multiple-select-check-box'
  const [value, setValue] = useState<string>('')
  const [repeatTriggerUnselected, setRepeatTriggerUnselected] = useState(true)
  const treeData = useMemo(() => genTreeData(3, 2, 2), [])

  const ref = useRef<TreeSelectMultipleRef<{ id: number, value: string }>>(null)

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
              ref.current?.trigger([item.id]).then(() => {
                setValue(JSON.stringify(ref.current?.getAll().filter(i => i.isChecked).map(i => ({ id: i.id, value: i.value }))))
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
      <section className={`${classNamePrefix}-value`}>当前值：{value}</section>
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
          {renderTree(treeData)}
        </TreeSelectMultiple>
      </section>
    </article>
  )
}

export default checkBox
