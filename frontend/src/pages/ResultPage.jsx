import React, { useMemo, useState, useEffect } from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import QuestionReviewCard from '../components/QuestionReviewCard';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';
import './ResultPage.css';

const ResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

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

  const [showRecommendation, setShowRecommendation] = useState(false);
  const [recommendedGroupId, setRecommendedGroupId] = useState(null);
  const [hasJoinedGroup, setHasJoinedGroup] = useState(false);

  useEffect(() => {
    const checkRecommendation = async () => {
      if (stats.score <= 10 && test?.subject) {
        // Map subject to groupId (with some fallback standard names)
        const subjectMapping = {
          'Aptitude': 'aptitude',
          'General Aptitude': 'aptitude',
          'Engineering Mathematics': 'engg-maths',
          'Engineering Maths': 'engg-maths',
          'Discrete Mathematics': 'discrete-maths',
          'Discrete Maths': 'discrete-maths',
          'C Programming': 'c-programming',
          'Programming and Data Structures': 'dsa',
          'Data Structures': 'dsa',
          'Algorithms': 'algo',
          'Design and Analysis of Algorithms': 'algo',
          'Operating Systems': 'os',
          'OS': 'os',
          'Theory of Computation': 'toc',
          'TOC': 'toc',
          'Computer Networks': 'cn',
          'CN': 'cn',
          'Computer Organization and Architecture': 'coa',
          'COA': 'coa',
          'Compiler Design': 'compiler-design',
          'Digital Logic': 'digital-logic',
          'Database Management Systems (DBMS)': 'dbms',
          'DBMS': 'dbms'
        };

        const mappedGroupId = subjectMapping[test.subject] || subjectMapping[test.subject.trim()];
        
        if (mappedGroupId && user) {
          try {
            const response = await API.get('/groups');
            const group = response.data.find(g => g.groupId === mappedGroupId);
            if (group) {
              setRecommendedGroupId(mappedGroupId);
              setHasJoinedGroup(group.members.includes(user.name));
              setShowRecommendation(true);
            }
          } catch (err) {
            console.error('Error fetching groups for recommendation', err);
          }
        }
      }
    };
    checkRecommendation();
  }, [stats.score, test?.subject, user]);

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

      {/* Recommendation Popup */}
      {showRecommendation && (
        <div style={{ position: 'fixed', bottom: '30px', right: '30px', background: 'white', padding: '25px', borderRadius: '15px', boxShadow: '0 10px 30px rgba(0,0,0,0.15)', borderLeft: '5px solid #764ba2', zIndex: 1000, maxWidth: '350px', animation: 'slideIn 0.5s ease-out' }}>
          <button onClick={() => setShowRecommendation(false)} style={{ position: 'absolute', top: '10px', right: '10px', background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer', color: '#95a5a6' }}>&times;</button>
          <h3 style={{ margin: '0 0 10px 0', color: '#2c3e50', fontSize: '1.2rem' }}>Need help in {test.subject}?</h3>
          <p style={{ margin: '0 0 20px 0', color: '#7f8c8d', fontSize: '0.95rem', lineHeight: '1.4' }}>
            Your recent {test.subject} test score suggests you may benefit from joining the {test.subject} Discussion Group where students actively discuss doubts, concepts, and questions.
          </p>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button 
              onClick={() => navigate(`/groups/${recommendedGroupId}`)}
              style={{ flex: 1, padding: '10px', borderRadius: '8px', border: 'none', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}
            >
              {hasJoinedGroup ? `Open ${recommendedGroupId.toUpperCase()} Group` : `Join ${recommendedGroupId.toUpperCase()} Group`}
            </button>
            <button 
              onClick={() => setShowRecommendation(false)}
              style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #bdc3c7', background: 'white', color: '#7f8c8d', fontWeight: 'bold', cursor: 'pointer' }}
            >
              Maybe Later
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultPage;