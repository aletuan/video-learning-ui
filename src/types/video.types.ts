// Video source types
export type VideoSourceType = 'local' | 'url' | 'stream';

// Subtitle formats supported
export type SubtitleFormat = 'webvtt' | 'srt';

// Individual subtitle cue/caption
export interface SubtitleCue {
  startTime: number;
  endTime: number;
  text: string;
  timeDisplay: string;
}

// Subtitle track configuration
export interface SubtitleTrack {
  language: string;
  label: string;
  source: string;
  format: SubtitleFormat;
  isDefault?: boolean;
}

// Video source configuration
export interface VideoSource {
  type: VideoSourceType;
  path: string;
  mimeType?: string;
  quality?: string;
}

// Video metadata
export interface VideoMetadata {
  duration: number;
  description: string;
  thumbnail?: string;
  tags?: string[];
  category?: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
}

// Complete video configuration
export interface VideoConfig {
  id: string;
  title: string;
  videoSource: VideoSource;
  subtitles: SubtitleTrack[];
  metadata: VideoMetadata;
  createdAt?: string;
  updatedAt?: string;
}

// Video player state
export interface VideoPlayerState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  isFullscreen: boolean;
  isLoading: boolean;
  error?: string;
}

// Video events
export interface VideoEvents {
  onPlay?: () => void;
  onPause?: () => void;
  onSeek?: (time: number) => void;
  onTimeUpdate?: (time: number) => void;
  onDurationChange?: (duration: number) => void;
  onVolumeChange?: (volume: number) => void;
  onFullscreenToggle?: () => void;
  onError?: (error: string) => void;
  onLoadStart?: () => void;
  onLoadEnd?: () => void;
}