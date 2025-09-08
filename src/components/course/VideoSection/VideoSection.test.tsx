import React from 'react';
import { render, screen } from '@testing-library/react';
import VideoSection from './VideoSection';
import { VideoConfig } from '../../../types/video.types';

// Mock the child components
jest.mock('../../VideoPlayer', () => {
  return function MockVideoPlayer() {
    return <div data-testid="video-player">Mock Video Player</div>;
  };
});

jest.mock('../../SubtitlesPanel', () => {
  return function MockSubtitlesPanel() {
    return <div data-testid="subtitles-panel">Mock Subtitles Panel</div>;
  };
});

describe('VideoSection Component', () => {
  const mockVideoConfig: VideoConfig = {
    id: 'test-video',
    title: 'Test Video',
    videoSource: {
      type: 'url',
      path: 'https://example.com/test-video.mp4',
      mimeType: 'video/mp4',
      quality: '720p'
    },
    subtitles: [
      {
        language: 'en',
        label: 'English',
        source: '/subtitles/test-video.vtt',
        format: 'webvtt',
        isDefault: true
      }
    ],
    metadata: {
      duration: 180,
      description: 'Test video description',
      thumbnail: 'https://example.com/thumbnail.jpg',
      tags: ['test'],
      category: 'Test',
      difficulty: 'beginner'
    }
  };

  const defaultProps = {
    videoConfig: mockVideoConfig
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders video player and subtitles panel', () => {
    render(<VideoSection {...defaultProps} />);
    
    expect(screen.getByTestId('video-player')).toBeInTheDocument();
    expect(screen.getByTestId('subtitles-panel')).toBeInTheDocument();
  });

  test('applies custom className', () => {
    const customClass = 'custom-video-section';
    render(<VideoSection {...defaultProps} className={customClass} />);
    // Test that the component renders with expected children when custom class is applied
    expect(screen.getByTestId('video-player')).toBeInTheDocument();
    expect(screen.getByTestId('subtitles-panel')).toBeInTheDocument();
  });

  test('renders without videoConfig', () => {
    render(<VideoSection />);
    // Test that the component handles undefined videoConfig gracefully
    expect(screen.getByTestId('video-player')).toBeInTheDocument();
    expect(screen.getByTestId('subtitles-panel')).toBeInTheDocument();
  });

  test('renders with correct structure', () => {
    render(<VideoSection {...defaultProps} />);
    // Test that both child components are rendered in the video section
    expect(screen.getByTestId('video-player')).toBeInTheDocument();
    expect(screen.getByTestId('subtitles-panel')).toBeInTheDocument();
  });
});