import type React from 'react'
import { Link } from 'react-router-dom'

export const Home: React.FC = () => {
  const features = [
    {
      icon: '📝',
      title: 'Structured Prompts',
      description:
        'Create well-organized AI prompts using XML-based markup language',
    },
    {
      icon: '🔧',
      title: 'Interactive Editor',
      description: 'Build and validate PSML documents with real-time feedback',
    },
    {
      icon: '📚',
      title: 'Complete Specification',
      description:
        'Comprehensive documentation with examples and best practices',
    },
    {
      icon: '✅',
      title: 'Validation',
      description:
        'Real-time validation ensures your PSML documents are correct',
    },
    {
      icon: '🎯',
      title: 'Reusable',
      description: 'Create templates and reusable prompt components',
    },
    {
      icon: '🚀',
      title: 'Standardized',
      description: 'Industry-standard approach to prompt engineering',
    },
  ]

  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-4 sm:px-6 lg:px-8">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-gray-900" />

        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 dark:bg-purple-700 rounded-full mix-blend-multiply dark:mix-blend-color-dodge filter blur-xl opacity-70 animate-float" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 dark:bg-blue-700 rounded-full mix-blend-multiply dark:mix-blend-color-dodge filter blur-xl opacity-70 animate-float animation-delay-200" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-300 dark:bg-pink-700 rounded-full mix-blend-multiply dark:mix-blend-color-dodge filter blur-xl opacity-70 animate-float animation-delay-300" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold mb-8">
            <span className="gradient-text">PSML</span>
            <br />
            <span className="text-gray-900 dark:text-white">Editor</span>
          </h1>

          <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
            Prompt Specification Markup Language - A standardized XML-based
            approach to creating, organizing, and managing AI prompts with
            clarity and precision.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/editor" className="btn-primary">
              Start Creating
            </Link>
            <Link to="/spec" className="btn-secondary">
              View Specification
            </Link>
          </div>

          {/* PSML features badges */}
          <div className="mt-16 flex flex-wrap gap-4 justify-center">
            {[
              'XML-Based',
              'Structured',
              'Reusable',
              'Validated',
              'Standardized',
            ].map((feature) => (
              <span
                key={feature}
                className="px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full text-sm font-medium text-gray-700 dark:text-gray-300 shadow-lg"
              >
                {feature}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose PSML?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Standardize your prompt engineering workflow
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="card transform hover:scale-105 transition-transform duration-300"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-500 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Ready to Create Better Prompts?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Start using PSML to structure and standardize your AI prompts
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/editor"
              className="inline-flex px-8 py-4 bg-white text-purple-600 font-semibold rounded-lg shadow-lg hover:shadow-xl transform transition-all duration-200 hover:scale-105"
            >
              Try the Editor
            </Link>
            <Link
              to="/spec"
              className="inline-flex px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-purple-600 transform transition-all duration-200 hover:scale-105"
            >
              Read the Spec
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
