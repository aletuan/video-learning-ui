import { subtitleData, SubtitleItem } from './subtitles';

describe('subtitleData', () => {
  it('should contain valid subtitle items', () => {
    expect(subtitleData).toBeDefined();
    expect(Array.isArray(subtitleData)).toBe(true);
    expect(subtitleData.length).toBeGreaterThan(0);
  });

  it('should have subtitle items with required properties', () => {
    subtitleData.forEach((item: SubtitleItem) => {
      expect(item).toHaveProperty('time');
      expect(item).toHaveProperty('text');
      expect(typeof item.time).toBe('number');
      expect(typeof item.text).toBe('string');
      expect(item.time).toBeGreaterThanOrEqual(0);
      expect(item.text.length).toBeGreaterThan(0);
    });
  });

  it('should have subtitles in chronological order', () => {
    for (let i = 1; i < subtitleData.length; i++) {
      expect(subtitleData[i].time).toBeGreaterThanOrEqual(subtitleData[i - 1].time);
    }
  });

  it('should start with time 0', () => {
    expect(subtitleData[0].time).toBe(0);
  });

  it('should contain expected content', () => {
    const firstSubtitle = subtitleData[0];
    expect(firstSubtitle.text).toContain('React hooks');
  });
});