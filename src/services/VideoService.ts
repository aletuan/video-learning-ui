import { VideoConfig, VideoSource, VideoPlayerState } from '../types/video.types';

export class VideoService {
  private static instance: VideoService;
  private videoElements: Map<string, HTMLVideoElement> = new Map();
  
  // Singleton pattern
  public static getInstance(): VideoService {
    if (!VideoService.instance) {
      VideoService.instance = new VideoService();
    }
    return VideoService.instance;
  }

  /**
   * Create and configure a video element for a given video configuration
   */
  public createVideoElement(config: VideoConfig): HTMLVideoElement {
    const video = document.createElement('video');
    
    // Basic video setup
    video.preload = 'metadata';
    video.playsInline = true;
    video.controls = false; // We'll use custom controls
    video.crossOrigin = 'anonymous'; // Handle CORS issues
    
    // Set source
    this.setVideoSource(video, config.videoSource);
    
    // Store reference
    this.videoElements.set(config.id, video);
    
    return video;
  }

  /**
   * Set video source based on source type
   */
  private setVideoSource(video: HTMLVideoElement, source: VideoSource): void {
    switch (source.type) {
      case 'local':
        video.src = source.path;
        break;
      case 'url':
        video.src = source.path;
        break;
      case 'stream':
        // For streaming sources, you might need additional setup
        video.src = source.path;
        break;
    }
    
    if (source.mimeType) {
      video.setAttribute('type', source.mimeType);
    }
  }

  /**
   * Load video metadata
   */
  public async loadVideoMetadata(video: HTMLVideoElement): Promise<{duration: number, videoWidth: number, videoHeight: number}> {
    return new Promise((resolve, reject) => {
      const handleLoadedMetadata = () => {
        video.removeEventListener('loadedmetadata', handleLoadedMetadata);
        video.removeEventListener('error', handleError);
        
        resolve({
          duration: video.duration,
          videoWidth: video.videoWidth,
          videoHeight: video.videoHeight
        });
      };
      
      const handleError = () => {
        video.removeEventListener('loadedmetadata', handleLoadedMetadata);
        video.removeEventListener('error', handleError);
        reject(new Error('Failed to load video metadata'));
      };
      
      video.addEventListener('loadedmetadata', handleLoadedMetadata);
      video.addEventListener('error', handleError);
      
      // If metadata is already loaded
      if (video.readyState >= 1) {
        handleLoadedMetadata();
      }
    });
  }

  /**
   * Play video
   */
  public async playVideo(videoId: string): Promise<void> {
    const video = this.videoElements.get(videoId);
    if (!video) {
      throw new Error(`Video element not found for ID: ${videoId}`);
    }
    
    try {
      await video.play();
    } catch (error) {
      throw new Error(`Failed to play video: ${error}`);
    }
  }

  /**
   * Pause video
   */
  public pauseVideo(videoId: string): void {
    const video = this.videoElements.get(videoId);
    if (!video) {
      throw new Error(`Video element not found for ID: ${videoId}`);
    }
    
    video.pause();
  }

  /**
   * Seek to specific time
   */
  public seekTo(videoId: string, time: number): void {
    const video = this.videoElements.get(videoId);
    if (!video) {
      throw new Error(`Video element not found for ID: ${videoId}`);
    }
    
    video.currentTime = Math.max(0, Math.min(time, video.duration));
  }

  /**
   * Set volume (0-1)
   */
  public setVolume(videoId: string, volume: number): void {
    const video = this.videoElements.get(videoId);
    if (!video) {
      throw new Error(`Video element not found for ID: ${videoId}`);
    }
    
    video.volume = Math.max(0, Math.min(volume, 1));
  }

  /**
   * Toggle mute
   */
  public toggleMute(videoId: string): boolean {
    const video = this.videoElements.get(videoId);
    if (!video) {
      throw new Error(`Video element not found for ID: ${videoId}`);
    }
    
    video.muted = !video.muted;
    return video.muted;
  }

  /**
   * Get current video state
   */
  public getVideoState(videoId: string): Partial<VideoPlayerState> {
    const video = this.videoElements.get(videoId);
    if (!video) {
      return { error: `Video element not found for ID: ${videoId}` };
    }
    
    return {
      isPlaying: !video.paused && !video.ended,
      currentTime: video.currentTime,
      duration: video.duration || 0,
      volume: video.volume,
      isMuted: video.muted,
      isLoading: video.readyState < 3
    };
  }

  /**
   * Attach event listeners to video element
   */
  public attachEventListeners(
    videoId: string, 
    callbacks: {
      onTimeUpdate?: (time: number) => void;
      onDurationChange?: (duration: number) => void;
      onPlay?: () => void;
      onPause?: () => void;
      onEnded?: () => void;
      onError?: (error: string) => void;
      onLoadStart?: () => void;
      onLoadEnd?: () => void;
    }
  ): void {
    const video = this.videoElements.get(videoId);
    if (!video) {
      throw new Error(`Video element not found for ID: ${videoId}`);
    }

    if (callbacks.onTimeUpdate) {
      video.addEventListener('timeupdate', () => callbacks.onTimeUpdate!(video.currentTime));
    }
    
    if (callbacks.onDurationChange) {
      video.addEventListener('durationchange', () => callbacks.onDurationChange!(video.duration));
    }
    
    if (callbacks.onPlay) {
      video.addEventListener('play', callbacks.onPlay);
    }
    
    if (callbacks.onPause) {
      video.addEventListener('pause', callbacks.onPause);
    }
    
    if (callbacks.onEnded) {
      video.addEventListener('ended', callbacks.onEnded);
    }
    
    if (callbacks.onError) {
      video.addEventListener('error', () => {
        const error = video.error;
        const message = error ? `Video error: ${error.message}` : 'Unknown video error';
        callbacks.onError!(message);
      });
    }
    
    if (callbacks.onLoadStart) {
      video.addEventListener('loadstart', callbacks.onLoadStart);
    }
    
    if (callbacks.onLoadEnd) {
      video.addEventListener('loadeddata', callbacks.onLoadEnd);
    }
  }

  /**
   * Remove video element and clean up
   */
  public removeVideo(videoId: string): void {
    const video = this.videoElements.get(videoId);
    if (video) {
      video.pause();
      video.src = '';
      video.load(); // Reset the video element
      this.videoElements.delete(videoId);
    }
  }

  /**
   * Get video element by ID
   */
  public getVideoElement(videoId: string): HTMLVideoElement | null {
    return this.videoElements.get(videoId) || null;
  }
}