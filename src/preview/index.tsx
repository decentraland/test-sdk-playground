import { useEffect } from 'react'

interface PropTypes {
  value: string
}

function Preview({ value }: PropTypes) {
  useEffect(() => {
    fetch('http://localhost:8000/playground/write_game_ts', {
      method: 'POST',
      body: value
    })
      .then((_data) => {
        console.log('update ok!')
      })
      .catch((err) => {
        console.error('update error', err)
      })

    const previewFrame = document.getElementById('previewFrame')
    if (previewFrame) {
      previewFrame
      // const previewWindow = (previewFrame as any).contentWindow
      // previewWindow.postMessage('asd')
    }
  }, [value])

  return (
    <div style={{ width: '100%' }}>
      <iframe
        title={'Decentraland Renderer'}
        id={'previewFrame'}
        src="http://localhost:8000/?position=0%2C0&ENABLE_ECS7&renderer-branch=dev&kernel-branch=main&SCENE_DEBUG_PANEL"
        width="100%"
        height="100%"
      ></iframe>
    </div>
  )
}

export default Preview
