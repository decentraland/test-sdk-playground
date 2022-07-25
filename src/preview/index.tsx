import { useEffect, useState } from 'react'
import { transformCode } from './execute-code'
import { patchPreviewWindow } from './monkeyPatch'

interface PropTypes {
  value: string
}

function Preview({ value }: PropTypes) {
  useEffect(() => {
    if (value) {
      transformCode(value)
        .then(async (data: string) => {
          const frameElement = document.getElementById('previewFrame')
          const tmpFrameWindow = (frameElement as any)?.contentWindow
          if (tmpFrameWindow) {
            // const modifiedData = data.replace(/"/g, '\\"')
            // const escapedData = data.replace(/"/g, '\\"')
            // const modifiedData = `\n;eval("${escapedData}")`
            const gameJs = await (await fetch('template.js')).text()
            tmpFrameWindow.PlaygroundCode = gameJs + (';' + data)
            setTimeout(() => {
              tmpFrameWindow.postMessage('{}')
            }, 10)
            // console.log({ escapedData })
          }
        })
        .catch((err) => {
          console.error(err)
        })
    }
  }, [value])

  const frameElement = document.getElementById('previewFrame')
  const tmpFrameWindow = (frameElement as any)?.contentWindow
  if (tmpFrameWindow) {
    if (tmpFrameWindow.startKernel) {
      if (tmpFrameWindow.kernelStarted) {
      } else {
        tmpFrameWindow.kernelStarted = true
        patchPreviewWindow(tmpFrameWindow)
          .then(() => {
            tmpFrameWindow.startKernel()
          })
          .catch((err) => {
            console.error(err)
          })
      }
    }
  }

  return (
    <div style={{ width: '100%' }}>
      <iframe
        title={'Decentraland Renderer'}
        id={'previewFrame'}
        src="http://localhost:3000/preview/?position=0%2C0&ENABLE_ECS7&SCENE_DEBUG_PANEL&renderer-branch=dev"
        width="100%"
        height="100%"
      ></iframe>
    </div>
  )
}

export default Preview
