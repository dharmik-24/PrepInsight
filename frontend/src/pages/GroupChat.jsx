import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';

// Assuming backend runs on the same host or environment variable
const SOCKET_URL = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace('/api', '') : 'http://localhost:5000';

const GroupChat = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [socket, setSocket] = useState(null);
  const [groupInfo, setGroupInfo] = useState(null);
  const [groups, setGroups] = useState([]);
  const [messages, setMessages] = useState([]);
  const [optimisticMessages, setOptimisticMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  // Auto-scroll
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, optimisticMessages]);

  // Fetch groups to show in sidebar and get current group info
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await API.get('/groups');
        setGroups(response.data);
        const current = response.data.find(g => g.groupId === groupId);
        if (current) setGroupInfo(current);
      } catch (err) {
        console.error('Error fetching groups', err);
      }
    };
    fetchGroups();
  }, [groupId]);

  // Setup Socket.IO
  useEffect(() => {
    if (!user || !groupId) return;

    const newSocket = io(SOCKET_URL);
    setSocket(newSocket);

    const handleJoin = () => {
      newSocket.emit('joinGroup', { groupId, user });
    };

    if (newSocket.connected) {
      handleJoin();
    }

    newSocket.on('connect', handleJoin);

    newSocket.on('loadMessages', (loadedMessages) => {
      setMessages(loadedMessages);
    });

    newSocket.on('newMessage', (message) => {
      setMessages(prev => [...prev, message]);
    });

    newSocket.on('groupUpdated', ({ groupId: updatedGroupId, membersCount }) => {
      if (updatedGroupId === groupId) {
        setGroupInfo(prev => prev ? { ...prev, members: Array(membersCount).fill('placeholder') } : prev);
      }
    });

    return () => {
      newSocket.disconnect();
    };
  }, [groupId, user]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file.');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB.');
        return;
      }
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() && !imageFile) return;

    const tempId = 'temp-' + Date.now();
    const messageToSend = inputMessage.trim();
    const fileToSend = imageFile;

    // 1. Optimistic UI Update: Show message immediately
    const tempMessage = {
      id: tempId,
      sender: user.name,
      message: messageToSend,
      imageUrl: imagePreview, // Use the local base64 preview instantly
      timestamp: new Date().toISOString(),
      isUploading: !!fileToSend
    };
    
    setOptimisticMessages(prev => [...prev, tempMessage]);
    
    // 2. Clear input fields immediately for instant UI response
    setInputMessage('');
    clearImage();

    let uploadedImageUrl = null;

    // 3. Upload image in the background if exists
    if (fileToSend) {
      setIsUploading(true);
      const formData = new FormData();
      formData.append('image', fileToSend);
      try {
        const response = await API.post('/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        // Cloudinary returns a complete secure_url
        uploadedImageUrl = response.data.imageUrl; 
      } catch (err) {
        console.error('Image upload failed', err);
        alert('Failed to upload image.');
        setOptimisticMessages(prev => prev.filter(m => m.id !== tempId));
        setIsUploading(false);
        return;
      }
      setIsUploading(false);
    }

    // 4. Send the final message via Socket
    if (socket) {
      socket.emit('sendMessage', {
        groupId,
        sender: user.name,
        message: messageToSend,
        imageUrl: uploadedImageUrl
      });
      
      // The real message will bounce back via socket very quickly.
      // We remove the optimistic one to prevent duplicates.
      setTimeout(() => {
        setOptimisticMessages(prev => prev.filter(m => m.id !== tempId));
      }, 500);
    } else {
      setOptimisticMessages(prev => prev.filter(m => m.id !== tempId));
    }
  };

  const handleLeaveGroup = () => {
    if (socket) {
      socket.emit('leaveGroup', { groupId, userName: user.name });
    }
    navigate('/groups');
  };

  return (
    <div className="chat-layout" style={{ display: 'flex', height: 'calc(100vh - 70px)', background: '#f8f9fa' }}>
      
      {/* Sidebar */}
      <div className="chat-sidebar" style={{ width: '300px', background: 'white', borderRight: '1px solid #e9ecef', overflowY: 'auto' }}>
        <div style={{ padding: '20px', borderBottom: '1px solid #e9ecef', background: '#f8f9fa' }}>
          <h2 style={{ margin: 0, fontSize: '1.2rem', color: '#2c3e50' }}>Discussion Groups</h2>
        </div>
        <div className="sidebar-groups">
          {groups.map(g => (
            <div 
              key={g.groupId}
              onClick={() => navigate(`/groups/${g.groupId}`)}
              style={{
                padding: '15px 20px',
                borderBottom: '1px solid #f1f3f5',
                cursor: 'pointer',
                background: g.groupId === groupId ? '#ebfbee' : 'white',
                borderLeft: g.groupId === groupId ? '4px solid #2b8a3e' : '4px solid transparent',
                transition: 'background 0.2s'
              }}
            >
              <h4 style={{ margin: '0 0 5px 0', color: '#343a40' }}>{g.groupName}</h4>
              <p style={{ margin: 0, fontSize: '0.85rem', color: '#868e96' }}>{g.members.length} Members</p>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="chat-main" style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#e5ddd5', position: 'relative' }}>
        
        {/* Header */}
        <div className="chat-header" style={{ padding: '15px 25px', background: 'white', borderBottom: '1px solid #e9ecef', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', zIndex: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div style={{ width: '45px', height: '45px', borderRadius: '50%', background: 'linear-gradient(135deg, #2b8a3e 0%, #40c057 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', fontSize: '1.2rem' }}>
              {groupInfo?.groupName?.charAt(0) || '#'}
            </div>
            <div>
              <h2 style={{ margin: 0, fontSize: '1.2rem', color: '#212529' }}>{groupInfo?.groupName || 'Loading...'}</h2>
              <p style={{ margin: '2px 0 0 0', fontSize: '0.85rem', color: '#868e96' }}>
                {groupInfo?.members?.length || 0} participants
              </p>
            </div>
          </div>
          <button 
            onClick={() => setShowLeaveModal(true)}
            style={{ background: 'transparent', border: '1px solid #fa5252', color: '#fa5252', padding: '8px 16px', borderRadius: '20px', cursor: 'pointer', fontWeight: 'bold', transition: 'all 0.2s' }}
            onMouseOver={(e) => { e.currentTarget.style.background = '#fa5252'; e.currentTarget.style.color = 'white'; }}
            onMouseOut={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#fa5252'; }}
          >
            Leave Group
          </button>
        </div>

        {/* Messages Area */}
        <div className="chat-messages" style={{ flex: 1, padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {messages.length === 0 && optimisticMessages.length === 0 ? (
            <div style={{ textAlign: 'center', margin: 'auto', background: 'rgba(255,255,255,0.8)', padding: '10px 20px', borderRadius: '15px', color: '#495057', fontSize: '0.9rem' }}>
              Welcome to {groupInfo?.groupName}! Send a message to start the discussion.
            </div>
          ) : (
            [...messages, ...optimisticMessages].map((msg, idx) => {
              const isMine = msg.sender === user.name;
              const msgDate = new Date(msg.timestamp);
              const timeString = msgDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

              return (
                <div key={msg.id || idx} style={{ display: 'flex', flexDirection: 'column', alignItems: isMine ? 'flex-end' : 'flex-start', margin: '5px 0' }}>
                  <span style={{ 
                    fontSize: '0.75rem', 
                    color: '#495057', 
                    marginLeft: isMine ? '0' : '10px', 
                    marginRight: isMine ? '10px' : '0', 
                    marginBottom: '2px', 
                    fontWeight: 'bold',
                    alignSelf: isMine ? 'flex-end' : 'flex-start'
                  }}>
                    {isMine ? 'You' : msg.sender}
                  </span>
                  <div style={{
                    maxWidth: '75%',
                    background: isMine ? '#dcf8c6' : 'white',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    boxShadow: '0 1px 1px rgba(0,0,0,0.1)',
                    position: 'relative',
                    borderTopRightRadius: isMine ? '0' : '8px',
                    borderTopLeftRadius: !isMine ? '0' : '8px',
                    opacity: msg.isUploading ? 0.6 : 1,
                    transition: 'opacity 0.3s'
                  }}>
                    {msg.imageUrl && (
                      <img 
                        src={msg.imageUrl} 
                        alt="Uploaded" 
                        style={{ maxWidth: '100%', borderRadius: '5px', marginBottom: msg.message ? '5px' : '0', maxHeight: '300px', objectFit: 'contain' }}
                        onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/300?text=Image+Not+Found'; }}
                      />
                    )}
                    {msg.message && (
                      <div style={{ color: '#303030', fontSize: '0.95rem', wordBreak: 'break-word', whiteSpace: 'pre-wrap' }}>
                        {msg.message}
                      </div>
                    )}
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '4px' }}>
                      <span style={{ fontSize: '0.65rem', color: '#999', alignSelf: 'flex-end' }}>{timeString}</span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="chat-input-area" style={{ background: '#f0f2f5', padding: '15px 20px', borderTop: '1px solid #ccc' }}>
          
          {/* Image Preview Area */}
          {imagePreview && (
            <div style={{ position: 'relative', display: 'inline-block', marginBottom: '10px', background: 'white', padding: '5px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
              <img src={imagePreview} alt="Preview" style={{ height: '80px', borderRadius: '5px' }} />
              <button 
                onClick={clearImage}
                style={{ position: 'absolute', top: '-5px', right: '-5px', background: '#fa5252', color: 'white', border: 'none', borderRadius: '50%', width: '20px', height: '20px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}
              >
                ✕
              </button>
            </div>
          )}

          <form onSubmit={handleSendMessage} style={{ display: 'flex', gap: '10px', alignItems: 'flex-end' }}>
            <label style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '12px', background: 'white', borderRadius: '50%', color: '#868e96', transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = '#2b8a3e'} onMouseOut={(e) => e.currentTarget.style.color = '#868e96'}>
              <input 
                type="file" 
                accept="image/*" 
                style={{ display: 'none' }} 
                onChange={handleImageChange}
                ref={fileInputRef}
              />
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
            </label>
            
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage(e);
                }
              }}
              placeholder="Type a message..."
              style={{
                flex: 1,
                padding: '12px 15px',
                borderRadius: '20px',
                border: 'none',
                outline: 'none',
                resize: 'none',
                fontFamily: 'inherit',
                fontSize: '1rem',
                maxHeight: '100px',
                minHeight: '45px',
                overflowY: 'auto'
              }}
              rows={1}
            />
            
            <button 
              type="submit" 
              disabled={(!inputMessage.trim() && !imageFile) || isUploading}
              style={{ 
                background: (!inputMessage.trim() && !imageFile) || isUploading ? '#adb5bd' : '#2b8a3e', 
                color: 'white', 
                border: 'none', 
                borderRadius: '50%', 
                width: '45px', 
                height: '45px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                cursor: (!inputMessage.trim() && !imageFile) || isUploading ? 'not-allowed' : 'pointer',
                transition: 'background 0.2s'
              }}
            >
              {isUploading ? '...' : <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>}
            </button>
          </form>
        </div>
      </div>

      {/* Leave Modal */}
      {showLeaveModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: 'white', padding: '30px', borderRadius: '12px', width: '90%', maxWidth: '400px', textAlign: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}>
            <h3 style={{ marginTop: 0, color: '#343a40' }}>Leave Group?</h3>
            <p style={{ color: '#495057', marginBottom: '25px' }}>Are you sure you want to leave this group? You will stop receiving notifications.</p>
            <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
              <button 
                onClick={() => setShowLeaveModal(false)}
                style={{ padding: '10px 20px', borderRadius: '8px', border: '1px solid #ced4da', background: 'white', cursor: 'pointer', fontWeight: 'bold', color: '#495057' }}
              >
                Cancel
              </button>
              <button 
                onClick={handleLeaveGroup}
                style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', background: '#fa5252', cursor: 'pointer', fontWeight: 'bold', color: 'white' }}
              >
                Leave Group
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupChat;
