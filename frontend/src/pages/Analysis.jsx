import { useState, useEffect } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS, CategoryScale, LinearScale,
  BarElement, LineElement, PointElement, Tooltip, Legend
} from 'chart.js';
import API from '../api/axios';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Tooltip, Legend);

const Analysis = () => {
  const [results, setResults] = useState([]);
  const [rankData, setRankData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const [resultsRes, rankRes] = await Promise.all([
        API.get('/results'),
        API.get('/results/rank-prediction')
      ]);
      setResults(resultsRes.data);
      setRankData(rankRes.data);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) return <div className="loader">Loading analysis...</div>;

  // Score trend over time
  const trendData = {
    labels: results.map((_, i) => `Test ${i + 1}`),
    datasets: [{
      label: 'Score',
      data: results.map(r => r.score),
      borderColor: '#6366f1',
      backgroundColor: 'rgba(99,102,241,0.1)',
      fill: true,
      tension: 0.4
    }]
  };

  // Accuracy trend
  const accuracyData = {
    labels: results.map((_, i) => `Test ${i + 1}`),
    datasets: [{
      label: 'Accuracy %',
      data: results.map(r => r.accuracy),
      borderColor: '#10b981',
      backgroundColor: 'rgba(16,185,129,0.1)',
      fill: true,
      tension: 0.4
    }]
  };

  // Collect all weak topics across tests
  const weakTopicFreq = {};
  results.forEach(r => {
    (r.weakTopics || []).forEach(t => {
      weakTopicFreq[t] = (weakTopicFreq[t] || 0) + 1;
    });
  });
  const topWeak = Object.entries(weakTopicFreq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8);

  const weakBarData = {
    labels: topWeak.map(([topic]) => topic),
    datasets: [{
      label: 'Times Wrong',
      data: topWeak.map(([, freq]) => freq),
      backgroundColor: 'rgba(239, 68, 68, 0.7)',
      borderRadius: 4
    }]
  };

  return (
    <div className="page-container">
      <h1>📊 Performance Analysis</h1>

      {/* Rank Predictor */}
      {rankData && rankData.predictedRank && (
        <div className="card rank-card">
          <h3>🏅 GATE Rank Prediction</h3>
          <div className="rank-stats">
            <div className="rank-big">#{rankData.predictedRank.toLocaleString()}</div>
            <div className="rank-details">
              <p>Avg Score: <strong>{rankData.avgScore}</strong></p>
              <p>Avg Accuracy: <strong>{rankData.avgAccuracy}%</strong></p>
              <p>Tests Taken: <strong>{rankData.totalTests}</strong></p>
            </div>
          </div>
          <p className="rank-note">{rankData.note}</p>
        </div>
      )}

      {results.length > 0 ? (
        <>
          {/* Trend Charts */}
          <div className="charts-row">
            <div className="chart-card">
              <h3>📈 Score Trend</h3>
              <Line data={trendData} options={{ responsive: true }} />
            </div>
            <div className="chart-card">
              <h3>🎯 Accuracy Trend</h3>
              <Line data={accuracyData} options={{ responsive: true }} />
            </div>
          </div>

          {/* Weak Topics */}
          {topWeak.length > 0 && (
            <div className="chart-card">
              <h3>⚠️ Weak Topics (Frequency of Mistakes)</h3>
              <Bar data={weakBarData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
            </div>
          )}

          {/* Detailed Results Table */}
          <div className="card">
            <h3>📋 All Test Results</h3>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Test</th>
                  <th>Score</th>
                  <th>Total</th>
                  <th>Accuracy</th>
                  <th>Time</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {results.map(r => (
                  <tr key={r._id}>
                    <td>{r.test?.title || 'N/A'}</td>
                    <td>{r.score}</td>
                    <td>{r.totalMarks}</td>
                    <td>{r.accuracy}%</td>
                    <td>{Math.round(r.timeTaken / 60)} min</td>
                    <td>{new Date(r.completedAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <div className="card">
          <p className="no-data">Take a test to see your performance analysis! 📝</p>
        </div>
      )}
    </div>
  );
};

export default Analysis;