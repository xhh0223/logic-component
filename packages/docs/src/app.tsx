import './app.scss'

import { Router } from '@src/router'
import { ConfigProvider } from 'antd'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'

import { EventBus } from '~react-logic-component'

const App = () => {
  return (
    <ConfigProvider>
      <EventBus>
        <RouterProvider router={Router} />
      </EventBus>
    </ConfigProvider>
  )
}
createRoot(document.getElementById('app')).render(<App />)
