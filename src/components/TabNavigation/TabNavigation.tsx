import React from 'react';
import styles from './TabNavigation.module.css';
import { useButtonAnimation } from '../../hooks/useButtonAnimation';

interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs = ['Summary', 'Quiz', 'Discussion', 'Resources', 'Similar'];
  const { handleButtonClick } = useButtonAnimation();

  return (
    <div className={styles.courseTabs}>
      {tabs.map((tab) => (
        <button 
          key={tab}
          className={`${styles.tab} ${activeTab === tab ? styles.active : ''}`}
          onClick={handleButtonClick(() => onTabChange(tab))}
        >
          <i className={`fas fa-${getTabIcon(tab)}`}></i>
          {tab}
        </button>
      ))}
    </div>
  );
};

const getTabIcon = (tab: string): string => {
  switch (tab) {
    case 'Summary': return 'file-text';
    case 'Quiz': return 'question-circle';
    case 'Discussion': return 'comments';
    case 'Resources': return 'book';
    case 'Similar': return 'thumbs-up';
    default: return 'file-text';
  }
};

export default TabNavigation;