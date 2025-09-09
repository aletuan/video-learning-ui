import React, { useState, useEffect, useRef } from 'react';
import styles from './SubtitlesPanel.module.css';
import { SubtitleCue, VideoConfig } from '../../types/video.types';
import { SubtitleService } from '../../services/SubtitleService';

interface SubtitlesPanelProps {
  videoConfig?: VideoConfig;
  currentTime: number;
  onSeek: (time: number) => void;
}

const SubtitlesPanel: React.FC<SubtitlesPanelProps> = ({ videoConfig, currentTime, onSeek }) => {
  const [subtitleService] = useState(() => SubtitleService.getInstance());
  const [subtitles, setSubtitles] = useState<SubtitleCue[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const subtitlesContentRef = useRef<HTMLDivElement>(null);
  const activeSubtitleRef = useRef<HTMLDivElement>(null);

  // Load subtitles when video config changes
  useEffect(() => {
    if (!videoConfig || videoConfig.subtitles.length === 0) {
      setSubtitles([]);
      setError(null);
      return;
    }

    const defaultSubtitleTrack = videoConfig.subtitles.find(track => track.isDefault) || videoConfig.subtitles[0];
    
    setLoading(true);
    setError(null);

    subtitleService.loadSubtitles(defaultSubtitleTrack)
      .then(loadedSubtitles => {
        setSubtitles(loadedSubtitles);
        setLoading(false);
      })
      .catch(error => {
        console.error('Failed to load subtitles:', error);
        setError(`Failed to load subtitles: ${error.message}`);
        setSubtitles([]);
        setLoading(false);
      });
  }, [videoConfig, subtitleService]);

  const activeSubtitle = subtitleService.getCurrentSubtitle(subtitles, currentTime);

  // Auto-scroll to active subtitle
  useEffect(() => {
    if (activeSubtitleRef.current && subtitlesContentRef.current) {
      const activeElement = activeSubtitleRef.current;
      const container = subtitlesContentRef.current;
      
      const containerRect = container.getBoundingClientRect();
      const activeRect = activeElement.getBoundingClientRect();
      
      // Check if active element is out of view
      if (activeRect.top < containerRect.top || activeRect.bottom > containerRect.bottom) {
        activeElement.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }
    }
  }, [activeSubtitle]);

  const handleSubtitleClick = (time: number) => {
    onSeek(time);
  };

  if (loading) {
    return (
      <div className={styles.subtitlesPanel}>
        <div className={styles.subtitlesHeader}>
          <h3>Subtitles</h3>
          <p>Loading transcription...</p>
        </div>
        <div className={styles.loadingState}>
          <i className="fas fa-spinner fa-spin"></i>
          <p>Loading subtitles...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.subtitlesPanel}>
        <div className={styles.subtitlesHeader}>
          <h3>Subtitles</h3>
          <p>Error loading transcription</p>
        </div>
        <div className={styles.errorState}>
          <i className="fas fa-exclamation-triangle"></i>
          <p>Unable to load subtitles</p>
          <small>{error}</small>
        </div>
      </div>
    );
  }

  if (!videoConfig || subtitles.length === 0) {
    return (
      <div className={styles.subtitlesPanel}>
        <div className={styles.subtitlesHeader}>
          <h3>Subtitles</h3>
          <p>No transcription available</p>
        </div>
        <div className={styles.emptyState}>
          <i className="fas fa-closed-captioning"></i>
          <p>No subtitles available for this video</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.subtitlesPanel}>
      <div className={styles.subtitlesHeader}>
        <h3>Subtitles</h3>
        <p>Real-time synchronized transcription</p>
      </div>
      <div className={styles.subtitlesContent} ref={subtitlesContentRef}>
        {subtitles.map((subtitle, index) => {
          const isActive = activeSubtitle && activeSubtitle.startTime === subtitle.startTime;
          return (
            <div
              key={index}
              ref={isActive ? activeSubtitleRef : null}
              className={`${styles.subtitleItem} ${isActive ? styles.active : ''}`}
              onClick={() => handleSubtitleClick(subtitle.startTime)}
            >
              <span className={styles.time}>{subtitle.timeDisplay}</span>
              <span className={styles.dot}></span>
              <p>{subtitle.text}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SubtitlesPanel;