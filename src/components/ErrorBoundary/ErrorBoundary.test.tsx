import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ErrorBoundary from './ErrorBoundary';

// Component that throws an error for testing
const ThrowError = ({ shouldThrow }: { shouldThrow: boolean }) => {
  if (shouldThrow) {
    throw new Error('Test error');
  }
  return <div>No error</div>;
};

describe('ErrorBoundary', () => {
  beforeEach(() => {
    // Suppress console.error for cleaner test output
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    (console.error as jest.Mock).mockRestore();
  });

  test('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={false} />
      </ErrorBoundary>
    );
    
    expect(screen.getByText('No error')).toBeInTheDocument();
  });

  test('renders error UI when there is an error', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );
    
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(screen.getByText('We\'re sorry, but something unexpected happened.')).toBeInTheDocument();
    expect(screen.getByText('Try again')).toBeInTheDocument();
  });

  test('renders custom fallback when provided', () => {
    const customFallback = <div>Custom error message</div>;
    
    render(
      <ErrorBoundary fallback={customFallback}>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );
    
    expect(screen.getByText('Custom error message')).toBeInTheDocument();
    expect(screen.queryByText('Something went wrong')).not.toBeInTheDocument();
  });

  test('shows error details when expanded', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );
    
    const detailsButton = screen.getByText('Error details');
    fireEvent.click(detailsButton);
    
    expect(screen.getByText(/Test error/)).toBeInTheDocument();
  });

  test('resets error state when try again is clicked', () => {
    let shouldThrow = true;
    
    const TestComponent = () => {
      if (shouldThrow) {
        throw new Error('Test error');
      }
      return <div>No error</div>;
    };
    
    const { rerender } = render(
      <ErrorBoundary>
        <TestComponent />
      </ErrorBoundary>
    );
    
    // Error UI should be shown
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    
    // Now stop throwing errors
    shouldThrow = false;
    
    const tryAgainButton = screen.getByText('Try again');
    fireEvent.click(tryAgainButton);
    
    // After retry, error should be cleared and children should render normally
    expect(screen.queryByText('Something went wrong')).not.toBeInTheDocument();
    expect(screen.getByText('No error')).toBeInTheDocument();
  });
});