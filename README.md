# Video Learning UI

A modern React TypeScript application for video-based learning with synchronized subtitles, interactive course navigation, and responsive design.

## Features

- **Video Player Controls**: Custom video player with play/pause, seek, volume, and fullscreen controls
- **Synchronized Subtitles**: Real-time subtitle display synchronized with video playback
- **Tabbed Course Content**: Interactive navigation between course materials (Summary, Transcript, Notes)
- **Responsive Sidebar**: Mobile-friendly navigation with overlay support
- **Smooth Animations**: Page load and interaction animations for enhanced user experience
- **TypeScript Support**: Full TypeScript implementation with strict type checking

## Tech Stack

- **React 19** with TypeScript
- **CSS Modules** for component styling
- **Custom Hooks** for state management
- **Create React App** for build tooling
- **Husky** and **lint-staged** for code quality

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/aletuan/video-learning-ui.git
cd video-learning-ui
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The application will open at [http://localhost:3000](http://localhost:3000).

## Available Scripts

### `npm start`
Runs the app in development mode with hot reloading.

### `npm test`
Launches the test runner in interactive watch mode.

### `npm run build`
Builds the app for production to the `build` folder with optimized performance.

## Project Structure

```
src/
  components/          # React components
    App/              # Main application component
    VideoPlayer/      # Video player with controls
    SubtitlesPanel/   # Synchronized subtitle display
    Sidebar/          # Navigation sidebar
    Header/           # Application header
    TabNavigation/    # Course content tabs
    ContentSection/   # Dynamic content display
  hooks/              # Custom React hooks
    useVideoPlayer.ts # Video player state management
    useMobileSidebar.ts # Mobile sidebar controls
    usePageAnimations.ts # Animation coordination
  data/               # Static data and types
    subtitles.ts      # Subtitle data structure
  utils/              # Utility functions
    animations.ts     # Animation helpers
```

## Code Quality

This project includes automated code quality tools:

- **ESLint**: Code linting with Create React App configuration
- **Husky**: Pre-commit hooks for code quality
- **lint-staged**: Automatic linting of staged files

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## License

This project is open source and available under the MIT License.