import React, { useEffect, useState } from 'react';
import { fetchUsers } from './apiClient';
import AuthForm from './components/AuthForm';
import Dashboard from './components/Dashboard';  // <-- add this import
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
    <div style={{ padding: '2rem' }}>
      <h1>Firebase Auth Demo</h1>

      {!user ? (
        <AuthForm onAuthSuccess={(u) => setUser(u)} />
      ) : (
        <>
          {/* Use Dashboard component when logged in */}
          <Dashboard user={user} onLogout={handleLogout} />
        </>
      )}

      <div style={{ marginTop: '2rem' }}>
        <h2>Users from Backend</h2>
        {fetchError && <p style={{ color: 'red' }}>Error fetching users: {fetchError}</p>}
        {users.length > 0 ? (
          <ul>
            {users.map(user => (
              <li key={user.uid}>{user.name || user.uid}</li>
            ))}
          </ul>
        ) : (
          <p>Loading users...</p>
        )}
      </div>
    </div>
  );
}

export default App;
