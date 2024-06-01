import { createContext } from 'react'

import { ISelectCollect } from '../typing'
import { SelectSingleRef } from './typing'

export const SelectSingleCollectContext = createContext<{
  collect: ISelectCollect<any>
  handler: SelectSingleRef<any>
}>(null!)
