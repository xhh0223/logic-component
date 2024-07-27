/* eslint-disable react/prop-types */
import { useScreen0_480 } from '@src/hooks/media'
import { Base } from '@src/router'
import { message, Tooltip } from 'antd'
import classNames from 'classnames'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import ReactMarkdown from 'react-markdown'
import { Prism } from 'react-syntax-highlighter'
import { materialOceanic } from 'react-syntax-highlighter/dist/esm/styles/prism'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'

import style from './inner-markdown.module.scss'

const InnerMarkdown = (props: { children: string }) => {
  const small = useScreen0_480()
  return (
    <ReactMarkdown
      rehypePlugins={[rehypeRaw]}
      remarkPlugins={[remarkGfm]}
      components={{
        h1(props) {
          const { className, ...rest } = props
          return <h1 className={classNames(className, small && style['h1'])} {...rest} />
        },
        h2(props) {
          const { className, ...rest } = props

          return <h2 className={classNames(className, small && style['h2'])} {...rest} />
        },
        h3(props) {
          const { className, ...rest } = props

          return <h3 className={classNames(className, small && style['h3'])} {...rest} />
        },
        h4(props) {
          const { className, ...rest } = props
          return <h4 className={classNames(className, small && style['h4'])} {...rest} />
        },
        code(props) {
          const { children, className } = props
          const language = className.replace(/language-(\w+)/, '$1')
          return (
            <div className={style['markdown-code-container']}>
              <Prism
                showLineNumbers
                className={classNames(small && style['font-12'], classNames(style['markdown-code'], className))}
                language={language}
                style={materialOceanic}
              >
                {String(children).replace(/\n$/, '')}
              </Prism>
              <CopyToClipboard
                text={children}
                onCopy={() => {
                  message.success('复制成功')
                }}
              >
                <Tooltip title={'复制代码'}>
                  <img className={classNames('cursor', style['copy'])} src={`${Base}copy.svg`} />
                </Tooltip>
              </CopyToClipboard>
            </div>
          )
        },
      }}
    >
      {props.children}
    </ReactMarkdown>
  )
}

export default InnerMarkdown
