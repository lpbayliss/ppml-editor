import type React from 'react'
import type { BlockType } from '../types/blocks'

interface Template {
  id: string
  name: string
  description: string
  icon: string
  blocks: Array<{
    type: BlockType
    properties: Record<string, any>
    children?: Array<{
      type: BlockType
      properties: Record<string, any>
    }>
  }>
}

interface TemplateSelectorProps {
  onSelectTemplate: (template: Template) => void
  onClose: () => void
}

const TEMPLATES: Template[] = [
  {
    id: 'simple-task',
    name: 'Simple Task',
    description: 'A basic prompt for simple tasks',
    icon: '✅',
    blocks: [
      {
        type: 'role',
        properties: {
          content: 'You are a helpful AI assistant.',
        },
      },
      {
        type: 'task',
        properties: {},
        children: [
          {
            type: 'description',
            properties: {
              content: 'Help the user with their request',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'code-review',
    name: 'Code Review',
    description: 'Template for reviewing code',
    icon: '👨‍💻',
    blocks: [
      {
        type: 'role',
        properties: {
          expertise: 'expert',
          tone: 'professional',
          content:
            'You are a senior software engineer specializing in code review.',
        },
      },
      {
        type: 'context',
        properties: { priority: 'high' },
        children: [
          {
            type: 'background',
            properties: {
              content: 'User needs help reviewing code for best practices',
            },
          },
          {
            type: 'domain',
            properties: {
              content: 'Software Development',
            },
          },
        ],
      },
      {
        type: 'task',
        properties: { id: 'code-review', priority: 'high' },
        children: [
          {
            type: 'description',
            properties: {
              content:
                'Review the provided code for best practices and potential issues',
            },
          },
          {
            type: 'objectives',
            properties: {},
          },
        ],
      },
      {
        type: 'constraints',
        properties: {},
        children: [
          {
            type: 'constraint',
            properties: {
              type: 'focus',
              content: 'Focus on maintainability and performance',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'creative-writing',
    name: 'Creative Writing',
    description: 'Template for creative writing tasks',
    icon: '✍️',
    blocks: [
      {
        type: 'role',
        properties: {
          expertise: 'expert',
          tone: 'creative',
          content:
            'You are a creative writing assistant with expertise in storytelling.',
        },
      },
      {
        type: 'task',
        properties: { id: 'creative-writing' },
        children: [
          {
            type: 'description',
            properties: {
              content: 'Help create engaging and creative written content',
            },
          },
          {
            type: 'objectives',
            properties: {},
          },
        ],
      },
      {
        type: 'rules',
        properties: {},
        children: [
          {
            type: 'rule',
            properties: {
              priority: 'must',
              content: 'Be creative and engaging',
            },
          },
          {
            type: 'rule',
            properties: {
              priority: 'should',
              content: 'Use vivid descriptions and compelling narratives',
            },
          },
        ],
      },
    ],
  },
]

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  onSelectTemplate,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[80vh] flex flex-col">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
              Choose a Template
            </h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Start with a pre-built template or create your own from scratch
          </p>
        </div>

        <div className="p-6 overflow-y-auto flex-1">
          <div className="grid gap-4">
            {/* Start from scratch option */}
            <button
              onClick={onClose}
              className="p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-blue-500 dark:hover:border-blue-400 transition-colors text-left"
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl">🎯</span>
                <div>
                  <h3 className="font-medium text-gray-800 dark:text-gray-200">
                    Start from Scratch
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Build your prompt from the ground up
                  </p>
                </div>
              </div>
            </button>

            {/* Template options */}
            {TEMPLATES.map((template) => (
              <button
                key={template.id}
                onClick={() => onSelectTemplate(template)}
                className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-500 dark:hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors text-left"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{template.icon}</span>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800 dark:text-gray-200">
                      {template.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {template.description}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
