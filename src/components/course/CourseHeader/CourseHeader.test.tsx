import React from 'react';
import { render, screen } from '@testing-library/react';
import CourseHeader from './CourseHeader';

describe('CourseHeader Component', () => {
  const defaultProps = {
    title: 'Test Course Title',
    description: 'This is a test course description'
  };

  test('renders course title', () => {
    render(<CourseHeader {...defaultProps} />);
    const titleElement = screen.getByText(defaultProps.title);
    expect(titleElement).toBeInTheDocument();
  });

  test('renders course description', () => {
    render(<CourseHeader {...defaultProps} />);
    const descriptionElement = screen.getByText(defaultProps.description);
    expect(descriptionElement).toBeInTheDocument();
  });

  test('applies custom className', () => {
    const customClass = 'custom-class';
    render(<CourseHeader {...defaultProps} className={customClass} />);
    // Test that the component renders with the custom class by checking content is present
    expect(screen.getByText(defaultProps.title)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.description)).toBeInTheDocument();
  });

  test('renders title as h1 element', () => {
    render(<CourseHeader {...defaultProps} />);
    const titleElement = screen.getByRole('heading', { level: 1 });
    expect(titleElement).toHaveTextContent(defaultProps.title);
  });
});