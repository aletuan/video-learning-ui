import React, { useEffect, useRef } from 'react';
import styles from './ContentSection.module.css';
import { useButtonAnimation } from '../../hooks/useButtonAnimation';
import { usePageAnimations } from '../../hooks/usePageAnimations';

interface ContentSectionProps {
  activeTab: string;
}

const ContentSection: React.FC<ContentSectionProps> = ({ activeTab }) => {
  const { handleButtonClick } = useButtonAnimation();
  const { animateContentChange } = usePageAnimations();
  const contentRef = useRef<HTMLDivElement>(null);

  const handleVideoCardClick = (videoTitle: string) => {
    console.log('Video clicked:', videoTitle);
    // In a real app, this would navigate to the video or update the current video
  };

  // Animate content when tab changes
  useEffect(() => {
    animateContentChange(contentRef.current);
  }, [activeTab, animateContentChange]);
  const renderSummaryContent = () => (
    <div className={styles.summarySection}>
      <h2>Video Summary</h2>
      <h3>Complete Guide to React Hooks</h3>
      
      <div className={styles.keyPoints}>
        <h4>Key Points</h4>
        <ul className={styles.pointsList}>
          <li>Introduction to React hooks and their purpose in functional components</li>
          <li>Understanding the useState hook for managing component state</li>
          <li>Using useEffect hook for side effects and lifecycle management</li>
          <li>Best practices for custom hook creation and reusability</li>
          <li>Common pitfalls and how to avoid them when using hooks</li>
        </ul>
      </div>

      <div className={styles.topicsCovered}>
        <h4>Topics Covered</h4>
        <div className={styles.topicTags}>
          <span className={styles.tag}>React</span>
          <span className={styles.tag}>Hooks</span>
          <span className={styles.tag}>State Management</span>
          <span className={styles.tag}>Side Effects</span>
          <span className={styles.tag}>Best Practices</span>
        </div>
      </div>
    </div>
  );

  const renderSimilarVideos = () => (
    <div className={styles.similarSection}>
      <h2>Similar Videos</h2>
      <div className={styles.videoList}>
        <button className={styles.videoCard} onClick={handleButtonClick(() => handleVideoCardClick('Advanced React Patterns'))}>
          <div className={styles.videoThumbnail}></div>
          <div className={styles.videoInfo}>
            <h4>Advanced React Patterns</h4>
            <div className={styles.videoMeta}>
              <span className={styles.duration}>12:45</span>
              <span className={styles.separator}>•</span>
              <span className={styles.views}>2.1K views</span>
            </div>
          </div>
        </button>
        <button className={styles.videoCard} onClick={handleButtonClick(() => handleVideoCardClick('React Context API Deep Dive'))}>
          <div className={styles.videoThumbnail}></div>
          <div className={styles.videoInfo}>
            <h4>React Context API Deep Dive</h4>
            <div className={styles.videoMeta}>
              <span className={styles.duration}>8:32</span>
              <span className={styles.separator}>•</span>
              <span className={styles.views}>1.8K views</span>
            </div>
          </div>
        </button>
        <button className={styles.videoCard} onClick={handleButtonClick(() => handleVideoCardClick('Performance Optimization Tips'))}>
          <div className={styles.videoThumbnail}></div>
          <div className={styles.videoInfo}>
            <h4>Performance Optimization Tips</h4>
            <div className={styles.videoMeta}>
              <span className={styles.duration}>15:20</span>
              <span className={styles.separator}>•</span>
              <span className={styles.views}>3.2K views</span>
            </div>
          </div>
        </button>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Summary':
        return renderSummaryContent();
      case 'Quiz':
        return (
          <div className={styles.quizSection}>
            <h2>Knowledge Quiz</h2>
            <h3>Test your understanding of React Hooks</h3>
            
            <div className={styles.quizQuestion}>
              <h4>Question 1: What is the primary purpose of React hooks?</h4>
              <div className={styles.quizOptions}>
                <label><input type="radio" name="q1" value="a" /> To replace class components entirely</label>
                <label><input type="radio" name="q1" value="b" /> To add state and lifecycle features to functional components</label>
                <label><input type="radio" name="q1" value="c" /> To improve performance only</label>
                <label><input type="radio" name="q1" value="d" /> To handle routing</label>
              </div>
            </div>
            
            <button className={styles.btnPrimary} style={{marginTop: '20px'}} onClick={handleButtonClick()}>Submit Quiz</button>
          </div>
        );
      case 'Discussion':
        return (
          <div className={styles.discussionSection}>
            <h2>Discussion Forum</h2>
            <h3>Join the conversation about React Hooks</h3>
            
            <div className={styles.discussionPost}>
              <div className={styles.postAuthor}>
                <div className={styles.avatar}>JD</div>
                <span>John Doe</span>
                <span className={styles.postTime}>2 hours ago</span>
              </div>
              <p>Great explanation of useState! I was confused about the dependency array in useEffect. Can someone clarify?</p>
              <div className={styles.postActions}>
                <button onClick={handleButtonClick()}><i className="fas fa-thumbs-up"></i> 5</button>
                <button onClick={handleButtonClick()}><i className="fas fa-reply"></i> Reply</button>
              </div>
            </div>
            
            <button className={styles.btnPrimary} style={{marginTop: '20px'}} onClick={handleButtonClick()}>Add Comment</button>
          </div>
        );
      case 'Resources':
        return (
          <div className={styles.resourcesSection}>
            <h2>Additional Resources</h2>
            <h3>Expand your learning with these materials</h3>
            
            <div className={styles.resourceList}>
              <div className={styles.resourceItem}>
                <i className="fas fa-file-pdf"></i>
                <div>
                  <h4>React Hooks Cheat Sheet</h4>
                  <p>Quick reference guide for all React hooks</p>
                </div>
                <button className={styles.btnSecondary} onClick={handleButtonClick()}>Download</button>
              </div>
              
              <div className={styles.resourceItem}>
                <i className="fas fa-code"></i>
                <div>
                  <h4>Code Examples Repository</h4>
                  <p>GitHub repository with all course examples</p>
                </div>
                <button className={styles.btnSecondary} onClick={handleButtonClick()}>View Code</button>
              </div>
              
              <div className={styles.resourceItem}>
                <i className="fas fa-link"></i>
                <div>
                  <h4>Official React Documentation</h4>
                  <p>Comprehensive guide from React team</p>
                </div>
                <button className={styles.btnSecondary} onClick={handleButtonClick()}>Visit</button>
              </div>
            </div>
          </div>
        );
      case 'Similar':
        return renderSimilarVideos();
      default:
        return renderSummaryContent();
    }
  };

  return (
    <div className={styles.contentSection} ref={contentRef}>
      {renderTabContent()}
    </div>
  );
};

export default ContentSection;