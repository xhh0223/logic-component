import './index.scss'

import { useMediaQuery } from 'react-responsive'

export const useScreen0_480 = () => {
  return useMediaQuery({ minWidth: 0, maxWidth: 480 })
}

export const useScreen480_1680 = () => {
  return useMediaQuery({ minWidth: 480, maxWidth: 1680 })
}

export const useScreen_max1680 = () => {
  return useMediaQuery({ minWidth: 1680 })
}
