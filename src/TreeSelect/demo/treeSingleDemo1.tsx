import React, { useCallback, useMemo, useRef } from 'react'
import { TreeSelectSingle, TreeSelectSingleRef, TreeSelectItem } from '../src/index'
import { TreeNode, genTreeData } from './utils'

import './treeSingleDemo1.scss'

const treeSingleDemo1 = () => {
  const classNamePrefix = 'tree-single-demo1'
  const ref = useRef<TreeSelectSingleRef<string>>(null)
  const treeData = useMemo(() => genTreeData(3, 2, 2), [])

  const renderTree = useCallback((tree: TreeNode[]) => {
    return tree?.map((item) => {
      return <TreeSelectItem key={item.id} id={item.id} value={item.id} parentId={item.parentId}>
        {({ isChecked }) => {
          return <div>
            <div onClick={() => {
              ref.current?.trigger(item.id)
            }}>
              <input type='checkbox' checked={isChecked} readOnly /> {item.id}
            </div>
            <div className={`${classNamePrefix}-group`}>
              {renderTree(item?.children ?? [])}
            </div>
          </div>
        }}
      </TreeSelectItem>
    })
  }, [ref])

  return (
    <TreeSelectSingle ref={ref}>
      {
        renderTree(treeData)
      }
    </TreeSelectSingle >
  )
}
export default treeSingleDemo1