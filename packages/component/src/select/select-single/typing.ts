import { Ref } from 'react'

import { Id } from '@/typing'

import { RequiredISelectItem } from '../typing'

export interface SelectSingleHandler<ValueType = any> {
  select: (id: Id, options?: { allowRepeatSelect?: boolean }) => RequiredISelectItem<ValueType> | undefined
  getItems: (id: Id[]) => Array<RequiredISelectItem<ValueType>>
  getAllItems: () => Array<RequiredISelectItem<ValueType>>
}

export interface SelectSingleProps<ValueType = any> {
  children: React.ReactNode
  ref?: Ref<SelectSingleHandler<ValueType>>
}

export type SelectSingleItemProps<ValueType> = {
  key: Id
  id: Id
  value?: ValueType
  render: (
    params: RequiredISelectItem<ValueType> & {
      handler: SelectSingleHandler<ValueType>
    },
  ) => React.ReactNode
}
