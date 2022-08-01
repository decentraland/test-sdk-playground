import React, { useState, useEffect, useCallback } from 'react'
import Editor, { OnChange, OnMount, OnValidate } from '@monaco-editor/react'

import { react } from '../types/react'
import { YogaTypings } from '../types/yoga'
import Preview from '../preview'
import { ecsTypes, defaultValue, debounce } from './utils'

import './editor.css'

function EditorComponent() {
  const [preview, setPreview] = useState('')
  const [error, setError] = useState(false)
  const [code, setCode] = useState<string>()

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      target: monaco.languages.typescript.ScriptTarget.ES2016,
      allowNonTsExtensions: true,
      moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
      module: monaco.languages.typescript.ModuleKind.CommonJS,
      noEmit: true,
      typeRoots: ['node_modules/@types'],
      jsx: monaco.languages.typescript.JsxEmit.Preserve,
      jsxFactory: 'React.createElement',
      esModuleInterop: true
    })
    editor.setModel(monaco.editor.createModel(defaultValue, 'typescript', monaco.Uri.parse('file:///main.tsx')))
    monaco.editor.createModel(
      react + ecsTypes + `declare global {` + YogaTypings + '}',
      'typescript',
      monaco.Uri.parse('file:///index.d.ts')
    )
    setCode(editor.getValue())
  }

  const handleChange: OnChange = async (value) => {
    setCode(value)
  }

  const onValidate: OnValidate = async (markers) => {
    const error = !!markers.filter((marker) => marker.severity > 1).length
    setError(error)
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const renderPreview = useCallback(
    debounce(async (code, error) => {
      if (error) {
        return console.log('error')
      }

      setPreview(code)
    }, 2000),
    []
  )

  useEffect(() => {
    void renderPreview(code, error)
  }, [error, code, renderPreview])

  return (
    <div className="Editor">
      <Editor
        height="100vh"
        width="50%"
        defaultLanguage="typescript"
        theme="vs-dark"
        onMount={handleEditorDidMount}
        onChange={handleChange}
        onValidate={onValidate}
      />
      <Preview value={preview} />
    </div>
  )
}

export default EditorComponent
