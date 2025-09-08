import React from 'react';
import CourseHeader from '../CourseHeader';
import VideoSection from '../VideoSection';
import TabNavigation from '../../TabNavigation';
import ContentSection from '../../ContentSection';
import styles from './CourseLayout.module.css';
import { VideoConfig } from '../../../types/video.types';

interface CourseLayoutProps {
  // Course data  
  courseTitle: string;
  courseDescription: string;
  
  // Video configuration
  videoConfig?: VideoConfig;
  
  // Tab navigation
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const CourseLayout: React.FC<CourseLayoutProps> = ({
  courseTitle,
  courseDescription,
  videoConfig,
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
        videoConfig={videoConfig}
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