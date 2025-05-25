import React, { useState } from 'react'
import { Block, BlockType, BLOCK_DEFINITIONS } from '../types/blocks'

interface BlockComponentProps {
  block: Block
  onUpdate: (blockId: string, properties: Record<string, any>) => void
  onRemove: (blockId: string) => void
  onAddChild: (blockType: BlockType, parentId: string) => void
  depth: number
}

export const BlockComponent: React.FC<BlockComponentProps> = ({
  block,
  onUpdate,
  onRemove,
  onAddChild,
  depth
}) => {
  const [isExpanded, setIsExpanded] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [showAddMenu, setShowAddMenu] = useState(false)

  const definition = BLOCK_DEFINITIONS[block.type]
  const hasChildren = block.children.length > 0
  const canHaveChildren = definition.allowedChildren.length > 0

  const handlePropertyChange = (propertyName: string, value: any) => {
    onUpdate(block.id, { [propertyName]: value })
  }

  const handleAddChild = (childType: BlockType) => {
    onAddChild(childType, block.id)
    setShowAddMenu(false)
  }

  const renderPropertyField = (field: any) => {
    const value = block.properties[field.name] || ''

    switch (field.type) {
      case 'textarea':
        return (
          <textarea
            value={value}
            onChange={(e) => handlePropertyChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            rows={3}
          />
        )
      case 'select':
        return (
          <select
            value={value}
            onChange={(e) => handlePropertyChange(field.name, e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          >
            <option value="">Select {field.label}</option>
            {field.options?.map((option: string) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        )
      case 'boolean':
        return (
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={value === true || value === 'true'}
              onChange={(e) => handlePropertyChange(field.name, e.target.checked)}
              className="rounded"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">{field.label}</span>
          </label>
        )
      case 'number':
        return (
          <input
            type="number"
            value={value}
            onChange={(e) => handlePropertyChange(field.name, parseInt(e.target.value) || 0)}
            placeholder={field.placeholder}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          />
        )
      default:
        return (
          <input
            type="text"
            value={value}
            onChange={(e) => handlePropertyChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          />
        )
    }
  }

  return (
    <div className="relative">
      {/* Connection line for nested blocks */}
      {depth > 0 && (
        <div className="absolute -left-6 top-0 bottom-0 w-px bg-gray-300 dark:bg-gray-600" />
      )}
      
      <div className={`rounded-lg border-2 shadow-sm ${definition.color} border-opacity-20 bg-opacity-10 dark:bg-opacity-20`}>
        {/* Block Header */}
        <div className={`${definition.color} p-3 rounded-t-lg flex items-center justify-between`}>
          <div className="flex items-center space-x-3">
            <span className="text-lg">{definition.icon}</span>
            <div>
              <h3 className="text-sm font-medium text-white">
                {definition.label}
              </h3>
              {block.properties.content && (
                <p className="text-xs text-white/80 truncate max-w-xs">
                  {block.properties.content}
                </p>
              )}
            </div>
          </div>
          
          <div className="flex items-center space-x-1">
            {canHaveChildren && (
              <div className="relative">
                <button
                  onClick={() => setShowAddMenu(!showAddMenu)}
                  className="p-1 text-white hover:bg-white/20 rounded"
                  title="Add child block"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
                
                {showAddMenu && (
                  <div className="absolute top-full right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-10 min-w-48">
                    <div className="p-2">
                      <div className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">
                        Add Child Block
                      </div>
                      {definition.allowedChildren.map(childType => {
                        const childDef = BLOCK_DEFINITIONS[childType]
                        return (
                          <button
                            key={childType}
                            onClick={() => handleAddChild(childType)}
                            className="w-full text-left p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded flex items-center space-x-2"
                          >
                            <span>{childDef.icon}</span>
                            <span className="text-sm">{childDef.label}</span>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}
            
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="p-1 text-white hover:bg-white/20 rounded"
              title="Edit properties"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            
            {hasChildren && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-1 text-white hover:bg-white/20 rounded"
                title={isExpanded ? "Collapse" : "Expand"}
              >
                <svg className={`w-4 h-4 transform transition-transform ${isExpanded ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}
            
            {block.id !== 'root' && (
              <button
                onClick={() => onRemove(block.id)}
                className="p-1 text-white hover:bg-red-500/50 rounded"
                title="Delete block"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            )}
          </div>
        </div>
        
        {/* Block Properties */}
        {isEditing && definition.propertyFields.length > 0 && (
          <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
            <div className="space-y-3">
              {definition.propertyFields.map(field => (
                <div key={field.name}>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {field.label}
                    {field.required && <span className="text-red-500 ml-1">*</span>}
                  </label>
                  {renderPropertyField(field)}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Click outside to close add menu */}
      {showAddMenu && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => setShowAddMenu(false)}
        />
      )}
    </div>
  )
} 