import React, { useEffect, useState } from 'react';
import { fetchUsers } from './apiClient';
import AuthForm from './components/AuthForm';
import Dashboard from './components/Dashboard';
import ProfileSetup from './components/ProfileSetup';
// Removed import AdminDashboard
import { logout } from './firebaseAuth';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

function App() {
  const [user, setUser] = useState(null);
  const [authToken, setAuthToken] = useState('');
  const [users, setUsers] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [currentView, setCurrentView] = useState('dashboard');

  useEffect(() => {
    fetchUsers()
      .then(data => setUsers(data))
      .catch(err => setFetchError(err.message));
  }, []);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        const token = await firebaseUser.getIdToken();
        setAuthToken(token);
        await fetchUserProfile(firebaseUser.uid, token);
      } else {
        setUser(null);
        setAuthToken('');
        setUserProfile(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchUserProfile = async (uid, token) => {
    try {
      const response = await fetch(`https://buddybridge-backend-dlkk.onrender.com/profile/${uid}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const profile = await response.json();
        setUserProfile(profile);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const handleLogout = async () => {
    await logout();
    setUser(null);
    setAuthToken('');
    setUserProfile(null);
    setCurrentView('dashboard');
  };

  const handleProfileComplete = (profile) => {
    setUserProfile(profile);
    setCurrentView('dashboard');
  };

  const renderCurrentView = () => {
    if (!userProfile) {
      return <ProfileSetup onProfileComplete={handleProfileComplete} />;
    }

    switch (currentView) {
      case 'admin':
        return <Dashboard user={user} userProfile={userProfile} onViewChange={setCurrentView} />;
      case 'profile':
        return <ProfileSetup onProfileComplete={handleProfileComplete} existingProfile={userProfile} />;
      default:
        return <Dashboard user={user} userProfile={userProfile} onViewChange={setCurrentView} />;
    }
  };

  return (
    <div style={{
      padding: user ? '0' : '2rem',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: user ? 'flex-start' : 'center',
      alignItems: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
      width: '100%',
      margin: '0 auto'
    }}>
      {!user && (
        <h1 style={{
          textAlign: 'center',
          marginBottom: '3rem',
          fontSize: '4rem',
          fontWeight: 'bold',
          color: 'white',
          textShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          BuddyBridge
        </h1>
      )}

      {!user ? (
        <div style={{
          width: '100%',
          maxWidth: '900px',
          borderRadius: '12px',
          overflow: 'hidden'
        }}>
          <AuthForm onAuthSuccess={(u) => setUser(u)} />
        </div>
      ) : (
        <div style={{
          width: '100%',
          minHeight: '100vh'
        }}>
          {/* Navigation Bar */}
          <nav style={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            padding: '1rem 2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            boxShadow: '0 2px 20px rgba(0, 0, 0, 0.1)'
          }}>
            <h2 style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: '1.8rem',
              fontWeight: '700',
              margin: 0
            }}>
              BuddyBridge
            </h2>
            
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <button
                onClick={() => setCurrentView('dashboard')}
                style={{
                  background: currentView === 'dashboard' ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'transparent',
                  color: currentView === 'dashboard' ? 'white' : '#667eea',
                  border: '2px solid #667eea',
                  padding: '0.5rem 1rem',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '600'
                }}
              >
                Dashboard
              </button>

              {userProfile?.role === 'Admin' && (
                <button
                  onClick={() => setCurrentView('admin')}
                  style={{
                    background: currentView === 'admin' ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'transparent',
                    color: currentView === 'admin' ? 'white' : '#667eea',
                    border: '2px solid #667eea',
                    padding: '0.5rem 1rem',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: '600'
                  }}
                >
                  Admin Panel
                </button>
              )}

              <button
                onClick={() => setCurrentView('profile')}
                style={{
                  background: currentView === 'profile' ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'transparent',
                  color: currentView === 'profile' ? 'white' : '#667eea',
                  border: '2px solid #667eea',
                  padding: '0.5rem 1rem',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '600'
                }}
              >
                Profile
              </button>

              <button
                onClick={handleLogout}
                style={{
                  background: '#ef4444',
                  color: 'white',
                  border: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '600'
                }}
              >
                Logout
              </button>
            </div>
          </nav>

          {/* Main Content */}
          <div style={{ padding: '2rem' }}>
            {renderCurrentView()}
          </div>
        </div>
      )}

      {/* Debug: Show registered users */}
      {users.length > 0 && (
        <div style={{
          position: 'fixed',
          top: 10,
          right: 10,
          maxWidth: 200,
          fontSize: '0.75rem',
          background: '#f0f0f0',
          padding: '0.5rem',
          borderRadius: 4,
          overflowY: 'auto',
          maxHeight: '80vh',
          boxShadow: '0 0 6px rgba(0,0,0,0.1)',
          zIndex: 1000
        }}>
          <strong>Registered Users ({users.length})</strong>
          <ul style={{ paddingLeft: '1rem', margin: 0 }}>
            {users.map(u => (
              <li key={u.uid}>
                {u.name || u.email} ({u.role})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
