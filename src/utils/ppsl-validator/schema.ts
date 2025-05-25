// PPSL Schema Definition

import type { AttributeDefinition, ElementDefinition } from './types'

// Attribute definitions reused across elements
const priorityAttribute: AttributeDefinition = {
  name: 'priority',
  type: 'enum',
  values: ['low', 'medium', 'high'],
  required: false,
}

const idAttribute: AttributeDefinition = {
  name: 'id',
  type: 'ID',
  required: false,
}

// Complete PPSL schema definition
export const PPSLSchema: Record<string, ElementDefinition> = {
  prompt: {
    name: 'prompt',
    parent: [],
    children: [
      'role',
      'context',
      'task',
      'task-group',
      'constraints',
      'rules',
      'examples',
      'output',
      'evaluation',
      'condition',
    ],
    attributes: [
      {
        name: 'version',
        type: 'string',
        required: true,
        values: ['1.0'],
      },
      {
        name: 'model',
        type: 'string',
        required: false,
      },
      {
        name: 'purpose',
        type: 'string',
        required: false,
      },
    ],
  },

  role: {
    name: 'role',
    parent: ['prompt'],
    textContent: true,
    attributes: [
      {
        name: 'expertise',
        type: 'enum',
        values: ['novice', 'intermediate', 'expert'],
        required: false,
      },
      {
        name: 'tone',
        type: 'string',
        required: false,
      },
      {
        name: 'specialization',
        type: 'string',
        required: false,
      },
    ],
  },

  context: {
    name: 'context',
    parent: ['prompt'],
    children: ['background', 'domain', 'constraints'],
    mixedContent: true,
    attributes: [priorityAttribute],
  },

  background: {
    name: 'background',
    parent: ['context'],
    textContent: true,
  },

  domain: {
    name: 'domain',
    parent: ['context'],
    textContent: true,
  },

  task: {
    name: 'task',
    parent: ['prompt', 'task-group', 'subtasks'],
    children: [
      'description',
      'objectives',
      'steps',
      'subtasks',
      'constraints',
      'rules',
      'examples',
      'output',
      'evaluation',
    ],
    attributes: [
      idAttribute,
      priorityAttribute,
      {
        name: 'type',
        type: 'string',
        required: false,
      },
      {
        name: 'complexity',
        type: 'enum',
        values: ['simple', 'medium', 'complex'],
        required: false,
      },
    ],
  },

  description: {
    name: 'description',
    parent: ['task'],
    textContent: true,
  },

  objectives: {
    name: 'objectives',
    parent: ['task'],
    children: ['objective'],
  },

  objective: {
    name: 'objective',
    parent: ['objectives'],
    textContent: true,
  },

  steps: {
    name: 'steps',
    parent: ['task'],
    children: ['step'],
    attributes: [
      {
        name: 'ordered',
        type: 'boolean',
        required: false,
      },
    ],
  },

  step: {
    name: 'step',
    parent: ['steps'],
    textContent: true,
    attributes: [
      {
        name: 'number',
        type: 'integer',
        required: false,
      },
    ],
  },

  subtasks: {
    name: 'subtasks',
    parent: ['task'],
    children: ['task'],
  },

  'task-group': {
    name: 'task-group',
    parent: ['prompt'],
    children: ['task'],
    attributes: [
      {
        name: 'name',
        type: 'string',
        required: false,
      },
    ],
  },

  constraints: {
    name: 'constraints',
    parent: ['prompt', 'task', 'context'],
    children: ['constraint'],
  },

  constraint: {
    name: 'constraint',
    parent: ['constraints'],
    textContent: true,
    attributes: [
      {
        name: 'type',
        type: 'string',
        required: false,
      },
    ],
  },

  rules: {
    name: 'rules',
    parent: ['prompt', 'task'],
    children: ['rule'],
  },

  rule: {
    name: 'rule',
    parent: ['rules'],
    textContent: true,
    attributes: [
      {
        name: 'priority',
        type: 'enum',
        values: ['must', 'should', 'may'],
        required: true,
      },
    ],
  },

  examples: {
    name: 'examples',
    parent: ['prompt', 'task'],
    children: ['example'],
  },

  example: {
    name: 'example',
    parent: ['examples'],
    children: ['input', 'output'],
    attributes: [
      {
        name: 'type',
        type: 'enum',
        values: ['positive', 'negative', 'neutral'],
        required: false,
      },
    ],
  },

  input: {
    name: 'input',
    parent: ['example'],
    textContent: true,
  },

  output: {
    name: 'output',
    parent: ['prompt', 'task', 'example'],
    children: ['field', 'template'],
    textContent: true,
    attributes: [
      {
        name: 'format',
        type: 'enum',
        values: ['text', 'json', 'xml', 'markdown', 'structured'],
        required: false,
      },
      {
        name: 'schema',
        type: 'enum',
        values: ['strict', 'flexible'],
        required: false,
      },
    ],
  },

  field: {
    name: 'field',
    parent: ['output', 'item'],
    children: ['item'],
    attributes: [
      {
        name: 'name',
        type: 'string',
        required: true,
      },
      {
        name: 'type',
        type: 'string',
        required: true,
      },
      {
        name: 'required',
        type: 'boolean',
        required: false,
      },
      {
        name: 'minLength',
        type: 'integer',
        required: false,
      },
      {
        name: 'maxLength',
        type: 'integer',
        required: false,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
      },
    ],
  },

  item: {
    name: 'item',
    parent: ['field'],
    children: ['field'],
    attributes: [
      {
        name: 'type',
        type: 'string',
        required: false,
      },
    ],
  },

  template: {
    name: 'template',
    parent: ['output'],
    textContent: true,
  },

  evaluation: {
    name: 'evaluation',
    parent: ['prompt', 'task'],
    children: ['criterion'],
  },

  criterion: {
    name: 'criterion',
    parent: ['evaluation'],
    textContent: true,
    attributes: [
      {
        name: 'type',
        type: 'string',
        required: false,
      },
    ],
  },

  condition: {
    name: 'condition',
    parent: ['prompt'],
    children: ['include', 'exclude'],
    attributes: [
      {
        name: 'if',
        type: 'string',
        required: true,
      },
      {
        name: 'equals',
        type: 'string',
        required: false,
      },
      {
        name: 'not-equals',
        type: 'string',
        required: false,
      },
    ],
  },

  include: {
    name: 'include',
    parent: ['condition'],
    textContent: true,
  },

  exclude: {
    name: 'exclude',
    parent: ['condition'],
    textContent: true,
  },
}

// Helper to get element definition
export function getElementDefinition(
  elementName: string,
): ElementDefinition | undefined {
  return PPSLSchema[elementName]
}

// Check if element can be child of parent
export function isValidChild(parentName: string, childName: string): boolean {
  const parentDef = PPSLSchema[parentName]
  if (!parentDef || !parentDef.children) return false
  return parentDef.children.includes(childName)
}

// Check if element can have text content
export function canHaveTextContent(elementName: string): boolean {
  const def = PPSLSchema[elementName]
  return def ? def.textContent === true || def.mixedContent === true : false
}
