import { createContext } from 'react'

import { type ISelectCollect } from '../typing'
import { SelectMultipleRef } from './typing'

export const SelectMultipleCollectContext = createContext<{
  collect: ISelectCollect<any>
  handler: SelectMultipleRef<any>
}>(null!)
