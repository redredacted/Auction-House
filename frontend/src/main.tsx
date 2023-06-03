import React from 'react'
import ReactDOM from 'react-dom/client'
import './tailwind.css'
import './components/common/router.tsx'
import { RouterProvider } from 'react-router-dom'
import routes from './components/common/router.tsx'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={routes} />
  </React.StrictMode>,
)
