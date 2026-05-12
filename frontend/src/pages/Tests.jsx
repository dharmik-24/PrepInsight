import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';

const Tests = () => {
  const [subjects, setSubjects] = useState([]);
  const [blueprint, setBlueprint] = useState({ totalQuestions: 15, durationMinutes: 45, totalMarks: 25 });
  const [loading, setLoading] = useState(true);
  const [generatingSubject, setGeneratingSubject] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const { data } = await API.get('/tests/subjects');
        setSubjects(data.subjects || []);
        if (data.blueprint) {
          setBlueprint(data.blueprint);
        }
      } catch (err) {
        console.error(err);
        setError(err?.response?.data?.message || 'Unable to load subjects right now');
      } finally {
        setLoading(false);
      }
    };
    fetchSubjects();
  }, []);

  const cacheKeyFor = (subject) => `ai-subject-test:${subject}`;

  const startCachedTestIfAvailable = async (subject) => {
    const cacheRaw = sessionStorage.getItem(cacheKeyFor(subject));
    if (!cacheRaw) return false;

    try {
      const cached = JSON.parse(cacheRaw);
      if (!cached?.testId || !cached?.expiresAt || Date.now() > cached.expiresAt) {
        sessionStorage.removeItem(cacheKeyFor(subject));
        return false;
      }
      await API.get(`/tests/${cached.testId}`);
      navigate(`/test/${cached.testId}`);
      return true;
    } catch (err) {
      sessionStorage.removeItem(cacheKeyFor(subject));
      return false;
    }
  };

  const handleGenerateTest = async (subject) => {
    setError('');
    const usedCache = await startCachedTestIfAvailable(subject);
    if (usedCache) return;

    setGeneratingSubject(subject);
    try {
      const { data } = await API.post('/tests/generate', { subject });
      const testId = data?.test?._id;
      if (!testId) {
        throw new Error('AI returned invalid response');
      }

      sessionStorage.setItem(
        cacheKeyFor(subject),
        JSON.stringify({ testId, expiresAt: Date.now() + 10 * 60 * 1000 })
      );

      navigate(`/test/${testId}`);
    } catch (err) {
      setError(err?.response?.data?.message || err.message || 'Unable to generate test right now');
    } finally {
      setGeneratingSubject('');
    }
  };

  if (loading) return <div className="loader">Loading tests...</div>;

  return (
    <div className="page-container">
      <h1>📝 Subject-wise Tests</h1>

      {/* Subject-wise Tests */}
      <div className="card">
        <h3>📚 Subject-wise Tests</h3>
        <p className="subtitle">
          {blueprint.totalQuestions} questions | {blueprint.durationMinutes} minutes | {blueprint.totalMarks} marks per subject
        </p>
        {error ? <p className="no-data" style={{ color: '#ff8c8c' }}>{error}</p> : null}
        <div className="test-grid">
          {subjects.map(subject => (
            <div key={subject} className="test-card">
              <h4>{subject} - Subject-wise Test</h4>
              <div className="test-meta">
                <span>⏱ {blueprint.durationMinutes} min</span>
                <span>📚 {subject}</span>
                <span>🏅 {blueprint.totalMarks} Marks</span>
              </div>
              <button
                className="btn-primary"
                disabled={generatingSubject === subject}
                onClick={() => handleGenerateTest(subject)}
              >
                {generatingSubject === subject ? 'Generating...' : 'Give Test →'}
              </button>
            </div>
          ))}
        </div>
        {subjects.length === 0 ? <p className="no-data">No subjects found right now.</p> : null}
      </div>
    </div>
  );
};

export default Tests;