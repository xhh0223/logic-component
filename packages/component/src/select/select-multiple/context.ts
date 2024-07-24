import { createContext, useContext } from 'react'

import { type ISelectCollect } from '../typing'
import { SelectMultipleHandler } from './typing'

export const SelectMultipleCollectContext = createContext<{
  collect: ISelectCollect<any>
  handler: SelectMultipleHandler<any>
}>(null!)

export const useSelectMultipleHandler = <ValueType = any>() => {
  const { handler } = useContext(SelectMultipleCollectContext)
  return handler as SelectMultipleHandler<ValueType>
}
