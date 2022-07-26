import React, { useEffect, useState } from 'react'
import { executeCode } from './execute-code'

import './preview.css'

interface PropTypes {
  value: string
}

function Preview({ value }: PropTypes) {
  const [Preview, setPreview] = useState<any>()
  const [error, setError] = useState('')

  useEffect(() => {
    async function getPreview() {
      if (!value) return
      const Preview = (await executeCode(value, { react: React })) as React.FC
      setPreview((<Preview />) as any)
    }

    getPreview().catch((error) => setError(error.message))
  }, [value])

  return (
    <div className="Preview">
      {error && <div>{error}</div>}
      <div>{Preview ? Preview : 'loading'}</div>
    </div>
  )
}

export default Preview
