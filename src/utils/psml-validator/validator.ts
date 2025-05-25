// PSML Validator Implementation

import {
  canHaveTextContent,
  getElementDefinition,
  isValidChild,
} from './schema'
import type {
  AttributeDefinition,
  ElementDefinition,
  ValidationContext,
  ValidationResult,
} from './types'

export class PSMLValidator {
  private parser: DOMParser

  constructor() {
    this.parser = new DOMParser()
  }

  /**
   * Validates a PSML XML document
   * @param xmlContent The XML content to validate
   * @returns Validation result with errors and warnings
   */
  public validate(xmlContent: string): ValidationResult {
    const context: ValidationContext = {
      currentPath: [],
      ids: new Set<string>(),
      errors: [],
      warnings: [],
    }

    try {
      // Phase 1: XML Parsing
      const doc = this.parseXML(xmlContent, context)
      if (!doc || context.errors.length > 0) {
        return this.createResult(context)
      }

      // Phase 2: Structure Validation
      this.validateStructure(doc, context)

      // Phase 3: Semantic Validation
      this.validateSemantics(doc, context)

      // Phase 4: Best Practices Check
      this.checkBestPractices(doc, context)
    } catch (error) {
      context.errors.push({
        type: 'syntax',
        message: `Unexpected error during validation: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`,
      })
    }

    return this.createResult(context)
  }

  /**
   * Parse XML and check for syntax errors
   */
  private parseXML(
    xmlContent: string,
    context: ValidationContext,
  ): Document | null {
    // Check for XML declaration
    if (!xmlContent.trim().startsWith('<?xml')) {
      context.errors.push({
        type: 'syntax',
        message:
          'Document must start with XML declaration: <?xml version="1.0" encoding="UTF-8"?>',
        line: 1,
      })
    }

    const doc = this.parser.parseFromString(xmlContent, 'text/xml')

    // Check for parsing errors
    const parserError = doc.querySelector('parsererror')
    if (parserError) {
      const errorText = parserError.textContent || 'Unknown parsing error'
      context.errors.push({
        type: 'syntax',
        message: `XML parsing error: ${errorText}`,
      })
      return null
    }

    return doc
  }

  /**
   * Validate document structure according to PSML schema
   */
  private validateStructure(doc: Document, context: ValidationContext): void {
    // Check root element
    const root = doc.documentElement
    if (root.tagName !== 'prompt') {
      context.errors.push({
        type: 'structure',
        message: 'Root element must be <prompt>',
        element: root.tagName,
      })
      return
    }

    // Validate root attributes
    this.validateRootElement(root, context)

    // Recursively validate all elements
    this.validateElement(root, null, context)
  }

  /**
   * Validate the root prompt element
   */
  private validateRootElement(
    element: Element,
    context: ValidationContext,
  ): void {
    const version = element.getAttribute('version')
    if (!version) {
      context.errors.push({
        type: 'attribute',
        message: 'Root element <prompt> must have version attribute',
        element: 'prompt',
      })
    } else if (version !== '1.0') {
      context.errors.push({
        type: 'value',
        message: `Invalid version "${version}". Must be "1.0"`,
        element: 'prompt',
        attribute: 'version',
      })
    }
  }

  /**
   * Recursively validate element and its children
   */
  private validateElement(
    element: Element,
    parent: Element | null,
    context: ValidationContext,
  ): void {
    const elementName = element.tagName
    context.currentPath.push(elementName)

    // Check if element is defined in schema
    const elementDef = getElementDefinition(elementName)
    if (!elementDef) {
      context.errors.push({
        type: 'structure',
        message: `Unknown element <${elementName}>`,
        element: elementName,
      })
      context.currentPath.pop()
      return
    }

    // Check parent-child relationship
    if (parent && !isValidChild(parent.tagName, elementName)) {
      context.errors.push({
        type: 'structure',
        message: `Element <${elementName}> cannot be a child of <${parent.tagName}>`,
        element: elementName,
      })
    }

    // Validate attributes
    this.validateAttributes(element, elementDef, context)

    // Validate children
    const children = Array.from(element.children)
    const allowedChildren = elementDef.children || []

    for (const child of children) {
      if (!allowedChildren.includes(child.tagName)) {
        context.errors.push({
          type: 'structure',
          message: `Element <${child.tagName}> is not allowed as child of <${elementName}>`,
          element: child.tagName,
        })
      }
      this.validateElement(child, element, context)
    }

    // Check text content
    if (element.childNodes.length > 0) {
      const hasTextContent = Array.from(element.childNodes).some(
        (node) => node.nodeType === Node.TEXT_NODE && node.textContent?.trim(),
      )

      if (hasTextContent && !canHaveTextContent(elementName)) {
        context.errors.push({
          type: 'structure',
          message: `Element <${elementName}> cannot contain text content`,
          element: elementName,
        })
      }
    }

    // Check required children
    this.checkRequiredChildren(element, context)

    context.currentPath.pop()
  }

  /**
   * Validate element attributes
   */
  private validateAttributes(
    element: Element,
    elementDef: ElementDefinition,
    context: ValidationContext,
  ): void {
    const attributes = elementDef.attributes || []
    const elementAttrs = Array.from(element.attributes)

    // Check required attributes
    for (const attrDef of attributes) {
      if (attrDef.required && !element.hasAttribute(attrDef.name)) {
        context.errors.push({
          type: 'attribute',
          message: `Required attribute "${attrDef.name}" missing on <${element.tagName}>`,
          element: element.tagName,
          attribute: attrDef.name,
        })
      }
    }

    // Validate each attribute
    for (const attr of elementAttrs) {
      const attrDef = attributes.find(
        (a: AttributeDefinition) => a.name === attr.name,
      )

      if (!attrDef) {
        context.errors.push({
          type: 'attribute',
          message: `Unknown attribute "${attr.name}" on <${element.tagName}>`,
          element: element.tagName,
          attribute: attr.name,
        })
        continue
      }

      this.validateAttributeValue(attr, attrDef, element.tagName, context)
    }
  }

  /**
   * Validate attribute value against its definition
   */
  private validateAttributeValue(
    attr: Attr,
    attrDef: AttributeDefinition,
    elementName: string,
    context: ValidationContext,
  ): void {
    const value = attr.value

    switch (attrDef.type) {
      case 'enum':
        if (attrDef.values && !attrDef.values.includes(value)) {
          context.errors.push({
            type: 'value',
            message: `Invalid value "${value}" for attribute "${
              attr.name
            }". Must be one of: ${attrDef.values.join(', ')}`,
            element: elementName,
            attribute: attr.name,
          })
        }
        break

      case 'boolean':
        if (value !== 'true' && value !== 'false') {
          context.errors.push({
            type: 'value',
            message: `Invalid boolean value "${value}" for attribute "${attr.name}". Must be "true" or "false"`,
            element: elementName,
            attribute: attr.name,
          })
        }
        break

      case 'integer':
        if (!/^-?\d+$/.test(value)) {
          context.errors.push({
            type: 'value',
            message: `Invalid integer value "${value}" for attribute "${attr.name}"`,
            element: elementName,
            attribute: attr.name,
          })
        }
        break

      case 'ID':
        if (context.ids.has(value)) {
          context.errors.push({
            type: 'semantic',
            message: `Duplicate ID "${value}" found`,
            element: elementName,
            attribute: attr.name,
          })
        } else {
          context.ids.add(value)
        }
        break
    }
  }

  /**
   * Check for required child elements
   */
  private checkRequiredChildren(
    element: Element,
    context: ValidationContext,
  ): void {
    // Check for required task description
    if (element.tagName === 'task') {
      const hasDescription = element.querySelector('description')
      if (!hasDescription) {
        context.warnings.push({
          type: 'bestPractice',
          message: 'Task should include a <description> element',
          element: 'task',
        })
      }
    }

    // Check for rule priority in rules element
    if (element.tagName === 'rules') {
      const rules = element.querySelectorAll('rule')
      for (const rule of Array.from(rules)) {
        if (!rule.hasAttribute('priority')) {
          context.errors.push({
            type: 'attribute',
            message: 'Rule element must have priority attribute',
            element: 'rule',
          })
        }
      }
    }
  }

  /**
   * Perform semantic validation
   */
  private validateSemantics(doc: Document, context: ValidationContext): void {
    // Check condition logic
    const conditions = doc.querySelectorAll('condition')
    for (const condition of Array.from(conditions)) {
      const hasEquals = condition.hasAttribute('equals')
      const hasNotEquals = condition.hasAttribute('not-equals')

      if (!hasEquals && !hasNotEquals) {
        context.errors.push({
          type: 'semantic',
          message:
            'Condition must have either "equals" or "not-equals" attribute',
          element: 'condition',
        })
      }

      if (hasEquals && hasNotEquals) {
        context.errors.push({
          type: 'semantic',
          message:
            'Condition cannot have both "equals" and "not-equals" attributes',
          element: 'condition',
        })
      }
    }

    // Check step numbering in ordered steps
    const stepsElements = doc.querySelectorAll('steps[ordered="true"]')
    for (const steps of Array.from(stepsElements)) {
      const stepElements = steps.querySelectorAll('step')
      const numbers = new Set<number>()

      for (const step of Array.from(stepElements)) {
        const num = step.getAttribute('number')
        if (num) {
          const numValue = Number.parseInt(num)
          if (numbers.has(numValue)) {
            context.errors.push({
              type: 'semantic',
              message: `Duplicate step number ${numValue} in ordered steps`,
              element: 'step',
            })
          }
          numbers.add(numValue)
        }
      }
    }
  }

  /**
   * Check best practices and provide recommendations
   */
  private checkBestPractices(doc: Document, context: ValidationContext): void {
    // Check for role element
    if (!doc.querySelector('role')) {
      context.warnings.push({
        type: 'bestPractice',
        message: 'Document should include a <role> element for context',
      })
    }

    // Check for examples
    const tasks = doc.querySelectorAll('task')
    for (const task of Array.from(tasks)) {
      if (!task.querySelector('examples') && !doc.querySelector('examples')) {
        context.warnings.push({
          type: 'bestPractice',
          message: 'Consider adding <examples> to provide clarity',
        })
      }
    }

    // Check for output specification
    if (!doc.querySelector('output')) {
      context.warnings.push({
        type: 'bestPractice',
        message: 'Document should specify expected <output> format',
      })
    }

    // Check nesting depth
    this.checkNestingDepth(doc.documentElement, 0, context)
  }

  /**
   * Check for excessive nesting depth
   */
  private checkNestingDepth(
    element: Element,
    depth: number,
    context: ValidationContext,
  ): void {
    if (depth > 10) {
      context.warnings.push({
        type: 'bestPractice',
        message: `Excessive nesting depth (${depth}) at element <${element.tagName}>. Recommended maximum is 10.`,
        element: element.tagName,
      })
    }

    for (const child of Array.from(element.children)) {
      this.checkNestingDepth(child, depth + 1, context)
    }
  }

  /**
   * Create validation result
   */
  private createResult(context: ValidationContext): ValidationResult {
    return {
      isValid: context.errors.length === 0,
      errors: context.errors,
      warnings: context.warnings,
    }
  }
}

// Export singleton instance
export const psmlValidator = new PSMLValidator()
