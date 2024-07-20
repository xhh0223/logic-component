import { Ref } from 'react'

import { Id } from '@/typing'

import { MultipleOptions, RequiredISelectItem } from '../typing'

export interface SelectMultipleHandler<ValueType = any> {
  select(multipleParams: MultipleOptions): Array<RequiredISelectItem<ValueType>>
  cancel(id: Id[]): Array<RequiredISelectItem<ValueType>>
  getItems(id: Id[]): Array<RequiredISelectItem<ValueType>>
  getAllItems(): Array<RequiredISelectItem<ValueType>>
}

export interface SelectMultipleProps<ValueType = any> {
  children: React.ReactNode
  ref?: Ref<SelectMultipleHandler<ValueType>>
}

export type SelectMultipleItemProps<ValueType> = {
  id: Id
  key: Id
  value?: ValueType
  render: (
    params: RequiredISelectItem<ValueType> & {
      handler: SelectMultipleHandler<ValueType>
    },
  ) => React.ReactNode
}
