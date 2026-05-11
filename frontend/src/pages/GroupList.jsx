import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';

const GroupList = () => {
  const [groups, setGroups] = null || useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await API.get('/groups');
        setGroups(response.data);
      } catch (error) {
        console.error('Error fetching groups:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchGroups();
  }, []);

  const filteredGroups = groups.filter(g => 
    g.groupName.toLowerCase().includes(search.toLowerCase()) || 
    g.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="page-container group-list-page">
      <div className="group-list-header" style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '2.5rem', color: '#2c3e50', marginBottom: '10px' }}>Discussion Groups</h1>
        <p style={{ fontSize: '1.1rem', color: '#7f8c8d' }}>Join public groups to ask doubts, share resources, and learn together.</p>
        
        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
          <input 
            type="text" 
            placeholder="Search groups by name or topic..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              padding: '12px 20px',
              width: '100%',
              maxWidth: '500px',
              borderRadius: '25px',
              border: '1px solid #dfe6e9',
              boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
              fontSize: '1rem',
              outline: 'none'
            }}
          />
        </div>
      </div>

      {loading ? (
        <div className="loader">Loading groups...</div>
      ) : (
        <div className="groups-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '25px' }}>
          {filteredGroups.length > 0 ? filteredGroups.map(group => {
            const hasJoined = group.members.includes(user.name);
            
            return (
              <div 
                key={group.groupId} 
                className="group-card"
                style={{
                  background: 'white',
                  borderRadius: '16px',
                  padding: '25px',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  border: '1px solid #f1f2f6',
                  cursor: 'pointer'
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                onClick={() => navigate(`/groups/${group.groupId}`)}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                    <h3 style={{ margin: 0, color: '#2c3e50', fontSize: '1.3rem' }}>{group.groupName}</h3>
                    <span style={{ background: '#e1f5fe', color: '#0288d1', padding: '5px 10px', borderRadius: '12px', fontSize: '0.85rem', fontWeight: 'bold' }}>
                      {group.members.length} Members
                    </span>
                  </div>
                  <p style={{ color: '#636e72', fontSize: '1rem', lineHeight: '1.5', marginBottom: '25px' }}>
                    {group.description}
                  </p>
                </div>
                
                <button 
                  className={`btn-${hasJoined ? 'secondary' : 'primary'}`}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    fontWeight: 'bold',
                    fontSize: '1.05rem',
                    background: hasJoined ? '#f1f2f6' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: hasJoined ? '#2c3e50' : 'white',
                    border: 'none',
                    transition: 'opacity 0.2s'
                  }}
                >
                  {hasJoined ? 'Open Chat' : 'Join Group'}
                </button>
              </div>
            );
          }) : (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', color: '#7f8c8d', padding: '40px' }}>
              No groups found matching your search.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GroupList;
