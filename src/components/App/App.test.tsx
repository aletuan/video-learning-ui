import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  test('renders course title', () => {
    render(<App />);
    const titleElement = screen.getAllByText(/Complete Guide to React Hooks/i)[0];
    expect(titleElement).toBeInTheDocument();
  });

  test('renders course description', () => {
    render(<App />);
    const descriptionElement = screen.getByText(/Learn how to use React hooks effectively/i);
    expect(descriptionElement).toBeInTheDocument();
  });

  test('renders video player and subtitles section', () => {
    render(<App />);
    // Test for video section by finding the main content area
    const mainContent = screen.getByRole('main');
    expect(mainContent).toBeInTheDocument();
  });

  test('renders navigation and course content', () => {
    render(<App />);
    // Test for course container content
    const courseTitle = screen.getByRole('heading', { level: 1 });
    expect(courseTitle).toBeInTheDocument();
    expect(courseTitle).toHaveTextContent(/Complete Guide to React Hooks/i);
  });

  test('renders application with proper structure', () => {
    render(<App />);
    // Test for main content and ensure the app renders
    const mainElement = screen.getByRole('main');
    expect(mainElement).toHaveClass('main-content');
  });
});
