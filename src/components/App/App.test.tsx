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

  test('renders video player and subtitles', () => {
    render(<App />);
    // eslint-disable-next-line testing-library/no-node-access
    const videoSection = document.getElementsByClassName('video-section')[0];
    expect(videoSection).toBeInTheDocument();
  });

  test('renders navigation and main content structure', () => {
    render(<App />);
    // eslint-disable-next-line testing-library/no-node-access
    const mainContent = document.getElementsByClassName('main-content')[0];
    expect(mainContent).toBeInTheDocument();
  });

  test('renders application structure', () => {
    render(<App />);
    // eslint-disable-next-line testing-library/no-node-access
    const appContainer = document.getElementsByClassName('App')[0];
    expect(appContainer).toBeInTheDocument();
  });
});
