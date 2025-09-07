import React, { useState } from 'react';
import './App.css';
import Sidebar from '../Sidebar';
import Header from '../Header';
import VideoPlayer from '../VideoPlayer';
import SubtitlesPanel from '../SubtitlesPanel';
import TabNavigation from '../TabNavigation';
import ContentSection from '../ContentSection';
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
        <div className="course-container">
          {/* Course Title and Description */}
          <div className="course-header animate-on-load">
            <h1>Complete Guide to React Hooks</h1>
            <p className="course-description">
              Learn how to use React hooks effectively in your applications. This comprehensive tutorial covers useState, useEffect, and custom hooks.
            </p>
          </div>

          {/* Video and Subtitles Section */}
          <div className="video-section animate-on-load">
            {/* Video Player */}
            <VideoPlayer 
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
            />

            {/* Subtitles Panel */}
            <SubtitlesPanel 
              currentTime={videoPlayer.currentTime}
              onSeek={videoPlayer.actions.seek}
            />
          </div>

          {/* Course Navigation Tabs */}
          <div className="animate-on-load">
            <TabNavigation 
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />
          </div>

          {/* Content Section */}
          <div className="animate-on-load">
            <ContentSection activeTab={activeTab} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
