import React, { useState, useEffect } from 'react';
import { fetchUsers } from './apiClient';
import { signup, login, logout } from "./firebaseAuth";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  const [users, setUsers] = useState([]);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    fetchUsers()
      .then(data => setUsers(data))
      .catch(err => setFetchError(err.message));
  }, []);

  const handleSignup = async () => {
    try {
      const userCredential = await signup(email, password);
      setUser(userCredential.user);
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogin = async () => {
    try {
      const userCredential = await login(email, password);
      setUser(userCredential.user);
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogout = async () => {
    await logout();
    setUser(null);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Firebase Auth Demo</h1>
      {user ? (
        <>
          <p>Welcome, {user.email}</p>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <button onClick={handleSignup}>Sign Up</button>
          <button onClick={handleLogin}>Login</button>
          {error && <p style={{ color: "red" }}>{error}</p>}
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
