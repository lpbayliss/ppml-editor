// PSML Validator Helper Utilities

import type {
  ValidationError,
  ValidationResult,
  ValidationWarning,
} from './types'

/**
 * Format validation errors for display
 */
export function formatValidationErrors(errors: ValidationError[]): string[] {
  return errors.map((error) => {
    let message = `[${error.type.toUpperCase()}] ${error.message}`

    if (error.line) {
      message = `Line ${error.line}: ${message}`
    }

    if (error.element && error.attribute) {
      message += ` (${error.element}@${error.attribute})`
    } else if (error.element) {
      message += ` (${error.element})`
    }

    return message
  })
}

/**
 * Format validation warnings for display
 */
export function formatValidationWarnings(
  warnings: ValidationWarning[],
): string[] {
  return warnings.map((warning) => {
    let message = `[${warning.type}] ${warning.message}`
    if (warning.element) {
      message += ` (${warning.element})`
    }
    return message
  })
}

/**
 * Get a summary of validation results
 */
export function getValidationSummary(result: ValidationResult): string {
  if (result.isValid) {
    const warningText =
      result.warnings.length > 0
        ? ` with ${result.warnings.length} warning(s)`
        : ''
    return `✓ Valid PSML document${warningText}`
  }

  return `✗ Invalid PSML document: ${result.errors.length} error(s), ${result.warnings.length} warning(s)`
}

/**
 * Create a minimal valid PSML document template
 */
export function createMinimalPSMLTemplate(): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<prompt version="1.0">
  <task>
    <description>Your task description here</description>
  </task>
</prompt>`
}

/**
 * Create a standard PSML document template
 */
export function createStandardPSMLTemplate(): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<prompt version="1.0">
  <role expertise="expert" tone="helpful">
    Define the AI's role and expertise here
  </role>
  
  <context priority="high">
    <background>Provide background information</background>
    <domain>Specify the domain</domain>
  </context>
  
  <task id="main-task" priority="high">
    <description>Describe the main task</description>
    <objectives>
      <objective>First objective</objective>
      <objective>Second objective</objective>
    </objectives>
    <steps ordered="true">
      <step number="1">First step</step>
      <step number="2">Second step</step>
    </steps>
  </task>
  
  <constraints>
    <constraint type="scope">Define constraints</constraint>
  </constraints>
  
  <rules>
    <rule priority="must">Mandatory rule</rule>
    <rule priority="should">Recommended rule</rule>
  </rules>
  
  <examples>
    <example type="positive">
      <input>Example input</input>
      <output>Expected output</output>
    </example>
  </examples>
  
  <output format="structured">
    <template>
## Output Template
{content}
    </template>
  </output>
  
  <evaluation>
    <criterion type="completeness">All requirements addressed</criterion>
    <criterion type="quality">High-quality output</criterion>
  </evaluation>
</prompt>`
}

/**
 * Extract text content from a PSML document
 */
export function extractPromptText(xmlContent: string): string | null {
  try {
    const parser = new DOMParser()
    const doc = parser.parseFromString(xmlContent, 'text/xml')

    if (doc.querySelector('parsererror')) {
      return null
    }

    const extractText = (element: Element): string => {
      const texts: string[] = []

      // Add element content based on its type
      switch (element.tagName) {
        case 'role':
        case 'description':
        case 'objective':
        case 'step':
        case 'constraint':
        case 'rule':
        case 'background':
        case 'domain': {
          const content = element.textContent?.trim()
          if (content) texts.push(content)
          break
        }
      }

      // Recursively process children
      for (const child of Array.from(element.children)) {
        const childText = extractText(child)
        if (childText) texts.push(childText)
      }

      return texts.join('\n')
    }

    return extractText(doc.documentElement)
  } catch (error) {
    return null
  }
}

/**
 * Count elements in a PSML document
 */
export function countElements(
  xmlContent: string,
): Record<string, number> | null {
  try {
    const parser = new DOMParser()
    const doc = parser.parseFromString(xmlContent, 'text/xml')

    if (doc.querySelector('parsererror')) {
      return null
    }

    const counts: Record<string, number> = {}

    const countElement = (element: Element): void => {
      counts[element.tagName] = (counts[element.tagName] || 0) + 1
      for (const child of Array.from(element.children)) {
        countElement(child)
      }
    }

    countElement(doc.documentElement)
    return counts
  } catch (error) {
    return null
  }
}
