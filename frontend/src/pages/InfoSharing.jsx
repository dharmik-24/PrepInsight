import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';

const InfoSharing = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Edit Modal State
  const [editingMaterial, setEditingMaterial] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editSubject, setEditSubject] = useState('');

  const subjects = [
    "Programming & Data Structures", "Algorithms", "DBMS", "Operating Systems",
    "Computer Networks", "Theory of Computation", "Compiler Design",
    "Computer Organization & Architecture", "Digital Logic", "Discrete Mathematics",
    "Engineering Mathematics", "Aptitude", "Software Engineering"
  ];

  const fetchMaterials = async () => {
    try {
      setLoading(true);
      const { data } = await API.get('/materials');
      setMaterials(data);
      setError(null);
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401) {
        logout();
        navigate('/login');
      } else {
        setError(err.response?.data?.message || 'Failed to load materials. Please ensure Cloudinary is configured correctly.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMaterials();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this material?')) return;
    try {
      // Cloudinary public IDs can contain slashes, so encode them
      await API.delete(`/materials/${encodeURIComponent(id)}`);
      setMaterials(materials.filter(m => m.id !== id));
      alert('Material deleted successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to delete material.');
    }
  };

  const handleEditSave = async (e) => {
    e.preventDefault();
    if (!editingMaterial) return;
    try {
      await API.put(`/materials/${encodeURIComponent(editingMaterial.id)}`, {
        title: editTitle,
        subject: editSubject
      });
      // Refresh list to get updated context
      fetchMaterials();
      setEditingMaterial(null);
      alert('Material updated successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to update material.');
    }
  };

  const openEditModal = (material) => {
    setEditingMaterial(material);
    setEditTitle(material.context?.title || '');
    setEditSubject(material.context?.subject || '');
  };

  const getIconForType = (type) => {
    switch (type) {
      case 'pdf': return '📄';
      case 'video': return '🎥';
      case 'image': return '🖼️';
      default: return '📁';
    }
  };

  if (loading) return <div className="loader">Loading Materials...</div>;

  return (
    <div className="page-container info-sharing-page">
      <div className="info-header">
        <h1>🌐 Info. Sharing</h1>
        <p>Explore and share valuable study materials with the community.</p>
      </div>

      {error && <div className="error-message" style={{ color: 'red', textAlign: 'center', marginBottom: '20px' }}>{error}</div>}

      <div className="materials-grid">
        {materials.length === 0 && !error ? (
          <div className="no-data">No materials uploaded yet. Be the first to share!</div>
        ) : (
          materials.map((mat) => {
            const isOwner = mat.context?.uploadedById === (user?._id || user?.id);
            return (
              <div 
                key={mat.id} 
                className="material-card"
                onClick={() => window.open(mat.url, '_blank', 'noopener,noreferrer')}
                style={{ cursor: 'pointer' }}
              >
                <div className="material-icon">
                  {getIconForType(mat.context?.fileType)}
                </div>
                <div className="material-details">
                  <div className="material-title-container" style={{ marginBottom: '8px' }}>
                    <h3 className="material-title" style={{ marginBottom: '4px', color: 'var(--primary-color)' }} title="Click to view/download">
                      {mat.context?.title || 'Untitled Material'}
                    </h3>
                    <div className="uploader-name" style={{ fontSize: '0.9rem', color: 'var(--text-secondary, #666)' }}>
                      Uploaded by {mat.context?.uploadedBy || 'Unknown'}
                    </div>
                  </div>
                  <div className="material-meta">
                    <span className="badge subject-badge">{mat.context?.subject || 'General'}</span>
                    <span className="meta-text date-text">{new Date(mat.created_at).toLocaleDateString()}</span>
                  </div>
                </div>
                {isOwner && (
                  <div className="material-actions" onClick={(e) => e.stopPropagation()}>
                    <button className="btn-icon edit-btn" onClick={() => openEditModal(mat)} title="Edit">✏️</button>
                    <button className="btn-icon delete-btn" onClick={() => handleDelete(mat.id)} title="Delete">🗑️</button>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      <div className="add-material-section">
        <h2>Got something to share?</h2>
        <button className="btn-primary btn-large" onClick={() => navigate('/add-material')}>
          ➕ Add Your Material
        </button>
      </div>

      {/* Edit Modal */}
      {editingMaterial && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Edit Material</h2>
            <form onSubmit={handleEditSave} className="auth-form">
              <div className="form-group">
                <label>Title</label>
                <input 
                  type="text" 
                  value={editTitle} 
                  onChange={(e) => setEditTitle(e.target.value)} 
                  required 
                />
              </div>
              <div className="form-group">
                <label>Subject</label>
                <select 
                  value={editSubject} 
                  onChange={(e) => setEditSubject(e.target.value)} 
                  required
                >
                  <option value="" disabled>Select Subject</option>
                  {subjects.map(sub => (
                    <option key={sub} value={sub}>{sub}</option>
                  ))}
                </select>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setEditingMaterial(null)}>Cancel</button>
                <button type="submit" className="btn-primary">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default InfoSharing;
