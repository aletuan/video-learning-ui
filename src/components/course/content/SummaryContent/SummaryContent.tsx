import React from 'react';
import styles from './SummaryContent.module.css';

interface SummaryContentProps {
  title: string;
  keyPoints: string[];
  topics: string[];
}

const SummaryContent: React.FC<SummaryContentProps> = ({ 
  title, 
  keyPoints, 
  topics 
}) => {
  return (
    <div className={styles.summarySection}>
      <h2>Video Summary</h2>
      <h3>{title}</h3>
      
      <div className={styles.keyPoints}>
        <h4>Key Points</h4>
        <ul className={styles.pointsList}>
          {keyPoints.map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ul>
      </div>

      <div className={styles.topicsCovered}>
        <h4>Topics Covered</h4>
        <div className={styles.topicTags}>
          {topics.map((topic, index) => (
            <span key={index} className={styles.tag}>
              {topic}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SummaryContent;