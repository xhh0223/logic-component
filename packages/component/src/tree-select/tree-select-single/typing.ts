import { Ref } from 'react'

import { Id } from '@/typing'

import { CommonTreeSelectItemProps, RequiredITreeSelectItem } from '../typing'

export interface TreeSelectSingleHandler<ValueType = any> {
  select: (id: Id, options?: { allowRepeatSelect?: boolean }) => RequiredITreeSelectItem<ValueType> | undefined
  getItems: (ids: Id[]) => Array<RequiredITreeSelectItem<ValueType>>
  getAllItems: () => Array<RequiredITreeSelectItem<ValueType>>
  getDescendantsIds: (id: Id) => Id[]
  getAncestorsIds: (id: Id) => Id[]
}
export interface TreeSelectSingleProps<ValueType = any> {
  children: React.ReactNode
  ref?: Ref<TreeSelectSingleHandler<ValueType>>
}

export type TreeSelectSingleItemProps<ValueType> = CommonTreeSelectItemProps<ValueType> & {
  render: (
    params: RequiredITreeSelectItem<ValueType> & {
      handler: TreeSelectSingleHandler<ValueType>
    },
  ) => React.ReactNode
}
