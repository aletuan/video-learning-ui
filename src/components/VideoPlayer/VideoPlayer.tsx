import React from 'react';
import styles from './VideoPlayer.module.css';
import { useButtonAnimation } from '../../hooks/useButtonAnimation';

interface VideoPlayerProps {
  isPlaying?: boolean;
  currentTime?: number;
  duration?: number;
  volume?: number;
  isFullscreen?: boolean;
  onPlay?: () => void;
  onPause?: () => void;
  onSeek?: (time: number) => void;
  onVolumeChange?: (volume: number) => void;
  onRewind?: () => void;
  onForward?: () => void;
  onFullscreen?: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  isPlaying = false,
  currentTime = 0,
  duration = 0,
  volume = 1,
  isFullscreen = false,
  onPlay,
  onPause,
  onSeek,
  onVolumeChange,
  onRewind,
  onForward,
  onFullscreen
}) => {
  const { handleButtonClick } = useButtonAnimation();
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!onSeek || duration === 0) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const progressPercent = clickX / rect.width;
    const newTime = progressPercent * duration;
    
    onSeek(newTime);
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className={styles.videoContainer}>
      <div className={styles.videoPlayer}>
        <div className={styles.videoPlaceholder}>
          <i className="fas fa-play-circle"></i>
        </div>
        <div className={styles.videoControls}>
          <button 
            className={styles.playBtn}
            onClick={handleButtonClick(isPlaying ? onPause : onPlay)}
          >
            <i className={`fas ${isPlaying ? 'fa-pause' : 'fa-play'}`}></i>
          </button>
          <button className={styles.rewindBtn} onClick={handleButtonClick(onRewind)}>
            <i className="fas fa-undo"></i>
            <span>10</span>
          </button>
          <button className={styles.forwardBtn} onClick={handleButtonClick(onForward)}>
            <i className="fas fa-redo"></i>
            <span>10</span>
          </button>
          <button className={styles.volumeBtn} onClick={handleButtonClick(onVolumeChange ? () => onVolumeChange(volume === 0 ? 1 : 0) : undefined)}>
            <i className={`fas ${volume === 0 ? 'fa-volume-mute' : volume < 0.5 ? 'fa-volume-down' : 'fa-volume-up'}`}></i>
          </button>
          <div className={styles.progressBar} onClick={handleProgressClick}>
            <div 
              className={styles.progressFill}
              style={{ width: `${progressPercent}%` }}
            ></div>
            <div 
              className={styles.progressHandle}
              style={{ left: `${progressPercent}%` }}
            ></div>
          </div>
          <span className={styles.timeDisplay}>
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
          <button className={styles.fullscreenBtn} onClick={handleButtonClick(onFullscreen)}>
            <i className={`fas ${isFullscreen ? 'fa-compress' : 'fa-expand'}`}></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;