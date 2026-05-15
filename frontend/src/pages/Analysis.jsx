import { useState, useEffect, useMemo } from 'react';
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

  // ✅ STEP 1: Sort by date (important fix)
  const sortedResults = [...results].sort(
    (a, b) => new Date(a.completedAt) - new Date(b.completedAt)
  );

  // ✅ STEP 2: Use ALL full-mock attempts (no filtering loss)
  const mockResultsForCharts = sortedResults.filter(
    r => r.test?.testType === 'full-mock'
  );

  // ✅ STEP 3: OVERALL aggregation (all attempts included)
  const totalScore = sortedResults.reduce((sum, r) => sum + (r.score || 0), 0);
  const totalAccuracy = sortedResults.reduce((sum, r) => sum + (r.accuracy || 0), 0);

  const overallAvgScore = sortedResults.length
    ? (totalScore / sortedResults.length).toFixed(2)
    : 0;

  const overallAvgAccuracy = sortedResults.length
    ? (totalAccuracy / sortedResults.length).toFixed(2)
    : 0;

  // =======================
  // 📈 SCORE TREND
  // =======================
  const trendData = {
    labels: mockResultsForCharts.map((_, i) => `Mock ${i + 1}`),
    datasets: [{
      label: 'Score',
      data: mockResultsForCharts.map(r => r.score),
      borderColor: '#6366f1',
      backgroundColor: 'rgba(99,102,241,0.1)',
      fill: true,
      tension: 0.4
    }]
  };

  // =======================
  // 🎯 ACCURACY TREND
  // =======================
  const accuracyData = {
    labels: mockResultsForCharts.map((_, i) => `Mock ${i + 1}`),
    datasets: [{
      label: 'Accuracy %',
      data: mockResultsForCharts.map(r => r.accuracy),
      borderColor: '#10b981',
      backgroundColor: 'rgba(16,185,129,0.1)',
      fill: true,
      tension: 0.4
    }]
  };

  // =======================
  // ⚠️ WEAK TOPICS
  // =======================
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

      {/* ===================== */}
      {/* RANK PREDICTOR */}
      {/* ===================== */}
      {rankData?.predictedRank ? (
        <div className="card rank-card">
          <h3>🏅 GATE Rank Prediction</h3>

          <div className="rank-stats">
            <div className="rank-big">
              #{rankData.predictedRank.toLocaleString()}
            </div>

            <div className="rank-details">
              {/* ✅ FIX: show true aggregated values */}
              <p>Avg Score: <strong>{overallAvgScore}</strong></p>
              <p>Avg Accuracy: <strong>{overallAvgAccuracy}%</strong></p>
              <p>Mock Tests Taken: <strong>{sortedResults.length}</strong></p>
            </div>
          </div>

          <p className="rank-note">{rankData.note}</p>
        </div>
      ) : (
        <div className="card rank-card" style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '30px',
          opacity: 0.8
        }}>
          <h3 style={{ margin: 0, marginBottom: '10px' }}>
            🏅 GATE Rank Prediction
          </h3>
          <p style={{ color: '#6c757d', fontSize: '1.1rem', margin: 0 }}>
            Take your first Mock Test to unlock your rank prediction!
          </p>
        </div>
      )}

      {/* ===================== */}
      {/* CHARTS */}
      {/* ===================== */}
      {results.length > 0 ? (
        <>
          {mockResultsForCharts.length > 0 ? (
            <div className="charts-row">
              <div className="chart-card">
                <h3>📈 Score Trend (Mock Tests)</h3>
                <Line data={trendData} options={{ responsive: true }} />
              </div>

              <div className="chart-card">
                <h3>🎯 Accuracy Trend (Mock Tests)</h3>
                <Line data={accuracyData} options={{ responsive: true }} />
              </div>
            </div>
          ) : (
            <div className="card" style={{ textAlign: 'center', padding: '30px', marginBottom: '20px' }}>
              <h3>📈 Trend Analysis</h3>
              <p style={{ color: '#6c757d' }}>
                Attempt a Full Mock Test to generate trends.
              </p>
            </div>
          )}

          {/* ===================== */}
          {/* WEAK TOPICS */}
          {/* ===================== */}
          {topWeak.length > 0 && (
            <div className="chart-card">
              <h3>⚠️ Weak Topics (Frequency of Mistakes)</h3>
              <Bar
                data={weakBarData}
                options={{
                  responsive: true,
                  plugins: { legend: { display: false } }
                }}
              />
            </div>
          )}

          {/* ===================== */}
          {/* TABLE */}
          {/* ===================== */}
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
                {sortedResults.map(r => (
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
          <p className="no-data">
            Take a test to see your performance analysis! 📝
          </p>
        </div>
      )}
    </div>
  );
};

export default Analysis;