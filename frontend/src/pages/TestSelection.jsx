import { useNavigate } from 'react-router-dom';

const TestOptionCard = ({ title, description, onClick, buttonText }) => (
  <div className="card test-option-card" style={{ padding: '2rem', textAlign: 'center', flex: '1', minWidth: '280px' }}>
    <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#fff' }}>{title}</h3>
    <p style={{ color: '#aaa', marginBottom: '1.5rem', minHeight: '48px' }}>{description}</p>
    <button className="btn-primary" onClick={onClick} style={{ width: '100%', padding: '0.8rem' }}>
      {buttonText}
    </button>
  </div>
);

const TestSelection = () => {
  const navigate = useNavigate();

  return (
    <div className="page-container">
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>📝 Choose Test Type</h1>
      
      <div style={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        justifyContent: 'center', 
        gap: '2rem',
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        <TestOptionCard
          title="Mock Tests"
          description="Attempt full-length mock tests to evaluate your overall GATE preparation."
          buttonText="Attempt Mock Tests"
          onClick={() => navigate('/mock-tests')}
        />
        
        <TestOptionCard
          title="Subjectwise Tests"
          description="Focus on individual subjects to strengthen specific topics and concepts."
          buttonText="Attempt Subjectwise Tests"
          onClick={() => navigate('/subjectwise-tests')}
        />
      </div>
    </div>
  );
};

export default TestSelection;
