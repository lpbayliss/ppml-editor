import type React from 'react'
import { useCallback } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import type { Block, BlockType } from '../types/blocks'
import { BlockCanvas } from './BlockCanvas'
import { BlockPalette } from './BlockPalette'
import { TemplateSelector } from './TemplateSelector'
import { usePSMLDocument } from '../hooks/usePSMLDocument'

export interface BlockEditorProps {
  onXMLChange?: (xml: string) => void
}

export const BlockEditor: React.FC<BlockEditorProps> = ({ onXMLChange }) => {
  const {
    blocks,
    hasStarted,
    showTemplateSelector,
    lastModified,
    title,
    updateBlocks,
    updateDocumentMeta,
    loadTemplate,
    generateXML,
  } = usePSMLDocument()

  const addBlock = useCallback((blockType: BlockType, parentId?: string) => {
    const newBlock: Block = {
      id: `${blockType}-${Date.now()}`,
      type: blockType,
      properties: {},
      children: [],
      parentId: parentId || 'root',
    }

    updateBlocks((prev: Block[]) => {
      const updated = [...prev, newBlock]

      // Add the new block to its parent's children
      const parentIndex = updated.findIndex(
        (b: Block) => b.id === (parentId || 'root'),
      )
      if (parentIndex !== -1) {
        updated[parentIndex] = {
          ...updated[parentIndex],
          children: [...updated[parentIndex].children, newBlock.id],
        }
      }

      return updated
    })
  }, [updateBlocks])

  const updateBlock = useCallback(
    (blockId: string, properties: Record<string, any>) => {
      updateBlocks((prev: Block[]) =>
        prev.map((block: Block) =>
          block.id === blockId
            ? { ...block, properties: { ...block.properties, ...properties } }
            : block,
        ),
      )
    },
    [updateBlocks],
  )

  const moveBlock = useCallback(
    (
      draggedBlockId: string,
      targetBlockId: string,
      position: 'before' | 'after',
    ) => {
      updateBlocks((prev: Block[]) => {
        const draggedBlock = prev.find((b: Block) => b.id === draggedBlockId)
        const targetBlock = prev.find((b: Block) => b.id === targetBlockId)

        if (
          !draggedBlock ||
          !targetBlock ||
          draggedBlock.id === targetBlock.id
        ) {
          return prev
        }

        // Don't allow moving a block into its own descendants
        const isDescendant = (blockId: string, ancestorId: string): boolean => {
          const block = prev.find((b: Block) => b.id === blockId)
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
        const parent = prev.find((b: Block) => b.id === parentId)
        if (!parent) return prev

        // Remove dragged block from its current position
        const newChildren = parent.children.filter(
          (childId: string) => childId !== draggedBlockId,
        )

        // Find target position and insert
        const targetIndex = newChildren.indexOf(targetBlockId)
        if (targetIndex === -1) return prev

        const insertIndex =
          position === 'before' ? targetIndex : targetIndex + 1
        newChildren.splice(insertIndex, 0, draggedBlockId)

        // Update the parent's children array
        return prev.map((block: Block) =>
          block.id === parentId ? { ...block, children: newChildren } : block,
        )
      })
    },
    [updateBlocks],
  )

  const removeBlock = useCallback((blockId: string) => {
    updateBlocks((prev: Block[]) => {
      const blockToRemove = prev.find((b: Block) => b.id === blockId)
      if (!blockToRemove || blockToRemove.id === 'root') return prev

      // Remove from parent's children
      const updated = prev.map((block: Block) => {
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
        const block = updated.find((b: Block) => b.id === id)
        if (block) {
          block.children.forEach((childId: string) => {
            toRemove.add(childId)
            findDescendants(childId)
          })
        }
      }
      findDescendants(blockId)

      return updated.filter((block: Block) => !toRemove.has(block.id))
    })
  }, [updateBlocks])

  const handleCloseTemplateSelector = () => {
    updateDocumentMeta({
      showTemplateSelector: false,
      hasStarted: true,
    })
  }

  const handleGenerateXML = useCallback(() => {
    const xml = generateXML()
    onXMLChange?.(xml)
    return xml
  }, [generateXML, onXMLChange])

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
          onGenerateXML={handleGenerateXML}
          hasStarted={hasStarted}
          lastModified={lastModified}
          title={title}
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
