import { createContext } from 'react'

import { type ISelectCollect } from '../typing'
import { SelectMultipleProps } from './typing'

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const SelectMultipleCollectContext = createContext<{
  collect: ISelectCollect<any>
  handler: SelectMultipleProps['handler']
}>(null!)
