import React from 'react';
import { useButtonAnimation } from '../../../../hooks/useButtonAnimation';
import styles from './ResourcesContent.module.css';

interface Resource {
  icon: string;
  title: string;
  description: string;
  buttonText: string;
}

interface ResourcesContentProps {
  title: string;
  subtitle: string;
  resources: Resource[];
  onResourceAction: (resourceIndex: number) => void;
}

const ResourcesContent: React.FC<ResourcesContentProps> = ({
  title,
  subtitle,
  resources,
  onResourceAction
}) => {
  const { handleButtonClick } = useButtonAnimation();

  return (
    <div className={styles.resourcesSection}>
      <h2>{title}</h2>
      <h3>{subtitle}</h3>
      
      <div className={styles.resourceList}>
        {resources.map((resource, index) => (
          <div key={index} className={styles.resourceItem}>
            <i className={resource.icon}></i>
            <div>
              <h4>{resource.title}</h4>
              <p>{resource.description}</p>
            </div>
            <button 
              className={styles.btnSecondary} 
              onClick={handleButtonClick(() => onResourceAction(index))}
            >
              {resource.buttonText}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResourcesContent;