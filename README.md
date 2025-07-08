# Rock • Paper • Scissors Game

A modern, accessible implementation of the classic Rock Paper Scissors game built with React 19, TypeScript, and Vite.

![Game Screenshot](./screenshot.png)

## Features

- Clean, responsive UI that works from 360px mobile to 1440px desktop
- Smooth animations using CSS keyframes
- Strict TypeScript implementation
- Accessible design with keyboard navigation and ARIA attributes
- Unit tests for game logic using Vitest
- Follows SOLID principles

## Tech Stack

- **React 19**: Functional components and hooks
- **TypeScript**: Strict mode enabled for type safety
- **Vite**: For fast development and optimized builds
- **CSS Modules**: For component-scoped styling
- **React Icons**: For gesture icons
- **Vitest + Testing Library**: For unit testing
- **ESLint + Prettier**: For code quality
- **Husky + lint-staged**: For pre-commit hooks

## Quick Start

### Prerequisites
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
