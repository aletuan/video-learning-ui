import React from 'react';
import { useButtonAnimation } from '../../../../hooks/useButtonAnimation';
import styles from './QuizContent.module.css';

interface QuizQuestion {
  question: string;
  options: { value: string; label: string }[];
}

interface QuizContentProps {
  title: string;
  subtitle: string;
  questions: QuizQuestion[];
  onSubmit: () => void;
}

const QuizContent: React.FC<QuizContentProps> = ({ 
  title, 
  subtitle, 
  questions, 
  onSubmit 
}) => {
  const { handleButtonClick } = useButtonAnimation();

  return (
    <div className={styles.quizSection}>
      <h2>{title}</h2>
      <h3>{subtitle}</h3>
      
      {questions.map((quiz, index) => (
        <div key={index} className={styles.quizQuestion}>
          <h4>{quiz.question}</h4>
          <div className={styles.quizOptions}>
            {quiz.options.map((option, optionIndex) => (
              <label key={optionIndex}>
                <input 
                  type="radio" 
                  name={`q${index + 1}`} 
                  value={option.value} 
                /> 
                {option.label}
              </label>
            ))}
          </div>
        </div>
      ))}
      
      <button 
        className={styles.btnPrimary} 
        style={{marginTop: '20px'}} 
        onClick={handleButtonClick(onSubmit)}
      >
        Submit Quiz
      </button>
    </div>
  );
};

export default QuizContent;