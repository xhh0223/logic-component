import { createContext, useContext } from 'react'

import { type ISelectCollect } from '../typing'
import { TreeSelectMultipleHandler } from './typing'

export const TreeSelectMultipleCollectContext = createContext<{
  collect: ISelectCollect<any>
  handler: TreeSelectMultipleHandler<any>
}>(null!)

export const useTreeSelectMultiple = <ValueType = any>() => {
  const { handler } = useContext(TreeSelectMultipleCollectContext)
  return handler as TreeSelectMultipleHandler<ValueType>
}
