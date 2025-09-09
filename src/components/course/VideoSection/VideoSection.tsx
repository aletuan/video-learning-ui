import React, { useState } from 'react';
import VideoPlayer from '../../VideoPlayer';
import SubtitlesPanel from '../../SubtitlesPanel';
import styles from './VideoSection.module.css';
import { VideoConfig } from '../../../types/video.types';

interface VideoSectionProps {
  videoConfig?: VideoConfig;
  className?: string;
}

const VideoSection: React.FC<VideoSectionProps> = ({
  videoConfig,
  className = ''
}) => {
  const [currentTime, setCurrentTime] = useState(0);

  const handleTimeUpdate = (time: number) => {
    setCurrentTime(time);
  };

  const handleSeek = (time: number) => {
    setCurrentTime(time);
  };

  return (
    <div className={`${styles.videoSection} ${className}`}>
      <VideoPlayer 
        videoConfig={videoConfig}
        onTimeUpdate={handleTimeUpdate}
        onSeek={handleSeek}
      />

      <SubtitlesPanel 
        videoConfig={videoConfig}
        currentTime={currentTime}
        onSeek={handleSeek}
      />
    </div>
  );
};

export default VideoSection;