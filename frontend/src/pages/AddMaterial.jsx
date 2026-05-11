import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';

const AddMaterial = () => {
  const navigate = useNavigate();
  const [subject, setSubject] = useState('');
  const [fileType, setFileType] = useState('');
  const [title, setTitle] = useState('');
  const [uploaderName, setUploaderName] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const subjects = [
    "Programming & Data Structures", "Algorithms", "DBMS", "Operating Systems",
    "Computer Networks", "Theory of Computation", "Compiler Design",
    "Computer Organization & Architecture", "Digital Logic", "Discrete Mathematics",
    "Engineering Mathematics", "Aptitude", "Software Engineering"
  ];

  const handleFileChange = (e) => {
    setError('');
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    // File size validation based on type
    const sizeInMB = selectedFile.size / (1024 * 1024);
    if (fileType === 'image' && sizeInMB > 10) {
      setError('Image must be less than 10 MB');
      setFile(null);
      return;
    }
    if (fileType === 'pdf' && sizeInMB > 25) {
      setError('PDF must be less than 25 MB');
      setFile(null);
      return;
    }
    if (fileType === 'video' && sizeInMB > 100) {
      setError('Video must be less than 100 MB');
      setFile(null);
      return;
    }

    setFile(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!subject || !fileType || !title || !uploaderName || !file) {
      setError('Please fill all fields and select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('subject', subject);
    formData.append('fileType', fileType);
    formData.append('title', title);
    formData.append('uploaderName', uploaderName);
    formData.append('file', file);

    try {
      setLoading(true);
      setError('');
      await API.post('/materials/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Material uploaded successfully!');
      navigate('/info-sharing');
    } catch (err) {
      console.error(err);
      setError('Failed to upload material. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getAcceptType = () => {
    if (fileType === 'image') return 'image/*';
    if (fileType === 'pdf') return 'application/pdf';
    if (fileType === 'video') return 'video/*';
    return '';
  };

  return (
    <div className="page-container add-material-page">
      <div className="form-container" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h1 className="text-center" style={{ marginBottom: '30px' }}>Share Material</h1>
        
        {error && <div className="error-message" style={{ color: 'red', marginBottom: '15px', textAlign: 'center' }}>{error}</div>}
        
        <form onSubmit={handleSubmit} className="auth-form styled-form">
          <div className="form-group">
            <label>Select Subject</label>
            <select 
              value={subject} 
              onChange={(e) => setSubject(e.target.value)} 
              required
            >
              <option value="" disabled>Choose a subject</option>
              {subjects.map(sub => (
                <option key={sub} value={sub}>{sub}</option>
              ))}
            </select>
          </div>

          {subject && (
            <div className="form-group">
              <label>Select Material Type</label>
              <div className="type-options">
                <label className={`type-option ${fileType === 'image' ? 'selected' : ''}`}>
                  <input 
                    type="radio" 
                    name="fileType" 
                    value="image" 
                    checked={fileType === 'image'}
                    onChange={(e) => { setFileType(e.target.value); setFile(null); }}
                  />
                  🖼️ Image (Max 10MB)
                </label>
                <label className={`type-option ${fileType === 'pdf' ? 'selected' : ''}`}>
                  <input 
                    type="radio" 
                    name="fileType" 
                    value="pdf" 
                    checked={fileType === 'pdf'}
                    onChange={(e) => { setFileType(e.target.value); setFile(null); }}
                  />
                  📄 PDF (Max 25MB)
                </label>
                <label className={`type-option ${fileType === 'video' ? 'selected' : ''}`}>
                  <input 
                    type="radio" 
                    name="fileType" 
                    value="video" 
                    checked={fileType === 'video'}
                    onChange={(e) => { setFileType(e.target.value); setFile(null); }}
                  />
                  🎥 Video (Max 100MB)
                </label>
              </div>
            </div>
          )}

          {fileType && (
            <>
              <div className="form-group">
                <label>Material Title / Description</label>
                <input 
                  type="text" 
                  placeholder="e.g. DBMS Normalization Notes"
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)} 
                  required 
                />
              </div>

              <div className="form-group">
                <label>Your Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. Jineet Mehta"
                  value={uploaderName} 
                  onChange={(e) => setUploaderName(e.target.value)} 
                  required 
                />
              </div>

              <div className="form-group file-upload-group">
                <label>Upload File</label>
                <div className="file-input-wrapper">
                  <input 
                    type="file" 
                    accept={getAcceptType()} 
                    onChange={handleFileChange} 
                    required 
                    id="file-upload"
                  />
                  <label htmlFor="file-upload" className="file-upload-btn">
                    {file ? file.name : 'Choose File'}
                  </label>
                </div>
              </div>
            </>
          )}

          <div style={{ marginTop: '30px' }}>
            <button 
              type="submit" 
              className="btn-primary btn-large w-100" 
              disabled={loading || !file}
            >
              {loading ? 'Uploading...' : 'Upload Material 🚀'}
            </button>
            <button 
              type="button" 
              className="btn-secondary w-100" 
              style={{ marginTop: '10px' }}
              onClick={() => navigate('/info-sharing')}
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMaterial;
