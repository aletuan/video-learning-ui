import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faFileText, 
  faQuestionCircle, 
  faComments, 
  faBook, 
  faThumbsUp 
} from '@fortawesome/free-solid-svg-icons';
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
          <FontAwesomeIcon icon={getTabIcon(tab)} />
          {tab}
        </button>
      ))}
    </div>
  );
};

const getTabIcon = (tab: string) => {
  switch (tab) {
    case 'Summary': return faFileText;
    case 'Quiz': return faQuestionCircle;
    case 'Discussion': return faComments;
    case 'Resources': return faBook;
    case 'Similar': return faThumbsUp;
    default: return faFileText;
  }
};

export default TabNavigation;