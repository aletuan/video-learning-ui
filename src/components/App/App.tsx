import React, { useState } from 'react';
import './App.css';
import { ThemeProvider } from '../../contexts/ThemeContext';
import ErrorBoundary from '../ErrorBoundary';
import Sidebar from '../Sidebar';
import Header from '../Header';
import CourseLayout from '../course/CourseLayout';
import useMobileSidebar from '../../hooks/useMobileSidebar';
import usePageAnimations from '../../hooks/usePageAnimations';
import { getCurrentVideo } from '../../data/videoConfig';

function App() {
  const mobileSidebar = useMobileSidebar();
  const [activeTab, setActiveTab] = useState('Summary');
  const [activeNavItem, setActiveNavItem] = useState('Home');
  const [currentVideo] = useState(() => getCurrentVideo());
  
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
            courseTitle={currentVideo.title}
            courseDescription={currentVideo.metadata.description}
            videoConfig={currentVideo}
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
