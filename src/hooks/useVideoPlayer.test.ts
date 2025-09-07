import { renderHook, act } from '@testing-library/react';
import useVideoPlayer from './useVideoPlayer';

describe('useVideoPlayer', () => {
  it('should initialize with default state', () => {
    const { result } = renderHook(() => useVideoPlayer());
    
    expect(result.current.isPlaying).toBe(false);
    expect(result.current.currentTime).toBe(0);
    expect(result.current.duration).toBe(180);
    expect(result.current.volume).toBe(1);
    expect(result.current.isMuted).toBe(false);
    expect(result.current.isFullscreen).toBe(false);
  });

  it('should play and pause video', () => {
    const { result } = renderHook(() => useVideoPlayer());
    
    act(() => {
      result.current.actions.play();
    });
    expect(result.current.isPlaying).toBe(true);
    
    act(() => {
      result.current.actions.pause();
    });
    expect(result.current.isPlaying).toBe(false);
  });

  it('should seek to specific time', () => {
    const { result } = renderHook(() => useVideoPlayer());
    
    act(() => {
      result.current.actions.seek(30);
    });
    expect(result.current.currentTime).toBe(30);
  });

  it('should change volume', () => {
    const { result } = renderHook(() => useVideoPlayer());
    
    act(() => {
      result.current.actions.setVolume(0.5);
    });
    expect(result.current.volume).toBe(0.5);
  });

  it('should toggle mute state', () => {
    const { result } = renderHook(() => useVideoPlayer());
    
    act(() => {
      result.current.actions.toggleMute();
    });
    expect(result.current.isMuted).toBe(true);
    
    act(() => {
      result.current.actions.toggleMute();
    });
    expect(result.current.isMuted).toBe(false);
  });

  it('should toggle fullscreen state', () => {
    const { result } = renderHook(() => useVideoPlayer());
    
    act(() => {
      result.current.actions.toggleFullscreen();
    });
    expect(result.current.isFullscreen).toBe(true);
    
    act(() => {
      result.current.actions.toggleFullscreen();
    });
    expect(result.current.isFullscreen).toBe(false);
  });
});