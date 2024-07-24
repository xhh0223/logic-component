import { createContext, useContext } from 'react'

import { type ISelectCollect } from '../typing'
import { TreeSelectSingleHandler } from './typing'

export const TreeSelectSingleCollectContext = createContext<{
  collect: ISelectCollect<any>
  handler?: TreeSelectSingleHandler<any>
}>(null!)

export const useTreeSelectSingleHandler = <ValueType = any>() => {
  const { handler } = useContext(TreeSelectSingleCollectContext)
  return handler as TreeSelectSingleHandler<ValueType>
}
