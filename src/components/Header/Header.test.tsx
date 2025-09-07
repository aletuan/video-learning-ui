import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Header from './Header';

describe('Header Component', () => {
  test('renders learning platform text', () => {
    render(<Header />);
    const platformText = screen.getByText(/Learning Platform/i);
    expect(platformText).toBeInTheDocument();
  });

  test('renders sign in button', () => {
    render(<Header />);
    const signInButton = screen.getByText(/Sign In/i);
    expect(signInButton).toBeInTheDocument();
  });

  test('renders get started button', () => {
    render(<Header />);
    const getStartedButton = screen.getByText(/Get Started/i);
    expect(getStartedButton).toBeInTheDocument();
  });

  test('renders mobile sidebar toggle button', () => {
    render(<Header />);
    const toggleButton = screen.getByText(/Toggle Sidebar/i);
    expect(toggleButton).toBeInTheDocument();
  });

  test('calls onSidebarToggle when toggle button is clicked', async () => {
    const mockToggle = jest.fn();
    render(<Header onSidebarToggle={mockToggle} />);
    
    // Find button by role and accessible name
    const toggleButton = screen.getByRole('button', { name: /toggle sidebar/i });
    fireEvent.click(toggleButton);
    
    // Wait for the callback to be called after animation delay
    await waitFor(() => {
      expect(mockToggle).toHaveBeenCalledTimes(1);
    });
  });

  test('sign in and get started buttons are clickable', () => {
    render(<Header />);
    
    const signInButton = screen.getByText(/Sign In/i);
    const getStartedButton = screen.getByText(/Get Started/i);
    
    expect(signInButton).toBeEnabled();
    expect(getStartedButton).toBeEnabled();
    
    fireEvent.click(signInButton);
    fireEvent.click(getStartedButton);
  });
});