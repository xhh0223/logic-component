import { javascript } from '@codemirror/lang-javascript'
import { okaidia } from '@uiw/codemirror-theme-okaidia'
import { useCodeMirror } from '@uiw/react-codemirror'
import React, { useEffect, useLayoutEffect, useRef } from 'react'

export const Code: React.FC<{ code: string; editable?: boolean }> = (props) => {
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
