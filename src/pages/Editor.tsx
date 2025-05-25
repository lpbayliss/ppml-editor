import type React from 'react'
import { useCallback, useState } from 'react'

export const Editor: React.FC = () => {
  const [psmlContent, setPsmlContent] =
    useState(`<?xml version="1.0" encoding="UTF-8"?>
<prompt version="1.0" model="gpt-4">
  <role expertise="expert" tone="helpful">
    You are a helpful AI assistant.
  </role>
  
  <context priority="high">
    <background>User needs assistance with a task</background>
    <domain>General</domain>
  </context>
  
  <task id="main-task" priority="high">
    <description>Help the user with their request</description>
    <objectives>
      <objective>Understand the user's needs</objective>
      <objective>Provide accurate information</objective>
      <objective>Offer helpful suggestions</objective>
    </objectives>
  </task>
  
  <constraints>
    <constraint type="tone">Be professional and friendly</constraint>
    <constraint type="length">Provide comprehensive but concise responses</constraint>
  </constraints>
  
  <rules>
    <rule priority="must">Always be truthful and accurate</rule>
    <rule priority="should">Provide examples when helpful</rule>
  </rules>
  
  <output format="markdown">
    <template>
## Response

{response_content}

## Additional Resources

{additional_resources}
    </template>
  </output>
</prompt>`)

  const [validationErrors, setValidationErrors] = useState<string[]>([])
  const [isValid, setIsValid] = useState(true)

  const validatePSML = useCallback((content: string) => {
    const errors: string[] = []

    // Basic XML structure validation
    if (!content.trim().startsWith('<?xml')) {
      errors.push('Document must start with XML declaration')
    }

    if (!content.includes('<prompt')) {
      errors.push('Document must contain a <prompt> root element')
    }

    if (!content.includes('version="1.0"')) {
      errors.push('Prompt element must have version="1.0" attribute')
    }

    // Check for balanced tags (basic check)
    const openTags = content.match(/<[^/][^>]*>/g) || []
    const closeTags = content.match(/<\/[^>]*>/g) || []

    if (openTags.length !== closeTags.length) {
      errors.push('Unbalanced XML tags detected')
    }

    // Check for required closing prompt tag
    if (!content.includes('</prompt>')) {
      errors.push('Missing closing </prompt> tag')
    }

    setValidationErrors(errors)
    setIsValid(errors.length === 0)
  }, [])

  const handleContentChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newContent = e.target.value
      setPsmlContent(newContent)
      validatePSML(newContent)
    },
    [validatePSML],
  )

  const insertTemplate = useCallback(
    (template: string) => {
      setPsmlContent(template)
      validatePSML(template)
    },
    [validatePSML],
  )

  const downloadPSML = useCallback(() => {
    const blob = new Blob([psmlContent], { type: 'application/xml' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'prompt.psml'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }, [psmlContent])

  const copyToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(psmlContent)
      // You could add a toast notification here
    } catch (err) {
      console.error('Failed to copy to clipboard:', err)
    }
  }, [psmlContent])

  const templates = {
    minimal: `<?xml version="1.0" encoding="UTF-8"?>
<prompt version="1.0">
  <task>
    <description>Summarize the provided text</description>
  </task>
</prompt>`,

    codeReview: `<?xml version="1.0" encoding="UTF-8"?>
<prompt version="1.0" model="gpt-4">
  <role expertise="expert" tone="professional">
    You are a senior software engineer specializing in code review.
  </role>
  
  <context priority="high">
    <background>User needs help reviewing code for best practices</background>
    <domain>Software Development</domain>
  </context>
  
  <task id="code-review" priority="high">
    <description>Review the provided code for best practices and potential issues</description>
    <steps ordered="true">
      <step number="1">Analyze code structure and style</step>
      <step number="2">Identify potential bugs or issues</step>
      <step number="3">Suggest improvements and optimizations</step>
    </steps>
  </task>
  
  <constraints>
    <constraint type="focus">Focus on maintainability and performance</constraint>
    <constraint type="depth">Provide actionable feedback</constraint>
  </constraints>
  
  <rules>
    <rule priority="must">Follow language-specific best practices</rule>
    <rule priority="should">Suggest modern alternatives when applicable</rule>
  </rules>
  
  <output format="markdown">
    <template>
## Code Review Summary
{summary}

## Issues Found
{issues}

## Recommendations
{recommendations}
    </template>
  </output>
</prompt>`,

    dataAnalysis: `<?xml version="1.0" encoding="UTF-8"?>
<prompt version="1.0" model="gpt-4">
  <role expertise="expert" tone="analytical">
    You are a data scientist with expertise in statistical analysis.
  </role>
  
  <context priority="high">
    <background>User needs help analyzing a dataset</background>
    <domain>Data Science</domain>
  </context>
  
  <task id="data-analysis" priority="high">
    <description>Analyze the provided dataset and extract insights</description>
    <objectives>
      <objective>Identify patterns and trends</objective>
      <objective>Perform statistical analysis</objective>
      <objective>Provide actionable insights</objective>
    </objectives>
  </task>
  
  <constraints>
    <constraint type="methodology">Use appropriate statistical methods</constraint>
    <constraint type="visualization">Suggest relevant charts and graphs</constraint>
  </constraints>
  
  <output format="structured">
    <field name="summary" type="string" required="true"/>
    <field name="key_findings" type="array" required="true">
      <item type="string"/>
    </field>
    <field name="recommendations" type="array" required="true">
      <item type="object">
        <field name="insight" type="string"/>
        <field name="action" type="string"/>
      </item>
    </field>
  </output>
</prompt>`,
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            PSML Editor
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Create and edit PSML (Prompt Specification Markup Language)
            documents with real-time validation.
          </p>
        </div>

        {/* Template Selection */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
            Quick Start Templates
          </h2>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => insertTemplate(templates.minimal)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Minimal Template
            </button>
            <button
              type="button"
              onClick={() => insertTemplate(templates.codeReview)}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Code Review Template
            </button>
            <button
              type="button"
              onClick={() => insertTemplate(templates.dataAnalysis)}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Data Analysis Template
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Editor Panel */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                  PSML Editor
                </h2>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={copyToClipboard}
                    className="px-3 py-1 text-sm bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
                  >
                    Copy
                  </button>
                  <button
                    type="button"
                    onClick={downloadPSML}
                    className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                  >
                    Download
                  </button>
                </div>
              </div>
            </div>
            <div className="p-4">
              <textarea
                value={psmlContent}
                onChange={handleContentChange}
                className="w-full h-96 font-mono text-sm bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg p-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Enter your PSML content here..."
                spellCheck={false}
              />
            </div>
          </div>

          {/* Preview and Validation Panel */}
          <div className="space-y-6">
            {/* Validation Status */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
                Validation Status
              </h2>
              <div
                className={`flex items-center gap-2 mb-3 ${isValid ? 'text-green-600' : 'text-red-600'}`}
              >
                <div
                  className={`w-3 h-3 rounded-full ${isValid ? 'bg-green-500' : 'bg-red-500'}`}
                />
                <span className="font-medium">
                  {isValid ? 'Valid PSML Document' : 'Validation Errors Found'}
                </span>
              </div>

              {validationErrors.length > 0 && (
                <div className="space-y-2">
                  <h3 className="font-medium text-gray-700 dark:text-gray-300">
                    Errors:
                  </h3>
                  <ul className="space-y-1">
                    {validationErrors.map((error) => (
                      <li
                        key={error}
                        className="text-sm text-red-600 dark:text-red-400 flex items-start gap-2"
                      >
                        <span className="text-red-500 mt-1">•</span>
                        <span>{error}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Preview */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                  XML Preview
                </h2>
              </div>
              <div className="p-4">
                <pre className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg overflow-auto h-80 text-sm">
                  <code className="text-gray-800 dark:text-gray-200">
                    {psmlContent}
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Quick Reference
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-2">
                Core Elements
              </h3>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>
                  <code>&lt;prompt&gt;</code> - Root element
                </li>
                <li>
                  <code>&lt;role&gt;</code> - AI role definition
                </li>
                <li>
                  <code>&lt;context&gt;</code> - Background information
                </li>
                <li>
                  <code>&lt;task&gt;</code> - Task definition
                </li>
                <li>
                  <code>&lt;constraints&gt;</code> - Limitations
                </li>
                <li>
                  <code>&lt;rules&gt;</code> - Behavioral rules
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-2">
                Task Elements
              </h3>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>
                  <code>&lt;description&gt;</code> - Task description
                </li>
                <li>
                  <code>&lt;objectives&gt;</code> - Task objectives
                </li>
                <li>
                  <code>&lt;steps&gt;</code> - Ordered steps
                </li>
                <li>
                  <code>&lt;examples&gt;</code> - Usage examples
                </li>
                <li>
                  <code>&lt;evaluation&gt;</code> - Success criteria
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-2">
                Output Elements
              </h3>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>
                  <code>&lt;output&gt;</code> - Output specification
                </li>
                <li>
                  <code>&lt;template&gt;</code> - Output template
                </li>
                <li>
                  <code>&lt;field&gt;</code> - Structured field
                </li>
                <li>
                  <code>format</code> - Output format attribute
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
