import { Button, Flex, Form, Input, Select, Table, TableProps, Typography } from 'antd'
import { flatten, omit } from 'lodash-es'
import React, { useState } from 'react'

import { EventBusItem } from '~logic-component/event-bus'

import { EventTable, EventType } from '../../const'

interface Item {
  key: string
  type: EventType
  value: string
}

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean
  dataIndex: string
  title: any
  inputType: 'select' | 'text'
  record: Item
  index: number
}

const EditableCell: React.FC<React.PropsWithChildren<EditableCellProps>> = ({
  editing,
  dataIndex,
  title,
  inputType,
  children,
  ...restProps
}) => {
  const inputNode =
    inputType === 'select' ? (
      <Select mode="multiple" options={Object.values(EventType).map((i: string) => ({ label: i, value: i }))} />
    ) : (
      <Input />
    )

  return (
    <td {...omit(restProps, ['record', 'index'])}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `请输入 ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  )
}

const App: React.FC = () => {
  const [form] = Form.useForm()
  const [data, setData] = useState([])
  const [editingKey, setEditingKey] = useState('')
  const isEditing = (record: Item) => record.key === editingKey

  const edit = (record: Partial<Item> & { key: React.Key }) => {
    form.setFieldsValue({ type: '', value: '', ...record })
    setEditingKey(record.key)
  }

  const cancel = () => {
    setEditingKey('')
  }

  const save = async (key: React.Key) => {
    const row = (await form.validateFields()) as Item

    const newData = [...data]
    const index = newData.findIndex((item) => key === item.key)
    if (index > -1) {
      const item = newData[index]
      newData.splice(index, 1, {
        ...item,
        ...row,
      })
      setData(newData)
      setEditingKey('')
    } else {
      newData.push(row)
      setData(newData)
      setEditingKey('')
    }
  }

  const columns = [
    {
      title: '组件标识',
      dataIndex: 'type',
      width: '25%',
      editable: true,
    },
    {
      title: '传递值',
      dataIndex: 'value',
      width: '15%',
      editable: true,
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (_: any, record: Item) => {
        const editable = isEditing(record)
        return editable ? (
          <span>
            <Typography.Link onClick={() => save(record.key)} style={{ marginRight: 8 }}>
              Save
            </Typography.Link>
            <a onClick={() => cancel()}>Cancel</a>
          </span>
        ) : (
          <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
            Edit
          </Typography.Link>
        )
      },
    },
  ]

  const mergedColumns: TableProps['columns'] = columns.map((col) => {
    if (!col.editable) {
      return col
    }
    return {
      ...col,
      onCell: (record: Item) => ({
        record,
        inputType: col.dataIndex === 'type' ? 'select' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    }
  })

  return (
    <Form form={form} component={false}>
      <Flex gap={32}>
        <Table
          style={{ minWidth: 800 }}
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={data}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={{
            onChange: cancel,
          }}
        />
        <Flex vertical gap={12}>
          <Button
            type="primary"
            onClick={() => {
              setData([...data, { key: Math.random().toString(), type: null, value: null }])
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
                    const values = flatten(
                      data.map((i) => {
                        return i.type.map((item) => [item, i.value])
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
    </Form>
  )
}

export default App
