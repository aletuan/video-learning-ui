# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React TypeScript video learning platform UI focused on video content with synchronized subtitles and tabbed course content. The application uses Create React App with TypeScript and modern React patterns including hooks and CSS modules.

## Development Commands

### Core Commands
- `npm start` - Start development server (runs on localhost:3000)
- `npm run build` - Build for production
- `npm test` - Run tests in watch mode
- `npm run test -- --coverage` - Run tests with coverage report

### Code Quality
- ESLint configuration is integrated via Create React App defaults
- Husky + lint-staged setup for pre-commit hooks
- Pre-commit hook runs `eslint --fix` on staged TypeScript/React files
- No separate lint command - linting happens automatically via react-scripts

## Architecture

### Component Structure
The application follows a component-based architecture with clear separation of concerns:

- **App Component** (`src/components/App/App.tsx`) - Main application container managing global state for active navigation, tabs, and coordinating between major sections
- **Custom Hooks Pattern** - Business logic extracted into reusable hooks:
  - `useMobileSidebar` - Mobile sidebar open/close state
  - `useVideoPlayer` - Video player state and controls (play/pause/seek/volume)
  - `usePageAnimations` - Page load animation coordination
  - `useButtonAnimation` - Button interaction animations

### Key Features Architecture
- **Video Player** - Custom implementation with play/pause/seek/volume controls, not using HTML5 video element directly
- **Synchronized Subtitles** - Subtitle data structure with time-based synchronization (`src/data/subtitles.ts`)
- **Tabbed Content Navigation** - Dynamic content switching for course materials
- **Responsive Sidebar** - Mobile-first design with overlay/toggle behavior
- **Animation System** - Coordinated page load and interaction animations

### File Organization
- Components follow CSS Modules pattern (`Component.module.css`)
- Each component has an `index.ts` barrel export
- TypeScript configuration uses `src` as baseUrl for absolute imports
- Hooks are centralized in `src/hooks/`
- Static data in `src/data/`
- Utilities in `src/utils/`

### State Management
- Local component state using React hooks
- No external state management library
- State lifting pattern for cross-component communication
- Custom hooks for complex stateful logic encapsulation

## TypeScript Configuration

- Target: ES5 with modern library support
- Strict mode enabled
- JSX: react-jsx (automatic runtime)
- Base URL: `src` for absolute imports
- Module resolution: Node

## Testing

- Testing Library setup for React components
- Jest configuration via Create React App
- Test files use `.test.tsx` extension
- Setup includes jest-dom matchers