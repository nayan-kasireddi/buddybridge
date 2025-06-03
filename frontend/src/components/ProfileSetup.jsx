import React, { useState } from 'react';
import { getAuth } from 'firebase/auth';

export default function ProfileSetup() {
  const [role, setRole] = useState('');
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  async function saveProfile(profileData) {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) throw new Error('User not logged in');

    const token = await user.getIdToken();

    const response = await fetch('https://buddybridge-backend-dlkk.onrender.com/profile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(profileData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to save profile');
    }

    return response.json();
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        setError('You must be logged in to save your profile.');
        return;
      }

      const profileData = {
        uid: user.uid,
        role,
        name,
        location,
      };

      const result = await saveProfile(profileData);
      setSuccess(result.message);
      setError(null);
    } catch (err) {
      setError(err.message);
      setSuccess(null);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: 'auto' }}>
      <h2>Profile Setup</h2>

      <label>
        Role:
        <select value={role} onChange={(e) => setRole(e.target.value)} required>
          <option value="" disabled>
            Select your role
          </option>
          <option value="Urban">Urban</option>
          <option value="NRI">NRI</option>
          <option value="Rural">Rural</option>
        </select>
      </label>

      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="Enter your name"
        />
      </label>

      {(role === 'Urban' || role === 'NRI' || role === 'Rural') && (
        <label>
          Location:
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder={`Enter your ${role} location`}
          />
        </label>
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}

      <button type="submit">Save Profile</button>
    </form>
  );
}
