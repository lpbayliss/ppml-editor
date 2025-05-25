import type React from 'react'
import { useState } from 'react'
import { BlockEditor } from '@/components/BlockEditor'

export const Editor: React.FC = () => {
  const [generatedXML, setGeneratedXML] = useState('')

  const handleXMLChange = (xml: string) => {
    setGeneratedXML(xml)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="h-screen flex flex-col">
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Visual PSML Editor
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Build your prompts visually with drag-and-drop blocks
          </p>
        </div>
        
        <div className="flex-1 overflow-hidden">
          <BlockEditor onXMLChange={handleXMLChange} />
        </div>
      </div>
    </div>
  )
}
