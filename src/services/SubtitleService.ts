import { SubtitleCue, SubtitleTrack } from '../types/video.types';

export class SubtitleService {
  private static instance: SubtitleService;
  private subtitleCache: Map<string, SubtitleCue[]> = new Map();
  
  // Singleton pattern
  public static getInstance(): SubtitleService {
    if (!SubtitleService.instance) {
      SubtitleService.instance = new SubtitleService();
    }
    return SubtitleService.instance;
  }

  /**
   * Load subtitles from a source URL
   */
  public async loadSubtitles(track: SubtitleTrack): Promise<SubtitleCue[]> {
    // Check cache first
    const cacheKey = `${track.source}-${track.language}`;
    if (this.subtitleCache.has(cacheKey)) {
      return this.subtitleCache.get(cacheKey)!;
    }

    try {
      const response = await fetch(track.source);
      if (!response.ok) {
        throw new Error(`Failed to load subtitles: ${response.statusText}`);
      }
      
      const content = await response.text();
      let subtitles: SubtitleCue[];
      
      switch (track.format) {
        case 'webvtt':
          subtitles = this.parseWebVTT(content);
          break;
        case 'srt':
          subtitles = this.parseSRT(content);
          break;
        default:
          throw new Error(`Unsupported subtitle format: ${track.format}`);
      }
      
      // Cache the parsed subtitles
      this.subtitleCache.set(cacheKey, subtitles);
      return subtitles;
      
    } catch (error) {
      console.error('Error loading subtitles:', error);
      throw error;
    }
  }

  /**
   * Parse WebVTT subtitle format
   */
  private parseWebVTT(content: string): SubtitleCue[] {
    const lines = content.split('\n');
    const cues: SubtitleCue[] = [];
    let i = 0;
    
    // Skip WEBVTT header and any initial metadata
    while (i < lines.length && !lines[i].includes('-->')) {
      i++;
    }
    
    while (i < lines.length) {
      const line = lines[i].trim();
      
      if (line.includes('-->')) {
        const [startTimeStr, endTimeStr] = line.split(' --> ');
        const startTime = this.parseTimeToSeconds(startTimeStr.trim());
        const endTime = this.parseTimeToSeconds(endTimeStr.trim());
        
        i++; // Move to text line
        let text = '';
        
        // Collect text lines until empty line or end
        while (i < lines.length && lines[i].trim() !== '') {
          if (text) text += ' ';
          text += lines[i].trim();
          i++;
        }
        
        if (text && startTime !== null && endTime !== null) {
          cues.push({
            startTime,
            endTime,
            text: this.cleanSubtitleText(text),
            timeDisplay: this.formatTimeDisplay(startTime)
          });
        }
      }
      i++;
    }
    
    return cues;
  }

  /**
   * Parse SRT subtitle format
   */
  private parseSRT(content: string): SubtitleCue[] {
    const blocks = content.trim().split('\n\n');
    const cues: SubtitleCue[] = [];
    
    for (const block of blocks) {
      const lines = block.split('\n');
      if (lines.length >= 3) {
        // Skip sequence number (first line)
        const timeLine = lines[1];
        const textLines = lines.slice(2);
        
        if (timeLine.includes('-->')) {
          const [startTimeStr, endTimeStr] = timeLine.split(' --> ');
          const startTime = this.parseTimeToSeconds(startTimeStr.trim().replace(',', '.'));
          const endTime = this.parseTimeToSeconds(endTimeStr.trim().replace(',', '.'));
          const text = textLines.join(' ');
          
          if (startTime !== null && endTime !== null) {
            cues.push({
              startTime,
              endTime,
              text: this.cleanSubtitleText(text),
              timeDisplay: this.formatTimeDisplay(startTime)
            });
          }
        }
      }
    }
    
    return cues;
  }

  /**
   * Convert time string (HH:MM:SS.sss or MM:SS.sss) to seconds
   */
  private parseTimeToSeconds(timeString: string): number | null {
    try {
      const parts = timeString.split(':');
      let seconds = 0;
      
      if (parts.length === 3) {
        // HH:MM:SS.sss format
        const [hours, minutes, secondsWithMs] = parts;
        seconds = parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseFloat(secondsWithMs);
      } else if (parts.length === 2) {
        // MM:SS.sss format
        const [minutes, secondsWithMs] = parts;
        seconds = parseInt(minutes) * 60 + parseFloat(secondsWithMs);
      } else {
        return null;
      }
      
      return seconds;
    } catch (error) {
      console.error('Error parsing time string:', timeString, error);
      return null;
    }
  }

  /**
   * Format seconds to display string (M:SS)
   */
  private formatTimeDisplay(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  /**
   * Clean subtitle text (remove HTML tags, extra whitespace)
   */
  private cleanSubtitleText(text: string): string {
    return text
      .replace(/<[^>]*>/g, '') // Remove HTML tags
      .replace(/\s+/g, ' ') // Replace multiple whitespace with single space
      .trim();
  }

  /**
   * Get current subtitle based on video time
   */
  public getCurrentSubtitle(subtitles: SubtitleCue[], currentTime: number): SubtitleCue | null {
    for (const subtitle of subtitles) {
      if (currentTime >= subtitle.startTime && currentTime < subtitle.endTime) {
        return subtitle;
      }
    }
    return null;
  }

  /**
   * Get next subtitle after current time
   */
  public getNextSubtitle(subtitles: SubtitleCue[], currentTime: number): SubtitleCue | null {
    for (const subtitle of subtitles) {
      if (subtitle.startTime > currentTime) {
        return subtitle;
      }
    }
    return null;
  }

  /**
   * Get previous subtitle before current time
   */
  public getPreviousSubtitle(subtitles: SubtitleCue[], currentTime: number): SubtitleCue | null {
    let previous: SubtitleCue | null = null;
    for (const subtitle of subtitles) {
      if (subtitle.endTime <= currentTime) {
        previous = subtitle;
      } else {
        break;
      }
    }
    return previous;
  }

  /**
   * Search subtitles by text content
   */
  public searchSubtitles(subtitles: SubtitleCue[], query: string): SubtitleCue[] {
    const searchTerm = query.toLowerCase().trim();
    return subtitles.filter(subtitle => 
      subtitle.text.toLowerCase().includes(searchTerm)
    );
  }

  /**
   * Get subtitle statistics
   */
  public getSubtitleStats(subtitles: SubtitleCue[]): {
    totalCues: number;
    totalDuration: number;
    averageDuration: number;
    totalWords: number;
    averageWordsPerCue: number;
  } {
    const totalCues = subtitles.length;
    const totalDuration = subtitles.reduce((sum, cue) => sum + (cue.endTime - cue.startTime), 0);
    const totalWords = subtitles.reduce((sum, cue) => sum + cue.text.split(' ').length, 0);
    
    return {
      totalCues,
      totalDuration,
      averageDuration: totalCues > 0 ? totalDuration / totalCues : 0,
      totalWords,
      averageWordsPerCue: totalCues > 0 ? totalWords / totalCues : 0
    };
  }

  /**
   * Clear subtitle cache
   */
  public clearCache(): void {
    this.subtitleCache.clear();
  }

  /**
   * Remove specific subtitles from cache
   */
  public removeFromCache(source: string, language: string): void {
    const cacheKey = `${source}-${language}`;
    this.subtitleCache.delete(cacheKey);
  }
}