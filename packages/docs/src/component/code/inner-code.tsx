import { javascript } from '@codemirror/lang-javascript'
import { okaidia } from '@uiw/codemirror-theme-okaidia/esm/index'
import { useCodeMirror } from '@uiw/react-codemirror/esm/index'
import { useEffect, useLayoutEffect, useRef } from 'react'

const InnerCode = (props) => {
  const { code, editable = true } = props

  const editor = useRef<any>()

  const { setContainer, setState: setCodeState } = useCodeMirror({
    container: editor.current,
    theme: okaidia,
    extensions: [javascript({ jsx: true })],
    value: code,
    editable,
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
    setContainer(editor.current)
  }, [])

  return <div ref={editor} />
}

export default InnerCode
