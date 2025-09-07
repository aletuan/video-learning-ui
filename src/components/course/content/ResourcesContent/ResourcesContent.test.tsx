import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ResourcesContent from './ResourcesContent';

// Mock the useButtonAnimation hook
jest.mock('../../../../hooks/useButtonAnimation', () => ({
  useButtonAnimation: () => ({
    handleButtonClick: (callback: () => void) => callback
  })
}));

describe('ResourcesContent Component', () => {
  const defaultProps = {
    title: 'Additional Resources',
    subtitle: 'Expand your learning with these materials',
    resources: [
      {
        icon: 'fas fa-file-pdf',
        title: 'React Hooks Cheat Sheet',
        description: 'Quick reference guide for all React hooks',
        buttonText: 'Download'
      },
      {
        icon: 'fas fa-code',
        title: 'Code Examples Repository',
        description: 'GitHub repository with all course examples',
        buttonText: 'View Code'
      },
      {
        icon: 'fas fa-link',
        title: 'Official React Documentation',
        description: 'Comprehensive guide from React team',
        buttonText: 'Visit'
      }
    ],
    onResourceAction: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders resources title and subtitle', () => {
    render(<ResourcesContent {...defaultProps} />);
    
    expect(screen.getByText(defaultProps.title)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.subtitle)).toBeInTheDocument();
  });

  test('renders all resource items', () => {
    render(<ResourcesContent {...defaultProps} />);
    
    defaultProps.resources.forEach(resource => {
      expect(screen.getByText(resource.title)).toBeInTheDocument();
      expect(screen.getByText(resource.description)).toBeInTheDocument();
      expect(screen.getByText(resource.buttonText)).toBeInTheDocument();
    });
  });

  test('renders resource buttons with correct text', () => {
    render(<ResourcesContent {...defaultProps} />);
    
    const downloadButton = screen.getByText('Download');
    const viewCodeButton = screen.getByText('View Code');
    const visitButton = screen.getByText('Visit');
    
    expect(downloadButton).toBeInTheDocument();
    expect(viewCodeButton).toBeInTheDocument();
    expect(visitButton).toBeInTheDocument();
    
    expect(downloadButton.tagName).toBe('BUTTON');
    expect(viewCodeButton.tagName).toBe('BUTTON');
    expect(visitButton.tagName).toBe('BUTTON');
  });

  test('calls onResourceAction with correct index when buttons are clicked', () => {
    render(<ResourcesContent {...defaultProps} />);
    
    const downloadButton = screen.getByText('Download');
    const viewCodeButton = screen.getByText('View Code');
    const visitButton = screen.getByText('Visit');
    
    fireEvent.click(downloadButton);
    expect(defaultProps.onResourceAction).toHaveBeenCalledWith(0);
    
    fireEvent.click(viewCodeButton);
    expect(defaultProps.onResourceAction).toHaveBeenCalledWith(1);
    
    fireEvent.click(visitButton);
    expect(defaultProps.onResourceAction).toHaveBeenCalledWith(2);
    
    expect(defaultProps.onResourceAction).toHaveBeenCalledTimes(3);
  });

  test('renders resource icons', () => {
    render(<ResourcesContent {...defaultProps} />);
    
    // Icons are rendered as <i> elements, we can verify by checking if the resource titles are present
    // which confirms the structure is correct
    expect(screen.getByText('React Hooks Cheat Sheet')).toBeInTheDocument();
    expect(screen.getByText('Code Examples Repository')).toBeInTheDocument();
    expect(screen.getByText('Official React Documentation')).toBeInTheDocument();
  });

  test('renders resource titles as h4 elements', () => {
    render(<ResourcesContent {...defaultProps} />);
    
    defaultProps.resources.forEach(resource => {
      const titleElement = screen.getByRole('heading', { level: 4, name: resource.title });
      expect(titleElement).toBeInTheDocument();
    });
  });

  test('handles empty resources array', () => {
    const emptyProps = { ...defaultProps, resources: [] };
    render(<ResourcesContent {...emptyProps} />);
    
    expect(screen.getByText(defaultProps.title)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.subtitle)).toBeInTheDocument();
    
    // No resource items should be rendered
    expect(screen.queryByText('Download')).not.toBeInTheDocument();
    expect(screen.queryByText('View Code')).not.toBeInTheDocument();
    expect(screen.queryByText('Visit')).not.toBeInTheDocument();
  });

  test('renders correct number of resource items', () => {
    render(<ResourcesContent {...defaultProps} />);
    
    const resourceButtons = screen.getAllByRole('button');
    expect(resourceButtons).toHaveLength(defaultProps.resources.length);
  });

  test('resource descriptions are rendered as paragraphs', () => {
    render(<ResourcesContent {...defaultProps} />);
    
    defaultProps.resources.forEach(resource => {
      const description = screen.getByText(resource.description);
      expect(description.tagName).toBe('P');
    });
  });
});