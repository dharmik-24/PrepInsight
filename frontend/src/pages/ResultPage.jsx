import React, { useMemo } from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import QuestionReviewCard from '../components/QuestionReviewCard';
import './ResultPage.css';

const ResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Retrieve state passed from TestEngine
  const { test, answers, timeTaken, result } = location.state || {};

  const stats = useMemo(() => {
    if (!test || !answers) return { totalMarks: 0, negativeMarks: 0, score: 0 };

    let totalMarks = 0;
    let negativeMarks = 0;
    let maxMarks = 0;

    test.questions.forEach((q) => {
      maxMarks += (q.marks || 0);
      const userAnswer = answers[q._id];
      const isUnattempted = userAnswer === null || userAnswer === undefined || userAnswer === '' || (Array.isArray(userAnswer) && userAnswer.length === 0);

      if (!isUnattempted) {
        let isCorrect = false;
        if (q.type === 'msq') {
          const correctArr = Array.isArray(q.correctAnswers) ? q.correctAnswers : Array.isArray(q.correctAnswer) ? q.correctAnswer : [];
          const userArr = Array.isArray(userAnswer) ? userAnswer : [];
          isCorrect = correctArr.length === userArr.length && correctArr.every(v => userArr.includes(v));
        } else {
          isCorrect = String(userAnswer).trim() === String(q.correctAnswer).trim();
        }

        if (isCorrect) {
          totalMarks += (q.marks || 0);
        } else {
          negativeMarks += (q.negativeMarks || 0);
        }
      }
    });

    return {
      totalMarks,
      negativeMarks,
      score: totalMarks - negativeMarks,
      maxMarks
    };
  }, [test, answers]);

  if (!test || !answers) {
    return <Navigate to="/tests" replace />;
  }

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="result-page-container">
      <h1 style={{ textAlign: 'center', marginBottom: '1rem', color: '#2c3e50' }}>Test Result Review</h1>
      


      {/* Top Summary Section */}
      <div className="summary-section">
        <div className="summary-card total-marks">
          <h3>{stats.score % 1 === 0 ? stats.score : stats.score.toFixed(2)} / {stats.maxMarks}</h3>
          <p>Total Score</p>
        </div>
        <div className="summary-card total-marks">
          <h3 style={{ color: '#27ae60' }}>+{stats.totalMarks % 1 === 0 ? stats.totalMarks : stats.totalMarks.toFixed(2)}</h3>
          <p>Marks Obtained</p>
        </div>
        <div className="summary-card negative-marks">
          <h3>-{stats.negativeMarks % 1 === 0 ? stats.negativeMarks : stats.negativeMarks.toFixed(2)}</h3>
          <p>Negative Marks</p>
        </div>
        <div className="summary-card time-taken">
          <h3>{formatTime(timeTaken)}</h3>
          <p>Time Taken</p>
        </div>
      </div>

      {/* Question Review Section */}
      <div className="review-section">
        <h2 style={{ marginBottom: '1.5rem', color: '#34495e' }}>Question-by-Question Analysis</h2>
        {test.questions.map((q, index) => (
          <QuestionReviewCard 
            key={q._id} 
            question={q} 
            userAnswer={answers[q._id]} 
            index={index} 
          />
        ))}
      </div>

      <div style={{ 
        textAlign: 'center', 
        margin: '3rem 0 2rem 0', 
        fontSize: '1.8rem', 
        fontWeight: '900', 
        color: stats.score >= 20 ? '#27ae60' : stats.score >= 15 ? '#f39c12' : '#e74c3c' 
      }}>
        {stats.score >= 20 
          ? "You are doing Good. Keep it up" 
          : stats.score >= 15 
            ? "You need more Practice" 
            : "You need to work really hard"}
      </div>

      <div className="result-actions">
        <button className="btn-primary" onClick={() => navigate('/analysis')}>
          📊 View Detailed Analysis
        </button>
        <button className="btn-secondary" onClick={() => navigate('/tests')}>
          ← Back to Tests
        </button>
      </div>
    </div>
  );
};

export default ResultPage;