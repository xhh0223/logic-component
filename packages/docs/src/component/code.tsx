import { javascript } from '@codemirror/lang-javascript'
import { okaidia } from '@uiw/codemirror-theme-okaidia'
import { useCodeMirror } from '@uiw/react-codemirror'
import { Card, Flex, message, Tooltip } from 'antd'
import cls from 'classnames'
import classNames from 'classnames'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import style from './code.module.scss'

export const Code = (props: { title: string; code: string; demo: React.ReactNode }) => {
  const { demo, code, title } = props
  const [state, setState] = useState({
    visible: false,
  })

  const editor = useRef()

  const { setContainer, setState: setCodeState } = useCodeMirror({
    container: editor.current,
    theme: okaidia,
    extensions: [javascript({ jsx: true })],
    value: code,
    basicSetup: {
      lineNumbers: false,
    },
    onChange() {
      // @ts-ignore
      setCodeState((s) => ({ ...s }))
    },
  })
  useLayoutEffect(() => {}, [])

  useEffect(() => {
    if (state.visible) {
      setContainer(editor.current)
    }
  }, [state.visible])

  return (
    <div>
      <Card
        title={title}
        extra={
          <Flex justify="flex-end" gap={16}>
            <div
              className="cursor"
              onClick={() => {
                setState({ visible: !state.visible })
              }}
            >
              <Tooltip title={!state.visible ? '展开代码' : '收起代码'}>
                <img
                  style={{ display: state.visible ? 'none' : null }}
                  height={14}
                  src="/logic-component/unexpand.svg"
                />
                <img
                  style={{ display: !state.visible ? 'none' : null }}
                  height={14}
                  src="/logic-component/expand.svg"
                />
              </Tooltip>
            </div>

            <Tooltip title={'复制代码'}>
              <CopyToClipboard
                text={code}
                onCopy={() => {
                  message.success('复制成功')
                }}
              >
                <div>
                  <img className="cursor" width={14} height={14} src="/logic-component/copy-black.svg" />
                </div>
              </CopyToClipboard>
            </Tooltip>
          </Flex>
        }
        className={cls(state.visible && style[`content`])}
        classNames={{
          body: cls(state.visible && style[`content`]),
        }}
      >
        {demo}
      </Card>
      <div className={classNames(!state.visible && 'is-hidden')} style={{ fontSize: 12 }} ref={editor} />
    </div>
  )
}
