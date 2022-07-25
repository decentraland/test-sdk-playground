const fs = require('fs')

const content = fs.readFileSync(process.cwd() + '/bin/template.js')

let i = 0
let buf = ''
for (const value of content.values()) {
  buf += value.toString() + ","
  i += 1
  if (i > 100) {
    i = 0
    buf += '\n'
  }
}
buf += '32'

fs.writeFileSync('bin/gameJs.ts',`
const gameJsBinary = new Uint8Array([${buf}])
export const gameJs = new TextDecoder().decode(gameJsBinary)
`)