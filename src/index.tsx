import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Editor from './editor'
// import Test from './test'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    {/* <Test /> */}
    <Editor />
  </React.StrictMode>
)
