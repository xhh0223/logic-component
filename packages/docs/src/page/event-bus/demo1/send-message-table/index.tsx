import { Button, Empty, Flex, Form, Input, Select } from 'antd'
import { flatten } from 'lodash-es'
import { useState } from 'react'

import { EventBusItem } from '~logic-component/event-bus'

import { EventTable, EventType } from '../../const'

const SendMessageTable = () => {
  const [data, setData] = useState([])
  const [form] = Form.useForm()
  return (
    <Flex gap={32}>
      <Form form={form} style={{ height: 200 }}>
        <table align="left">
          <tbody>
            {!data?.length && (
              <tr>
                <td>
                  {' '}
                  <Empty />
                </td>
              </tr>
            )}

            {data.map((_, index) => (
              <tr key={index}>
                <td>
                  <Flex align="center">
                    <Form.Item name={`${index}-type`}>
                      <Select
                        style={{ width: 200 }}
                        mode="multiple"
                        options={Object.values(EventType).map((i) => ({ label: i, value: i }))}
                      />
                    </Form.Item>
                  </Flex>
                </td>
                <td>
                  <Flex align="center">
                    <Form.Item name={`${index}-value`}>
                      <Input style={{ width: 200 }} />
                    </Form.Item>
                  </Flex>
                </td>
                <td style={{ verticalAlign: 'top' }}>
                  <div>
                    <Button
                      onClick={() => {
                        setData((data) => {
                          data.splice(index, 1)
                          return [...data]
                        })
                      }}
                    >
                      删除
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Form>

      <Flex vertical gap={12}>
        <Button
          type="primary"
          onClick={() => {
            setData([...data, { type: null, value: null }])
          }}
        >
          添加一行
        </Button>
        <EventBusItem
          id={EventTable}
          render={({ handler }) => {
            return (
              <Button
                type="primary"
                onClick={() => {
                  const map = new Map()
                  Object.entries(form.getFieldsValue()).forEach(([key, value]) => {
                    const [index, type] = key.split('-')
                    if (!map.get(index)) {
                      if (type === 'type') {
                        map.set(index, [value, undefined])
                      } else {
                        map.set(index, [undefined, value])
                      }
                    } else {
                      if (type === 'type') {
                        map.get(index)[0] = value
                      } else {
                        map.get(index)[1] = value
                      }
                    }
                  })
                  const values = flatten(
                    [...map.values()].map((i) => {
                      return i[0].map((item) => [item, i[1]])
                    }),
                  )

                  handler.emit([...values])
                }}
              >
                传递表格values
              </Button>
            )
          }}
        />
      </Flex>
    </Flex>
  )
}

export default SendMessageTable
