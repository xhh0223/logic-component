import { Flex, Spin } from 'antd'
import { lazy, Suspense } from 'react'
import { createHashRouter as createRouter } from 'react-router-dom'

const wrapLoading = (importComponent) => {
  const LazyComponent = lazy(importComponent)
  return (
    <Suspense
      fallback={
        <Flex align="center" justify="center">
          <Spin />
        </Flex>
      }
    >
      <LazyComponent />
    </Suspense>
  )
}

export enum RouterPath {
  selectSingle = '/select-single',
  selectMultiple = '/select-multiple',
  treeSelectSingle = '/tree-select-single',
  treeSelectMultiple = '/tree-select-multiple',
  eventBus = '/event-bus',
}

export const Router = createRouter([
  {
    path: '/',
    element: wrapLoading(() => import('@src/page/index')),
    children: [
      {
        path: RouterPath.selectSingle,
        element: wrapLoading(() => import('@src/page/select-single')),
      },
      {
        path: RouterPath.selectMultiple,
        element: wrapLoading(() => import('@src/page/select-multiple')),
      },
      {
        path: RouterPath.treeSelectSingle,
        element: wrapLoading(() => import('@src/page/tree-select-single')),
      },
      {
        path: RouterPath.treeSelectMultiple,
        element: wrapLoading(() => import('@src/page/tree-select-multiple')),
      },
      {
        path: RouterPath.eventBus,
        element: wrapLoading(() => import('@src/page/event-bus')),
      },
    ],
  },
])
