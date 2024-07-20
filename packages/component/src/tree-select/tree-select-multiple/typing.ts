import { Ref } from 'react'

import { Id } from '@/typing'

import { CommonTreeSelectItemProps, MultipleOptions, RequiredITreeSelectItem } from '../typing'

export interface TreeSelectMultipleHandler<ValueType = any> {
  select: (multipleOptions: MultipleOptions) => Array<RequiredITreeSelectItem<ValueType>>
  cancel: (ids: Id[]) => Array<RequiredITreeSelectItem<ValueType>>
  getItems: (ids: Id[]) => Array<RequiredITreeSelectItem<ValueType>>
  getAllItems: () => Array<RequiredITreeSelectItem<ValueType>>
  getDescendantsIds: (id: Id) => Id[]
  getAncestorsIds: (id: Id) => Id[]
}

export interface TreeSelectMultipleProps<ValueType = any> {
  children: React.ReactNode
  ref: Ref<TreeSelectMultipleHandler<ValueType>>
}

export type TreeSelectMultipleItemProps<ValueType> = CommonTreeSelectItemProps<ValueType> & {
  render: (
    params: RequiredITreeSelectItem<ValueType> & {
      handler: TreeSelectMultipleHandler<ValueType>
    },
  ) => React.ReactNode
}
