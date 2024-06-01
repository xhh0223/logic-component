import { createContext } from 'react'

import { type ISelectCollect } from '../typing'
import { TreeSelectMultipleRef } from './typing'

export const TreeSelectMultipleCollectContext = createContext<{
  collect: ISelectCollect<any>
  handler: TreeSelectMultipleRef<any>
}>(null!)
