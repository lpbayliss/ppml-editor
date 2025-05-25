# PSML Language Specification v1.0

## 1. Introduction

### 1.1 Purpose
The Prompt Specification Markup Language (PSML) is an XML-based markup language designed to standardize the creation, storage, and processing of AI prompts. PSML provides a structured, semantic approach to prompt engineering that enhances clarity, reusability, and maintainability.

### 1.2 Scope
This specification defines the syntax, semantics, and processing model for PSML documents. It is intended for:
- Prompt engineers and AI developers
- Tool developers creating PSML processors
- Organizations standardizing their prompt engineering practices

### 1.3 Conformance
A conforming PSML document must be well-formed XML and validate against the PSML schema defined in this specification. Processors must handle all required elements.

### 1.4 Terminology
- **MUST**: Absolute requirement
- **SHOULD**: Recommended but not required
- **MAY**: Optional feature
- **Element**: XML tag (e.g., `<task>`)
- **Attribute**: Property of an element (e.g., `priority="high"`)

## 2. Document Structure

### 2.1 XML Declaration
All PSML documents MUST begin with an XML declaration:
```xml
<?xml version="1.0" encoding="UTF-8"?>
```

### 2.2 Root Element
The root element MUST be `<prompt>`:
```xml
<prompt version="1.0">
  <!-- Content -->
</prompt>
```

Required attributes:
- `version`: PSML version (currently "1.0")

Optional attributes:
- `model`: Target AI model identifier
- `purpose`: Document purpose identifier

### 2.3 Document Structure Rules
- Elements MUST be properly nested
- All opened tags MUST be closed
- Attribute values MUST be quoted
- Element names are case-sensitive

## 3. Core Elements

### 3.1 Context Definition Elements

#### 3.1.1 `<role>`
Defines the AI's role or persona.

**Parent**: `<prompt>`  
**Children**: Text content  
**Attributes**:
- `expertise`: Expertise level (novice|intermediate|expert)
- `tone`: Communication tone
- `specialization`: Domain specialization

**Required**: SHOULD be included

```xml
<role expertise="expert" tone="professional">
  Senior software architect with 15 years of experience
</role>
```

#### 3.1.2 `<context>`
Provides background information.

**Parent**: `<prompt>`  
**Children**: Mixed content  
**Attributes**:
- `priority`: Context importance (low|medium|high)

```xml
<context priority="high">
  <background>The user is developing a React application</background>
  <domain>Web Development</domain>
  <constraints>Must be compatible with React 18</constraints>
</context>
```

### 3.2 Task Definition Elements

#### 3.2.1 `<task>`
Defines a specific task or objective.

**Parent**: `<prompt>`, `<task-group>`, `<subtasks>`  
**Children**: Various task-related elements  
**Attributes**:
- `id`: Unique identifier
- `priority`: Task priority (low|medium|high)
- `type`: Task category
- `complexity`: Task complexity (simple|medium|complex)

```xml
<task id="main-task" priority="high" complexity="medium">
  <description>Analyze the provided code for performance issues</description>
  <objectives>
    <objective>Identify performance bottlenecks</objective>
    <objective>Suggest optimization strategies</objective>
  </objectives>
</task>
```

#### 3.2.2 `<steps>`
Ordered sequence of steps.

**Parent**: `<task>`  
**Children**: `<step>`  
**Attributes**:
- `ordered`: Whether order matters (true|false)

```xml
<steps ordered="true">
  <step number="1">Analyze current implementation</step>
  <step number="2">Identify inefficiencies</step>
  <step number="3">Propose solutions</step>
</steps>
```

#### 3.2.3 `<task-group>`
Container for related tasks.

**Parent**: `<prompt>`  
**Children**: `<task>`  
**Attributes**:
- `name`: Group identifier

```xml
<task-group name="analysis-tasks">
  <task id="task-1">First task</task>
  <task id="task-2">Second task</task>
</task-group>
```

### 3.3 Constraint Elements

#### 3.3.1 `<constraints>`
Container for constraints.

**Parent**: `<prompt>`, `<task>`  
**Children**: `<constraint>`  
**Attributes**: None

```xml
<constraints>
  <constraint type="length">500 words maximum</constraint>
  <constraint type="format">Use bullet points</constraint>
  <constraint type="scope">Focus only on React components</constraint>
</constraints>
```

#### 3.3.2 `<rules>`
Behavioral rules container.

**Parent**: `<prompt>`, `<task>`  
**Children**: `<rule>`  
**Attributes**: None

```xml
<rules>
  <rule priority="must">Never use deprecated APIs</rule>
  <rule priority="should">Prefer functional components</rule>
  <rule priority="may">Include TypeScript examples</rule>
</rules>
```

Rule priorities:
- `must`: Mandatory requirement
- `should`: Strong recommendation
- `may`: Optional suggestion

### 3.4 Example Elements

#### 3.4.1 `<examples>`
Container for examples.

**Parent**: `<prompt>`, `<task>`  
**Children**: `<example>`  
**Attributes**: None

```xml
<examples>
  <example type="positive">
    <input>const memoized = useMemo(() => expensive(), [dep])</input>
    <output>Good: Memoizes expensive computation</output>
  </example>
  <example type="negative">
    <input>const value = useMemo(() => "constant", [])</input>
    <output>Bad: Unnecessary memoization of constant</output>
  </example>
</examples>
```

### 3.5 Output Specification Elements

#### 3.5.1 `<output>`
Defines expected output format.

**Parent**: `<prompt>`, `<task>`  
**Children**: Format-specific elements  
**Attributes**:
- `format`: Output format (text|json|xml|markdown|structured)
- `schema`: Schema strictness (strict|flexible)

```xml
<output format="json" schema="strict">
  <field name="analysis" type="string" required="true"/>
  <field name="recommendations" type="array" required="true">
    <item type="object">
      <field name="issue" type="string"/>
      <field name="solution" type="string"/>
    </item>
  </field>
</output>
```

#### 3.5.2 `<template>`
Provides output template structure.

**Parent**: `<output>`  
**Children**: Text content with placeholders  
**Attributes**: None

```xml
<template>
## Analysis Summary
{analysis_overview}

## Recommendations
{recommendations_list}

## Implementation Steps
{implementation_guide}
</template>
```

### 3.6 Evaluation Elements

#### 3.6.1 `<evaluation>`
Defines success criteria.

**Parent**: `<prompt>`, `<task>`  
**Children**: `<criterion>`  
**Attributes**: None

```xml
<evaluation>
  <criterion type="completeness">All requested analyses provided</criterion>
  <criterion type="accuracy">Solutions are technically correct</criterion>
  <criterion type="relevance">Recommendations address the problem</criterion>
</evaluation>
```

## 4. Data Types

### 4.1 Primitive Types
- `string`: Character data
- `integer`: Whole numbers
- `number`: Decimal numbers
- `boolean`: true|false
- `enum`: Enumerated values
- `array`: Ordered collection
- `object`: Key-value pairs

### 4.2 Field Attributes
```xml
<field name="fieldName" 
       type="string" 
       required="true"
       minLength="1"
       maxLength="100"
       description="Field description"/>
```

Common attributes:
- `name`: Field identifier
- `type`: Data type
- `required`: Whether field is mandatory
- `description`: Human-readable description

## 5. Conditional Logic

### 5.1 Condition Elements
```xml
<condition if="user_level" equals="beginner">
  <include>Provide detailed explanations for each concept</include>
</condition>
```

Attributes:
- `if`: Condition variable
- `equals`: Expected value
- `not-equals`: Negation check

### 5.2 Conditional Content
Conditions can contain:
- `<include>`: Content to include if true
- `<exclude>`: Content to exclude if true

## 6. Processing Model

### 6.1 Processing Phases
1. **Parse Phase**: XML parsing and validation
2. **Structure Analysis**: Build document tree
3. **Condition Evaluation**: Process conditional elements
4. **Output Generation**: Generate final prompt

### 6.2 Error Handling
Processors MUST:
- Report XML syntax errors
- Validate required elements
- Check attribute values
- Provide meaningful error messages

## 7. Validation

### 7.1 Schema Validation
PSML documents MUST:
- Be well-formed XML
- Include required `<prompt>` root with version
- Use only defined elements and attributes

### 7.2 Semantic Validation
Documents SHOULD be checked for:
- Unique IDs within scope
- Valid attribute values
- Logical structure consistency

## 8. Security Considerations

### 8.1 Content Security
- Processors MUST sanitize user input
- Prevent XML injection attacks
- Limit document size and complexity

### 8.2 Processing Limits
- Maximum document size: Implementation-defined
- Maximum nesting depth: 10 levels recommended
- Timeout protection for processing

## 9. Best Practices

### 9.1 Document Organization
- Use clear, descriptive IDs
- Group related elements
- Maintain logical flow

### 9.2 Element Usage
- Include `<role>` for context
- Define clear `<task>` objectives
- Provide relevant `<examples>`
- Specify `<output>` format

### 9.3 Maintainability
- Use consistent naming conventions
- Document complex logic
- Keep nesting reasonable

## Appendix A: Complete Element Reference

### A.1 Element Hierarchy
```
prompt
├── role
├── context
│   ├── background
│   ├── domain
│   └── constraints
├── task
│   ├── description
│   ├── objectives
│   │   └── objective
│   ├── steps
│   │   └── step
│   └── subtasks
│       └── task
├── task-group
│   └── task
├── constraints
│   └── constraint
├── rules
│   └── rule
├── examples
│   └── example
│       ├── input
│       └── output
├── output
│   ├── field
│   │   └── item
│   └── template
├── evaluation
│   └── criterion
└── condition
    ├── include
    └── exclude
```

### A.2 Attribute Reference

| Element | Attribute | Type | Required | Values |
|---------|-----------|------|----------|---------|
| prompt | version | string | Yes | "1.0" |
| prompt | model | string | No | Model identifier |
| prompt | purpose | string | No | Purpose identifier |
| role | expertise | enum | No | novice\|intermediate\|expert |
| role | tone | string | No | Tone descriptor |
| role | specialization | string | No | Domain specialization |
| context | priority | enum | No | low\|medium\|high |
| task | id | ID | No | Unique identifier |
| task | priority | enum | No | low\|medium\|high |
| task | type | string | No | Task category |
| task | complexity | enum | No | simple\|medium\|complex |
| steps | ordered | boolean | No | true\|false |
| step | number | integer | No | Step number |
| constraint | type | string | No | Constraint category |
| rule | priority | enum | Yes | must\|should\|may |
| example | type | enum | No | positive\|negative\|neutral |
| output | format | enum | No | text\|json\|xml\|markdown\|structured |
| output | schema | enum | No | strict\|flexible |
| field | name | string | Yes | Field identifier |
| field | type | string | Yes | Data type |
| field | required | boolean | No | true\|false |
| criterion | type | string | No | Criterion category |
| condition | if | string | Yes | Condition identifier |
| condition | equals | string | No | Expected value |

## Appendix B: Example Documents

### B.1 Minimal Document
```xml
<?xml version="1.0" encoding="UTF-8"?>
<prompt version="1.0">
  <task>
    <description>Summarize the provided text</description>
  </task>
</prompt>
```

### B.2 Standard Document
```xml
<?xml version="1.0" encoding="UTF-8"?>
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
</prompt>
```

## Appendix C: Change Log

### Version 1.0 (2024-11-15)
- Initial specification release
- Core element set defined
- Basic processing model established
- Simplified schema without metadata, variables, or modular composition

---

This specification is maintained by the PSML Standards Committee.
For updates and errata, visit: https://lpbayliss.github.io/psml/spec