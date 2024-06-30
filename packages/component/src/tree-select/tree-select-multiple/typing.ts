import { Ref } from 'react'

import { Id, IdsEntries } from '@/typing'

import { CommonTreeSelectItemProps, RequiredITreeSelectItem } from '../typing'

export interface TreeSelectMultipleRef<ValueType = any> {
  select: (idsEntries: IdsEntries<{ allowRepeatSelect: boolean }>) => Array<RequiredITreeSelectItem<ValueType>>
  cancel: (ids: Id[]) => Array<RequiredITreeSelectItem<ValueType>>
  getItems: (ids: Id[]) => Array<RequiredITreeSelectItem<ValueType>>
  getAllItems: () => Array<RequiredITreeSelectItem<ValueType>>
  getDescendantsIds: (id: Id) => Id[]
  getAncestorsIds: (id: Id) => Id[]
}

export interface TreeSelectMultipleProps<ValueType = any> {
  children: React.ReactNode
  ref?: Ref<TreeSelectMultipleRef<ValueType>>
}

export type TreeSelectMultipleItemProps<ValueType> = CommonTreeSelectItemProps<ValueType> & {
  render: (
    params: RequiredITreeSelectItem<ValueType> & {
      handler: TreeSelectMultipleRef<ValueType>
    },
  ) => React.ReactNode
}
