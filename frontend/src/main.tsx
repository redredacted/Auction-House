import React from 'react'
import ReactDOM from 'react-dom/client'
import './tailwind.css'
import './components/common/router.tsx'
import Routes from './components/common/router.tsx'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Routes />
  </React.StrictMode>,
)
