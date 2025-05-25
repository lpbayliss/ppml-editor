import type React from 'react'

export const Spec: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
              PSML Language Specification v1.0
            </h1>

            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                  1. Introduction
                </h2>

                <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-3">
                  1.1 Purpose
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  The Prompt Specification Markup Language (PSML) is an
                  XML-based markup language designed to standardize the
                  creation, storage, and processing of AI prompts. PSML provides
                  a structured, semantic approach to prompt engineering that
                  enhances clarity, reusability, and maintainability.
                </p>

                <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-3">
                  1.2 Scope
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  This specification defines the syntax, semantics, and
                  processing model for PSML documents. It is intended for:
                </p>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 mb-4 ml-4">
                  <li>Prompt engineers and AI developers</li>
                  <li>Tool developers creating PSML processors</li>
                  <li>
                    Organizations standardizing their prompt engineering
                    practices
                  </li>
                </ul>

                <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-3">
                  1.3 Conformance
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  A conforming PSML document must be well-formed XML and
                  validate against the PSML schema defined in this
                  specification. Processors must handle all required elements.
                </p>

                <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-3">
                  1.4 Terminology
                </h3>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 mb-6 ml-4">
                  <li>
                    <strong>MUST</strong>: Absolute requirement
                  </li>
                  <li>
                    <strong>SHOULD</strong>: Recommended but not required
                  </li>
                  <li>
                    <strong>MAY</strong>: Optional feature
                  </li>
                  <li>
                    <strong>Element</strong>: XML tag (e.g.,{' '}
                    <code>&lt;task&gt;</code>)
                  </li>
                  <li>
                    <strong>Attribute</strong>: Property of an element (e.g.,{' '}
                    <code>priority="high"</code>)
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                  2. Document Structure
                </h2>

                <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-3">
                  2.1 XML Declaration
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  All PSML documents MUST begin with an XML declaration:
                </p>
                <pre className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg overflow-x-auto mb-4">
                  <code className="text-sm text-gray-800 dark:text-gray-200">
                    {`<?xml version="1.0" encoding="UTF-8"?>`}
                  </code>
                </pre>

                <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-3">
                  2.2 Root Element
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  The root element MUST be <code>&lt;prompt&gt;</code>:
                </p>
                <pre className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg overflow-x-auto mb-4">
                  <code className="text-sm text-gray-800 dark:text-gray-200">
                    {`<prompt version="1.0">
  <!-- Content -->
</prompt>`}
                  </code>
                </pre>

                <p className="text-gray-600 dark:text-gray-400 mb-2">
                  Required attributes:
                </p>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 mb-4 ml-4">
                  <li>
                    <code>version</code>: PSML version (currently "1.0")
                  </li>
                </ul>

                <p className="text-gray-600 dark:text-gray-400 mb-2">
                  Optional attributes:
                </p>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 mb-6 ml-4">
                  <li>
                    <code>model</code>: Target AI model identifier
                  </li>
                  <li>
                    <code>purpose</code>: Document purpose identifier
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                  3. Core Elements
                </h2>

                <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-3">
                  3.1 Context Definition Elements
                </h3>

                <h4 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                  3.1.1 <code>&lt;role&gt;</code>
                </h4>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Defines the AI's role or persona.
                </p>

                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    <strong>Parent:</strong> <code>&lt;prompt&gt;</code>
                    <br />
                    <strong>Children:</strong> Text content
                    <br />
                    <strong>Required:</strong> SHOULD be included
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    <strong>Attributes:</strong>
                  </p>
                  <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 ml-4">
                    <li>
                      <code>expertise</code>: Expertise level
                      (novice|intermediate|expert)
                    </li>
                    <li>
                      <code>tone</code>: Communication tone
                    </li>
                    <li>
                      <code>specialization</code>: Domain specialization
                    </li>
                  </ul>
                </div>

                <pre className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg overflow-x-auto mb-6">
                  <code className="text-sm text-gray-800 dark:text-gray-200">
                    {`<role expertise="expert" tone="professional">
  Senior software architect with 15 years of experience
</role>`}
                  </code>
                </pre>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                  Example Documents
                </h2>

                <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Minimal Document
                </h3>
                <pre className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg overflow-x-auto mb-4">
                  <code className="text-sm text-gray-800 dark:text-gray-200">
                    {`<?xml version="1.0" encoding="UTF-8"?>
<prompt version="1.0">
  <task>
    <description>Summarize the provided text</description>
  </task>
</prompt>`}
                  </code>
                </pre>

                <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Standard Document
                </h3>
                <pre className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg overflow-x-auto mb-6">
                  <code className="text-sm text-gray-800 dark:text-gray-200">
                    {`<?xml version="1.0" encoding="UTF-8"?>
<prompt version="1.0" model="gpt-4">
  <role expertise="expert" tone="helpful">
    You are a helpful AI assistant specializing in code review.
  </role>
  
  <context priority="high">
    <background>User needs help reviewing Python code</background>
    <domain>Software Development</domain>
  </context>
  
  <task id="code-review" priority="high">
    <description>Review the provided Python code for best practices</description>
    <steps ordered="true">
      <step number="1">Check code style and formatting</step>
      <step number="2">Identify potential bugs</step>
      <step number="3">Suggest improvements</step>
    </steps>
  </task>
  
  <constraints>
    <constraint type="focus">Python 3.8+ compatibility</constraint>
    <constraint type="depth">Provide actionable feedback</constraint>
  </constraints>
  
  <rules>
    <rule priority="must">Follow PEP 8 guidelines</rule>
    <rule priority="should">Suggest type hints where appropriate</rule>
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
</prompt>`}
                  </code>
                </pre>
              </section>

              <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  This specification is maintained by the PSML Standards
                  Committee.
                  <br />
                  For updates and errata, visit:{' '}
                  <a
                    href="https://lpbayliss.github.io/psml/spec"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    https://lpbayliss.github.io/psml/spec
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
