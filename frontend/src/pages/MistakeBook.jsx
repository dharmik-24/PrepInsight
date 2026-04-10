import { useState, useEffect } from 'react';
import API from '../api/axios';

const SUBJECTS = ['All', 'Data Structures', 'Algorithms', 'Operating Systems', 'DBMS',
  'Computer Networks', 'TOC', 'Compiler Design', 'Digital Logic', 'Mathematics'];

const MistakeBook = () => {
  const [mistakes, setMistakes] = useState([]);
  const [filter, setFilter] = useState('All');
  const [showRevised, setShowRevised] = useState(false);
  const [expanded, setExpanded] = useState(null);

  useEffect(() => { fetchMistakes(); }, [filter, showRevised]);

  const fetchMistakes = async () => {
    const params = {};
    if (filter !== 'All') params.subject = filter;
    if (!showRevised) params.revised = 'false';
    const { data } = await API.get('/mistakes', { params });
    setMistakes(data);
  };

  const markRevised = async (id) => {
    await API.put(`/mistakes/${id}/revise`);
    fetchMistakes();
  };

  return (
    <div className="page-container">
      <h1>📖 Mistake Book</h1>
      <p className="subtitle">Review your wrong answers to never repeat mistakes</p>

      {/* Filters */}
      <div className="filter-bar">
        <div className="subject-filters">
          {SUBJECTS.map(s => (
            <button
              key={s}
              className={`filter-btn ${filter === s ? 'active' : ''}`}
              onClick={() => setFilter(s)}
            >
              {s}
            </button>
          ))}
        </div>
        <label className="toggle-label">
          <input
            type="checkbox"
            checked={showRevised}
            onChange={e => setShowRevised(e.target.checked)}
          />
          Show Revised
        </label>
      </div>

      {/* Mistakes List */}
      <div className="mistakes-list">
        {mistakes.map(m => (
          <div key={m._id} className={`mistake-card ${m.isRevised ? 'revised' : ''}`}>
            <div className="mistake-header" onClick={() => setExpanded(expanded === m._id ? null : m._id)}>
              <div>
                <span className="mistake-subject">{m.subject}</span>
                <span className="mistake-topic"> → {m.topic}</span>
              </div>
              <div className="mistake-actions">
                {m.isRevised && <span className="badge-revised">✅ Revised</span>}
                <span>{expanded === m._id ? '▲' : '▼'}</span>
              </div>
            </div>

            {expanded === m._id && (
              <div className="mistake-body">
                <p className="mistake-question">{m.questionText}</p>

                {m.options?.length > 0 && (
                  <div className="mistake-options">
                    {m.options.map((opt, i) => (
                      <div
                        key={i}
                        className={`mistake-option 
                          ${JSON.stringify(m.correctAnswer) === JSON.stringify(opt) ? 'correct' : ''}
                          ${JSON.stringify(m.userAnswer) === JSON.stringify(opt) ? 'wrong' : ''}
                        `}
                      >
                        {String.fromCharCode(65 + i)}. {opt}
                      </div>
                    ))}
                  </div>
                )}

                <div className="mistake-answers">
                  <p>❌ Your answer: <strong>{JSON.stringify(m.userAnswer)}</strong></p>
                  <p>✅ Correct answer: <strong>{JSON.stringify(m.correctAnswer)}</strong></p>
                </div>

                {m.explanation && (
                  <div className="explanation">
                    <strong>💡 Explanation:</strong> {m.explanation}
                  </div>
                )}

                {!m.isRevised && (
                  <button className="btn-primary" onClick={() => markRevised(m._id)}>
                    Mark as Revised ✓
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
        {mistakes.length === 0 && (
          <p className="no-data">
            {showRevised ? 'No mistakes found.' : 'No unrevised mistakes! Great job! 🎉'}
          </p>
        )}
      </div>
    </div>
  );
};

export default MistakeBook;