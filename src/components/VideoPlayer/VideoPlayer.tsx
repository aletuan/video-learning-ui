import React, { useState } from 'react';
import styles from './VideoPlayer.module.css';
import { VideoConfig, VideoEvents } from '../../types/video.types';

interface VideoPlayerProps extends VideoEvents {
  videoConfig?: VideoConfig;
  className?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoConfig,
  className = '',
  onPlay,
  onPause,
  onSeek,
  onTimeUpdate,
  onDurationChange,
  onVolumeChange,
  onFullscreenToggle,
  onError,
  onLoadStart,
  onLoadEnd
}) => {
  const [error, setError] = useState<string | null>(null);

  if (!videoConfig) {
    return (
      <div className={`${styles.videoContainer} ${className}`}>
        <div className={styles.videoPlayer}>
          <div className={styles.emptyState}>
            <i className="fas fa-video"></i>
            <p>No video configured</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`${styles.videoContainer} ${className}`}>
        <div className={styles.videoPlayer}>
          <div className={styles.errorState}>
            <i className="fas fa-exclamation-triangle"></i>
            <p>Video Error</p>
            <small>{error}</small>
            <br />
            <small>URL: {videoConfig.videoSource.path}</small>
            <br />
            <small>Type: {videoConfig.videoSource.type}</small>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.videoContainer} ${className}`}>
      <div className={styles.videoPlayer} style={{ aspectRatio: 'unset' }}>
        <video
          src={videoConfig.videoSource.path}
          controls
          preload="metadata"
          crossOrigin="anonymous"
          style={{ 
            width: '100%', 
            height: '100%',
            backgroundColor: '#000',
            objectFit: 'cover'
          }}
          onTimeUpdate={(e) => {
            const video = e.target as HTMLVideoElement;
            onTimeUpdate?.(video.currentTime);
          }}
          onLoadedMetadata={(e) => {
            const video = e.target as HTMLVideoElement;
            onDurationChange?.(video.duration);
            onLoadEnd?.();
          }}
          onLoadStart={() => {
            onLoadStart?.();
          }}
          onPlay={() => {
            onPlay?.();
          }}
          onPause={() => {
            onPause?.();
          }}
          onSeeked={(e) => {
            const video = e.target as HTMLVideoElement;
            onSeek?.(video.currentTime);
          }}
          onVolumeChange={(e) => {
            const video = e.target as HTMLVideoElement;
            onVolumeChange?.(video.volume);
          }}
          onError={(e) => {
            console.error('Video error:', e);
            const errorMsg = `Failed to load video from ${videoConfig.videoSource.path}. Check console for details.`;
            setError(errorMsg);
            onError?.(errorMsg);
          }}
        >
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default VideoPlayer;