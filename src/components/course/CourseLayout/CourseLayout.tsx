import React from 'react';
import CourseHeader from '../CourseHeader';
import VideoSection from '../VideoSection';
import TabNavigation from '../../TabNavigation';
import ContentSection from '../../ContentSection';
import styles from './CourseLayout.module.css';

interface CourseLayoutProps {
  // Course data
  courseTitle: string;
  courseDescription: string;
  
  // Video player props
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isFullscreen: boolean;
  onPlay: () => void;
  onPause: () => void;
  onSeek: (time: number) => void;
  onVolumeChange: (volume: number) => void;
  onRewind: () => void;
  onForward: () => void;
  onFullscreen: () => void;
  
  // Tab navigation
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const CourseLayout: React.FC<CourseLayoutProps> = ({
  courseTitle,
  courseDescription,
  isPlaying,
  currentTime,
  duration,
  volume,
  isFullscreen,
  onPlay,
  onPause,
  onSeek,
  onVolumeChange,
  onRewind,
  onForward,
  onFullscreen,
  activeTab,
  onTabChange
}) => {
  return (
    <div className={styles.courseContainer}>
      {/* Course Title and Description */}
      <CourseHeader 
        title={courseTitle}
        description={courseDescription}
        className="animate-on-load"
      />

      {/* Video and Subtitles Section */}
      <VideoSection
        isPlaying={isPlaying}
        currentTime={currentTime}
        duration={duration}
        volume={volume}
        isFullscreen={isFullscreen}
        onPlay={onPlay}
        onPause={onPause}
        onSeek={onSeek}
        onVolumeChange={onVolumeChange}
        onRewind={onRewind}
        onForward={onForward}
        onFullscreen={onFullscreen}
        className="animate-on-load"
      />

      {/* Course Navigation Tabs */}
      <div className="animate-on-load">
        <TabNavigation 
          activeTab={activeTab}
          onTabChange={onTabChange}
        />
      </div>

      {/* Content Section */}
      <div className="animate-on-load">
        <ContentSection activeTab={activeTab} />
      </div>
    </div>
  );
};

export default CourseLayout;