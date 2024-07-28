import { Flex, Spin } from 'antd'
import { lazy, Suspense } from 'react'
import { createBrowserRouter as createRouter, RouteObject } from 'react-router-dom'

const wrapLoading = (importComponent) => {
  const LazyComponent = lazy(importComponent)
  return (
    <Suspense
      fallback={
        <Flex style={{ height: '100%', width: '100%' }} align="center" justify="center">
          <Spin />
        </Flex>
      }
    >
      <LazyComponent />
    </Suspense>
  )
}
export const Base = '/logic-component/'

export enum RouterPath {
  root = '/',
  component = '/component',
  selectSingle = '/component/select-single',
  selectMultiple = '/component/select-multiple',
  treeSelectSingle = '/component/tree-select-single',
  treeSelectMultiple = '/component/tree-select-multiple',
  eventBus = '/component/event-bus',
  componentProxy = '/component/props-proxy',
  document = '/document',
  introduce = '/document/introduce',
  installation = '/document/installation',
}

const config: RouteObject[] = [
  {
    path: '/',
    element: wrapLoading(() => import('@src/page/index')),
    children: [],
  },
  {
    path: RouterPath.document,
    element: wrapLoading(() => import('@src/page/document')),
    children: [
      {
        path: RouterPath.introduce,
        element: wrapLoading(() => import('@src/page/document/introduce')),
      },
      {
        path: RouterPath.installation,
        element: wrapLoading(() => import('@src/page/document/installation')),
      },
    ],
  },
  {
    path: RouterPath.component,
    element: wrapLoading(() => import('@src/page/component')),
    children: [
      {
        path: RouterPath.selectSingle,
        element: wrapLoading(() => import('@src/page/component/select-single')),
      },
      {
        path: RouterPath.selectMultiple,
        element: wrapLoading(() => import('@src/page/component/select-multiple')),
      },
      {
        path: RouterPath.treeSelectSingle,
        element: wrapLoading(() => import('@src/page/component/tree-select-single')),
      },
      {
        path: RouterPath.treeSelectMultiple,
        element: wrapLoading(() => import('@src/page/component/tree-select-multiple')),
      },
      {
        path: RouterPath.eventBus,
        element: wrapLoading(() => import('@src/page/component/event-bus')),
      },
      {
        path: RouterPath.componentProxy,
        element: wrapLoading(() => import('@src/page/component/component-proxy')),
      },
    ],
  },
]

export const Router = createRouter(config, { basename: Base })
