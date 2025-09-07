import React from 'react';
import styles from './Header.module.css';
import { useButtonAnimation } from '../../hooks/useButtonAnimation';

interface HeaderProps {
  onSidebarToggle?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onSidebarToggle }) => {
  const { handleButtonClick } = useButtonAnimation();
  return (
    <header className={styles.header}>
      <div className={styles.headerLeft}>
        <button 
          className={styles.mobileSidebarToggle} 
          onClick={handleButtonClick(onSidebarToggle)}
        >
          <i className="fas fa-bars"></i>
          <span className="sr-only">Toggle Sidebar</span>
        </button>
        <i className="fas fa-book-open"></i>
        <span>Learning Platform</span>
      </div>
      <div className={styles.headerRight}>
        <button className={styles.btnSecondary} onClick={handleButtonClick()}>Sign In</button>
        <button className={styles.btnPrimary} onClick={handleButtonClick()}>Get Started</button>
      </div>
    </header>
  );
};

export default Header;