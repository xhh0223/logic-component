import { Ref } from 'react'

import { Id } from '@/typing'

import { CommonSelectItemProps, RequiredISelectItem } from '../typing'

export interface SelectMultipleRef<ValueType = any> {
  trigger: (ids: Id[]) => Array<RequiredISelectItem<ValueType>>
  select: (id: Id[]) => Array<RequiredISelectItem<ValueType>>
  cancelSelected: (id: Id[]) => Array<RequiredISelectItem<ValueType>>
  getItems: (id: Id[]) => Array<RequiredISelectItem<ValueType>>
}

export interface SelectMultipleProps<ValueType = any> {
  children: React.ReactNode
  ref?: Ref<SelectMultipleRef<ValueType>>
}

export type SelectMultipleItemProps<ValueType> = CommonSelectItemProps<ValueType> & {
  render: (
    params: RequiredISelectItem<ValueType> & {
      handler: SelectMultipleRef<ValueType>
    },
  ) => React.ReactNode
}
