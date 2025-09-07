import React from 'react';

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
    <div className={`course-header ${className}`}>
      <h1>{title}</h1>
      <p className="course-description">
        {description}
      </p>
    </div>
  );
};

export default CourseHeader;