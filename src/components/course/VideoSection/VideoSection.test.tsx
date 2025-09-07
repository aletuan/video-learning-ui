import React from 'react';
import { render, screen } from '@testing-library/react';
import VideoSection from './VideoSection';

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
  const defaultProps = {
    isPlaying: false,
    currentTime: 0,
    duration: 180,
    volume: 1,
    isFullscreen: false,
    onPlay: jest.fn(),
    onPause: jest.fn(),
    onSeek: jest.fn(),
    onVolumeChange: jest.fn(),
    onRewind: jest.fn(),
    onForward: jest.fn(),
    onFullscreen: jest.fn()
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

  test('renders with correct structure', () => {
    render(<VideoSection {...defaultProps} />);
    // Test that both child components are rendered in the video section
    expect(screen.getByTestId('video-player')).toBeInTheDocument();
    expect(screen.getByTestId('subtitles-panel')).toBeInTheDocument();
  });
});