import React, { useRef } from 'react'
import { Props, type PropsRef } from '../src'

interface ModalProps { visible: boolean, children: React.ReactNode }

const Modal = (props: ModalProps) => {
  const { visible, children } = props
  return visible && children
}



const propsDemo1 = () => {
  const propsRef = useRef<PropsRef<ModalProps>>(null)
  return <div>
    <div onClick={() => {
      propsRef.current?.setMergedProps({
        visible: true,
      })
    }}>
      show
    </div>
    <hr />
    <div
      onClick={() => {
        propsRef.current?.setMergedProps({
          visible: false,
        })
      }}
    >
      hide
    </div>
    <hr />
    <div
      onClick={() => {
        const props = propsRef.current?.getProps()
        if (props) {
          propsRef.current?.setMergedProps({
            visible: !props.visible
          })
        }
      }}
    >
      toggle
    </div>
    <hr />
    <Props ref={propsRef}>
      <Modal visible={true}>
        <div style={{ width: 100, height: 200, backgroundColor: 'antiquewhite' }}>
          hello, there are modal content
        </div>
      </Modal>
    </Props>
  </div>
}

export default propsDemo1