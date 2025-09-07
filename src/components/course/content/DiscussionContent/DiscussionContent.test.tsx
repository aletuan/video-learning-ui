import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DiscussionContent from './DiscussionContent';

// Mock the useButtonAnimation hook
jest.mock('../../../../hooks/useButtonAnimation', () => ({
  useButtonAnimation: () => ({
    handleButtonClick: (callback: () => void) => callback
  })
}));

describe('DiscussionContent Component', () => {
  const defaultProps = {
    title: 'Discussion Forum',
    subtitle: 'Join the conversation',
    posts: [
      {
        author: { name: 'John Doe', avatar: 'JD' },
        time: '2 hours ago',
        content: 'This is a great explanation! I have a question about useState.',
        likes: 5
      },
      {
        author: { name: 'Jane Smith', avatar: 'JS' },
        time: '1 hour ago',
        content: 'Can someone help me understand useEffect dependencies?',
        likes: 3
      }
    ],
    onLike: jest.fn(),
    onReply: jest.fn(),
    onAddComment: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders discussion title and subtitle', () => {
    render(<DiscussionContent {...defaultProps} />);
    
    expect(screen.getByText(defaultProps.title)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.subtitle)).toBeInTheDocument();
  });

  test('renders all discussion posts', () => {
    render(<DiscussionContent {...defaultProps} />);
    
    defaultProps.posts.forEach(post => {
      expect(screen.getByText(post.content)).toBeInTheDocument();
      expect(screen.getByText(post.author.name)).toBeInTheDocument();
      expect(screen.getByText(post.time)).toBeInTheDocument();
      expect(screen.getByText(post.author.avatar)).toBeInTheDocument();
    });
  });

  test('renders like counts for each post', () => {
    render(<DiscussionContent {...defaultProps} />);
    
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  test('renders like and reply buttons for each post', () => {
    render(<DiscussionContent {...defaultProps} />);
    
    const likeButtons = screen.getAllByRole('button', { name: /5|3/ });
    const replyButtons = screen.getAllByRole('button', { name: /Reply/ });
    
    expect(likeButtons).toHaveLength(2);
    expect(replyButtons).toHaveLength(2);
  });

  test('renders add comment button', () => {
    render(<DiscussionContent {...defaultProps} />);
    
    const addCommentButton = screen.getByText('Add Comment');
    expect(addCommentButton).toBeInTheDocument();
    expect(addCommentButton.tagName).toBe('BUTTON');
  });

  test('calls onLike when like button is clicked', () => {
    render(<DiscussionContent {...defaultProps} />);
    
    const firstLikeButton = screen.getAllByRole('button', { name: /5/ })[0];
    fireEvent.click(firstLikeButton);
    
    expect(defaultProps.onLike).toHaveBeenCalledWith(0);
  });

  test('calls onReply when reply button is clicked', () => {
    render(<DiscussionContent {...defaultProps} />);
    
    const firstReplyButton = screen.getAllByRole('button', { name: /Reply/ })[0];
    fireEvent.click(firstReplyButton);
    
    expect(defaultProps.onReply).toHaveBeenCalledWith(0);
  });

  test('calls onAddComment when add comment button is clicked', () => {
    render(<DiscussionContent {...defaultProps} />);
    
    const addCommentButton = screen.getByText('Add Comment');
    fireEvent.click(addCommentButton);
    
    expect(defaultProps.onAddComment).toHaveBeenCalledTimes(1);
  });

  test('calls correct post index for like and reply actions', () => {
    render(<DiscussionContent {...defaultProps} />);
    
    const likeButtons = screen.getAllByRole('button', { name: /5|3/ });
    const replyButtons = screen.getAllByRole('button', { name: /Reply/ });
    
    // Click second post's like button
    fireEvent.click(likeButtons[1]);
    expect(defaultProps.onLike).toHaveBeenCalledWith(1);
    
    // Click first post's reply button
    fireEvent.click(replyButtons[0]);
    expect(defaultProps.onReply).toHaveBeenCalledWith(0);
  });

  test('renders avatars correctly', () => {
    render(<DiscussionContent {...defaultProps} />);
    
    defaultProps.posts.forEach(post => {
      const avatar = screen.getByText(post.author.avatar);
      expect(avatar).toBeInTheDocument();
    });
  });

  test('handles empty posts array', () => {
    const emptyProps = { ...defaultProps, posts: [] };
    render(<DiscussionContent {...emptyProps} />);
    
    expect(screen.getByText(defaultProps.title)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.subtitle)).toBeInTheDocument();
    expect(screen.getByText('Add Comment')).toBeInTheDocument();
    
    // No posts should be rendered
    expect(screen.queryByRole('button', { name: /Reply/ })).not.toBeInTheDocument();
  });
});