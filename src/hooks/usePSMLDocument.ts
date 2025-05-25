import { useCallback, useEffect } from 'react'
import type { Block } from '../types/blocks'
import { useSessionStorage } from './useSessionStorage'
import { STORAGE_KEYS, isSessionStorageAvailable } from '../utils/storage'

interface PSMLDocumentState {
  blocks: Block[]
  lastModified: string
  title?: string
  hasStarted: boolean
  showTemplateSelector: boolean
}

const STORAGE_KEY = STORAGE_KEYS.PSML_DOCUMENT

const getDefaultState = (): PSMLDocumentState => ({
  blocks: [
    {
      id: 'root',
      type: 'prompt',
      properties: { version: '1.0', model: 'gpt-4' },
      children: [],
      parentId: null,
    },
  ],
  lastModified: new Date().toISOString(),
  hasStarted: false,
  showTemplateSelector: true,
})

/**
 * Custom hook for managing PSML document state with session storage persistence
 */
export function usePSMLDocument() {
  const [documentState, setDocumentState, clearDocument] = useSessionStorage<PSMLDocumentState>(
    STORAGE_KEY,
    getDefaultState(),
  )

  // Check if session storage is available and warn if not
  useEffect(() => {
    if (!isSessionStorageAvailable()) {
      console.warn('Session storage is not available. Document changes will not persist between sessions.')
    }
  }, [])

  // Update last modified timestamp whenever blocks change
  const updateBlocks = useCallback(
    (newBlocks: Block[] | ((prev: Block[]) => Block[])) => {
      setDocumentState((prev) => ({
        ...prev,
        blocks: typeof newBlocks === 'function' ? newBlocks(prev.blocks) : newBlocks,
        lastModified: new Date().toISOString(),
      }))
    },
    [setDocumentState],
  )

  // Update document metadata
  const updateDocumentMeta = useCallback(
    (updates: Partial<Omit<PSMLDocumentState, 'blocks' | 'lastModified'>>) => {
      setDocumentState((prev) => ({
        ...prev,
        ...updates,
        lastModified: new Date().toISOString(),
      }))
    },
    [setDocumentState],
  )

  // Start a new document
  const newDocument = useCallback(() => {
    setDocumentState(getDefaultState())
  }, [setDocumentState])

  // Load a template into the document
  const loadTemplate = useCallback(
    (template: any) => {
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
      
      setDocumentState({
        blocks: newBlocks,
        lastModified: new Date().toISOString(),
        title: template.name || undefined,
        hasStarted: true,
        showTemplateSelector: false,
      })
    },
    [setDocumentState],
  )

  // Generate XML from current blocks
  const generateXML = useCallback(() => {
    const rootBlock = documentState.blocks.find((b) => b.id === 'root')
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
        .map((childId: string) => documentState.blocks.find((b) => b.id === childId))
        .filter((child): child is Block => child !== undefined)
        .map((child: Block) => generateBlockXML(child, indent + 1))
        .join('\n')

      return `${openTag}\n${childrenXML}\n${spaces}</${block.type}>`
    }

    return `<?xml version="1.0" encoding="UTF-8"?>\n${generateBlockXML(rootBlock)}`
  }, [documentState.blocks])

  // Check if document has unsaved changes (for future use)
  const hasUnsavedChanges = useCallback(() => {
    const now = new Date()
    const lastMod = new Date(documentState.lastModified)
    const timeDiff = now.getTime() - lastMod.getTime()
    return timeDiff < 1000 // Consider changes within last second as "unsaved"
  }, [documentState.lastModified])

  // Auto-save functionality - update session storage whenever blocks change
  useEffect(() => {
    // This effect runs whenever documentState changes, ensuring persistence
    // The useSessionStorage hook already handles the actual storage
  }, [documentState])

  return {
    // State
    blocks: documentState.blocks,
    lastModified: documentState.lastModified,
    title: documentState.title,
    hasStarted: documentState.hasStarted,
    showTemplateSelector: documentState.showTemplateSelector,
    
    // Actions
    updateBlocks,
    updateDocumentMeta,
    newDocument,
    loadTemplate,
    clearDocument,
    generateXML,
    hasUnsavedChanges,
  }
} 