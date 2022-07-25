import { transformSync } from '@swc/wasm-web'

let swc: { transformSync: typeof transformSync }

export async function transformCode(codeString: string) {
  if (!swc) {
    const module = await import('@swc/wasm-web')
    await module.default()
    swc = module
  }
  return swc.transformSync(codeString, {
    filename: 'index.tsx',
    jsc: {
      parser: {
        syntax: 'typescript',
        tsx: true
      }
    },
    module: {
      type: 'commonjs'
    },
    sourceMaps: true
  }).code
}

export async function executeCode(codeString: string, dependencies: Record<string, unknown>) {
  const codeReactString = codeString.replace('function App()', 'export default function App()')
  const ecsUI = `
  import React from 'react'
  const a = []
  function DivUi({ children }) {
    console.log(children)
    a.push('Div(')
    return <div>{children}</div>
  }

  function TextUi({ children }) {
    a.push('Text(}')
    return <div>{children}</div>
  }

  setTimeout(() => console.log(a), 2000)

  `
  const codeWithUi = ecsUI + codeReactString
  const transformedCode = await transformCode(codeWithUi)
  const exports: Record<string, unknown> = {}

  const require = (path: string) => {
    if (dependencies[path]) {
      return dependencies[path]
    }
    throw Error(`Module not found: ${path}.`)
  }

  // eslint-disable-next-line no-new-func
  const result = new Function('exports', 'require', transformedCode)

  result(exports, require)

  return exports.default
}
