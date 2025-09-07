import React from 'react';
import VideoPlayer from '../../VideoPlayer';
import SubtitlesPanel from '../../SubtitlesPanel';
import styles from './VideoSection.module.css';

interface VideoSectionProps {
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
  className?: string;
}

const VideoSection: React.FC<VideoSectionProps> = ({
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
  className = ''
}) => {
  return (
    <div className={`${styles.videoSection} ${className}`}>
      <VideoPlayer 
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
      />

      <SubtitlesPanel 
        currentTime={currentTime}
        onSeek={onSeek}
      />
    </div>
  );
};

export default VideoSection;