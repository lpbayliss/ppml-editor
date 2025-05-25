# Modern React Template 🚀

A production-ready React application template with TypeScript, Tailwind CSS, and GitHub Pages deployment. This template provides everything you need to start building modern web applications with best practices and optimal developer experience.

![React](https://img.shields.io/badge/React-19.1-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-6.3-purple?logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1-38B2AC?logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

- ⚡ **Lightning Fast** - Built with Vite for instant HMR and optimized builds
- 🎨 **Beautiful UI** - Modern design with Tailwind CSS v4 and smooth animations
- 🌙 **Dark Mode** - Automatic theme detection with manual toggle support
- 📱 **Responsive** - Mobile-first design that works on all devices
- 🚀 **Production Ready** - Optimized for deployment with GitHub Actions CI/CD
- ♿ **Accessible** - WCAG 2.1 AA compliant with semantic HTML
- 🔧 **TypeScript** - Full TypeScript support with strict mode enabled
- 📦 **Code Splitting** - Automatic code splitting for optimal bundle sizes
- 🛣️ **Client-side Routing** - React Router configured for GitHub Pages
- 🎯 **SEO Optimized** - Meta tags and structured data for better search visibility
- 🎨 **Tailwind CSS v4** - Latest version with CSS-first configuration

## 🚀 Quick Start

### Prerequisites

- Node.js >= 18.0.0
- pnpm >= 8.0.0

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/your-repo-name.git
cd your-repo-name
```

2. Install dependencies:
```bash
pnpm install
```

3. Start the development server:
```bash
pnpm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

## 📚 Available Scripts

- `pnpm run dev` - Start development server with hot module replacement
- `pnpm run build` - Create production build
- `pnpm run build:gh-pages` - Build for GitHub Pages deployment
- `pnpm run preview` - Preview production build locally
- `pnpm run lint` - Run ESLint
- `pnpm run type-check` - Run TypeScript type checking
- `pnpm run clean` - Clean build artifacts and dependencies

## 🏗️ Project Structure

```
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions deployment workflow
├── public/
│   ├── 404.html               # GitHub Pages SPA fallback
│   └── site.webmanifest       # PWA manifest file
├── src/
│   ├── components/            # Reusable components
│   ├── contexts/              # React contexts (Theme, etc.)
│   ├── hooks/                 # Custom React hooks
│   ├── layouts/               # Layout components
│   ├── pages/                 # Page components
│   │   ├── Home.tsx
│   │   ├── Features.tsx
│   │   ├── About.tsx
│   │   └── NotFound.tsx
│   ├── utils/                 # Utility functions
│   ├── App.tsx               # Main App component
│   ├── index.css             # Global styles and Tailwind configuration
│   └── main.tsx              # Application entry point
├── index.html                # HTML template
├── package.json              # Project dependencies
├── postcss.config.js         # PostCSS configuration
├── tsconfig.json             # TypeScript configuration
└── vite.config.ts           # Vite configuration
```

## 🚀 Deployment

### GitHub Pages Deployment

This template is configured for automatic deployment to GitHub Pages using GitHub Actions.

1. **Update Base Path**: 
   - Edit `vite.config.ts` and change the base path to match your repository name:
   ```typescript
   const base = command === 'build' ? '/your-repo-name/' : '/'
   ```
   - The routing will automatically adapt to use the correct base path

2. **Enable GitHub Pages**:
   - Go to your repository settings on GitHub
   - Navigate to "Pages" section
   - Under "Build and deployment", select "GitHub Actions" as the source

3. **Deploy**:
   - Push your changes to the `main` branch
   - GitHub Actions will automatically build and deploy your site
   - Your site will be available at `https://yourusername.github.io/your-repo-name/`

### Manual Deployment

To build and deploy manually:

```bash
# Build for production
pnpm run build:gh-pages

# The built files will be in the 'dist' directory
# Upload these files to your hosting provider
```

## 🛠️ Configuration

### Tailwind CSS v4

Tailwind CSS v4 uses a CSS-first configuration approach. Configuration is done directly in `src/index.css`:

```css
@import "tailwindcss";

@theme {
  --font-sans: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  --gradient-from: #3b82f6;
  --gradient-via: #8b5cf6;
  --gradient-to: #ec4899;
}
```

The template includes:
- Custom CSS variables for theming
- Custom animations (gradient, float)
- Dark mode support (class-based)
- Responsive utilities

### TypeScript

TypeScript is configured with strict mode in `tsconfig.json`:
- Strict type checking
- Path aliases (`@/` maps to `src/`)
- No implicit any
- No unused locals/parameters

### Vite

Vite configuration in `vite.config.ts` includes:
- React plugin with Fast Refresh
- Path alias resolution
- Optimized build settings
- Code splitting for vendor chunks

## 🎨 Styling

The template uses Tailwind CSS with custom utility classes:

- `.btn-primary` - Primary button style
- `.btn-secondary` - Secondary button style
- `.card` - Card component style
- `.gradient-text` - Gradient text effect
- `.gradient-bg` - Animated gradient background

## 🔧 Customization

### Changing the Theme

1. Update CSS variables in the `@theme` block in `src/index.css`
2. Modify custom styles in the `@layer` blocks
3. Update the theme color in `index.html` meta tag

### Adding New Pages

1. Create a new component in `src/pages/`
2. Add the route in `src/App.tsx`
3. Update navigation in `src/layouts/Layout.tsx`

### Environment Variables

Create a `.env` file for environment-specific variables:

```env
VITE_API_URL=https://api.example.com
VITE_APP_TITLE=My App
```

Access in your app:
```typescript
const apiUrl = import.meta.env.VITE_API_URL
```

## 📦 Tech Stack

- **[React](https://react.dev/)** - UI library
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[Vite](https://vitejs.dev/)** - Build tool
- **[Tailwind CSS v4](https://tailwindcss.com/)** - Utility-first CSS
- **[React Router](https://reactrouter.com/)** - Client-side routing
- **[GitHub Actions](https://github.com/features/actions)** - CI/CD

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Vite](https://vitejs.dev/) for the amazing build tool
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [React Router](https://reactrouter.com/) for client-side routing
- [GitHub Pages](https://pages.github.com/) for free hosting

---

Made with ❤️ by ReactApp
