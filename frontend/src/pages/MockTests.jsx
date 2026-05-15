import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';

const MockTestCard = ({ id, title }) => {
  const navigate = useNavigate();

  return (
    <div
      className="card test-card"
      style={{
        padding: '1.5rem',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <h4
        style={{
          marginBottom: '1rem',
          fontSize: '1.2rem',
          color: '#fff'
        }}
      >
        {title}
      </h4>

      <div
        className="test-meta"
        style={{
          justifyContent: 'center',
          marginBottom: '1.5rem',
          flex: 1
        }}
      >
        <span style={{ marginRight: '10px' }}>⏱ 180 min</span>
        <span>🏅 100 Marks</span>
      </div>

      <button
        className="btn-primary"
        onClick={() => navigate(`/mock-test/${id}`)}
        style={{ width: '100%' }}
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
      });

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

