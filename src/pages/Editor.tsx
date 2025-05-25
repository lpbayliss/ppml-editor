import { BlockEditor } from '@/components/BlockEditor'
import { usePSMLDocument } from '@/hooks/usePSMLDocument'
import type React from 'react'

export const Editor: React.FC = () => {
  const { newDocument, title } = usePSMLDocument()

  const handleXMLChange = (_xml: string) => {
    // XML change handler - could be used for real-time updates
  }

  const handleNewDocument = () => {
    if (confirm('Are you sure you want to start a new document? Any unsaved changes will be lost.')) {
      newDocument()
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="h-screen flex flex-col">
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Visual PSML Editor
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Build your prompts visually with drag-and-drop blocks
                {title && ` • ${title}`}
              </p>
            </div>
            <button
              onClick={handleNewDocument}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              New Document
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-hidden">
          <BlockEditor onXMLChange={handleXMLChange} />
        </div>
      </div>
    </div>
  )
}
