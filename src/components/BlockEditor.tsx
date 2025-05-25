import type React from 'react'
import { useCallback, useState } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import type { Block, BlockType } from '../types/blocks'
import { BlockCanvas } from './BlockCanvas'
import { BlockPalette } from './BlockPalette'
import { TemplateSelector } from './TemplateSelector'

export interface BlockEditorProps {
  onXMLChange?: (xml: string) => void
}

export const BlockEditor: React.FC<BlockEditorProps> = ({ onXMLChange }) => {
  const [blocks, setBlocks] = useState<Block[]>([
    {
      id: 'root',
      type: 'prompt',
      properties: { version: '1.0', model: 'gpt-4' },
      children: [],
      parentId: null,
    },
  ])
  const [showTemplateSelector, setShowTemplateSelector] = useState(true)
  const [hasStarted, setHasStarted] = useState(false)

  const addBlock = useCallback((blockType: BlockType, parentId?: string) => {
    const newBlock: Block = {
      id: `${blockType}-${Date.now()}`,
      type: blockType,
      properties: {},
      children: [],
      parentId: parentId || 'root',
    }

    setBlocks((prev) => {
      const updated = [...prev, newBlock]

      // Add the new block to its parent's children
      const parentIndex = updated.findIndex(
        (b) => b.id === (parentId || 'root'),
      )
      if (parentIndex !== -1) {
        updated[parentIndex] = {
          ...updated[parentIndex],
          children: [...updated[parentIndex].children, newBlock.id],
        }
      }

      return updated
    })
  }, [])

  const updateBlock = useCallback(
    (blockId: string, properties: Record<string, any>) => {
      setBlocks((prev) =>
        prev.map((block) =>
          block.id === blockId
            ? { ...block, properties: { ...block.properties, ...properties } }
            : block,
        ),
      )
    },
    [],
  )

  const moveBlock = useCallback(
    (
      draggedBlockId: string,
      targetBlockId: string,
      position: 'before' | 'after',
    ) => {
      setBlocks((prev) => {
        const draggedBlock = prev.find((b) => b.id === draggedBlockId)
        const targetBlock = prev.find((b) => b.id === targetBlockId)

        if (
          !draggedBlock ||
          !targetBlock ||
          draggedBlock.id === targetBlock.id
        ) {
          return prev
        }

        // Don't allow moving a block into its own descendants
        const isDescendant = (blockId: string, ancestorId: string): boolean => {
          const block = prev.find((b) => b.id === blockId)
          if (!block || !block.parentId) return false
          if (block.parentId === ancestorId) return true
          return isDescendant(block.parentId, ancestorId)
        }

        if (isDescendant(targetBlockId, draggedBlockId)) {
          return prev
        }

        // Both blocks must have the same parent for reordering
        if (draggedBlock.parentId !== targetBlock.parentId) {
          return prev
        }

        const parentId = draggedBlock.parentId
        const parent = prev.find((b) => b.id === parentId)
        if (!parent) return prev

        // Remove dragged block from its current position
        const newChildren = parent.children.filter(
          (childId) => childId !== draggedBlockId,
        )

        // Find target position and insert
        const targetIndex = newChildren.indexOf(targetBlockId)
        if (targetIndex === -1) return prev

        const insertIndex =
          position === 'before' ? targetIndex : targetIndex + 1
        newChildren.splice(insertIndex, 0, draggedBlockId)

        // Update the parent's children array
        return prev.map((block) =>
          block.id === parentId ? { ...block, children: newChildren } : block,
        )
      })
    },
    [],
  )

  const removeBlock = useCallback((blockId: string) => {
    setBlocks((prev) => {
      const blockToRemove = prev.find((b) => b.id === blockId)
      if (!blockToRemove || blockToRemove.id === 'root') return prev

      // Remove from parent's children
      const updated = prev.map((block) => {
        if (block.id === blockToRemove.parentId) {
          return {
            ...block,
            children: block.children.filter(
              (childId: string) => childId !== blockId,
            ),
          }
        }
        return block
      })

      // Remove the block and all its descendants
      const toRemove = new Set([blockId])
      const findDescendants = (id: string) => {
        const block = updated.find((b) => b.id === id)
        if (block) {
          block.children.forEach((childId: string) => {
            toRemove.add(childId)
            findDescendants(childId)
          })
        }
      }
      findDescendants(blockId)

      return updated.filter((block) => !toRemove.has(block.id))
    })
  }, [])

  const loadTemplate = useCallback((template: any) => {
    const newBlocks: Block[] = [
      {
        id: 'root',
        type: 'prompt',
        properties: { version: '1.0', model: 'gpt-4' },
        children: [],
        parentId: null,
      },
    ]

    let blockIdCounter = 1

    const createBlocksFromTemplate = (
      templateBlocks: any[],
      parentId: string,
    ) => {
      templateBlocks.forEach((templateBlock) => {
        const blockId = `${templateBlock.type}-${blockIdCounter++}`
        const block: Block = {
          id: blockId,
          type: templateBlock.type,
          properties: { ...templateBlock.properties },
          children: [],
          parentId,
        }

        newBlocks.push(block)

        // Add to parent's children
        const parent = newBlocks.find((b) => b.id === parentId)
        if (parent) {
          parent.children.push(blockId)
        }

        // Process children
        if (templateBlock.children) {
          createBlocksFromTemplate(templateBlock.children, blockId)
        }
      })
    }

    createBlocksFromTemplate(template.blocks, 'root')
    setBlocks(newBlocks)
    setShowTemplateSelector(false)
    setHasStarted(true)
  }, [])

  const generateXML = useCallback(() => {
    const rootBlock = blocks.find((b) => b.id === 'root')
    if (!rootBlock) return ''

    const generateBlockXML = (block: Block, indent = 0): string => {
      const spaces = '  '.repeat(indent)
      const attributes = Object.entries(block.properties)
        .filter(([key]) => key !== 'content')
        .map(([key, value]) => `${key}="${value}"`)
        .join(' ')

      const openTag = `${spaces}<${block.type}${attributes ? ' ' + attributes : ''}>`

      if (block.children.length === 0) {
        const content = block.properties.content || ''
        if (content) {
          return `${openTag}${content}</${block.type}>`
        }
        return `${openTag}</${block.type}>`
      }

      const childrenXML = block.children
        .map((childId: string) => blocks.find((b) => b.id === childId))
        .filter((child): child is Block => child !== undefined)
        .map((child: Block) => generateBlockXML(child, indent + 1))
        .join('\n')

      return `${openTag}\n${childrenXML}\n${spaces}</${block.type}>`
    }

    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n${generateBlockXML(rootBlock)}`
    onXMLChange?.(xml)
    return xml
  }, [blocks, onXMLChange])

  const handleCloseTemplateSelector = () => {
    setShowTemplateSelector(false)
    setHasStarted(true)
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex h-full bg-gray-50 dark:bg-gray-900">
        <BlockPalette onAddBlock={addBlock} />
        <BlockCanvas
          blocks={blocks}
          onUpdateBlock={updateBlock}
          onRemoveBlock={removeBlock}
          onAddBlock={addBlock}
          onMoveBlock={moveBlock}
          onGenerateXML={generateXML}
          hasStarted={hasStarted}
        />

        {showTemplateSelector && (
          <TemplateSelector
            onSelectTemplate={loadTemplate}
            onClose={handleCloseTemplateSelector}
          />
        )}
      </div>
    </DndProvider>
  )
}
