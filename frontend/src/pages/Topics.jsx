import { useState, useEffect } from 'react';
import API from '../api/axios';

const STATUS_COLORS = {
  'pending': '#e5e7eb',
  'in-progress': '#fef3c7',
  'completed': '#d1fae5'
};

const Topics = () => {
  const [topics, setTopics] = useState({});
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [revisionPlan, setRevisionPlan] = useState([]);

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
    const { data } = await API.get('/topics/revision-plan');
    setRevisionPlan(data);
  };

  const updateStatus = async (topicId, status) => {
    await API.put(`/topics/${topicId}`, { status });
    fetchTopics();
  };

  if (loading) return <div className="loader">Loading topics...</div>;

  return (
    <div className="page-container">
      <h1>📋 Topic Coverage Tracker</h1>

      {/* Overall Progress */}
      <div className="card">
        <h3>Overall GATE CS Progress</h3>
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
          <h3>📖 {selected} Topics</h3>
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
        <h3>🧠 Smart Revision Plan (Top Priority)</h3>
        {revisionPlan.length > 0 ? (
          <div className="revision-list">
            {revisionPlan.map((t, i) => (
              <div key={t._id} className="revision-item">
                <span className="revision-rank">#{i + 1}</span>
                <div>
                  <strong>{t.topicName}</strong>
                  <small> — {t.subject}</small>
                </div>
                <span className={`status-badge ${t.status}`}>{t.status}</span>
              </div>
            ))}
          </div>
        ) : <p className="no-data">All topics are up to date! 🎉</p>}
      </div>
    </div>
  );
};

export default Topics;