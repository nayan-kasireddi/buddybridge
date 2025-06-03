import React, { useEffect, useState } from 'react';
import { fetchUsers } from './apiClient';
import AuthForm from './components/AuthForm';
import { logout } from './firebaseAuth';

function App() {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    fetchUsers()
      .then(data => setUsers(data))
      .catch(err => setFetchError(err.message));
  }, []);

  const handleLogout = async () => {
    await logout();
    setUser(null);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Firebase Auth Demo</h1>

      {!user ? (
        <AuthForm onAuthSuccess={(u) => setUser(u)} />
      ) : (
        <>
          <p>Welcome, {user.email}</p>
          <button onClick={handleLogout}>Logout</button>
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
