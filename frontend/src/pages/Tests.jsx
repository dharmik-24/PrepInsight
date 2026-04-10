import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';

const Tests = () => {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const { data } = await API.get('/tests');
        setTests(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTests();
  }, []);

  const topicTests = tests.filter(t => t.testType === 'topic-wise');
  const mockTests = tests.filter(t => t.testType === 'full-mock');

  if (loading) return <div className="loader">Loading tests...</div>;

  return (
    <div className="page-container">
      <h1>📝 Mock Tests</h1>

      {/* Full Mock Tests */}
      <div className="card">
        <h3>🏆 Full-Length GATE Mock Tests</h3>
        <p className="subtitle">Simulates real GATE exam: MCQ + MSQ + NAT questions</p>
        <div className="test-grid">
          {mockTests.map(test => (
            <div key={test._id} className="test-card">
              <h4>{test.title}</h4>
              <div className="test-meta">
                <span>⏱ {test.duration} min</span>
                <span>📋 {test.questions?.length || '—'} Questions</span>
                <span>🏅 {test.totalMarks} Marks</span>
              </div>
              <button
                className="btn-primary"
                onClick={() => navigate(`/test/${test._id}`)}
              >
                Start Test →
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Topic-wise Tests */}
      <div className="card">
        <h3>📚 Topic-wise Tests</h3>
        <p className="subtitle">45-minute focused tests per subject</p>
        <div className="test-grid">
          {topicTests.map(test => (
            <div key={test._id} className="test-card">
              <h4>{test.title}</h4>
              <div className="test-meta">
                <span>⏱ {test.duration} min</span>
                <span>📚 {test.subject}</span>
                <span>🏅 {test.totalMarks} Marks</span>
              </div>
              <button
                className="btn-primary"
                onClick={() => navigate(`/test/${test._id}`)}
              >
                Start Test →
              </button>
            </div>
          ))}
        </div>
        {topicTests.length === 0 && (
          <div>
            <p className="no-data">No tests found. Seed the database first:</p>
            <button
              className="btn-secondary"
              onClick={async () => {
                await API.get('/tests/seed');
                window.location.reload();
              }}
            >
              🌱 Seed Question Bank
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tests;