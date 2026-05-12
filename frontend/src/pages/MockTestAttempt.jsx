import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api/axios';

const MockTestAttempt = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [test, setTest] = useState(null);
  const [answers, setAnswers] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [scoreDetails, setScoreDetails] = useState({ netScore: 0, positiveScore: 0, negativeScore: 0, totalMarks: 100, timeTakenSeconds: 0 });
  const [timeLeft, setTimeLeft] = useState(180 * 60);
  const [showIntro, setShowIntro] = useState(true);
  const [savedStatuses, setSavedStatuses] = useState({});
  const [activeSection, setActiveSection] = useState('Aptitude');

  useEffect(() => {
    API.get(`/mock-tests/${id}`)
      .then(res => setTest(res.data))
      .catch(err => {
        console.error("Error fetching test:", err);
        // Fallback if test not found or error
      });
  }, [id]);

  const handleAnswer = (qid, value, type) => {
    if (type === "msq") {
      setAnswers(prev => {
        const currentAns = prev[qid] || [];
        if (currentAns.includes(value)) {
          return { ...prev, [qid]: currentAns.filter(v => v !== value) };
        } else {
          return { ...prev, [qid]: [...currentAns, value] };
        }
      });
    } else {
      setAnswers(prev => ({ ...prev, [qid]: value }));
    }
  };

  const calculateScore = () => {
    let positiveScore = 0;
    let negativeScore = 0;
    let totalMarks = 0;

    test.questions.forEach((q, idx) => {
      totalMarks += q.marks;
      const ans = answers[idx];

      if (q.type === "mcq") {
        if (ans === q.correctAnswer) positiveScore += q.marks;
        else if (ans && ans !== '') negativeScore += q.negativeMarks;
      }

      if (q.type === "msq") {
        if (ans && JSON.stringify(ans.sort()) === JSON.stringify(q.correctAnswer.sort()))
          positiveScore += q.marks;
      }

      if (q.type === "nat") {
        // Use loose equality or parse float for NAT
        if (ans && ans == q.correctAnswer) positiveScore += q.marks;
      }
    });

    return { netScore: positiveScore - negativeScore, positiveScore, negativeScore, totalMarks };
  };

  const handleSubmit = async () => {
    const details = calculateScore();
    const timeTakenSeconds = (180 * 60) - timeLeft;
    details.timeTakenSeconds = timeTakenSeconds;

    const responses = test.questions.map((q, idx) => ({
      questionId: q._id,
      userAnswer: answers[idx] ?? null,
      timeTaken: 0
    }));

    try {
      await API.post('/results/submit', {
        testId: id,
        responses,
        timeTaken: timeTakenSeconds
      });
    } catch (err) {
      console.error('Submission failed:', err);
    }

    setScoreDetails(details);
    setSubmitted(true);
  };

  useEffect(() => {
    const introTimer = setTimeout(() => {
      setShowIntro(false);
    }, 2500);
    return () => clearTimeout(introTimer);
  }, []);

  useEffect(() => {
    if (!test || submitted || showIntro) return;
    const timerId = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timerId);
  }, [test, submitted, showIntro]);

  useEffect(() => {
    if (timeLeft <= 0 && !submitted && test) {
      handleSubmit();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft, submitted, test]);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  if (showIntro) {
    return (
      <div className="page-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <style>
          {`
            @keyframes bounceIn {
              0% { transform: scale(0.5); opacity: 0; }
              60% { transform: scale(1.1); opacity: 1; }
              100% { transform: scale(1); opacity: 1; }
            }
            @keyframes textGlow {
              0% { text-shadow: 0 0 10px #4caf50, 0 0 20px #4caf50; }
              100% { text-shadow: 0 0 20px #81c784, 0 0 40px #81c784; }
            }
          `}
        </style>
        <div style={{
          animation: 'bounceIn 1s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards',
          textAlign: 'center'
        }}>
          <h1 style={{ 
            fontSize: '4rem', 
            color: '#4caf50', 
            marginBottom: '1rem',
            animation: 'textGlow 1.5s infinite alternate'
          }}>
            🌟 All The Best! 🌟
          </h1>
          <p style={{ fontSize: '1.5rem', color: '#aaa', opacity: 0.8 }}>Your test is starting...</p>
        </div>
      </div>
    );
  }

  if (!test) {
    return <div className="page-container" style={{ textAlign: 'center' }}><h2>Loading Test...</h2></div>;
  }

  if (submitted) {
    const timeTakenMinutes = Math.floor(scoreDetails.timeTakenSeconds / 60);
    const totalMinutes = 180;

    let feedbackMessage = "";
    let feedbackColor = "";
    if (scoreDetails.netScore >= 70) {
      feedbackMessage = "Congratulations, You are doing Great work. Keep it up";
      feedbackColor = "#4caf50";
    } else if (scoreDetails.netScore >= 50) {
      feedbackMessage = "Good work done, practice a little more than usual";
      feedbackColor = "#ff9800";
    } else {
      
      feedbackMessage = "You need to get serious. Work harder";
      feedbackColor = "#f44336";
    }
    
    return (
      <div className="page-container" style={{ maxWidth: '800px', margin: '-3rem auto 2rem', padding: '1rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', color: '#fff' }}>Test Submitted Successfully!</h1>
          <p style={{ fontSize: '1.2rem', color: '#ccc', fontWeight: 'bold' }}>{test.title} - Performance Report</p>
        </div>
        
        <div className="card" style={{ padding: '3rem', background: 'linear-gradient(145deg, #1e1e1e 0%, #252525 100%)', borderRadius: '16px', border: '1px solid #333', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h3 style={{ fontSize: '1.2rem', color: '#aaa', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '1rem' }}>Net Marks</h3>
            <div style={{ fontSize: '4.5rem', fontWeight: 'bold', color: scoreDetails.netScore >= 0 ? '#4caf50' : '#f44336', textShadow: scoreDetails.netScore >= 0 ? '0 0 20px rgba(76, 175, 80, 0.3)' : '0 0 20px rgba(244, 67, 54, 0.3)', lineHeight: '1' }}>
              {scoreDetails.netScore} <span style={{ fontSize: '2rem', color: '#666' }}>/ {scoreDetails.totalMarks}</span>
            </div>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
            <div style={{ background: 'rgba(76, 175, 80, 0.05)', border: '1px solid rgba(76, 175, 80, 0.2)', padding: '1.5rem', borderRadius: '12px', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#4caf50', marginBottom: '0.5rem' }}>{scoreDetails.positiveScore}<span style={{ fontSize: '1.2rem', color: '#666', fontWeight: 'normal' }}> / {scoreDetails.totalMarks}</span></div>
              <div style={{ fontSize: '0.85rem', color: '#aaa', textTransform: 'uppercase', letterSpacing: '1px' }}>Positive Marks</div>
            </div>
            
            <div style={{ background: 'rgba(244, 67, 54, 0.05)', border: '1px solid rgba(244, 67, 54, 0.2)', padding: '1.5rem', borderRadius: '12px', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#f44336', marginBottom: '0.5rem' }}>{scoreDetails.negativeScore}<span style={{ fontSize: '1.2rem', color: '#666', fontWeight: 'normal' }}> / {scoreDetails.totalMarks}</span></div>
              <div style={{ fontSize: '0.85rem', color: '#aaa', textTransform: 'uppercase', letterSpacing: '1px' }}>Negative Marks</div>
            </div>
            
            <div style={{ background: 'rgba(33, 150, 243, 0.05)', border: '1px solid rgba(33, 150, 243, 0.2)', padding: '1.5rem', borderRadius: '12px', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#2196f3', marginBottom: '0.5rem' }}>{timeTakenMinutes}<span style={{ fontSize: '1.2rem', color: '#666', fontWeight: 'normal' }}> / {totalMinutes}</span></div>
              <div style={{ fontSize: '0.85rem', color: '#aaa', textTransform: 'uppercase', letterSpacing: '1px' }}>Time Taken (mins)</div>
            </div>
          </div>
          
          <div style={{ textAlign: 'center', marginBottom: '2.5rem', padding: '1.5rem', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '12px', border: `1px solid ${feedbackColor}40` }}>
            <p style={{ fontSize: '1.3rem', fontWeight: 'bold', color: feedbackColor, margin: 0, letterSpacing: '0.5px' }}>
              {feedbackMessage}
            </p>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button className="btn-primary" onClick={() => navigate('/mock-tests')} style={{ padding: '1rem 3rem', fontSize: '1.1rem', borderRadius: '30px', background: 'linear-gradient(45deg, #2196f3, #00bcd4)', border: 'none', boxShadow: '0 4px 15px rgba(33, 150, 243, 0.3)', cursor: 'pointer', transition: 'transform 0.2s', fontWeight: 'bold', color: '#fff' }}>
              Back to Mock Tests
            </button>
          </div>
        </div>
      </div>
    );
  }

  const q = test.questions[currentQuestionIndex];

  const isAnswered = (idx) => {
    const ans = answers[idx];
    if (Array.isArray(ans)) return ans.length > 0;
    return ans !== undefined && ans !== '';
  };

  const handleSaveAndNext = () => {
    setSavedStatuses(prev => ({
      ...prev,
      [currentQuestionIndex]: isAnswered(currentQuestionIndex)
    }));
    if (currentQuestionIndex < test.questions.length - 1) {
      const newIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(newIndex);
      if (newIndex < 10) setActiveSection('Aptitude');
      else setActiveSection('Technical');
    }
  };

  const handleNavigation = (newIndex) => {
    setCurrentQuestionIndex(newIndex);
    if (newIndex < 10) setActiveSection('Aptitude');
    else setActiveSection('Technical');
  };

  const handleSectionChange = (section) => {
    if (activeSection === section) return;
    
    const targetIndex = section === 'Aptitude' ? 0 : 10;
    if (targetIndex >= test.questions.length) {
      alert("This section does not have any questions in the current test.");
      return;
    }
    
    handleNavigation(targetIndex);
  };

  const handleClear = () => {
    setAnswers(prev => {
      const newAnswers = { ...prev };
      delete newAnswers[currentQuestionIndex];
      return newAnswers;
    });
    setSavedStatuses(prev => ({
      ...prev,
      [currentQuestionIndex]: false
    }));
  };

  return (
    <div className="page-container" style={{ maxWidth: '1400px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h1 style={{ margin: 0 }}>{test.title}</h1>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <button 
            className="btn-primary" 
            style={{ backgroundColor: '#f44336', padding: '0.5rem 1.5rem', margin: 0 }}
            onClick={handleSubmit}
          >
            Submit Test
          </button>
          <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: timeLeft <= 300 ? '#f44336' : '#fff', background: '#2a2a2a', padding: '0.5rem 1rem', borderRadius: '8px', border: '1px solid #444' }}>
            ⏱ {formatTime(timeLeft)}
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '2rem', alignItems: 'start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ display: 'flex', gap: '1rem', backgroundColor: '#1e1e1e', padding: '0.5rem', borderRadius: '8px', border: '1px solid #444' }}>
            <button 
              className={activeSection === 'Aptitude' ? 'btn-primary' : 'btn-secondary'}
              onClick={() => handleSectionChange('Aptitude')}
              style={{ flex: 1, padding: '0.75rem', margin: 0, fontSize: '1.1rem', fontWeight: 'bold' }}
            >
              Aptitude
            </button>
            <button 
              className={activeSection === 'Technical' ? 'btn-primary' : 'btn-secondary'}
              onClick={() => handleSectionChange('Technical')}
              style={{ flex: 1, padding: '0.75rem', margin: 0, fontSize: '1.1rem', fontWeight: 'bold' }}
            >
              Technical
            </button>
          </div>

          <div className="card" style={{ padding: '2rem' }}>
          <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ margin: 0 }}>Question {currentQuestionIndex + 1} of {test.questions.length}</h3>
          <span style={{ color: '#aaa', fontSize: '0.9rem' }}>
            Marks: +{q.marks} | Negative: -{q.negativeMarks || 0}
          </span>
        </div>
        
        <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>{q.questionText}</p>
        
        <div style={{ marginBottom: '2rem' }}>
          {q.type === 'mcq' && q.options.map((opt, idx) => (
            <div key={idx} style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <input 
                  type="radio" 
                  name={`q-${currentQuestionIndex}`} 
                  value={opt} 
                  checked={answers[currentQuestionIndex] === opt}
                  onChange={(e) => handleAnswer(currentQuestionIndex, e.target.value, 'mcq')}
                  style={{ marginRight: '10px' }}
                />
                {opt}
              </label>
            </div>
          ))}

          {q.type === 'msq' && q.options.map((opt, idx) => (
            <div key={idx} style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <input 
                  type="checkbox" 
                  value={opt} 
                  checked={(answers[currentQuestionIndex] || []).includes(opt)}
                  onChange={(e) => handleAnswer(currentQuestionIndex, e.target.value, 'msq')}
                  style={{ marginRight: '10px' }}
                />
                {opt}
              </label>
            </div>
          ))}

          {q.type === 'nat' && (
            <div>
              <input 
                type="number" 
                step="any"
                value={answers[currentQuestionIndex] || ''}
                onChange={(e) => handleAnswer(currentQuestionIndex, e.target.value, 'nat')}
                style={{ 
                  padding: '10px', 
                  width: '100%', 
                  maxWidth: '300px', 
                  background: 'var(--card-bg)', 
                  border: '1px solid var(--border-color)', 
                  color: 'var(--text-primary)', 
                  borderRadius: '4px' 
                }}
                placeholder="Enter your answer"
              />
            </div>
          )}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button 
              className="btn-secondary" 
              disabled={currentQuestionIndex === 0}
              onClick={() => handleNavigation(currentQuestionIndex - 1)}
            >
              Previous
            </button>
            
            <button 
              className="btn-primary" 
              disabled={currentQuestionIndex === test.questions.length - 1}
              onClick={handleSaveAndNext}
            >
            Save and Next
            </button>

            <button 
              className="btn-secondary" 
              onClick={handleClear}
              style={{ backgroundColor: 'transparent', color: '#ff9800', border: '1px solid #ff9800' }}
            >
              Clear
            </button>
          </div>
        </div>
        </div>
      </div>

      <div className="card" style={{ padding: '1.5rem', maxHeight: '80vh', overflowY: 'auto' }}>
        <h3 style={{ marginTop: 0, marginBottom: '1rem', borderBottom: '1px solid #444', paddingBottom: '0.5rem' }}>Question Navigator</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(40px, 1fr))', gap: '8px' }}>
          {Array.from({ length: 65 })
            .map((_, i) => i)
            .filter(idx => activeSection === 'Aptitude' ? idx < 10 : idx >= 10)
            .map((idx) => {
            const current = currentQuestionIndex === idx;
            const valid = idx < test.questions.length;
            const answered = valid && savedStatuses[idx];
            
            return (
              <button
                key={idx}
                onClick={() => valid && handleNavigation(idx)}
                style={{
                  padding: '0.5rem 0',
                  borderRadius: '4px',
                  border: `2px solid ${current ? '#2196f3' : (answered ? '#81c784' : '#ccc')}`,
                  backgroundColor: answered ? '#a5d6a7' : '#ffffff',
                  color: '#000000',
                  cursor: valid ? 'pointer' : 'not-allowed',
                  opacity: valid ? 1 : 0.5,
                  fontWeight: 'bold',
                  transition: 'all 0.2s'
                }}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>
        <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem', color: '#aaa' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><div style={{ width: '15px', height: '15px', background: '#a5d6a7', border: '2px solid #81c784', borderRadius: '3px' }}></div> Attempted</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><div style={{ width: '15px', height: '15px', background: '#ffffff', border: '2px solid #2196f3', borderRadius: '3px' }}></div> Current</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><div style={{ width: '15px', height: '15px', background: '#ffffff', border: '2px solid #ccc', borderRadius: '3px' }}></div> Unattempted</div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default MockTestAttempt;
