import { createContext } from 'react'

import { type ISelectCollect } from '../typing'
import { TreeSelectSingleProps } from './typing'

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const TreeSelectSingleCollectContext = createContext<{
  collect: ISelectCollect<any>
  handler?: TreeSelectSingleProps['handler']
}>(null!)
