// PSML Validator Type Definitions

export interface ValidationResult {
  isValid: boolean
  errors: ValidationError[]
  warnings: ValidationWarning[]
}

export interface ValidationError {
  type: 'syntax' | 'structure' | 'attribute' | 'value' | 'semantic'
  message: string
  line?: number
  column?: number
  element?: string
  attribute?: string
}

export interface ValidationWarning {
  type: 'recommendation' | 'bestPractice'
  message: string
  element?: string
}

export type PriorityLevel = 'low' | 'medium' | 'high'
export type ExpertiseLevel = 'novice' | 'intermediate' | 'expert'
export type ComplexityLevel = 'simple' | 'medium' | 'complex'
export type RulePriority = 'must' | 'should' | 'may'
export type ExampleType = 'positive' | 'negative' | 'neutral'
export type OutputFormat = 'text' | 'json' | 'xml' | 'markdown' | 'structured'
export type SchemaMode = 'strict' | 'flexible'

export interface ElementDefinition {
  name: string
  parent: string[]
  children?: string[]
  attributes?: AttributeDefinition[]
  required?: boolean
  textContent?: boolean
  mixedContent?: boolean
}

export interface AttributeDefinition {
  name: string
  type: 'string' | 'enum' | 'boolean' | 'integer' | 'ID'
  required?: boolean
  values?: string[]
  pattern?: RegExp
}

export interface PSMLDocument {
  version: string
  model?: string
  purpose?: string
  content: Element
}

export interface ValidationContext {
  currentPath: string[]
  ids: Set<string>
  errors: ValidationError[]
  warnings: ValidationWarning[]
}
