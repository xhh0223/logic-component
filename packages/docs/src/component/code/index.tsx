import { lazy } from 'react'

export const Code: React.FC<{ code: string; editable?: boolean }> = lazy(() => import('./inner-code'))
