import { createContext } from 'react'

import { type ISelectCollect } from '../typing'
import { TreeSelectSingleRef } from './typing'

export const TreeSelectSingleCollectContext = createContext<{
  collect: ISelectCollect<any>
  handler?: TreeSelectSingleRef<any>
}>(null!)
