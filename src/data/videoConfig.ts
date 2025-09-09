import { VideoConfig } from '../types/video.types';

// Sample educational videos configuration
export const videoLibrary: VideoConfig[] = [
  {
    id: 'javascript-basics',
    title: 'JavaScript Fundamentals',
    videoSource: {
      type: 'url',
      path: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
      mimeType: 'video/mp4',
      quality: '720p'
    },
    subtitles: [
      {
        language: 'en',
        label: 'English',
        source: '/subtitles/javascript-basics.vtt',
        format: 'webvtt',
        isDefault: true
      }
    ],
    metadata: {
      duration: 75, // 1 minute 15 seconds
      description: 'Learn the fundamental concepts of JavaScript programming including variables, functions, objects, and arrays.',
      thumbnail: 'https://via.placeholder.com/1280x720/1e293b/ffffff?text=JavaScript+Fundamentals',
      tags: ['javascript', 'programming', 'basics', 'tutorial'],
      category: 'Programming',
      difficulty: 'beginner'
    },
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'react-hooks-intro',
    title: 'Introduction to React Hooks',
    videoSource: {
      type: 'url',
      path: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      mimeType: 'video/mp4',
      quality: '720p'
    },
    subtitles: [
      {
        language: 'en',
        label: 'English',
        source: '/subtitles/react-hooks-intro.vtt',
        format: 'webvtt',
        isDefault: true
      }
    ],
    metadata: {
      duration: 120, // 2 minutes
      description: 'Complete guide to React hooks including useState, useEffect, and custom hooks with practical examples.',
      thumbnail: 'https://via.placeholder.com/1280x720/ff6b35/ffffff?text=React+Hooks',
      tags: ['react', 'hooks', 'javascript', 'frontend'],
      category: 'React',
      difficulty: 'intermediate'
    },
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  }
];

// Get current video (for now, return the second one which has a reliable video source)
export const getCurrentVideo = (): VideoConfig => {
  return videoLibrary[1];
};

// Get video by ID
export const getVideoById = (id: string): VideoConfig | null => {
  return videoLibrary.find(video => video.id === id) || null;
};

// Get all videos
export const getAllVideos = (): VideoConfig[] => {
  return videoLibrary;
};

// Get videos by category
export const getVideosByCategory = (category: string): VideoConfig[] => {
  return videoLibrary.filter(video => video.metadata.category === category);
};

// Get videos by difficulty
export const getVideosByDifficulty = (difficulty: 'beginner' | 'intermediate' | 'advanced'): VideoConfig[] => {
  return videoLibrary.filter(video => video.metadata.difficulty === difficulty);
};