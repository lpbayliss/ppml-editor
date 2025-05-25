import { ThemeProvider } from '@/contexts/ThemeContext'
import { Layout } from '@/layouts/Layout'
import type React from 'react'
import { Suspense, lazy } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

// Lazy load pages for code splitting
const Home = lazy(() =>
  import('@/pages/Home').then((module) => ({ default: module.Home })),
)
const Spec = lazy(() =>
  import('@/pages/Spec').then((module) => ({ default: module.Spec })),
)
const Editor = lazy(() =>
  import('@/pages/Editor').then((module) => ({ default: module.Editor })),
)
const NotFound = lazy(() =>
  import('@/pages/NotFound').then((module) => ({ default: module.NotFound })),
)

// Loading component
const Loading: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      <p className="mt-4 text-gray-600 dark:text-gray-400">Loading...</p>
    </div>
  </div>
)

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <Layout>
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/spec" element={<Spec />} />
              <Route path="/editor" element={<Editor />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
