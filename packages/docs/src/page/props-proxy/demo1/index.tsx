import { Flex, Spin } from 'antd'

import { PropsProxy } from '~logic-component/index'

const Demo1 = () => {
  return (
    <Flex component={'article'} vertical gap={12}>
      <h3>loading场景</h3>
      <Flex component={'section'} gap={12} wrap>
        <PropsProxy
          initProps={{ loading: false }}
          render={(params, { handler }) => {
            const { loading } = params
            return (
              <div
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
                {loading && <Spin />}
                {!loading && '获取数据'}
              </div>
            )
          }}
        />
      </Flex>
    </Flex>
  )
}

export default Demo1
