import React, { useEffect, useRef } from 'react';
import styles from './ContentSection.module.css';
import { usePageAnimations } from '../../hooks/usePageAnimations';
import SummaryContent from '../course/content/SummaryContent';
import QuizContent from '../course/content/QuizContent';
import DiscussionContent from '../course/content/DiscussionContent';
import ResourcesContent from '../course/content/ResourcesContent';
import SimilarVideosContent from '../course/content/SimilarVideosContent';

interface ContentSectionProps {
  activeTab: string;
}

const ContentSection: React.FC<ContentSectionProps> = ({ activeTab }) => {
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

  // Data for the components
  const summaryData = {
    title: 'Complete Guide to React Hooks',
    keyPoints: [
      'Introduction to React hooks and their purpose in functional components',
      'Understanding the useState hook for managing component state',
      'Using useEffect hook for side effects and lifecycle management',
      'Best practices for custom hook creation and reusability',
      'Common pitfalls and how to avoid them when using hooks'
    ],
    topics: ['React', 'Hooks', 'State Management', 'Side Effects', 'Best Practices']
  };

  const quizData = {
    title: 'Knowledge Quiz',
    subtitle: 'Test your understanding of React Hooks',
    questions: [
      {
        question: 'Question 1: What is the primary purpose of React hooks?',
        options: [
          { value: 'a', label: 'To replace class components entirely' },
          { value: 'b', label: 'To add state and lifecycle features to functional components' },
          { value: 'c', label: 'To improve performance only' },
          { value: 'd', label: 'To handle routing' }
        ]
      }
    ]
  };

  const discussionData = {
    title: 'Discussion Forum',
    subtitle: 'Join the conversation about React Hooks',
    posts: [
      {
        author: { name: 'John Doe', avatar: 'JD' },
        time: '2 hours ago',
        content: 'Great explanation of useState! I was confused about the dependency array in useEffect. Can someone clarify?',
        likes: 5
      }
    ]
  };

  const resourcesData = {
    title: 'Additional Resources',
    subtitle: 'Expand your learning with these materials',
    resources: [
      {
        icon: 'fas fa-file-pdf',
        title: 'React Hooks Cheat Sheet',
        description: 'Quick reference guide for all React hooks',
        buttonText: 'Download'
      },
      {
        icon: 'fas fa-code',
        title: 'Code Examples Repository',
        description: 'GitHub repository with all course examples',
        buttonText: 'View Code'
      },
      {
        icon: 'fas fa-link',
        title: 'Official React Documentation',
        description: 'Comprehensive guide from React team',
        buttonText: 'Visit'
      }
    ]
  };

  const similarVideosData = {
    videos: [
      {
        title: 'Advanced React Patterns',
        duration: '12:45',
        views: '2.1K views'
      },
      {
        title: 'React Context API Deep Dive',
        duration: '8:32',
        views: '1.8K views'
      },
      {
        title: 'Performance Optimization Tips',
        duration: '15:20',
        views: '3.2K views'
      }
    ]
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Summary':
        return (
          <SummaryContent
            title={summaryData.title}
            keyPoints={summaryData.keyPoints}
            topics={summaryData.topics}
          />
        );
      case 'Quiz':
        return (
          <QuizContent
            title={quizData.title}
            subtitle={quizData.subtitle}
            questions={quizData.questions}
            onSubmit={() => console.log('Quiz submitted')}
          />
        );
      case 'Discussion':
        return (
          <DiscussionContent
            title={discussionData.title}
            subtitle={discussionData.subtitle}
            posts={discussionData.posts}
            onLike={(index) => console.log('Liked post', index)}
            onReply={(index) => console.log('Reply to post', index)}
            onAddComment={() => console.log('Add comment')}
          />
        );
      case 'Resources':
        return (
          <ResourcesContent
            title={resourcesData.title}
            subtitle={resourcesData.subtitle}
            resources={resourcesData.resources}
            onResourceAction={(index) => console.log('Resource action', index)}
          />
        );
      case 'Similar':
        return (
          <SimilarVideosContent
            videos={similarVideosData.videos}
            onVideoClick={handleVideoCardClick}
          />
        );
      default:
        return (
          <SummaryContent
            title={summaryData.title}
            keyPoints={summaryData.keyPoints}
            topics={summaryData.topics}
          />
        );
    }
  };

  return (
    <div className={styles.contentSection} ref={contentRef}>
      {renderTabContent()}
    </div>
  );
};

export default ContentSection;