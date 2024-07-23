import { Markdown } from '@src/component'

export const introduce = (() => {
  const text = `
  # event-bus
  事件总线组件，利用发布者订阅者模式解决组件间的通信耦合的问题

  <h2>使用方式</h2>
  
  ~~~jsx
  import { EventBus, EventBusHandler, EventBusItem } from 'react-logic-component'
  ~~~
  `
  return (
    <div>
      <Markdown>{text}</Markdown>
    </div>
  )
})()
