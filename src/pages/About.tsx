import React from 'react';

export const About: React.FC = () => {
  const steps = [
    {
      number: '01',
      title: 'Clone the Repository',
      description: 'Start by cloning this template repository to your local machine',
      command: 'git clone https://github.com/yourusername/your-repo-name.git',
    },
    {
      number: '02',
      title: 'Install Dependencies',
      description: 'Navigate to the project directory and install all required packages',
      command: 'cd your-repo-name && pnpm install',
    },
    {
      number: '03',
      title: 'Start Development',
      description: 'Run the development server with hot module replacement',
      command: 'pnpm run dev',
    },
    {
      number: '04',
      title: 'Build for Production',
      description: 'Create an optimized production build for deployment',
      command: 'pnpm run build',
    },
  ];

  const techStack = [
    { name: 'React 19', description: 'UI library for building user interfaces' },
    { name: 'TypeScript 5', description: 'JavaScript with syntax for types' },
    { name: 'Vite 6', description: 'Next generation frontend tooling' },
    { name: 'Tailwind CSS 4', description: 'Utility-first CSS framework' },
    { name: 'React Router 7', description: 'Declarative routing for React' },
    { name: 'GitHub Actions', description: 'CI/CD automation platform' },
  ];

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl sm:text-6xl font-bold gradient-text mb-4">
            About This Template
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            A modern, production-ready React template designed to help you build
            amazing web applications faster
          </p>
        </div>

        {/* Introduction */}
        <div className="prose prose-lg dark:prose-invert max-w-none mb-20">
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-8 mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Why This Template?
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              This template provides a solid foundation for building modern React applications.
              It comes pre-configured with industry-standard tools and best practices, allowing
              you to focus on building features rather than setting up infrastructure.
            </p>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Zero configuration needed - just clone and start coding
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Optimized for performance with code splitting and lazy loading
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Beautiful, responsive UI with dark mode support
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Automated deployment pipeline to GitHub Pages
              </li>
            </ul>
          </div>
        </div>

        {/* Getting Started */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Getting Started
          </h2>
          <div className="space-y-8">
            {steps.map((step) => (
              <div key={step.number} className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {step.number}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-3">
                    {step.description}
                  </p>
                  <div className="bg-gray-900 dark:bg-gray-950 rounded-lg p-4 font-mono text-sm text-gray-300">
                    $ {step.command}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Tech Stack */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Tech Stack
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {techStack.map((tech) => (
              <div key={tech.name} className="card">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {tech.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {tech.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Configuration */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Configuration
          </h2>
          <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-8">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              GitHub Pages Deployment
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              This template is configured to automatically deploy to GitHub Pages when you push
              to the main branch. To enable deployment:
            </p>
            <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300">
              <li>Go to your repository settings on GitHub</li>
              <li>Navigate to Pages section</li>
              <li>Select "GitHub Actions" as the source</li>
              <li>Push to the main branch to trigger deployment</li>
            </ol>
            <div className="mt-6 p-4 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                <strong>Note:</strong> Update the base path in vite.config.ts to match your repository name
              </p>
            </div>
          </div>
        </section>

        {/* Support */}
        <section className="text-center">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Need Help?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            Check out the documentation or open an issue on GitHub
          </p>
          <div className="flex gap-4 justify-center">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              View Documentation
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              Report an Issue
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}; 