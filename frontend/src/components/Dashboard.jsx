import React, { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';

const Dashboard = ({ user, userProfile, onViewChange }) => {
  const [buddyPairs, setBuddyPairs] = useState([]);
  const [upcomingSessions, setUpcomingSessions] = useState([]);
  const [recentSessions, setRecentSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user && userProfile) {
      fetchDashboardData();
    }
  }, [user, userProfile]);

  const fetchDashboardData = async () => {
    try {
      const auth = getAuth();
      const token = await auth.currentUser.getIdToken();
      
      // Fetch buddy pairs
      const pairsResponse = await fetch(`https://buddybridge-backend-dlkk.onrender.com/pairs/user/${userProfile.uid}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (pairsResponse.ok) {
        const pairs = await pairsResponse.json();
        setBuddyPairs(pairs);
      }

      // Fetch upcoming sessions
      const sessionsResponse = await fetch(`https://buddybridge-backend-dlkk.onrender.com/sessions/upcoming/${userProfile.uid}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (sessionsResponse.ok) {
        const sessions = await sessionsResponse.json();
        setUpcomingSessions(sessions);
      }

      // Fetch recent sessions
      const recentResponse = await fetch(`https://buddybridge-backend-dlkk.onrender.com/sessions/recent/${userProfile.uid}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (recentResponse.ok) {
        const recent = await recentResponse.json();
        setRecentSessions(recent);
      }

    } catch (err) {
      setError('Failed to load dashboard data');
      console.error('Dashboard data fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleJoinSession = async (sessionId) => {
    try {
      const auth = getAuth();
      const token = await auth.currentUser.getIdToken();
      
      const response = await fetch(`https://buddybridge-backend-dlkk.onrender.com/sessions/${sessionId}/join`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (response.ok) {
        const { meetingUrl } = await response.json();
        window.open(meetingUrl, '_blank');
      } else {
        setError('Failed to join session');
      }
    } catch (err) {
      setError('Error joining session');
    }
  };

  const getInitials = (name) => {
    return name ? name.split(' ').map(n => n[0]).join('').toUpperCase() : user.email.charAt(0).toUpperCase();
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'Urban': return 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)';
      case 'Rural': return 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)';
      case 'NRI': return 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)';
      case 'Mentor': return 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)';
      case 'Admin': return 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
      default: return 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    }
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error('Logout error:', error);
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
          textAlign: 'center',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
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
          <p>Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background decorative elements */}
      <div style={{
        position: 'absolute',
        top: '5%',
        right: '10%',
        width: '300px',
        height: '300px',
        borderRadius: '50%',
        background: 'rgba(255, 255, 255, 0.05)',
        filter: 'blur(60px)',
        animation: 'float 8s ease-in-out infinite'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '10%',
        left: '5%',
        width: '200px',
        height: '200px',
        borderRadius: '50%',
        background: 'rgba(255, 255, 255, 0.03)',
        filter: 'blur(40px)',
        animation: 'float 6s ease-in-out infinite reverse'
      }} />

      <div style={{
        width: '100%',
        padding: '2rem',
        position: 'relative',
        zIndex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        {/* Header Section */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '20px',
          padding: '2rem',
          marginBottom: '2rem',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          width: '100%',
          maxWidth: '100vw'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <div style={{
                background: getRoleColor(userProfile.role),
                borderRadius: '50%',
                padding: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
                width: '80px',
                height: '80px'
              }}>
                <div style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  color: '#333',
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  borderRadius: '50%',
                  width: '60px',
                  height: '60px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {getInitials(userProfile.name)}
                </div>
              </div>
              
              <div>
                <h1 style={{
                  fontSize: '2.2rem',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  marginBottom: '0.5rem',
                  fontWeight: '700',
                  margin: 0
                }}>
                  Welcome back, {userProfile.name}!
                </h1>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  marginTop: '0.5rem',
                  flexWrap: 'wrap'
                }}>
                  <span style={{
                    background: getRoleColor(userProfile.role),
                    color: 'white',
                    padding: '0.3rem 0.8rem',
                    borderRadius: '20px',
                    fontSize: '0.9rem',
                    fontWeight: '600'
                  }}>
                    {userProfile.role} Kid
                  </span>
                  <span style={{ color: '#666', fontSize: '1rem' }}>
                    📍 {userProfile.location}
                  </span>
                  <span style={{ color: '#666', fontSize: '1rem' }}>
                    🗣️ {userProfile.language}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={handleLogout}
              style={{
                background: '#ef4444',
                color: 'white',
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
              🚪 Logout
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2rem',
          width: '100%'
        }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            borderRadius: '16px',
            padding: '1.5rem',
            textAlign: 'center',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>👫</div>
            <div style={{ fontSize: '2rem', fontWeight: '700', color: '#333', margin: '0.5rem 0' }}>
              {buddyPairs.length}
            </div>
            <div style={{ color: '#666', fontSize: '0.9rem' }}>Active Buddy Pairs</div>
          </div>

          <div style={{
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            borderRadius: '16px',
            padding: '1.5rem',
            textAlign: 'center',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📅</div>
            <div style={{ fontSize: '2rem', fontWeight: '700', color: '#333', margin: '0.5rem 0' }}>
              {upcomingSessions.length}
            </div>
            <div style={{ color: '#666', fontSize: '0.9rem' }}>Upcoming Sessions</div>
          </div>

          <div style={{
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            borderRadius: '16px',
            padding: '1.5rem',
            textAlign: 'center',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⭐</div>
            <div style={{ fontSize: '2rem', fontWeight: '700', color: '#333', margin: '0.5rem 0' }}>
              {recentSessions.length}
            </div>
            <div style={{ color: '#666', fontSize: '0.9rem' }}>Completed Sessions</div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '2rem',
          width: '100%'
        }}>
          {/* Upcoming Sessions */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '20px',
            padding: '2rem',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
          }}>
            <h3 style={{
              fontSize: '1.5rem',
              color: '#333',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              🎥 Upcoming Video Sessions
            </h3>
            
            {upcomingSessions.length === 0 ? (
              <div style={{
                textAlign: 'center',
                padding: '2rem',
                color: '#666'
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📅</div>
                <p>No upcoming sessions scheduled</p>
                <p style={{ fontSize: '0.9rem' }}>Check back later or contact your buddy!</p>
              </div>
            ) : (
              upcomingSessions.map((session, index) => (
                <div key={index} style={{
                  background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                  color: 'white',
                  padding: '1.5rem',
                  borderRadius: '12px',
                  marginBottom: '1rem',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '1rem'
                  }}>
                    <div>
                      <div style={{ fontWeight: '600', fontSize: '1.1rem', marginBottom: '0.5rem' }}>
                        Session with {session.buddyName}
                      </div>
                      <div style={{ opacity: 0.9, fontSize: '0.9rem' }}>
                        📅 {new Date(session.scheduledTime).toLocaleDateString()}
                      </div>
                      <div style={{ opacity: 0.9, fontSize: '0.9rem' }}>
                        🕒 {new Date(session.scheduledTime).toLocaleTimeString()}
                      </div>
                    </div>
                    <div style={{
                      background: 'rgba(255, 255, 255, 0.2)',
                      padding: '0.5rem',
                      borderRadius: '8px',
                      fontSize: '0.8rem'
                    }}>
                      {session.duration} min
                    </div>
                  </div>
                  
                  <button
                    onClick={() => handleJoinSession(session.id)}
                    style={{
                      background: 'rgba(255, 255, 255, 0.9)',
                      color: '#4facfe',
                      border: 'none',
                      padding: '0.8rem 1.5rem',
                      borderRadius: '8px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      width: '100%'
                    }}
                  >
                    🚀 Join Session
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Buddy Pairs */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '20px',
            padding: '2rem',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
          }}>
            <h3 style={{
              fontSize: '1.5rem',
              color: '#333',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              👫 Your Buddy Network
            </h3>

            {buddyPairs.length === 0 ? (
              <div style={{
                textAlign: 'center',
                padding: '2rem',
                color: '#666'
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🤝</div>
                <p>No buddy pairs yet</p>
                <p style={{ fontSize: '0.9rem' }}>An admin will pair you with a buddy soon!</p>
              </div>
            ) : (
              buddyPairs.map((pair, index) => (
                <div key={index} style={{
                  background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                  color: 'white',
                  padding: '1.5rem',
                  borderRadius: '12px',
                  marginBottom: '1rem'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    marginBottom: '1rem'
                  }}>
                    <div style={{
                      background: 'rgba(255, 255, 255, 0.2)',
                      borderRadius: '50%',
                      width: '50px',
                      height: '50px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.2rem',
                      fontWeight: 'bold'
                    }}>
                      {getInitials(pair.buddyName)}
                    </div>
                    <div>
                      <div style={{ fontWeight: '600', fontSize: '1.1rem' }}>
                        {pair.buddyName}
                      </div>
                      <div style={{ opacity: 0.9, fontSize: '0.9rem' }}>
                        {pair.buddyRole} • {pair.buddyLocation}
                      </div>
                    </div>
                  </div>
                  
                  <div style={{
                    display: 'flex',
                    gap: '0.5rem',
                    flexWrap: 'wrap'
                  }}>
                    {pair.commonInterests && pair.commonInterests.map((interest, i) => (
                      <span key={i} style={{
                        background: 'rgba(255, 255, 255, 0.2)',
                        padding: '0.3rem 0.8rem',
                        borderRadius: '15px',
                        fontSize: '0.8rem'
                      }}>
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Sessions */}
        {recentSessions.length > 0 && (
          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '20px',
            padding: '2rem',
            marginTop: '2rem',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
          }}>
            <h3 style={{
              fontSize: '1.5rem',
              color: '#333',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              📚 Recent Session History
            </h3>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '1rem'
            }}>
              {recentSessions.slice(0, 3).map((session, index) => (
                <div key={index} style={{
                  background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
                  padding: '1.5rem',
                  borderRadius: '12px',
                  color: '#333'
                }}>
                  <div style={{ fontWeight: '600', fontSize: '1rem', marginBottom: '0.5rem' }}>
                    Session with {session.buddyName}
                  </div>
                  <div style={{ fontSize: '0.9rem', opacity: 0.8, marginBottom: '0.5rem' }}>
                    📅 {new Date(session.completedAt).toLocaleDateString()}
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '0.9rem'
                  }}>
                    <span>Rating:</span>
                    <div>
                      {'⭐'.repeat(session.rating || 0)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          marginTop: '2rem'
        }}>
          <button
            onClick={() => onViewChange('profile')}
            style={{
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '16px',
              padding: '1.5rem',
              cursor: 'pointer',
              textAlign: 'center',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.2s ease'
            }}
            onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
            onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
          >
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⚙️</div>
            <div style={{ fontWeight: '600', color: '#333' }}>Edit Profile</div>
            <div style={{ fontSize: '0.8rem', color: '#666', marginTop: '0.5rem' }}>
              Update your information
            </div>
          </button>

          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '16px',
            padding: '1.5rem',
            textAlign: 'center',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>💬</div>
            <div style={{ fontWeight: '600', color: '#333' }}>Give Feedback</div>
            <div style={{ fontSize: '0.8rem', color: '#666', marginTop: '0.5rem' }}>
              Rate your sessions
            </div>
          </div>

          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '16px',
            padding: '1.5rem',
            textAlign: 'center',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>❓</div>
            <div style={{ fontWeight: '600', color: '#333' }}>Help & Support</div>
            <div style={{ fontSize: '0.8rem', color: '#666', marginTop: '0.5rem' }}>
              Get assistance
            </div>
          </div>
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
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;