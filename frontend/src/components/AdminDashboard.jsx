
import React, { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';

const AdminDashboard = ({ user, onViewChange }) => {
  const [users, setUsers] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [feedbackStats, setFeedbackStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedTab, setSelectedTab] = useState('users');
  const [userFilter, setUserFilter] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [showPairingModal, setShowPairingModal] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    try {
      const auth = getAuth();
      const token = await auth.currentUser.getIdToken();
      
      // Fetch all user profiles
      const usersResponse = await fetch('https://buddybridge-backend-dlkk.onrender.com/users/profiles', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (usersResponse.ok) {
        const usersData = await usersResponse.json();
        setUsers(usersData);
      }

      // Fetch all feedback
      const feedbackResponse = await fetch('https://buddybridge-backend-dlkk.onrender.com/feedback/all', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (feedbackResponse.ok) {
        const feedbackData = await feedbackResponse.json();
        setFeedback(feedbackData);
      }

      // Fetch feedback stats
      const statsResponse = await fetch('https://buddybridge-backend-dlkk.onrender.com/feedback/stats', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (statsResponse.ok) {
        const statsData = await statsResponse.json();
        setFeedbackStats(statsData);
      }

      // Mock sessions data (replace with actual API when available)
      setSessions([
        {
          id: 1,
          user1: 'Urban Kid A',
          user2: 'Rural Kid B',
          scheduledTime: '2025-01-20T15:00:00Z',
          status: 'scheduled'
        },
        {
          id: 2,
          user1: 'NRI Kid C',
          user2: 'Rural Kid D',
          scheduledTime: '2025-01-20T16:30:00Z',
          status: 'completed'
        }
      ]);

    } catch (err) {
      setError('Failed to load admin data');
      console.error('Admin data fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesName = user.name?.toLowerCase().includes(userFilter.toLowerCase()) ||
                       user.email?.toLowerCase().includes(userFilter.toLowerCase());
    const matchesRole = !roleFilter || user.role === roleFilter;
    return matchesName && matchesRole;
  });

  const handleUserSelection = (userId) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const createPairing = async () => {
    if (selectedUsers.length !== 2) {
      alert('Please select exactly 2 users to create a pairing');
      return;
    }

    try {
      const auth = getAuth();
      const token = await auth.currentUser.getIdToken();
      
      // This would be implemented when pairing API is ready
      console.log('Creating pairing for users:', selectedUsers);
      alert('Pairing created successfully! (Mock implementation)');
      setShowPairingModal(false);
      setSelectedUsers([]);
    } catch (err) {
      alert('Failed to create pairing');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'scheduled': return '#3b82f6';
      case 'completed': return '#10b981';
      case 'cancelled': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'Urban': return '#4facfe';
      case 'Rural': return '#43e97b';
      case 'NRI': return '#fa709a';
      case 'Mentor': return '#a8edea';
      default: return '#667eea';
    }
  };

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          padding: '2rem',
          borderRadius: '20px',
          textAlign: 'center'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            border: '4px solid #f3f3f3',
            borderTop: '4px solid #667eea',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 1rem'
          }}></div>
          <p>Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
      padding: '2rem'
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        {/* Header */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          borderRadius: '20px',
          padding: '2rem',
          marginBottom: '2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <h1 style={{
              fontSize: '2.5rem',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              margin: 0,
              fontWeight: '700'
            }}>
              Admin Dashboard
            </h1>
            <p style={{ color: '#666', margin: '0.5rem 0 0 0' }}>
              Manage users, create pairings, and monitor platform activity
            </p>
          </div>
          
        </div>

        {/* Quick Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2rem'
        }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.9)',
            borderRadius: '16px',
            padding: '1.5rem',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>👥</div>
            <div style={{ fontSize: '2rem', fontWeight: '700', color: '#333' }}>
              {users.length}
            </div>
            <div style={{ color: '#666', fontSize: '0.9rem' }}>Total Users</div>
          </div>

          <div style={{
            background: 'rgba(255, 255, 255, 0.9)',
            borderRadius: '16px',
            padding: '1.5rem',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⭐</div>
            <div style={{ fontSize: '2rem', fontWeight: '700', color: '#333' }}>
              {feedbackStats.averageRating || 0}
            </div>
            <div style={{ color: '#666', fontSize: '0.9rem' }}>Avg Rating</div>
          </div>

          <div style={{
            background: 'rgba(255, 255, 255, 0.9)',
            borderRadius: '16px',
            padding: '1.5rem',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>💬</div>
            <div style={{ fontSize: '2rem', fontWeight: '700', color: '#333' }}>
              {feedbackStats.totalFeedback || 0}
            </div>
            <div style={{ color: '#666', fontSize: '0.9rem' }}>Total Feedback</div>
          </div>

          <div style={{
            background: 'rgba(255, 255, 255, 0.9)',
            borderRadius: '16px',
            padding: '1.5rem',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📅</div>
            <div style={{ fontSize: '2rem', fontWeight: '700', color: '#333' }}>
              {sessions.filter(s => s.status === 'scheduled').length}
            </div>
            <div style={{ color: '#666', fontSize: '0.9rem' }}>Upcoming Sessions</div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.9)',
          borderRadius: '16px',
          padding: '1rem',
          marginBottom: '2rem',
          display: 'flex',
          gap: '1rem'
        }}>
          {[
            { id: 'users', label: 'User Management', icon: '👥' },
            { id: 'sessions', label: 'Sessions', icon: '📅' },
            { id: 'feedback', label: 'Feedback', icon: '💬' },
            { id: 'pairings', label: 'Create Pairings', icon: '🤝' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
              style={{
                background: selectedTab === tab.id ? '#667eea' : 'transparent',
                color: selectedTab === tab.id ? 'white' : '#666',
                border: 'none',
                padding: '0.8rem 1.5rem',
                borderRadius: '12px',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '20px',
          padding: '2rem',
          minHeight: '500px'
        }}>
          {selectedTab === 'users' && (
            <div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '2rem',
                flexWrap: 'wrap',
                gap: '1rem'
              }}>
                <h2 style={{ fontSize: '1.8rem', color: '#333', margin: 0 }}>
                  User Management
                </h2>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <input
                    type="text"
                    placeholder="Search users..."
                    value={userFilter}
                    onChange={(e) => setUserFilter(e.target.value)}
                    style={{
                      padding: '0.8rem',
                      borderRadius: '8px',
                      border: '2px solid #e5e7eb',
                      fontSize: '1rem'
                    }}
                  />
                  <select
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                    style={{
                      padding: '0.8rem',
                      borderRadius: '8px',
                      border: '2px solid #e5e7eb',
                      fontSize: '1rem'
                    }}
                  >
                    <option value="">All Roles</option>
                    <option value="Urban">Urban</option>
                    <option value="Rural">Rural</option>
                    <option value="NRI">NRI</option>
                    <option value="Mentor">Mentor</option>
                  </select>
                </div>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '1.5rem'
              }}>
                {filteredUsers.map((user, index) => (
                  <div key={index} style={{
                    background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                    borderRadius: '12px',
                    padding: '1.5rem',
                    border: '2px solid #e5e7eb'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      marginBottom: '1rem'
                    }}>
                      <div style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                        background: getRoleColor(user.role),
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontWeight: 'bold'
                      }}>
                        {user.name ? user.name.charAt(0).toUpperCase() : user.email?.charAt(0).toUpperCase() || '?'}
                      </div>
                      <div>
                        <div style={{ fontWeight: '600', fontSize: '1.1rem' }}>
                          {user.name || 'No Name'}
                        </div>
                        <div style={{ color: '#666', fontSize: '0.9rem' }}>
                          {user.email}
                        </div>
                      </div>
                    </div>
                    
                    <div style={{ marginBottom: '1rem' }}>
                      <span style={{
                        background: getRoleColor(user.role),
                        color: 'white',
                        padding: '0.3rem 0.8rem',
                        borderRadius: '15px',
                        fontSize: '0.8rem',
                        marginRight: '0.5rem'
                      }}>
                        {user.role || 'No Role'}
                      </span>
                      {user.location && (
                        <span style={{ color: '#666', fontSize: '0.9rem' }}>
                          📍 {user.location}
                        </span>
                      )}
                    </div>

                    <div style={{ fontSize: '0.8rem', color: '#666' }}>
                      Created: {user.created_at ? new Date(user.created_at).toLocaleDateString() : 'Unknown'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'sessions' && (
            <div>
              <h2 style={{ fontSize: '1.8rem', color: '#333', marginBottom: '2rem' }}>
                Session Overview
              </h2>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                gap: '1.5rem'
              }}>
                {sessions.map((session, index) => (
                  <div key={index} style={{
                    background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                    borderRadius: '12px',
                    padding: '1.5rem',
                    border: '2px solid #e5e7eb'
                  }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      marginBottom: '1rem'
                    }}>
                      <div>
                        <div style={{ fontWeight: '600', fontSize: '1.1rem', marginBottom: '0.5rem' }}>
                          {session.user1} ↔ {session.user2}
                        </div>
                        <div style={{ color: '#666', fontSize: '0.9rem' }}>
                          📅 {new Date(session.scheduledTime).toLocaleDateString()}
                        </div>
                        <div style={{ color: '#666', fontSize: '0.9rem' }}>
                          🕒 {new Date(session.scheduledTime).toLocaleTimeString()}
                        </div>
                      </div>
                      <span style={{
                        background: getStatusColor(session.status),
                        color: 'white',
                        padding: '0.3rem 0.8rem',
                        borderRadius: '15px',
                        fontSize: '0.8rem',
                        textTransform: 'capitalize'
                      }}>
                        {session.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'feedback' && (
            <div>
              <h2 style={{ fontSize: '1.8rem', color: '#333', marginBottom: '2rem' }}>
                Feedback Summary
              </h2>

              {/* Rating Distribution */}
              {feedbackStats.ratingDistribution && (
                <div style={{
                  background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                  borderRadius: '12px',
                  padding: '2rem',
                  marginBottom: '2rem'
                }}>
                  <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>Rating Distribution</h3>
                  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    {Object.entries(feedbackStats.ratingDistribution).map(([rating, count]) => (
                      <div key={rating} style={{
                        background: 'white',
                        borderRadius: '8px',
                        padding: '1rem',
                        textAlign: 'center',
                        minWidth: '80px'
                      }}>
                        <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>
                          {'⭐'.repeat(parseInt(rating))}
                        </div>
                        <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                          {count}
                        </div>
                        <div style={{ fontSize: '0.8rem', color: '#666' }}>
                          {rating} Star{rating !== '1' ? 's' : ''}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Recent Feedback */}
              <div>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>Recent Feedback</h3>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                  gap: '1.5rem'
                }}>
                  {feedback.slice(0, 6).map((fb, index) => (
                    <div key={index} style={{
                      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                      borderRadius: '12px',
                      padding: '1.5rem',
                      border: '2px solid #e5e7eb'
                    }}>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '1rem'
                      }}>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem'
                        }}>
                          <span>{'⭐'.repeat(fb.rating)}</span>
                          <span style={{ color: '#666', fontSize: '0.9rem' }}>
                            ({fb.rating}/5)
                          </span>
                        </div>
                        <span style={{
                          color: '#666',
                          fontSize: '0.8rem'
                        }}>
                          {new Date(fb.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      
                      <div style={{ marginBottom: '1rem' }}>
                        <div style={{ fontSize: '0.9rem', color: '#666' }}>
                          From: {fb.from_user?.name || 'Unknown'}
                        </div>
                        {fb.to_user && (
                          <div style={{ fontSize: '0.9rem', color: '#666' }}>
                            To: {fb.to_user.name}
                          </div>
                        )}
                      </div>
                      
                      {fb.comment && (
                        <div style={{
                          background: 'white',
                          padding: '1rem',
                          borderRadius: '8px',
                          fontSize: '0.9rem',
                          fontStyle: 'italic'
                        }}>
                          "{fb.comment}"
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {selectedTab === 'pairings' && (
            <div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '2rem'
              }}>
                <h2 style={{ fontSize: '1.8rem', color: '#333', margin: 0 }}>
                  Create User Pairings
                </h2>
                <button
                  onClick={() => setShowPairingModal(true)}
                  style={{
                    background: '#10b981',
                    color: 'white',
                    border: 'none',
                    padding: '0.8rem 1.5rem',
                    borderRadius: '12px',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  Create New Pairing
                </button>
              </div>

              <div style={{
                background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                borderRadius: '12px',
                padding: '2rem',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🤝</div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Manual Pairing Tool</h3>
                <p style={{ color: '#666', marginBottom: '2rem' }}>
                  Select users from different backgrounds to create meaningful buddy pairs.
                  Consider complementary locations, languages, and interests.
                </p>
                
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                  gap: '1rem',
                  marginTop: '2rem'
                }}>
                  {users.filter(u => u.role && u.role !== 'Admin').map((user, index) => (
                    <div key={index} style={{
                      background: selectedUsers.includes(user.uid) ? '#e0f2fe' : 'white',
                      border: selectedUsers.includes(user.uid) ? '2px solid #0891b2' : '2px solid #e5e7eb',
                      borderRadius: '8px',
                      padding: '1rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onClick={() => handleUserSelection(user.uid)}
                    >
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem'
                      }}>
                        <div style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '50%',
                          background: getRoleColor(user.role),
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          fontWeight: 'bold'
                        }}>
                          {user.name ? user.name.charAt(0).toUpperCase() : '?'}
                        </div>
                        <div style={{ textAlign: 'left' }}>
                          <div style={{ fontWeight: '600' }}>
                            {user.name || 'No Name'}
                          </div>
                          <div style={{ color: '#666', fontSize: '0.9rem' }}>
                            {user.role} • {user.location}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {selectedUsers.length > 0 && (
                  <div style={{
                    marginTop: '2rem',
                    padding: '1rem',
                    background: '#f0f9ff',
                    borderRadius: '8px',
                    border: '2px solid #0891b2'
                  }}>
                    <p style={{ margin: '0 0 1rem 0' }}>
                      Selected {selectedUsers.length} user{selectedUsers.length !== 1 ? 's' : ''}
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                      <button
                        onClick={createPairing}
                        disabled={selectedUsers.length !== 2}
                        style={{
                          background: selectedUsers.length === 2 ? '#10b981' : '#9ca3af',
                          color: 'white',
                          border: 'none',
                          padding: '0.8rem 1.5rem',
                          borderRadius: '8px',
                          fontWeight: '600',
                          cursor: selectedUsers.length === 2 ? 'pointer' : 'not-allowed'
                        }}
                      >
                        Create Pairing
                      </button>
                      <button
                        onClick={() => setSelectedUsers([])}
                        style={{
                          background: 'transparent',
                          color: '#ef4444',
                          border: '2px solid #ef4444',
                          padding: '0.8rem 1.5rem',
                          borderRadius: '8px',
                          fontWeight: '600',
                          cursor: 'pointer'
                        }}
                      >
                        Clear Selection
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {error && (
          <div style={{
            background: '#fef2f2',
            border: '1px solid #fecaca',
            color: '#dc2626',
            padding: '1rem',
            borderRadius: '8px',
            marginTop: '1rem'
          }}>
            {error}
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;
