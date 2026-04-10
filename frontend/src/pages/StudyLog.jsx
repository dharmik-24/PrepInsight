import { useState, useEffect } from 'react';
import API from '../api/axios';

<<<<<<< HEAD
const FALLBACK_SUBJECTS = [
=======
const SUBJECTS = [
>>>>>>> 0c63af6d2723c019f365484070b62713ce1ed222
  'Data Structures', 'Algorithms', 'Operating Systems', 'DBMS',
  'Computer Networks', 'TOC', 'Compiler Design', 'Digital Logic',
  'Mathematics', 'General Aptitude'
];

const StudyLog = () => {
  const [logs, setLogs] = useState([]);
<<<<<<< HEAD
  const [syllabus, setSyllabus] = useState({});
  const [subjects, setSubjects] = useState(FALLBACK_SUBJECTS);
  const [form, setForm] = useState({ subject: '', topic: '', duration: '', notes: '', date: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchLogs();
    fetchSyllabus();
  }, []);
=======
  const [form, setForm] = useState({ subject: SUBJECTS[0], topic: '', duration: '', notes: '', date: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => { fetchLogs(); }, []);
>>>>>>> 0c63af6d2723c019f365484070b62713ce1ed222

  const fetchLogs = async () => {
    const { data } = await API.get('/studylogs');
    setLogs(data);
  };

<<<<<<< HEAD
  const fetchSyllabus = async () => {
    try {
      const { data } = await API.get('/studylogs/syllabus');
      const subjectList = Object.keys(data);
      if (subjectList.length > 0) {
        setSyllabus(data);
        setSubjects(subjectList);
        setForm(prev => ({
          ...prev,
          subject: subjectList.includes(prev.subject) ? prev.subject : '',
          topic: ''
        }));
      }
    } catch (_err) {
      // If syllabus fetch fails, silently fall back to hardcoded subjects.
    }
  };

=======
>>>>>>> 0c63af6d2723c019f365484070b62713ce1ed222
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post('/studylogs', form);
      setMessage('✅ Study session logged!');
<<<<<<< HEAD
      setForm(prev => ({
        ...prev,
        subject: '',
        topic: '',
        duration: '',
        notes: '',
        date: ''
      }));
=======
      setForm({ subject: SUBJECTS[0], topic: '', duration: '', notes: '', date: '' });
>>>>>>> 0c63af6d2723c019f365484070b62713ce1ed222
      fetchLogs();
    } catch (err) {
      setMessage('❌ Failed to log session');
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this log?')) return;
    await API.delete(`/studylogs/${id}`);
    fetchLogs();
  };

  // Group logs by date
  const groupedLogs = logs.reduce((acc, log) => {
    const date = new Date(log.date).toLocaleDateString();
    if (!acc[date]) acc[date] = [];
    acc[date].push(log);
    return acc;
  }, {});

<<<<<<< HEAD
  const topicsForSelectedSubject = syllabus[form.subject] || [];

=======
>>>>>>> 0c63af6d2723c019f365484070b62713ce1ed222
  return (
    <div className="page-container">
      <h1>📖 Study Log</h1>

      {/* Log Form */}
      <div className="card">
        <h3>Log a Study Session</h3>
        {message && <div className="alert">{message}</div>}
        <form onSubmit={handleSubmit} className="log-form">
          <div className="form-row">
            <div className="form-group">
              <label>Subject</label>
<<<<<<< HEAD
              <select
                required
                value={form.subject}
                onChange={e => {
                  const subject = e.target.value;
                  setForm(prev => ({ ...prev, subject, topic: '' }));
                }}
              >
                <option value="">Select subject</option>
                {subjects.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
=======
              <select value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })}>
                {SUBJECTS.map(s => <option key={s}>{s}</option>)}
>>>>>>> 0c63af6d2723c019f365484070b62713ce1ed222
              </select>
            </div>
            <div className="form-group">
              <label>Topic</label>
<<<<<<< HEAD
              <select
                required
                disabled={!form.subject}
                value={form.topic}
                onChange={e => setForm(prev => ({ ...prev, topic: e.target.value }))}
              >
                <option value="">Select topic</option>
                {topicsForSelectedSubject.map(topic => (
                  <option key={topic} value={topic}>{topic}</option>
                ))}
              </select>
=======
              <input
                type="text" required
                value={form.topic}
                onChange={e => setForm({ ...form, topic: e.target.value })}
                placeholder="e.g., Binary Trees"
              />
>>>>>>> 0c63af6d2723c019f365484070b62713ce1ed222
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Duration (minutes)</label>
              <input
                type="number" required min="1"
                value={form.duration}
                onChange={e => setForm({ ...form, duration: e.target.value })}
                placeholder="e.g., 90"
              />
            </div>
            <div className="form-group">
              <label>Date</label>
              <input
                type="date"
                value={form.date}
                onChange={e => setForm({ ...form, date: e.target.value })}
              />
            </div>
          </div>
          <div className="form-group">
            <label>Notes (optional)</label>
            <textarea
              value={form.notes}
              onChange={e => setForm({ ...form, notes: e.target.value })}
              placeholder="What did you study? Any key takeaways?"
              rows={3}
            />
          </div>
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Logging...' : '+ Log Session'}
          </button>
        </form>
      </div>

      {/* Log History */}
      <div className="card">
        <h3>📅 Study History</h3>
        {Object.entries(groupedLogs).map(([date, dayLogs]) => (
          <div key={date} className="log-day">
            <h4>{date}</h4>
            {dayLogs.map(log => (
              <div key={log._id} className="log-entry">
                <div className="log-info">
                  <span className="log-subject">{log.subject}</span>
                  <span className="log-topic">→ {log.topic}</span>
                  <span className="log-duration">⏱ {log.duration} min</span>
                </div>
                {log.notes && <p className="log-notes">{log.notes}</p>}
                <button onClick={() => handleDelete(log._id)} className="btn-delete">🗑️</button>
              </div>
            ))}
          </div>
        ))}
        {logs.length === 0 && <p className="no-data">No study sessions logged yet.</p>}
      </div>
    </div>
  );
};

export default StudyLog;