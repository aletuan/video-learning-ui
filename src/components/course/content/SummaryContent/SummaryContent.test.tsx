import React from 'react';
import { render, screen } from '@testing-library/react';
import SummaryContent from './SummaryContent';

describe('SummaryContent Component', () => {
  const defaultProps = {
    title: 'Test Course Title',
    keyPoints: [
      'First key point',
      'Second key point',
      'Third key point'
    ],
    topics: ['React', 'Testing', 'Components']
  };

  test('renders course title', () => {
    render(<SummaryContent {...defaultProps} />);
    const titleElement = screen.getByText(defaultProps.title);
    expect(titleElement).toBeInTheDocument();
  });

  test('renders all key points', () => {
    render(<SummaryContent {...defaultProps} />);
    
    defaultProps.keyPoints.forEach(point => {
      const pointElement = screen.getByText(point);
      expect(pointElement).toBeInTheDocument();
    });
  });

  test('renders all topic tags', () => {
    render(<SummaryContent {...defaultProps} />);
    
    defaultProps.topics.forEach(topic => {
      const topicElement = screen.getByText(topic);
      expect(topicElement).toBeInTheDocument();
    });
  });

  test('renders section headings', () => {
    render(<SummaryContent {...defaultProps} />);
    
    expect(screen.getByText('Video Summary')).toBeInTheDocument();
    expect(screen.getByText('Key Points')).toBeInTheDocument();
    expect(screen.getByText('Topics Covered')).toBeInTheDocument();
  });

  test('renders correct number of list items', () => {
    render(<SummaryContent {...defaultProps} />);
    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(defaultProps.keyPoints.length);
  });
});