export type BlockType =
  | 'prompt'
  | 'role'
  | 'context'
  | 'task'
  | 'constraints'
  | 'constraint'
  | 'rules'
  | 'rule'
  | 'objectives'
  | 'objective'
  | 'steps'
  | 'step'
  | 'examples'
  | 'example'
  | 'output'
  | 'template'
  | 'field'
  | 'background'
  | 'domain'
  | 'description'
  | 'evaluation'

export interface Block {
  id: string
  type: BlockType
  properties: Record<string, any>
  children: string[]
  parentId: string | null
}

export interface BlockDefinition {
  type: BlockType
  label: string
  description: string
  color: string
  icon: string
  allowedParents: BlockType[]
  allowedChildren: BlockType[]
  defaultProperties: Record<string, any>
  propertyFields: PropertyField[]
}

export interface PropertyField {
  name: string
  label: string
  type: 'text' | 'textarea' | 'select' | 'number' | 'boolean'
  required?: boolean
  options?: string[]
  placeholder?: string
}

export const BLOCK_DEFINITIONS: Record<BlockType, BlockDefinition> = {
  prompt: {
    type: 'prompt',
    label: 'Prompt',
    description: 'Root prompt element',
    color: 'bg-blue-500',
    icon: '🎯',
    allowedParents: [],
    allowedChildren: [
      'role',
      'context',
      'task',
      'constraints',
      'rules',
      'output',
    ],
    defaultProperties: { version: '1.0' },
    propertyFields: [
      { name: 'version', label: 'Version', type: 'text', required: true },
      {
        name: 'model',
        label: 'Model',
        type: 'select',
        options: ['gpt-4', 'gpt-3.5-turbo', 'claude-3'],
      },
    ],
  },
  role: {
    type: 'role',
    label: 'Role',
    description: 'Define the AI assistant role',
    color: 'bg-purple-500',
    icon: '👤',
    allowedParents: ['prompt'],
    allowedChildren: [],
    defaultProperties: {},
    propertyFields: [
      {
        name: 'expertise',
        label: 'Expertise',
        type: 'text',
        placeholder: 'e.g., expert, beginner',
      },
      {
        name: 'tone',
        label: 'Tone',
        type: 'text',
        placeholder: 'e.g., helpful, professional',
      },
      {
        name: 'content',
        label: 'Role Description',
        type: 'textarea',
        required: true,
      },
    ],
  },
  context: {
    type: 'context',
    label: 'Context',
    description: 'Provide background context',
    color: 'bg-green-500',
    icon: '📋',
    allowedParents: ['prompt'],
    allowedChildren: ['background', 'domain'],
    defaultProperties: {},
    propertyFields: [
      {
        name: 'priority',
        label: 'Priority',
        type: 'select',
        options: ['low', 'medium', 'high'],
      },
    ],
  },
  background: {
    type: 'background',
    label: 'Background',
    description: 'Background information',
    color: 'bg-green-400',
    icon: '📄',
    allowedParents: ['context'],
    allowedChildren: [],
    defaultProperties: {},
    propertyFields: [
      {
        name: 'content',
        label: 'Background',
        type: 'textarea',
        required: true,
      },
    ],
  },
  domain: {
    type: 'domain',
    label: 'Domain',
    description: 'Domain or field of expertise',
    color: 'bg-green-400',
    icon: '🏷️',
    allowedParents: ['context'],
    allowedChildren: [],
    defaultProperties: {},
    propertyFields: [
      { name: 'content', label: 'Domain', type: 'text', required: true },
    ],
  },
  task: {
    type: 'task',
    label: 'Task',
    description: 'Define the main task',
    color: 'bg-orange-500',
    icon: '✅',
    allowedParents: ['prompt'],
    allowedChildren: [
      'description',
      'objectives',
      'steps',
      'examples',
      'evaluation',
    ],
    defaultProperties: {},
    propertyFields: [
      { name: 'id', label: 'Task ID', type: 'text' },
      {
        name: 'priority',
        label: 'Priority',
        type: 'select',
        options: ['low', 'medium', 'high'],
      },
    ],
  },
  description: {
    type: 'description',
    label: 'Description',
    description: 'Task description',
    color: 'bg-orange-400',
    icon: '📝',
    allowedParents: ['task'],
    allowedChildren: [],
    defaultProperties: {},
    propertyFields: [
      {
        name: 'content',
        label: 'Description',
        type: 'textarea',
        required: true,
      },
    ],
  },
  objectives: {
    type: 'objectives',
    label: 'Objectives',
    description: 'Task objectives container',
    color: 'bg-orange-400',
    icon: '🎯',
    allowedParents: ['task'],
    allowedChildren: ['objective'],
    defaultProperties: {},
    propertyFields: [],
  },
  objective: {
    type: 'objective',
    label: 'Objective',
    description: 'Single objective',
    color: 'bg-orange-300',
    icon: '•',
    allowedParents: ['objectives'],
    allowedChildren: [],
    defaultProperties: {},
    propertyFields: [
      { name: 'content', label: 'Objective', type: 'text', required: true },
    ],
  },
  steps: {
    type: 'steps',
    label: 'Steps',
    description: 'Ordered steps container',
    color: 'bg-orange-400',
    icon: '📋',
    allowedParents: ['task'],
    allowedChildren: ['step'],
    defaultProperties: {},
    propertyFields: [{ name: 'ordered', label: 'Ordered', type: 'boolean' }],
  },
  step: {
    type: 'step',
    label: 'Step',
    description: 'Single step',
    color: 'bg-orange-300',
    icon: '1️⃣',
    allowedParents: ['steps'],
    allowedChildren: [],
    defaultProperties: {},
    propertyFields: [
      { name: 'number', label: 'Step Number', type: 'number' },
      {
        name: 'content',
        label: 'Step Description',
        type: 'text',
        required: true,
      },
    ],
  },
  examples: {
    type: 'examples',
    label: 'Examples',
    description: 'Examples container',
    color: 'bg-orange-400',
    icon: '💡',
    allowedParents: ['task'],
    allowedChildren: ['example'],
    defaultProperties: {},
    propertyFields: [],
  },
  example: {
    type: 'example',
    label: 'Example',
    description: 'Single example',
    color: 'bg-orange-300',
    icon: '📄',
    allowedParents: ['examples'],
    allowedChildren: [],
    defaultProperties: {},
    propertyFields: [
      { name: 'content', label: 'Example', type: 'textarea', required: true },
    ],
  },
  evaluation: {
    type: 'evaluation',
    label: 'Evaluation',
    description: 'Success criteria',
    color: 'bg-orange-400',
    icon: '📊',
    allowedParents: ['task'],
    allowedChildren: [],
    defaultProperties: {},
    propertyFields: [
      {
        name: 'content',
        label: 'Evaluation Criteria',
        type: 'textarea',
        required: true,
      },
    ],
  },
  constraints: {
    type: 'constraints',
    label: 'Constraints',
    description: 'Constraints container',
    color: 'bg-red-500',
    icon: '🚫',
    allowedParents: ['prompt'],
    allowedChildren: ['constraint'],
    defaultProperties: {},
    propertyFields: [],
  },
  constraint: {
    type: 'constraint',
    label: 'Constraint',
    description: 'Single constraint',
    color: 'bg-red-400',
    icon: '⚠️',
    allowedParents: ['constraints'],
    allowedChildren: [],
    defaultProperties: {},
    propertyFields: [
      {
        name: 'type',
        label: 'Type',
        type: 'text',
        placeholder: 'e.g., tone, length',
      },
      { name: 'content', label: 'Constraint', type: 'text', required: true },
    ],
  },
  rules: {
    type: 'rules',
    label: 'Rules',
    description: 'Rules container',
    color: 'bg-yellow-500',
    icon: '📏',
    allowedParents: ['prompt'],
    allowedChildren: ['rule'],
    defaultProperties: {},
    propertyFields: [],
  },
  rule: {
    type: 'rule',
    label: 'Rule',
    description: 'Single rule',
    color: 'bg-yellow-400',
    icon: '📝',
    allowedParents: ['rules'],
    allowedChildren: [],
    defaultProperties: {},
    propertyFields: [
      {
        name: 'priority',
        label: 'Priority',
        type: 'select',
        options: ['must', 'should', 'could'],
      },
      { name: 'content', label: 'Rule', type: 'text', required: true },
    ],
  },
  output: {
    type: 'output',
    label: 'Output',
    description: 'Output specification',
    color: 'bg-indigo-500',
    icon: '📤',
    allowedParents: ['prompt'],
    allowedChildren: ['template', 'field'],
    defaultProperties: {},
    propertyFields: [
      {
        name: 'format',
        label: 'Format',
        type: 'select',
        options: ['markdown', 'json', 'xml', 'structured'],
      },
    ],
  },
  template: {
    type: 'template',
    label: 'Template',
    description: 'Output template',
    color: 'bg-indigo-400',
    icon: '📋',
    allowedParents: ['output'],
    allowedChildren: [],
    defaultProperties: {},
    propertyFields: [
      { name: 'content', label: 'Template', type: 'textarea', required: true },
    ],
  },
  field: {
    type: 'field',
    label: 'Field',
    description: 'Structured output field',
    color: 'bg-indigo-400',
    icon: '🏷️',
    allowedParents: ['output'],
    allowedChildren: [],
    defaultProperties: {},
    propertyFields: [
      { name: 'name', label: 'Field Name', type: 'text', required: true },
      {
        name: 'type',
        label: 'Field Type',
        type: 'select',
        options: ['string', 'number', 'boolean', 'array', 'object'],
      },
      { name: 'required', label: 'Required', type: 'boolean' },
    ],
  },
}
