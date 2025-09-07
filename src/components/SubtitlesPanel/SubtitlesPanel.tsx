import React from 'react';
import styles from './SubtitlesPanel.module.css';

interface SubtitleItem {
  time: number;
  timeDisplay: string;
  text: string;
}

interface SubtitlesPanelProps {
  currentTime: number;
  onSeek: (time: number) => void;
}

const SubtitlesPanel: React.FC<SubtitlesPanelProps> = ({ currentTime, onSeek }) => {
  const subtitles: SubtitleItem[] = [
    {
      time: 0,
      timeDisplay: '0:00',
      text: 'Welcome to this comprehensive tutorial on React hooks.'
    },
    {
      time: 5,
      timeDisplay: '0:05',
      text: "In this video, we'll explore how hooks revolutionized React development."
    },
    {
      time: 7,
      timeDisplay: '0:07',
      text: "We'll start with the basics of useState, the most commonly used hook."
    },
    {
      time: 12,
      timeDisplay: '0:12',
      text: 'useState allows functional components to have local state.'
    },
    {
      time: 16,
      timeDisplay: '0:16',
      text: 'Here\'s how you can declare a state variable.'
    }
  ];

  const getCurrentSubtitle = () => {
    let currentSubtitle = subtitles[0];
    for (const subtitle of subtitles) {
      if (currentTime >= subtitle.time) {
        currentSubtitle = subtitle;
      } else {
        break;
      }
    }
    return currentSubtitle;
  };

  const activeSubtitle = getCurrentSubtitle();

  const handleSubtitleClick = (time: number) => {
    onSeek(time);
  };

  return (
    <div className={styles.subtitlesPanel}>
      <div className={styles.subtitlesHeader}>
        <h3>Subtitles</h3>
        <p>Real-time synchronized transcription</p>
      </div>
      <div className={styles.subtitlesContent}>
        {subtitles.map((subtitle, index) => (
          <div
            key={index}
            className={`${styles.subtitleItem} ${
              activeSubtitle.time === subtitle.time ? styles.active : ''
            }`}
            onClick={() => handleSubtitleClick(subtitle.time)}
          >
            <span className={styles.time}>{subtitle.timeDisplay}</span>
            <span className={styles.dot}></span>
            <p>{subtitle.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubtitlesPanel;