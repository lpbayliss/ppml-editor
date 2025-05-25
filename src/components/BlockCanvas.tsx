import React, { useState } from 'react'
import { Block, BlockType } from '../types/blocks'
import { BlockComponent } from './BlockComponent'

interface BlockCanvasProps {
  blocks: Block[]
  onUpdateBlock: (blockId: string, properties: Record<string, any>) => void
  onRemoveBlock: (blockId: string) => void
  onAddBlock: (blockType: BlockType, parentId?: string) => void
  onGenerateXML: () => string
  hasStarted?: boolean
}

export const BlockCanvas: React.FC<BlockCanvasProps> = ({
  blocks,
  onUpdateBlock,
  onRemoveBlock,
  onAddBlock,
  onGenerateXML,
  hasStarted = false
}) => {
  const [generatedXML, setGeneratedXML] = useState('')
  const [showXML, setShowXML] = useState(false)

  const handleGenerateXML = () => {
    const xml = onGenerateXML()
    setGeneratedXML(xml)
    setShowXML(true)
  }

  const handleCopyXML = async () => {
    try {
      await navigator.clipboard.writeText(generatedXML)
      // You could add a toast notification here
    } catch (err) {
      console.error('Failed to copy to clipboard:', err)
    }
  }

  const renderBlock = (block: Block, depth = 0): React.ReactNode => {
    const children = block.children
      .map(childId => blocks.find(b => b.id === childId))
      .filter(Boolean) as Block[]

    return (
      <div key={block.id} className={`${depth > 0 ? 'ml-6' : ''}`}>
        <BlockComponent
          block={block}
          onUpdate={onUpdateBlock}
          onRemove={onRemoveBlock}
          onAddChild={onAddBlock}
          depth={depth}
        />
        {children.length > 0 && (
          <div className="mt-2">
            {children.map(child => renderBlock(child, depth + 1))}
          </div>
        )}
      </div>
    )
  }

  const rootBlock = blocks.find(b => b.id === 'root')

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            Visual Prompt Builder
          </h2>
          <div className="flex gap-2">
            <button
              onClick={handleGenerateXML}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Generate XML
            </button>
            {showXML && (
              <button
                onClick={handleCopyXML}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Copy XML
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Canvas */}
      <div className="flex-1 p-6 overflow-auto">
        {rootBlock ? (
          <div className="max-w-4xl mx-auto">
            {renderBlock(rootBlock)}
          </div>
        ) : hasStarted ? (
          <div className="text-center text-gray-500 dark:text-gray-400 mt-20">
            <div className="text-6xl mb-4">🎯</div>
            <h3 className="text-xl font-medium mb-2">Start Building Your Prompt</h3>
            <p>Select blocks from the palette on the left to begin</p>
          </div>
        ) : (
          <div className="text-center text-gray-500 dark:text-gray-400 mt-20">
            <div className="text-6xl mb-4">✨</div>
            <h3 className="text-xl font-medium mb-2">Welcome to the Visual PSML Editor</h3>
            <p>Choose a template to get started or create your own from scratch</p>
          </div>
        )}
      </div>

      {/* XML Output Modal */}
      {showXML && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[80vh] flex flex-col">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                Generated PSML
              </h3>
              <div className="flex gap-2">
                <button
                  onClick={handleCopyXML}
                  className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                >
                  Copy
                </button>
                <button
                  onClick={() => setShowXML(false)}
                  className="px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
            <div className="p-4 overflow-auto flex-1">
              <pre className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg text-sm overflow-auto">
                <code className="text-gray-800 dark:text-gray-200">
                  {generatedXML}
                </code>
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 