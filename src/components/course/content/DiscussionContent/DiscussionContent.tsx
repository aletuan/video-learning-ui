import React from 'react';
import { useButtonAnimation } from '../../../../hooks/useButtonAnimation';
import styles from './DiscussionContent.module.css';

interface DiscussionPost {
  author: {
    name: string;
    avatar: string;
  };
  time: string;
  content: string;
  likes: number;
}

interface DiscussionContentProps {
  title: string;
  subtitle: string;
  posts: DiscussionPost[];
  onLike: (postIndex: number) => void;
  onReply: (postIndex: number) => void;
  onAddComment: () => void;
}

const DiscussionContent: React.FC<DiscussionContentProps> = ({
  title,
  subtitle,
  posts,
  onLike,
  onReply,
  onAddComment
}) => {
  const { handleButtonClick } = useButtonAnimation();

  return (
    <div className={styles.discussionSection}>
      <h2>{title}</h2>
      <h3>{subtitle}</h3>
      
      {posts.map((post, index) => (
        <div key={index} className={styles.discussionPost}>
          <div className={styles.postAuthor}>
            <div className={styles.avatar}>{post.author.avatar}</div>
            <span>{post.author.name}</span>
            <span className={styles.postTime}>{post.time}</span>
          </div>
          <p>{post.content}</p>
          <div className={styles.postActions}>
            <button onClick={handleButtonClick(() => onLike(index))}>
              <i className="fas fa-thumbs-up"></i> {post.likes}
            </button>
            <button onClick={handleButtonClick(() => onReply(index))}>
              <i className="fas fa-reply"></i> Reply
            </button>
          </div>
        </div>
      ))}
      
      <button 
        className={styles.btnPrimary} 
        onClick={handleButtonClick(onAddComment)}
      >
        Add Comment
      </button>
    </div>
  );
};

export default DiscussionContent;