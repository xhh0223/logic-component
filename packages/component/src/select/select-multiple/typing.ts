import { Ref } from 'react'

import { Id, IdsEntries } from '@/typing'

import { RequiredISelectItem } from '../typing'

export interface SelectMultipleRef<ValueType = any> {
  select(idsEntries: IdsEntries<{ allowRepeatSelect: boolean }>): Array<RequiredISelectItem<ValueType>>
  cancel(id: Id[]): Array<RequiredISelectItem<ValueType>>
  getItems(id: Id[]): Array<RequiredISelectItem<ValueType>>
  getAllItems(): Array<RequiredISelectItem<ValueType>>
}

export interface SelectMultipleProps<ValueType = any> {
  children: React.ReactNode
  ref?: Ref<SelectMultipleRef<ValueType>>
}

export type SelectMultipleItemProps<ValueType> = {
  id: Id
  value?: ValueType
  render: (
    params: RequiredISelectItem<ValueType> & {
      handler: SelectMultipleRef<ValueType>
    },
  ) => React.ReactNode
}
