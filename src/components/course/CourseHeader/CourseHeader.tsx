import React from 'react';
import styles from './CourseHeader.module.css';

interface CourseHeaderProps {
  title: string;
  description: string;
  className?: string;
}

const CourseHeader: React.FC<CourseHeaderProps> = ({ 
  title, 
  description, 
  className = '' 
}) => {
  return (
    <div className={`${styles.courseHeader} ${className}`}>
      <h1>{title}</h1>
      <p className={styles.courseDescription}>
        {description}
      </p>
    </div>
  );
};

export default CourseHeader;