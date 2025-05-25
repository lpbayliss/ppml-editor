import type React from 'react'

export const Features: React.FC = () => {
  const features = [
    {
      title: 'Modern React with Hooks',
      description:
        'Built with the latest React features including hooks, suspense, and error boundaries.',
      code: `const MyComponent: React.FC = () => {
  const [count, setCount] = useState(0);
  
  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
};`,
    },
    {
      title: 'TypeScript Support',
      description:
        'Full TypeScript support with strict mode enabled for better type safety and IDE experience.',
      code: `interface User {
  id: number;
  name: string;
  email: string;
}

const getUser = async (id: number): Promise<User> => {
  const response = await fetch(\`/api/users/\${id}\`);
  return response.json();
};`,
    },
    {
      title: 'Tailwind CSS',
      description:
        'Utility-first CSS framework for rapid UI development with automatic dark mode support.',
      code: `<div className="bg-white dark:bg-gray-800 rounded-lg 
  shadow-xl p-6 hover:shadow-2xl transition-all">
  <h3 className="text-2xl font-bold gradient-text">
    Beautiful UI
  </h3>
</div>`,
    },
    {
      title: 'Vite Build System',
      description:
        'Lightning-fast HMR and optimized production builds with code splitting and tree shaking.',
      code: `// vite.config.ts
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
        }
      }
    }
  }
});`,
    },
    {
      title: 'GitHub Actions CI/CD',
      description:
        'Automated deployment to GitHub Pages on every push to the main branch.',
      code: `name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: pnpm install
      - run: pnpm run build`,
    },
    {
      title: 'Client-Side Routing',
      description:
        'React Router configured for GitHub Pages with proper base path handling.',
      code: `<BrowserRouter basename={import.meta.env.BASE_URL}>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/features" element={<Features />} />
    <Route path="/about" element={<About />} />
  </Routes>
</BrowserRouter>`,
    },
  ]

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl sm:text-6xl font-bold gradient-text mb-4">
            Features
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Everything you need to build modern, production-ready React
            applications
          </p>
        </div>

        <div className="space-y-20">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`flex flex-col lg:flex-row gap-8 items-center ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  {feature.title}
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                  {feature.description}
                </p>
                <div className="inline-flex items-center space-x-2 text-blue-600 dark:text-blue-400">
                  <span>Learn more</span>
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
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>

              <div className="flex-1 w-full">
                <div className="bg-gray-900 dark:bg-gray-950 rounded-lg overflow-hidden shadow-2xl">
                  <div className="flex items-center gap-2 px-4 py-3 bg-gray-800 dark:bg-gray-900 border-b border-gray-700">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <pre className="p-4 overflow-x-auto">
                    <code className="text-sm text-gray-300">
                      {feature.code}
                    </code>
                  </pre>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Features Grid */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            And Much More...
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              'Hot Module Replacement',
              'Code Splitting',
              'Tree Shaking',
              'CSS Modules Support',
              'Environment Variables',
              'ESLint Configuration',
              'Prettier Formatting',
              'Path Aliases',
              'SEO Optimization',
            ].map((item) => (
              <div
                key={item}
                className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 text-center hover:shadow-lg transition-shadow"
              >
                <span className="text-gray-900 dark:text-gray-100 font-medium">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
