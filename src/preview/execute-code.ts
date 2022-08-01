import { transformSync } from '@swc/wasm-web'
import Yoga from 'yoga-layout-prebuilt'

import * as YogaJsx from '../yoga-jsx'
import { YogaTypings } from '../types/yoga'

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
    }
  }).code
}

export async function executeCode(codeString: string, dependencies: Record<string, unknown>) {
  const mergedDependencies: Record<string, unknown> = {
    ...dependencies,
    'yoga-jsx': YogaJsx,
    'yoga-layout-prebuilt': Yoga
  }
  const codeReactString = codeString.replace('function App()', 'export default function App()')
  const ecsUI =
    YogaTypings +
    `
  import { YogaJsx as DivUi } from 'yoga-jsx'
  import Yoga from 'yoga-layout-prebuilt'
  import React from 'react'
  `
  const codeWithUi = ecsUI + codeReactString
  const transformedCode = await transformCode(codeWithUi)
  const exports: Record<string, unknown> = {}

  const require = (path: string) => {
    if (mergedDependencies[path]) {
      return mergedDependencies[path]
    }
    throw Error(`Module not found: ${path}.`)
  }

  // eslint-disable-next-line no-new-func
  const result = new Function('exports', 'require', transformedCode)

  result(exports, require)

  return exports.default
}
