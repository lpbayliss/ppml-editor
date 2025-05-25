import type React from 'react'
import { BLOCK_DEFINITIONS, type BlockType } from '../types/blocks'

interface BlockPaletteProps {
  onAddBlock: (blockType: BlockType, parentId?: string) => void
}

export const BlockPalette: React.FC<BlockPaletteProps> = ({ onAddBlock }) => {
  const blockCategories = {
    Core: ['role', 'context', 'task', 'output'] as BlockType[],
    Context: ['background', 'domain'] as BlockType[],
    'Task Details': [
      'description',
      'objectives',
      'objective',
      'steps',
      'step',
      'examples',
      'example',
      'evaluation',
    ] as BlockType[],
    Constraints: ['constraints', 'constraint', 'rules', 'rule'] as BlockType[],
    Output: ['template', 'field'] as BlockType[],
  }

  return (
    <div className="w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-4 overflow-y-auto">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
        Block Palette
      </h2>

      <div className="space-y-6">
        {Object.entries(blockCategories).map(([category, blocks]) => (
          <div key={category}>
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2 uppercase tracking-wide">
              {category}
            </h3>
            <div className="space-y-2">
              {blocks.map((blockType) => {
                const definition = BLOCK_DEFINITIONS[blockType]
                return (
                  <button
                    key={blockType}
                    onClick={() => onAddBlock(blockType)}
                    className={`w-full p-3 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 transition-colors text-left group ${definition.color} hover:opacity-80`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-lg">{definition.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-white group-hover:text-gray-100">
                          {definition.label}
                        </div>
                        <div className="text-xs text-white/80 group-hover:text-gray-200 truncate">
                          {definition.description}
                        </div>
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <h4 className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">
          💡 How to use
        </h4>
        <ul className="text-xs text-blue-700 dark:text-blue-300 space-y-1">
          <li>• Click a block to add it to your prompt</li>
          <li>• Drag blocks to reorder them</li>
          <li>• Click the + button on blocks to add children</li>
          <li>• Use the trash icon to delete blocks</li>
        </ul>
      </div>
    </div>
  )
}
