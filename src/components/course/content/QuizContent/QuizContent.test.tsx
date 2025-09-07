import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import QuizContent from './QuizContent';

// Mock the useButtonAnimation hook
jest.mock('../../../../hooks/useButtonAnimation', () => ({
  useButtonAnimation: () => ({
    handleButtonClick: (callback: () => void) => callback
  })
}));

describe('QuizContent Component', () => {
  const defaultProps = {
    title: 'Knowledge Quiz',
    subtitle: 'Test your understanding',
    questions: [
      {
        question: 'What is React?',
        options: [
          { value: 'a', label: 'A JavaScript library' },
          { value: 'b', label: 'A programming language' },
          { value: 'c', label: 'A database' },
          { value: 'd', label: 'An operating system' }
        ]
      },
      {
        question: 'What is JSX?',
        options: [
          { value: 'a', label: 'A syntax extension' },
          { value: 'b', label: 'A framework' }
        ]
      }
    ],
    onSubmit: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders quiz title and subtitle', () => {
    render(<QuizContent {...defaultProps} />);
    
    expect(screen.getByText(defaultProps.title)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.subtitle)).toBeInTheDocument();
  });

  test('renders all questions', () => {
    render(<QuizContent {...defaultProps} />);
    
    defaultProps.questions.forEach(question => {
      expect(screen.getByText(question.question)).toBeInTheDocument();
    });
  });

  test('renders all options for each question', () => {
    render(<QuizContent {...defaultProps} />);
    
    defaultProps.questions.forEach(question => {
      question.options.forEach(option => {
        expect(screen.getByText(option.label)).toBeInTheDocument();
      });
    });
  });

  test('renders radio inputs with correct names', () => {
    render(<QuizContent {...defaultProps} />);
    
    const firstQuestionRadios = screen.getAllByRole('radio', { name: /A JavaScript library|A programming language|A database|An operating system/ });
    const secondQuestionRadios = screen.getAllByRole('radio', { name: /A syntax extension|A framework/ });
    
    expect(firstQuestionRadios).toHaveLength(4);
    expect(secondQuestionRadios).toHaveLength(2);
    
    // Check that radio buttons have correct names for grouping
    firstQuestionRadios.forEach(radio => {
      expect(radio).toHaveAttribute('name', 'q1');
    });
    
    secondQuestionRadios.forEach(radio => {
      expect(radio).toHaveAttribute('name', 'q2');
    });
  });

  test('renders submit button', () => {
    render(<QuizContent {...defaultProps} />);
    
    const submitButton = screen.getByText('Submit Quiz');
    expect(submitButton).toBeInTheDocument();
    expect(submitButton.tagName).toBe('BUTTON');
  });

  test('calls onSubmit when submit button is clicked', () => {
    render(<QuizContent {...defaultProps} />);
    
    const submitButton = screen.getByText('Submit Quiz');
    fireEvent.click(submitButton);
    
    expect(defaultProps.onSubmit).toHaveBeenCalledTimes(1);
  });

  test('allows selecting radio options', () => {
    render(<QuizContent {...defaultProps} />);
    
    const firstOption = screen.getByRole('radio', { name: /A JavaScript library/ });
    fireEvent.click(firstOption);
    
    expect(firstOption).toBeChecked();
  });

  test('radio buttons in same question group are mutually exclusive', () => {
    render(<QuizContent {...defaultProps} />);
    
    const firstOption = screen.getByRole('radio', { name: /A JavaScript library/ });
    const secondOption = screen.getByRole('radio', { name: /A programming language/ });
    
    fireEvent.click(firstOption);
    expect(firstOption).toBeChecked();
    expect(secondOption).not.toBeChecked();
    
    fireEvent.click(secondOption);
    expect(firstOption).not.toBeChecked();
    expect(secondOption).toBeChecked();
  });
});