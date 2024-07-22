import { Button, Flex, Spin } from 'antd'
import { useComponentProxyRef } from 'react-logic-component'

const App = () => {
  const ref = useComponentProxyRef({
    initProps: { loading: false },
    render({ loading }) {
      return (
        loading && (
          <Spin
            style={{
              position: 'fixed',
              width: 100,
              height: 100,
              top: '50%',
              right: '50%',
              transform: 'translate(-50%,-50%)',
            }}
          />
        )
      )
    },
  })

  return (
    <Flex component={'article'} wrap gap={12}>
      {ref.current.renderNode}
      <Button
        onClick={() => {
          ref.current.handler.setMergedProps({
            loading: true,
          })
        }}
      >
        开启loading
      </Button>
      <Button
        onClick={() =>
          ref.current.handler.setMergedProps({
            loading: false,
          })
        }
      >
        关闭loading
      </Button>
    </Flex>
  )
}

export default App
