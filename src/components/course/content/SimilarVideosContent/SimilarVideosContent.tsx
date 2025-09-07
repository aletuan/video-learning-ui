import React from 'react';
import VideoCard from '../../../video/VideoCard';
import styles from './SimilarVideosContent.module.css';

interface Video {
  title: string;
  duration: string;
  views: string;
}

interface SimilarVideosContentProps {
  videos: Video[];
  onVideoClick: (title: string) => void;
}

const SimilarVideosContent: React.FC<SimilarVideosContentProps> = ({ 
  videos, 
  onVideoClick 
}) => {
  return (
    <div className={styles.similarSection}>
      <h2>Similar Videos</h2>
      <div className={styles.videoList}>
        {videos.map((video, index) => (
          <VideoCard
            key={index}
            title={video.title}
            duration={video.duration}
            views={video.views}
            onClick={onVideoClick}
          />
        ))}
      </div>
    </div>
  );
};

export default SimilarVideosContent;