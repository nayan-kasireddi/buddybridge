import React, { useEffect, useState } from 'react';
import { fetchUsers } from './apiClient';
import AuthForm from './components/AuthForm';
import Dashboard from './components/Dashboard';
import { logout } from './firebaseAuth';
import ProfileSetup from './components/ProfileSetup';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

function App() {
  const [user, setUser] = useState(null);
  const [authToken, setAuthToken] = useState('');
  const [users, setUsers] = useState([]);
  const [fetchError, setFetchError] = useState(null);

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
      } else {
        setUser(null);
        setAuthToken('');
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await logout();
    setUser(null);
    setAuthToken('');
  };

  return (
    <div style={{ 
      padding: '2rem', 
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: user ? 'flex-start' : 'center',
      alignItems: 'center'
    }}>
      <h1 style={{ 
        textAlign: 'center', 
        marginBottom: user ? '2rem' : '3rem',
        fontSize: user ? '3rem' : '4rem',
        fontWeight: 'bold',
        color: '#333',
        margin: user ? '1rem 0 2rem 0' : '0 0 3rem 0'
      }}>
        BuddyBridge
      </h1>
      
      {!user ? (
        <div style={{
          width: '100%',
          maxWidth: '400px',
          padding: '2rem',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          backgroundColor: 'white'
        }}>
          <AuthForm onAuthSuccess={(u) => setUser(u)} />
        </div>
      ) : (
        <div style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          flex: 1
        }}>
          <Dashboard user={user} onLogout={handleLogout} />
        </div>
      )}

      {/* Small fixed user list */}
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
          boxShadow: '0 0 6px rgba(0,0,0,0.1)'
        }}>
          <strong>Users from Backend</strong>
          <ul style={{ paddingLeft: '1rem', margin: 0 }}>
            {users.map(user => (
              <li key={user.uid}>{user.name || user.uid}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;