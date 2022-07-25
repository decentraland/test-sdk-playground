import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Editor from './editor'

// const baseUrl = 'http://localhost:8000/'

const originalFetch = fetch
async function wrappedFetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
  console.log(`Fetch wrapped `, input, init)
  // if (input === 'http://localhost:3000/preview-wearables') {
  //   input = `${baseUrl}preview-wearables`
  // }
  // if (typeof input === 'string' && input.startsWith('http://localhost:3000/content/')) {
  //   const restOfUrl = input.substring('http://localhost:3000/content/'.length)
  //   input = `${baseUrl}${restOfUrl}`
  // }
  return originalFetch(input, init)
}

if (global) {
  global.fetch = wrappedFetch
} else if (globalThis) {
  globalThis.fetch = wrappedFetch
}

;(function (xhr) {
  const open = xhr.open
  ;(xhr as any).open = function (...args: any[]) {
    // if (args[1] === 'http://localhost:3000/comms/status?includeUsersParcels=true') {
    //   args[1] = `${baseUrl}comms/status?includeUsersParcels=true`
    // }
    // if (args[1] === 'http://localhost:3000/lambdas/health') {
    //   args[1] = `${baseUrl}lambdas/health`
    // }
    console.log(`XHR wrapped `, { args })
    return (open as any).apply(this, args)
  }
})(XMLHttpRequest.prototype)

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <Editor />
  </React.StrictMode>
)
