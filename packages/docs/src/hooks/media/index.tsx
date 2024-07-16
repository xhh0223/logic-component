import './index.scss'

import { useMediaQuery } from 'react-responsive'

export const useScreen0_480 = () => {
  return useMediaQuery({ minWidth: 0, maxWidth: 480 })
}

export const useScreen480_992 = () => {
  return useMediaQuery({ minWidth: 480, maxWidth: 992 })
}

export const useScreen992_1600 = () => {
  return useMediaQuery({ minWidth: 992, maxWidth: 1600 })
}

export const useScreen_max1600 = () => {
  return useMediaQuery({ minWidth: 1600 })
}
