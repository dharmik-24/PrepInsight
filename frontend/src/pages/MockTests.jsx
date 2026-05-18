import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';

const MockTestCard = ({ id, title }) => {
  const navigate = useNavigate();

  return (
    <div
      className="card test-card"
      style={{
        padding: '2rem',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
        border: '1px solid #e2e8f0',
        borderRadius: '16px',
        boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 14px 30px rgba(0,0,0,0.1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'none';
        e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.05)';
      }}
    >
      <h4
        style={{
          marginBottom: '0.75rem',
          fontSize: '1.4rem',
          fontWeight: '700',
          color: '#1e293b',
          letterSpacing: '-0.5px'
        }}
      >
        {title}
      </h4>

      <div
        className="test-meta"
        style={{
          justifyContent: 'center',
          marginBottom: '2rem',
          flex: 1,
          gap: '1.25rem',
          display: 'flex'
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#64748b', fontWeight: '500' }}>
          <span style={{ fontSize: '1.2rem' }}>⏱</span> 180 min
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#64748b', fontWeight: '500' }}>
          <span style={{ fontSize: '1.2rem' }}>🏅</span> 100 Marks
        </span>
      </div>

      <button
        className="btn-primary"
        onClick={() => navigate(`/mock-test/${id}`)}
        style={{ 
          width: '100%', 
          padding: '0.85rem', 
          borderRadius: '10px',
          fontSize: '1.05rem',
          background: 'linear-gradient(90deg, #6366f1, #4f46e5)',
          boxShadow: '0 4px 14px rgba(99, 102, 241, 0.3)'
        }}
      >
        Start Test →
      </button>
    </div>
  );
};

const MockTests = () => {
  const [tests, setTests] = useState([]);

useEffect(() => {
  API.get("/tests")
    .then(res => {
      // Handle MongoDB returning data directly or wrapped in an object
      const data = Array.isArray(res.data)
        ? res.data
        : res.data.tests || [];

      // Debugging anchor: view exactly what the server is responding with
      console.log("Raw tests data fetched from server:", data);

      const mockTests = data.filter(test => {
        // Fallback checks: Ensure title exists and clean up casing/spacing issues
        if (!test || !test.title) return false;
        
        const titleMatches = test.title.toLowerCase().includes("mock test");
        const typeMatches = test.testType === "full-mock";
        
        return titleMatches || typeMatches;
      }).sort((a, b) => a.title.localeCompare(b.title));

      console.log("Filtered mock tests matching criteria:", mockTests);
      setTests(mockTests);
    })
    .catch(err => {
      console.error("Error fetching mock tests:", err);
    });
}, []);


  return (
    <div className="page-container">
      <h1 style={{ marginBottom: '2rem' }}>
        🎯 Full-Length Mock Tests
      </h1>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns:
            'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem',
          maxWidth: '800px',
          margin: '0 auto'
        }}
      >
        {tests.length > 0 ? (
          tests.map((test) => (
            <MockTestCard
              key={test._id}
              id={test._id}
              title={test.title}
            />
          ))
        ) : (
          <p>No mock tests found</p>
        )}
      </div>
    </div>
  );
};

export default MockTests;

