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

  const subjectTests = tests.filter(t => t.testType === 'topic-wise');

  if (loading) return <div className="loader">Loading tests...</div>;

  return (
    <div className="page-container">
      <h1>📝 Subject-wise Tests</h1>

      {/* Subject-wise Tests */}
      <div className="card">
        <h3>📚 Subject-wise Tests</h3>
        <p className="subtitle">15 questions | 45 minutes | 25 marks per subject</p>
        <div className="test-grid">
          {subjectTests.map(test => (
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
        {subjectTests.length === 0 && (
          <div>
            <p className="no-data">No subject-wise tests found. Seed the database first:</p>
            <button
              className="btn-secondary"
              onClick={async () => {
                try {
                  await API.get('/tests/seed');
                  window.location.reload();
                } catch (error) {
                  alert(error?.response?.data?.message || 'Failed to seed tests. Check backend server.');
                }
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