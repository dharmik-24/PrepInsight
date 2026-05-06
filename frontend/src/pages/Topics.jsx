import { useState, useEffect } from 'react';
import API from '../api/axios';

const STATUS_COLORS = {
  'pending': '#e5e7eb',
  'in-progress': '#fef3c7',
  'completed': '#d1fae5'
};

const formatStatus = (status) => {
  if (status === 'in-progress') return 'In Progress';
  return status.charAt(0).toUpperCase() + status.slice(1);
};

const STATUS_SCORE_MAP = {
  pending: 1,
  'in-progress': 0.7,
  completed: 0.4
};

const DEFAULT_WEIGHTS = {
  status: 0.24,
  recency: 0.2,
  weakness: 0.28,
  subject: 0.1,
  due: 0.18,
  interaction: 0.08
};

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

const buildFallbackBreakdown = (topic) => {
  const statusScore = STATUS_SCORE_MAP[topic.status] ?? 0.5;
  const weaknessScore = clamp(topic.weaknessScore ?? 0.5, 0, 1);
  const dueScore = clamp(topic.dueRatio ?? 0, 0, 1);

  const contributions = [
    { label: 'Status', value: DEFAULT_WEIGHTS.status * statusScore },
    { label: 'Weakness', value: DEFAULT_WEIGHTS.weakness * weaknessScore },
    { label: 'Due', value: DEFAULT_WEIGHTS.due * dueScore },
    { label: 'Interaction', value: DEFAULT_WEIGHTS.interaction * weaknessScore * dueScore }
  ];

  const known = contributions.reduce((sum, item) => sum + item.value, 0);
  const remainder = Math.max(0, (topic.priority ?? 0) - known);

  contributions.push({ label: 'Recency + Subject', value: remainder });
  return contributions.sort((a, b) => b.value - a.value);
};

const Topics = () => {
  const [topics, setTopics] = useState({});
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [revisionPlan, setRevisionPlan] = useState([]);
  const [expandedExplainId, setExpandedExplainId] = useState(null);

  useEffect(() => {
    fetchTopics();
    fetchRevisionPlan();
  }, []);

  const fetchTopics = async () => {
    const { data } = await API.get('/topics');
    setTopics(data);
    setLoading(false);
  };

  const fetchRevisionPlan = async () => {
    const { data } = await API.get('/topics/revision-plan?limit=10');
    setRevisionPlan(data);
  };

  const updateStatus = async (topicId, status) => {
    await API.put(`/topics/${topicId}`, { status });
    await Promise.all([fetchTopics(), fetchRevisionPlan()]);
  };

  if (loading) return <div className="loader">Loading topics...</div>;

  return (
    <div className="page-container topics-page">
      <div className="topics-header">
        <h1>📋 Topic Coverage Tracker</h1>
        <p className="topics-subtitle">Track subject-wise completion and focus your next revision targets.</p>
      </div>

      {/* Overall Progress */}
      <div className="card">
        <h3 className="section-title">Overall GATE CS Progress</h3>
        <div className="subject-progress-grid">
          {Object.entries(topics).map(([subject, data]) => (
            <div
              key={subject}
              className={`subject-card ${selected === subject ? 'selected' : ''}`}
              onClick={() => setSelected(selected === subject ? null : subject)}
            >
              <h4>{subject}</h4>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${data.percentage}%` }}
                />
              </div>
              <span>
                {data.percentage}% ({data.completed}/{data.total})
                {data.inProgress > 0 && (
                  <span className="topic-progress-meta"> · {data.inProgress} in progress</span>
                )}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Expanded topic list for selected subject */}
      {selected && topics[selected] && (
        <div className="card">
          <h3 className="section-title">📖 {selected} Topics</h3>
          <div className="topic-list">
            {topics[selected].topics.map(topic => (
              <div
                key={topic._id}
                className="topic-item"
                style={{ backgroundColor: STATUS_COLORS[topic.status] }}
              >
                <span className="topic-name">{topic.topicName}</span>
                <select
                  value={topic.status}
                  onChange={e => updateStatus(topic._id, e.target.value)}
                  className="status-select"
                >
                  <option value="pending">⬜ Pending</option>
                  <option value="in-progress">🔄 In Progress</option>
                  <option value="completed">✅ Completed</option>
                </select>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Smart Revision Plan */}
      <div className="card">
        <h3 className="section-title">🧠 Smart Revision Plan (Top Priority)</h3>
        {revisionPlan.length > 0 ? (
          <div className="revision-list">
            {revisionPlan.map((t, i) => (
              <div key={t._id} className="revision-item">
                <span className="revision-rank">#{i + 1}</span>
                <div className="revision-details">
                  <div className="revision-title-row">
                    <strong>{t.topicName}</strong>
                    <small> — {t.subject}</small>
                  </div>
                  <div className="revision-meta">
                    <span>Priority: {(t.priority ?? 0).toFixed(2)}</span>
                    {typeof t.weaknessScore === 'number' && (
                      <span>Weakness: {Math.round(t.weaknessScore * 100)}%</span>
                    )}
                    {typeof t.dueRatio === 'number' && (
                      <span>{t.dueRatio >= 1 ? 'Due now' : 'Upcoming'} ({t.dueRatio.toFixed(2)}x)</span>
                    )}
                  </div>
                  {t.explanation && (
                    <p className="revision-explanation">{t.explanation}</p>
                  )}
                  <div className="explain-row">
                    <button
                      type="button"
                      className="explain-btn"
                      onClick={() => setExpandedExplainId(expandedExplainId === t._id ? null : t._id)}
                    >
                      {expandedExplainId === t._id ? 'Hide score factors' : 'Explain score'}
                    </button>
                  </div>
                  {expandedExplainId === t._id && (
                    <div className="score-popover">
                      <p className="score-popover-title">Score factor contributions</p>
                      <ul className="score-factor-list">
                        {(Array.isArray(t.scoreBreakdown) && t.scoreBreakdown.length > 0
                          ? t.scoreBreakdown
                          : buildFallbackBreakdown(t)
                        ).map((item) => (
                          <li key={`${t._id}-${item.label}`}>
                            <span>{item.label}</span>
                            <strong>{Number(item.value ?? 0).toFixed(3)}</strong>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                <span className={`status-badge ${t.status}`}>{formatStatus(t.status)}</span>
              </div>
            ))}
          </div>
        ) : <p className="no-data">All topics are up to date! 🎉</p>}
      </div>
    </div>
  );
};

export default Topics;