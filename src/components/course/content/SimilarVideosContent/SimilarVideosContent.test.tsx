import React from 'react';
import { render, screen } from '@testing-library/react';
import SimilarVideosContent from './SimilarVideosContent';

// Mock the VideoCard component
jest.mock('../../../video/VideoCard', () => {
  return function MockVideoCard({ title, duration, views, onClick }: any) {
    return (
      <div data-testid="video-card" onClick={() => onClick(title)}>
        <h3>{title}</h3>
        <span>{duration}</span>
        <span>{views}</span>
      </div>
    );
  };
});

describe('SimilarVideosContent Component', () => {
  const defaultProps = {
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
    ],
    onVideoClick: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders similar videos heading', () => {
    render(<SimilarVideosContent {...defaultProps} />);
    
    expect(screen.getByText('Similar Videos')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'Similar Videos' })).toBeInTheDocument();
  });

  test('renders all video cards', () => {
    render(<SimilarVideosContent {...defaultProps} />);
    
    const videoCards = screen.getAllByTestId('video-card');
    expect(videoCards).toHaveLength(defaultProps.videos.length);
  });

  test('passes correct props to VideoCard components', () => {
    render(<SimilarVideosContent {...defaultProps} />);
    
    defaultProps.videos.forEach(video => {
      expect(screen.getByText(video.title)).toBeInTheDocument();
      expect(screen.getByText(video.duration)).toBeInTheDocument();
      expect(screen.getByText(video.views)).toBeInTheDocument();
    });
  });

  test('renders video titles as h3 elements', () => {
    render(<SimilarVideosContent {...defaultProps} />);
    
    defaultProps.videos.forEach(video => {
      const titleElement = screen.getByRole('heading', { level: 3, name: video.title });
      expect(titleElement).toBeInTheDocument();
    });
  });

  test('handles empty videos array', () => {
    const emptyProps = { ...defaultProps, videos: [] };
    render(<SimilarVideosContent {...emptyProps} />);
    
    expect(screen.getByText('Similar Videos')).toBeInTheDocument();
    
    // No video cards should be rendered
    const videoCards = screen.queryAllByTestId('video-card');
    expect(videoCards).toHaveLength(0);
  });

  test('renders correct number of video cards', () => {
    render(<SimilarVideosContent {...defaultProps} />);
    
    const videoCards = screen.getAllByTestId('video-card');
    expect(videoCards).toHaveLength(3);
  });

  test('displays video durations and view counts', () => {
    render(<SimilarVideosContent {...defaultProps} />);
    
    expect(screen.getByText('12:45')).toBeInTheDocument();
    expect(screen.getByText('8:32')).toBeInTheDocument();
    expect(screen.getByText('15:20')).toBeInTheDocument();
    
    expect(screen.getByText('2.1K views')).toBeInTheDocument();
    expect(screen.getByText('1.8K views')).toBeInTheDocument();
    expect(screen.getByText('3.2K views')).toBeInTheDocument();
  });

  test('renders videos in correct order', () => {
    render(<SimilarVideosContent {...defaultProps} />);
    
    const videoTitles = screen.getAllByRole('heading', { level: 3 });
    
    expect(videoTitles[0]).toHaveTextContent('Advanced React Patterns');
    expect(videoTitles[1]).toHaveTextContent('React Context API Deep Dive');
    expect(videoTitles[2]).toHaveTextContent('Performance Optimization Tips');
  });

  test('handles single video', () => {
    const singleVideoProps = {
      ...defaultProps,
      videos: [defaultProps.videos[0]]
    };
    
    render(<SimilarVideosContent {...singleVideoProps} />);
    
    const videoCards = screen.getAllByTestId('video-card');
    expect(videoCards).toHaveLength(1);
    expect(screen.getByText('Advanced React Patterns')).toBeInTheDocument();
  });
});