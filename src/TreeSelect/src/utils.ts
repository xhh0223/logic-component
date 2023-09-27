import { type IContext, type Id } from './typing'

export function computedPath(id: Id, path = [] as Id[], context: IContext<any>) {
  const { getSelectItem } = context
  path.unshift(id)
  const selectedItem = getSelectItem(id)
  if (!selectedItem) {
    return path
  }
  computedPath(selectedItem.parentId, path, context)
  return path
}

export function getChildrenIds(parentId: Id, context: IContext<any>) {
  const { getAllSelectItem } = context
  const allSelectItem = getAllSelectItem()
  const result = []
  for (const i of allSelectItem) {
    if (i.parentId === parentId) {
      result.push(i.id)
    }
  }
  return result?.length ? result : undefined
}
