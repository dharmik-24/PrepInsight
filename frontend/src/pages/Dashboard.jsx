import { useState, useEffect } from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS, CategoryScale, LinearScale,
  BarElement, ArcElement, Tooltip, Legend, Title
} from 'chart.js';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';
import Heatmap from '../components/Heatmap';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend, Title);

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [results, setResults] = useState([]);
  const [topics, setTopics] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, resultsRes, topicsRes] = await Promise.all([
          API.get('/studylogs/stats'),
          API.get('/results'),
          API.get('/topics')
        ]);
        setStats(statsRes.data);
        setResults(resultsRes.data);
        setTopics(topicsRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="loader">Loading Dashboard...</div>;

  // Subject-wise study hours chart data
  const subjectLabels = stats?.subjectBreakdown?.map(s => s._id) || [];
  const subjectHours = stats?.subjectBreakdown?.map(s => (s.minutes / 60).toFixed(1)) || [];

  const barData = {
    labels: subjectLabels,
    datasets: [{
      label: 'Hours Studied',
      data: subjectHours,
      backgroundColor: 'rgba(99, 102, 241, 0.7)',
      borderRadius: 6
    }]
  };

  // Topic completion doughnut
  const totalTopics = Object.values(topics).reduce((s, t) => s + t.total, 0);
  const completedTopics = Object.values(topics).reduce((s, t) => s + t.completed, 0);
  const completedTopicLabels = Object.entries(topics).flatMap(([subject, data]) =>
    (data.topics || [])
      .filter(topic => topic.status === 'completed')
      .map(topic => `${subject} - ${topic.topicName}`)
  );
  const MAX_TOOLTIP_TOPICS = 10;

  const doughnutData = {
    labels: ['Completed', 'Remaining'],
    datasets: [{
      data: [completedTopics, totalTopics - completedTopics],
      backgroundColor: ['#10b981', '#e5e7eb']
    }]
  };

  const doughnutOptions = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          afterBody: (tooltipItems) => {
            const isCompletedSlice = tooltipItems?.[0]?.dataIndex === 0;
            if (!isCompletedSlice) return [];
            if (!completedTopicLabels.length) return ['No completed topics yet'];
            const visibleTopics = completedTopicLabels.slice(0, MAX_TOOLTIP_TOPICS);
            const remainingCount = completedTopicLabels.length - visibleTopics.length;
            return [
              'Completed Topics:',
              ...visibleTopics,
              ...(remainingCount > 0 ? [`...and ${remainingCount} more`] : [])
            ];
          }
        }
      }
    }
  };

  // Recent test performance
  const recentResults = results.slice(0, 5);
  const avgScore = results.length
    ? (results.reduce((s, r) => s + r.score, 0) / results.length).toFixed(1)
    : 0;

  return (
    <div className="page-container">
      <h1>Welcome back, {user.name}! 👋</h1>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-icon">⏱️</span>
          <h3>{stats?.totalHours || 0}</h3>
          <p>Total Hours Studied</p>
        </div>
        <div className="stat-card">
          <span className="stat-icon">✅</span>
          <h3>{completedTopics}/{totalTopics}</h3>
          <p>Topics Completed</p>
        </div>
        <div className="stat-card">
          <span className="stat-icon">📝</span>
          <h3>{results.length}</h3>
          <p>Tests Taken</p>
        </div>
        <div className="stat-card">
          <span className="stat-icon">🎯</span>
          <h3>{avgScore}</h3>
          <p>Avg Test Score</p>
        </div>
      </div>

      {/* Charts Row */}
      <div className="charts-row">
        <div className="chart-card">
          <h3>📚 Study Hours by Subject</h3>
          {subjectLabels.length > 0
            ? <Bar data={barData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
            : <p className="no-data">No study logs yet. Start logging!</p>
          }
        </div>
        <div className="chart-card">
          <h3>🗂️ Topic Completion</h3>
          <Doughnut data={doughnutData} options={doughnutOptions} />
          <p className="text-center">{totalTopics ? Math.round((completedTopics / totalTopics) * 100) : 0}% Complete</p>
        </div>
      </div>

      {/* Study Heatmap */}
      <div className="chart-card">
        <h3>🔥 Study Consistency (Last 90 Days)</h3>
        <Heatmap data={stats?.dailyData || []} />
      </div>

      {/* Recent Tests */}
      <div className="chart-card">
        <h3>📊 Recent Test Results</h3>
        {recentResults.length > 0 ? (
          <table className="data-table">
            <thead>
              <tr>
                <th>Test</th>
                <th>Score</th>
                <th>Accuracy</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {recentResults.map(r => (
                <tr key={r._id}>
                  <td>{r.test?.title || 'N/A'}</td>
                  <td>{r.score}/{r.totalMarks}</td>
                  <td>{r.accuracy}%</td>
                  <td>{new Date(r.completedAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : <p className="no-data">Take a test to see results here!</p>}
      </div>
    </div>
  );
};

export default Dashboard;