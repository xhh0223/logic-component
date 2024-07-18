/* eslint-disable react/prop-types */
import { useScreen0_480 } from '@src/hooks/media'
import classNames from 'classnames'
import ReactMarkdown from 'react-markdown'
import { Prism } from 'react-syntax-highlighter'
import { materialOceanic } from 'react-syntax-highlighter/dist/esm/styles/prism'
import remarkGfm from 'remark-gfm'

import style from './index.module.scss'

export const Markdown = (props: { children: string }) => {
  const small = useScreen0_480()
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1(props) {
          const { className, ...rest } = props
          return <h1 className={classNames(className, small && style['h1'])} {...rest} />
        },
        h2(props) {
          const { className, ...rest } = props

          return <h1 className={classNames(className, small && style['h2'])} {...rest} />
        },
        h3(props) {
          const { className, ...rest } = props

          return <h1 className={classNames(className, small && style['h3'])} {...rest} />
        },
        h4(props) {
          const { className, ...rest } = props
          return <h1 className={classNames(className, small && style['h4'])} {...rest} />
        },
        code(props) {
          const { children, className } = props
          const language = className.replace(/language-(\w+)/, '$1')
          return (
            <Prism
              className={classNames(small && style['font-12'], classNames(style['code'], className))}
              language={language}
              style={materialOceanic}
            >
              {String(children).replace(/\n$/, '')}
            </Prism>
          )
        },
      }}
    >
      {props.children}
    </ReactMarkdown>
  )
}
