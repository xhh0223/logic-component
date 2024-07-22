import { Button, Flex } from 'antd'
import { ComponentProxy } from 'react-logic-component'

const App = () => {
  return (
    <Flex component={'article'} wrap gap={12}>
      当一个组件内部有许多loading的控件时，组件的需要props，不需要在父组件作用域上额外声明
      <ComponentProxy
        initProps={{ loading: false }}
        render={(params, { handler }) => {
          const { loading } = params
          return (
            <Button
              loading={loading}
              onClick={() => {
                handler.setMergedProps({
                  loading: true,
                })
                setTimeout(() => {
                  handler.setMergedProps({
                    loading: false,
                  })
                }, 1000)
              }}
            >
              新增
            </Button>
          )
        }}
      />
      <ComponentProxy
        initProps={{ loading: false }}
        render={(params, { handler }) => {
          const { loading } = params
          return (
            <Button
              loading={loading}
              onClick={() => {
                handler.setMergedProps({
                  loading: true,
                })
                setTimeout(() => {
                  handler.setMergedProps({
                    loading: false,
                  })
                }, 1000)
              }}
            >
              编辑
            </Button>
          )
        }}
      />
      <ComponentProxy
        initProps={{ loading: false }}
        render={(params, { handler }) => {
          const { loading } = params
          return (
            <Button
              loading={loading}
              onClick={() => {
                handler.setMergedProps({
                  loading: true,
                })
                setTimeout(() => {
                  handler.setMergedProps({
                    loading: false,
                  })
                }, 1000)
              }}
            >
              删除
            </Button>
          )
        }}
      />
    </Flex>
  )
}

export default App
