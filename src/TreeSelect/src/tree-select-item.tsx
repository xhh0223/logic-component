import React, { useContext, useEffect, useMemo, useState } from 'react'
import { type Id } from './typing'
import { SelectContext } from './context'
import { computedPath, getChildrenIds } from './utils'

export interface TreeSelectItemProps<ValueType> {
  id: Id
  parentId: Id
  value: ValueType
  /** 重复触发取消选中 */
  repeatTriggerUnselected?: boolean
  children?:
  | React.ReactNode
  | ((params: { isChecked: boolean }) => React.ReactNode)
}

export const TreeSelectItem = <ValueType,>(props: TreeSelectItemProps<ValueType>) => {
  const { value, children, id, parentId, repeatTriggerUnselected } = props
  const [, refresh] = useState({})
  const selectContext = useContext(SelectContext)
  const { setSelectItem, deleteSelectItem, getSelectItem } = selectContext

  const cacheInfo = useMemo(() => ({
    /** 只初始化一次 */
    id,
    parentId
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [])

  useEffect(() => {
    const selectItem = getSelectItem(cacheInfo.id)
    if (!selectItem) {
      setSelectItem(id, {
        id,
        value,
        parentId,
        isChecked: false,
        refreshHandler: () => {
          refresh({})
        },
        // !notice 下面几个属性的初始化操作放到了父容器上，如treeSelectSingle
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        path: undefined!,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        level: undefined!,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        childrenIds: undefined!
      })
    } else if (cacheInfo.id === id) {
      selectItem.parentId = parentId
      selectItem.value = value
      selectItem.repeatTriggerUnselected = repeatTriggerUnselected
      if (cacheInfo.parentId !== parentId) {
        selectItem.path = computedPath(id, [], selectContext)
        selectItem.level = selectItem.path?.length
      }
    } else if (cacheInfo.id !== id) {
      cacheInfo.id = id
      /** id发生变化时 */
      selectItem.parentId = parentId
      selectItem.value = value
      selectItem.repeatTriggerUnselected = repeatTriggerUnselected
      selectItem.path = computedPath(id, [], selectContext)
      selectItem.level = selectItem.path?.length
      selectItem.childrenIds = getChildrenIds(id, selectContext)
      deleteSelectItem(cacheInfo.id)
      selectItem.id = id
      setSelectItem(id, selectItem)
    }

    return () => {
      cacheInfo.id = id
    }
  }, [value, repeatTriggerUnselected, getSelectItem, id, setSelectItem, deleteSelectItem, cacheInfo, parentId, selectContext])

  useEffect(() => {
    return () => {
      deleteSelectItem(cacheInfo.id)
    }
  }, [cacheInfo.id, deleteSelectItem])

  return <>{typeof children === 'function'
    ? children({
      isChecked: !!getSelectItem(id)?.isChecked
    })
    : children}
  </>
}
