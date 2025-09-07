import React from 'react';
import { useButtonAnimation } from '../../../hooks/useButtonAnimation';
import styles from './VideoCard.module.css';

interface VideoCardProps {
  title: string;
  duration: string;
  views: string;
  onClick: (title: string) => void;
}

const VideoCard: React.FC<VideoCardProps> = ({ 
  title, 
  duration, 
  views, 
  onClick 
}) => {
  const { handleButtonClick } = useButtonAnimation();

  return (
    <button 
      className={styles.videoCard} 
      onClick={handleButtonClick(() => onClick(title))}
    >
      <div className={styles.videoThumbnail}></div>
      <div className={styles.videoInfo}>
        <h4>{title}</h4>
        <div className={styles.videoMeta}>
          <span className={styles.duration}>{duration}</span>
          <span className={styles.separator}>•</span>
          <span className={styles.views}>{views}</span>
        </div>
      </div>
    </button>
  );
};

export default VideoCard;