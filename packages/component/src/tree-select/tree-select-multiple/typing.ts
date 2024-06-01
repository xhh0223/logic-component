import { Id } from '@/typing'

import { CommonTreeSelectItemProps, RequiredITreeSelectItem } from '../typing'

export interface TreeSelectMultipleRef<ValueType> {
  trigger: (ids: Id[]) => Array<RequiredITreeSelectItem<ValueType>>
  select: (ids: Id[]) => Array<RequiredITreeSelectItem<ValueType>>
  cancelSelected: (ids: Id[]) => Array<RequiredITreeSelectItem<ValueType>>
  getItems: (ids: Id[]) => Array<RequiredITreeSelectItem<ValueType>>
  getDescendantsIds: (id: Id) => Id[]
  getAncestorsIds: (id: Id) => Id[]
}
export interface TreeSelectMultipleProps<ValueType = any> {
  children: React.ReactNode
  handler?: TreeSelectMultipleRef<ValueType>
}

export type TreeSelectMultipleItemProps<ValueType> = CommonTreeSelectItemProps<ValueType> & {
  render: (
    params: RequiredITreeSelectItem<ValueType> & {
      handler: TreeSelectMultipleProps<ValueType>['handler']
    },
  ) => React.ReactNode
}
