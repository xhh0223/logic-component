import { createContext, useContext } from 'react'

import { ISelectCollect } from '../typing'
import { SelectSingleHandler } from './typing'

export const SelectSingleCollectContext = createContext<{
  collect: ISelectCollect<any>
  handler: SelectSingleHandler<any>
}>(null!)

export const useSelectSingleHandler = <ValueType = any>() => {
  const { handler } = useContext(SelectSingleCollectContext)
  return handler as SelectSingleHandler<ValueType>
}
