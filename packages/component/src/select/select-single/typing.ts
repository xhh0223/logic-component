import { Ref } from 'react'

import { Id } from '@/typing'

import { CommonSelectItemProps, RequiredISelectItem } from '../typing'

export interface SelectSingleRef<ValueType> {
  trigger: (id: Id) => RequiredISelectItem<ValueType> | undefined
  getItems: (id: Id[]) => Array<RequiredISelectItem<ValueType>>
}

export interface SelectSingleProps<ValueType = any> {
  children: React.ReactNode
  ref?: Ref<SelectSingleRef<ValueType>>
}

export type SelectSingleItemProps<ValueType> = CommonSelectItemProps<ValueType> & {
  render: (
    params: RequiredISelectItem<ValueType> & {
      handler: SelectSingleRef<ValueType>
    },
  ) => React.ReactNode
}
