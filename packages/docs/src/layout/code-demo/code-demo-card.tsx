import { javascript } from '@codemirror/lang-javascript'
import { Code } from '@src/component'
import { Base } from '@src/router'
import { okaidia } from '@uiw/codemirror-theme-okaidia'
import { useCodeMirror } from '@uiw/react-codemirror'
import { Card, Divider, Flex, message, Tooltip } from 'antd'
import cls from 'classnames'
import classNames from 'classnames'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import style from './code-demo-card.module.scss'

export const CodeDemoCard = (props: { title: string; isActive: boolean; code: string; demo: React.ReactNode }) => {
  const { demo, code, title, isActive } = props
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
    <Card
      className={cls(isActive && style['is-active'])}
      classNames={{
        body: style['body'],
      }}
      title={title}
      extra={
        <Flex gap={16}>
          <div
            className="cursor"
            onClick={() => {
              setState({ visible: !state.visible })
            }}
          >
            <Tooltip title={!state.visible ? '展开代码' : '收起代码'}>
              <img style={{ display: state.visible ? 'none' : null }} height={14} src={`${Base}unexpand.svg`} />
              <img style={{ display: !state.visible ? 'none' : null }} height={14} src={`${Base}expand.svg`} />
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
                <img className="cursor" width={14} height={14} src={`${Base}copy-black.svg`} />
              </div>
            </CopyToClipboard>
          </Tooltip>
        </Flex>
      }
    >
      <div className={style.demo}>{demo}</div>
      {state.visible && <Divider className={style.divider} />}
      <div className={classNames(!state.visible && 'is-hidden', style.code)}>
        <Code code={code} />
      </div>
    </Card>
  )
}
