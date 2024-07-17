import { Fragment } from 'react'

export { genTreeData, transformTreeDataToList } from './tree-mock-data'

export const renderGeneratorJsx = (generatorJsx) => {
  return [...generatorJsx()].map((i) => <Fragment key={i}>{i}</Fragment>)
}

export const groupByNum = <T,>(arr: T[], num: number): Array<T[]> => {
  const map = {}
  arr.forEach((i, index) => {
    const group = index % num
    if (!map[group]) {
      map[group] = [i]
    } else {
      map[group].push(i)
    }
  })
  return Object.values(map)
}
