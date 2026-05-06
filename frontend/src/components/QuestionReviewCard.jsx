import React from 'react';

const QuestionReviewCard = ({ question, userAnswer, index }) => {
  const isUnattempted = userAnswer === null || userAnswer === undefined || userAnswer === '' || (Array.isArray(userAnswer) && userAnswer.length === 0);
  
  // Basic correctness logic (assuming MCQ string match or MSQ array match)
  let isCorrect = false;
  
  if (!isUnattempted) {
    if (question.type === 'msq') {
      const correctArr = Array.isArray(question.correctAnswers) ? question.correctAnswers : Array.isArray(question.correctAnswer) ? question.correctAnswer : [];
      const userArr = Array.isArray(userAnswer) ? userAnswer : [];
      isCorrect = correctArr.length === userArr.length && correctArr.every(v => userArr.includes(v));
    } else {
      isCorrect = String(userAnswer).trim() === String(question.correctAnswer).trim();
    }
  }

  const renderOptions = () => {
    if (question.type === 'nat') {
      return (
        <div className="nat-review">
          <p><strong>Your Answer:</strong> {isUnattempted ? 'Unattempted' : userAnswer}</p>
          <p><strong>Correct Answer:</strong> {question.correctAnswer}</p>
        </div>
      );
    }

    if (!question.options || question.options.length === 0) return null;

    return (
      <div className="options-list">
        {question.options.map((opt, i) => {
          let optionClass = 'review-option normal';
          let icon = '';

          const isSelected = Array.isArray(userAnswer) ? userAnswer.includes(opt) : userAnswer === opt;
          
          let isActuallyCorrect = false;
          if (question.type === 'msq') {
            const correctArr = Array.isArray(question.correctAnswers) ? question.correctAnswers : Array.isArray(question.correctAnswer) ? question.correctAnswer : [];
            isActuallyCorrect = correctArr.includes(opt);
          } else {
            isActuallyCorrect = question.correctAnswer === opt;
          }

          if (isSelected && isActuallyCorrect) {
            optionClass = 'review-option correct-selected'; // Dark Green
            icon = '✔';
          } else if (isSelected && !isActuallyCorrect) {
            optionClass = 'review-option incorrect-selected'; // Red
            icon = '✖';
          } else if (!isSelected && isActuallyCorrect) {
            optionClass = 'review-option correct-not-selected'; // Light Green
            icon = '✔';
          }

          return (
            <div key={i} className={optionClass}>
              <span>{String.fromCharCode(65 + i)}. {opt}</span>
              {icon && <span className="icon">{icon}</span>}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className={`question-review-card ${isCorrect ? 'border-correct' : isUnattempted ? 'border-unattempted' : 'border-incorrect'}`}>
      <div className="q-header">
        <span className="q-number">Question {index + 1}</span>
        <span className={`q-status ${isCorrect ? 'status-correct' : isUnattempted ? 'status-unattempted' : 'status-incorrect'}`}>
          {isCorrect ? `Correct (+${question.marks})` : isUnattempted ? 'Unattempted (0)' : `Incorrect (-${question.negativeMarks})`}
        </span>
      </div>
      <div className="q-text">{question.questionText}</div>
      {renderOptions()}
      {question.explanation && (
        <div className="q-explanation">
          <strong>Explanation:</strong>
          <p>{question.explanation}</p>
        </div>
      )}

      <div className="q-marks-summary" style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#555', borderTop: '1px solid #eee', paddingTop: '0.75rem' }}>
        {isUnattempted && (
          <strong>Marks awarded:- 0</strong>
        )}
        {!isUnattempted && isCorrect && (
          <strong style={{ color: '#27ae60' }}>Marks awarded:- {question.marks}</strong>
        )}
        {!isUnattempted && !isCorrect && (
          <>
            <strong>Marks awarded:- 0</strong> <br/>
            <strong style={{ color: '#e74c3c' }}>Negative:- {question.negativeMarks || 0}</strong>
          </>
        )}
      </div>
    </div>
  );
};

export default QuestionReviewCard;
