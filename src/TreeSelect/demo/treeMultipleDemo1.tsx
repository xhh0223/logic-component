import React, { useCallback, useMemo, useRef } from 'react'
import { TreeSelectItem, TreeSelectMultiple, TreeSelectMultipleRef } from '../src/index'
import { TreeNode, genTreeData } from './utils'

import './treeSingleDemo1.scss'

const treeMultipleDemo1 = () => {
  const classNamePrefix = 'tree-single-demo1'
  const ref = useRef<TreeSelectMultipleRef<string>>(null)
  const treeData = useMemo(() => genTreeData(3, 2, 2), [])

  const renderTree = useCallback((tree: TreeNode[]) => {
    return tree?.map((item) => {
      return <TreeSelectItem key={item.id} id={item.id} value={item.id} parentId={item.parentId}>
        {({ isChecked }) => {
          return <div>
            <div onClick={() => {
              ref.current?.trigger([item.id])
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
    <TreeSelectMultiple ref={ref}>
      {
        renderTree(treeData)
      }
    </TreeSelectMultiple >
  )
}
export default treeMultipleDemo1