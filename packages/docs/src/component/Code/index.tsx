import { javascript } from '@codemirror/lang-javascript'
import { okaidia } from '@uiw/codemirror-theme-okaidia'
import { useCodeMirror } from '@uiw/react-codemirror'
import { Card, Flex, message, Tooltip } from 'antd'
import cls from 'classnames'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import style from './index.module.scss'

export const Code = (props: { code: string; title: React.ReactNode; demo: React.ReactNode }) => {
  const { title, demo, code } = props
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
        className={cls(state.visible && style[`content`])}
        classNames={{
          body: cls(state.visible && style[`content`]),
        }}
        title={title}
      >
        {demo}
        <Flex align="flex-end" justify="flex-end" gap={16}>
          <div
            className="cursor"
            onClick={() => {
              setState({ visible: !state.visible })
            }}
          >
            <Tooltip title={!state.visible ? '展开代码' : '收起代码'}>
              <img style={{ display: state.visible ? 'none' : null }} height={14} src="/logic-component/unexpand.svg" />
              <img style={{ display: !state.visible ? 'none' : null }} height={14} src="/logic-component/expand.svg" />
            </Tooltip>
          </div>

          <CopyToClipboard
            text={code}
            onCopy={() => {
              message.success('复制成功')
            }}
          >
            <Tooltip title={'复制代码'}>
              <div className="cursor">
                <img width={14} height={14} src="/logic-component/copy.svg" />
              </div>
            </Tooltip>
          </CopyToClipboard>
        </Flex>
      </Card>

      {state.visible && (
        <Card
          classNames={{
            body: cls(state.visible && style[`code`]),
          }}
        >
          <div ref={editor} />
        </Card>
      )}
    </div>
  )
}

export default Code
