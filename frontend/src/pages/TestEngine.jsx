import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api/axios';

const TestEngine = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [test, setTest] = useState(null);
  const [answers, setAnswers] = useState({});  // { questionId: answer }
  const [currentQ, setCurrentQ] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState(null);
  const [questionTimes, setQuestionTimes] = useState({}); // time per question
  const [qStartTime, setQStartTime] = useState(Date.now());
  const [testStartTime] = useState(Date.now());

  useEffect(() => {
    const fetchTest = async () => {
      const { data } = await API.get(`/tests/${id}`);
      setTest(data);
      setTimeLeft(data.duration * 60); // Convert to seconds
    };
    fetchTest();
  }, [id]);

  // Countdown timer — auto-submit when time runs out
  const handleSubmit = useCallback(async () => {
    if (submitted || !test) return;
    setSubmitted(true);

    const totalTimeTaken = Math.round((Date.now() - testStartTime) / 1000);

    // Build responses array
    const responses = test.questions.map(q => ({
      questionId: q._id,
      userAnswer: answers[q._id] ?? null,
      timeTaken: questionTimes[q._id] || 0
    }));

    try {
      const { data } = await API.post('/results/submit', {
        testId: id,
        responses,
        timeTaken: totalTimeTaken
      });
      setResult(data.result);
    } catch (err) {
      console.error('Submission failed:', err);
    }
  }, [submitted, test, answers, questionTimes, id, testStartTime]);

  useEffect(() => {
    if (!test || submitted) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [test, submitted, handleSubmit]);

  // Track time spent on each question
  const goToQuestion = (index) => {
    const elapsed = Math.round((Date.now() - qStartTime) / 1000);
    setQuestionTimes(prev => ({
      ...prev,
      [test.questions[currentQ]._id]: (prev[test.questions[currentQ]._id] || 0) + elapsed
    }));
    setCurrentQ(index);
    setQStartTime(Date.now());
  };

  const handleAnswer = (qId, value, type) => {
    if (type === 'msq') {
      // Toggle selection for MSQ
      const current = answers[qId] || [];
      const updated = current.includes(value)
        ? current.filter(v => v !== value)
        : [...current, value];
      setAnswers({ ...answers, [qId]: updated });
    } else {
      setAnswers({ ...answers, [qId]: value });
    }
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  if (!test) return <div className="loader">Loading test...</div>;

  // ─── Results View ───────────────────────────────────────────────
  if (result) {
    return (
      <div className="page-container">
        <div className="card result-card">
          <h2>✅ Test Submitted!</h2>
          <div className="result-stats">
            <div className="stat-card">
              <h3>{result.score}</h3>
              <p>Score / {result.totalMarks}</p>
            </div>
            <div className="stat-card">
              <h3>{result.accuracy}%</h3>
              <p>Accuracy</p>
            </div>
            <div className="stat-card">
              <h3>{Math.round(result.timeTaken / 60)} min</h3>
              <p>Time Taken</p>
            </div>
          </div>
          {result.weakTopics?.length > 0 && (
            <div className="weak-topics">
              <h4>⚠️ Topics to Revise:</h4>
              <div className="tag-list">
                {result.weakTopics.map(t => <span key={t} className="tag">{t}</span>)}
              </div>
            </div>
          )}
          <div className="result-actions">
            <button className="btn-primary" onClick={() => navigate('/analysis')}>
              📊 View Analysis
            </button>
            <button className="btn-secondary" onClick={() => navigate('/tests')}>
              ← Back to Tests
            </button>
          </div>
        </div>
      </div>
    );
  }

  const question = test.questions[currentQ];
  const answered = Object.keys(answers).filter(k => answers[k] !== null && answers[k] !== '').length;

  // ─── Test Interface ─────────────────────────────────────────────
  return (
    <div className="test-engine">
      {/* Header */}
      <div className="test-header">
        <div className="test-title">{test.title}</div>
        <div className={`test-timer ${timeLeft < 300 ? 'timer-warning' : ''}`}>
          ⏱ {formatTime(timeLeft)}
        </div>
        <div className="test-progress">
          {answered}/{test.questions.length} answered
        </div>
        <button className="btn-submit" onClick={handleSubmit}>Submit Test</button>
      </div>

      <div className="test-body">
        {/* Question Panel */}
        <div className="question-panel">
          <div className="question-meta">
            <span>Q{currentQ + 1} of {test.questions.length}</span>
            <span className={`qtype-badge ${question.type}`}>
              {question.type.toUpperCase()}
            </span>
            <span>Marks: +{question.marks} / -{question.negativeMarks}</span>
          </div>

          <div className="question-text">{question.questionText}</div>

          {/* MCQ Options */}
          {question.type === 'mcq' && (
            <div className="options-list">
              {question.options.map((opt, i) => (
                <label key={i} className={`option ${answers[question._id] === opt ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name={question._id}
                    value={opt}
                    checked={answers[question._id] === opt}
                    onChange={() => handleAnswer(question._id, opt, 'mcq')}
                  />
                  <span>{String.fromCharCode(65 + i)}. {opt}</span>
                </label>
              ))}
            </div>
          )}

          {/* MSQ Options */}
          {question.type === 'msq' && (
            <div className="options-list">
              <p className="hint">Select all correct options</p>
              {question.options.map((opt, i) => (
                <label key={i} className={`option ${(answers[question._id] || []).includes(opt) ? 'selected' : ''}`}>
                  <input
                    type="checkbox"
                    value={opt}
                    checked={(answers[question._id] || []).includes(opt)}
                    onChange={() => handleAnswer(question._id, opt, 'msq')}
                  />
                  <span>{String.fromCharCode(65 + i)}. {opt}</span>
                </label>
              ))}
            </div>
          )}

          {/* NAT Input */}
          {question.type === 'nat' && (
            <div className="nat-input">
              <p className="hint">Enter the numerical answer (no options)</p>
              <input
                type="number"
                step="any"
                placeholder="Your answer"
                value={answers[question._id] || ''}
                onChange={e => handleAnswer(question._id, e.target.value, 'nat')}
                className="nat-field"
              />
            </div>
          )}

          {/* Navigation */}
          <div className="nav-buttons">
            <button
              className="btn-secondary"
              disabled={currentQ === 0}
              onClick={() => goToQuestion(currentQ - 1)}
            >← Previous</button>
            <button
              onClick={() => { setAnswers({ ...answers, [question._id]: null }); }}
              className="btn-clear"
            >Clear</button>
            <button
              className="btn-primary"
              disabled={currentQ === test.questions.length - 1}
              onClick={() => goToQuestion(currentQ + 1)}
            >Next →</button>
          </div>
        </div>

        {/* Question Palette */}
        <div className="question-palette">
          <h4>Question Palette</h4>
          <div className="palette-grid">
            {test.questions.map((q, i) => {
              const ans = answers[q._id];
              const isAnswered = ans !== null && ans !== undefined && ans !== '' &&
                !(Array.isArray(ans) && ans.length === 0);
              return (
                <button
                  key={i}
                  className={`palette-btn ${isAnswered ? 'answered' : ''} ${i === currentQ ? 'current' : ''}`}
                  onClick={() => goToQuestion(i)}
                >
                  {i + 1}
                </button>
              );
            })}
          </div>
          <div className="palette-legend">
            <span className="dot answered"></span> Answered
            <span className="dot"></span> Not Answered
            <span className="dot current"></span> Current
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestEngine;