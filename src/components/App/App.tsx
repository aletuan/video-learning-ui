import React, { useState } from 'react';
import './App.css';
import { ThemeProvider } from '../../contexts/ThemeContext';
import ErrorBoundary from '../ErrorBoundary';
import Sidebar from '../Sidebar';
import Header from '../Header';
import CourseLayout from '../course/CourseLayout';
import useMobileSidebar from '../../hooks/useMobileSidebar';
import useVideoPlayer from '../../hooks/useVideoPlayer';
import usePageAnimations from '../../hooks/usePageAnimations';

function App() {
  const mobileSidebar = useMobileSidebar();
  const videoPlayer = useVideoPlayer();
  const [activeTab, setActiveTab] = useState('Summary');
  const [activeNavItem, setActiveNavItem] = useState('Home');
  
  // Initialize page load animations
  usePageAnimations();

  return (
    <ErrorBoundary>
      <ThemeProvider>
        <div className="App">
        {/* Mobile Sidebar Overlay */}
        {mobileSidebar.isOpen && (
          <div 
            className="mobile-sidebar-overlay active" 
            onClick={mobileSidebar.close}
          />
        )}
        
        {/* Sidebar Navigation */}
        <Sidebar 
          isOpen={mobileSidebar.isOpen}
          onClose={mobileSidebar.close}
          activeItem={activeNavItem}
          onItemClick={setActiveNavItem}
        />

        {/* Main Content */}
        <main className="main-content">
          {/* Header */}
          <Header onSidebarToggle={mobileSidebar.open} />

          {/* Course Content */}
          <CourseLayout
            courseTitle="Complete Guide to React Hooks"
            courseDescription="Learn how to use React hooks effectively in your applications. This comprehensive tutorial covers useState, useEffect, and custom hooks."
            isPlaying={videoPlayer.isPlaying}
            currentTime={videoPlayer.currentTime}
            duration={videoPlayer.duration}
            volume={videoPlayer.volume}
            isFullscreen={videoPlayer.isFullscreen}
            onPlay={videoPlayer.actions.play}
            onPause={videoPlayer.actions.pause}
            onSeek={videoPlayer.actions.seek}
            onVolumeChange={videoPlayer.actions.setVolume}
            onRewind={() => videoPlayer.actions.seek(Math.max(0, videoPlayer.currentTime - 10))}
            onForward={() => videoPlayer.actions.seek(Math.min(videoPlayer.duration, videoPlayer.currentTime + 10))}
            onFullscreen={videoPlayer.actions.toggleFullscreen}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        </main>
        </div>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
