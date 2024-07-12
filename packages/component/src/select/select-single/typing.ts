import { Ref } from 'react'

import { Id } from '@/typing'

import { RequiredISelectItem } from '../typing'

export interface SelectSingleRef<ValueType = any> {
  select: (id: Id, options?: { allowRepeatSelect?: boolean }) => RequiredISelectItem<ValueType> | undefined
  getItems: (id: Id[]) => Array<RequiredISelectItem<ValueType>>
  getAllItems: () => Array<RequiredISelectItem<ValueType>>
}

export interface SelectSingleProps<ValueType = any> {
  children: React.ReactNode
  ref?: Ref<SelectSingleRef<ValueType>>
}

export type SelectSingleItemProps<ValueType> = {
  key: Id
  id: Id
  value?: ValueType
  render: (
    params: RequiredISelectItem<ValueType> & {
      handler: SelectSingleRef<ValueType>
    },
  ) => React.ReactNode
}
