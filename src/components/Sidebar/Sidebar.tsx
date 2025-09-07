import React from 'react';
import styles from './Sidebar.module.css';
import { useButtonAnimation } from '../../hooks/useButtonAnimation';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
  activeItem?: string;
  onItemClick?: (item: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, activeItem, onItemClick }) => {
  const { handleButtonClick } = useButtonAnimation();
  return (
    <aside className={`${styles.sidebar} ${isOpen ? styles.mobileOpen : ''}`} id="sidebar">
      {/* Mobile Sidebar Header */}
      <div className={styles.mobileSidebarHeader}>
        <div className={styles.logo}>
          <i className="fas fa-graduation-cap"></i>
          <span>Learning Platform</span>
        </div>
        <button className={styles.mobileSidebarClose} onClick={handleButtonClick(onClose)}>
          <i className="fas fa-times"></i>
          <span className="sr-only">Close Sidebar</span>
        </button>
      </div>

      {/* Desktop Logo */}
      <div className={`${styles.logo} ${styles.desktopLogo}`}>
        <i className="fas fa-graduation-cap"></i>
        <span>Learning Platform</span>
      </div>
      
      {/* Main Navigation */}
      <nav className={styles.mainNav}>
        <button 
          type="button"
          className={`${styles.navItem} ${activeItem === 'Home' ? styles.active : ''}`}
          onClick={handleButtonClick(() => onItemClick?.('Home'))}
        >
          <i className="fas fa-home"></i>
          <span>Home</span>
        </button>
        <button 
          type="button"
          className={`${styles.navItem} ${activeItem === 'Discover' ? styles.active : ''}`}
          onClick={handleButtonClick(() => onItemClick?.('Discover'))}
        >
          <i className="fas fa-search"></i>
          <span>Discover</span>
        </button>
        <button 
          type="button"
          className={`${styles.navItem} ${activeItem === 'My Learning' ? styles.active : ''}`}
          onClick={handleButtonClick(() => onItemClick?.('My Learning'))}
        >
          <i className="fas fa-book"></i>
          <span>My Learning</span>
        </button>
        <button 
          type="button"
          className={`${styles.navItem} ${activeItem === 'Favorites' ? styles.active : ''}`}
          onClick={handleButtonClick(() => onItemClick?.('Favorites'))}
        >
          <i className="fas fa-heart"></i>
          <span>Favorites</span>
        </button>
      </nav>

      {/* Library Section */}
      <div className={styles.navSection}>
        <h4>Library</h4>
        <button type="button" className={styles.navItem}>
          <i className="fas fa-book-open"></i>
          <span>All Courses</span>
        </button>
        <button type="button" className={styles.navItem}>
          <i className="fas fa-video"></i>
          <span>Video Library</span>
        </button>
        <button type="button" className={styles.navItem}>
          <i className="fas fa-chart-line"></i>
          <span>Trending</span>
        </button>
        <button type="button" className={styles.navItem}>
          <i className="fas fa-tags"></i>
          <span>Categories</span>
        </button>
      </div>

      {/* Community Section */}
      <div className={styles.navSection}>
        <h4>Community</h4>
        <button type="button" className={styles.navItem}>
          <i className="fas fa-comments"></i>
          <span>Discussions</span>
        </button>
        <button type="button" className={styles.navItem}>
          <i className="fas fa-users"></i>
          <span>Study Groups</span>
        </button>
        <button type="button" className={styles.navItem}>
          <i className="fas fa-plus-circle"></i>
          <span>Create Content</span>
        </button>
      </div>

      {/* Settings Section */}
      <div className={`${styles.navSection} ${styles.bottom}`}>
        <button type="button" className={styles.navItem}>
          <i className="fas fa-cog"></i>
          <span>Settings</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;