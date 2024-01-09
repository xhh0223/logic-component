import { type TreeSelectInterface, type Id } from "./typing";

export function computedPath<ValueType>(
  id: Id,
  path = [] as Id[],
  treeSelect: TreeSelectInterface<ValueType>
) {
  const { getSelectItem } = treeSelect;
  path.unshift(id);
  const selectedItem = getSelectItem(id);
  if (!selectedItem) {
    return path;
  }
  computedPath(selectedItem.parentId, path, treeSelect);
  return path;
}

export function getChildrenIds<ValueType>(
  parentId: Id,
  treeSelect: TreeSelectInterface<ValueType>
) {
  const { getAllSelectItem } = treeSelect;
  const allSelectItem = getAllSelectItem();
  const result: Id[] = [];
  for (const i of allSelectItem) {
    if (i.parentId === parentId) {
      result.push(i.id);
    }
  }
  return result?.length ? result : undefined;
}
