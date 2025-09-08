import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faGraduationCap, 
  faTimes, 
  faHome, 
  faSearch, 
  faBookmark, 
  faHeart,
  faBook,
  faVideo,
  faFire,
  faTh,
  faComments,
  faUsers,
  faPlus,
  faCog,
  faBookOpen,
  faChartLine,
  faTags,
  faPlusCircle
} from '@fortawesome/free-solid-svg-icons';
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
          <FontAwesomeIcon icon={faGraduationCap} />
          <span>Learning Platform</span>
        </div>
        <button className={styles.mobileSidebarClose} onClick={handleButtonClick(onClose)}>
          <FontAwesomeIcon icon={faTimes} />
          <span className="sr-only">Close Sidebar</span>
        </button>
      </div>

      {/* Desktop Logo */}
      <div className={`${styles.logo} ${styles.desktopLogo}`}>
        <FontAwesomeIcon icon={faGraduationCap} />
        <span>Learning Platform</span>
      </div>
      
      {/* Main Navigation */}
      <nav className={styles.mainNav}>
        <button 
          type="button"
          className={`${styles.navItem} ${activeItem === 'Home' ? styles.active : ''}`}
          onClick={handleButtonClick(() => onItemClick?.('Home'))}
        >
          <FontAwesomeIcon icon={faHome} />
          <span>Home</span>
        </button>
        <button 
          type="button"
          className={`${styles.navItem} ${activeItem === 'Discover' ? styles.active : ''}`}
          onClick={handleButtonClick(() => onItemClick?.('Discover'))}
        >
          <FontAwesomeIcon icon={faSearch} />
          <span>Discover</span>
        </button>
        <button 
          type="button"
          className={`${styles.navItem} ${activeItem === 'My Learning' ? styles.active : ''}`}
          onClick={handleButtonClick(() => onItemClick?.('My Learning'))}
        >
          <FontAwesomeIcon icon={faBook} />
          <span>My Learning</span>
        </button>
        <button 
          type="button"
          className={`${styles.navItem} ${activeItem === 'Favorites' ? styles.active : ''}`}
          onClick={handleButtonClick(() => onItemClick?.('Favorites'))}
        >
          <FontAwesomeIcon icon={faHeart} />
          <span>Favorites</span>
        </button>
      </nav>

      {/* Library Section */}
      <div className={styles.navSection}>
        <h4>Library</h4>
        <button type="button" className={styles.navItem}>
          <FontAwesomeIcon icon={faBookOpen} />
          <span>All Courses</span>
        </button>
        <button type="button" className={styles.navItem}>
          <FontAwesomeIcon icon={faVideo} />
          <span>Video Library</span>
        </button>
        <button type="button" className={styles.navItem}>
          <FontAwesomeIcon icon={faChartLine} />
          <span>Trending</span>
        </button>
        <button type="button" className={styles.navItem}>
          <FontAwesomeIcon icon={faTags} />
          <span>Categories</span>
        </button>
      </div>

      {/* Community Section */}
      <div className={styles.navSection}>
        <h4>Community</h4>
        <button type="button" className={styles.navItem}>
          <FontAwesomeIcon icon={faComments} />
          <span>Discussions</span>
        </button>
        <button type="button" className={styles.navItem}>
          <FontAwesomeIcon icon={faUsers} />
          <span>Study Groups</span>
        </button>
        <button type="button" className={styles.navItem}>
          <FontAwesomeIcon icon={faPlusCircle} />
          <span>Create Content</span>
        </button>
      </div>

      {/* Settings Section */}
      <div className={`${styles.navSection} ${styles.bottom}`}>
        <button type="button" className={styles.navItem}>
          <FontAwesomeIcon icon={faCog} />
          <span>Settings</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;