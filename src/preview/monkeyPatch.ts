export async function patchPreviewWindow(previewWin: any) {
  // const baseUrl = 'http://localhost:8000/'

  // const scene = await (await fetch('http://localhost:8000/content/entities/scene/?pointer=0,0')).json()

  // if (!Array.isArray(scene)) {
  //   throw new Error("Couldn't get the preview scene A")
  // } else if (scene.length !== 1) {
  //   throw new Error("Couldn't get the preview scene B")
  // }

  // if (scene[0].content[0].file !== 'bin/game.js') {
  //   throw new Error("Couldn't get the preview scene C")
  // }

  // const hash = scene[0].content[0].hash

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

    // if (input === `http://localhost:3000/preview/content/contents/${hash}`) {
    //   console.log('fetch hacked!')
    // }

    return originalFetch(input, init)
  }
  previewWin.fetch = wrappedFetch
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
  })(previewWin.XMLHttpRequest.prototype)

  const originalWs = previewWin.WebSocket
  previewWin.WebSocket = function (url: any, protocols: any) {
    let newUrl: string = ''
    if (url.toString().startsWith('ws://localhost:3000')) {
      newUrl = 'ws://localhost:8000' + url.substring('ws://localhost:3000'.length)
    } else {
      newUrl = url
    }

    console.log(`ws wrapped `, { url, newUrl })

    const that = protocols ? new originalWs(newUrl, protocols) : new originalWs(newUrl)
    return that
  }

  // // Playground stuffs
  // class RestrictedWebSocket extends WebSocket {
  //   constructor(url: any, protocols: any) {
  //     let newUrl = url
  //     debugger

  //     if (url.toString().startsWith('ws://localhost:3000/preview/')) {
  //       newUrl = 'ws://localhost:8000/' + url.substring('ws://localhost:3000/preview/'.length)
  //     }
  //     super(newUrl, protocols)
  //   }
  // }

  // previewWin.WebSocket = RestrictedWebSocket
}
