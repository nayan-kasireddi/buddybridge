import React, { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';

export default function ProfileSetup({ onProfileComplete, existingProfile }) {
  const [role, setRole] = useState(existingProfile?.role || '');
  const [name, setName] = useState(existingProfile?.name || '');
  const [age, setAge] = useState(existingProfile?.age || '');
  const [location, setLocation] = useState(existingProfile?.location || '');
  const [language, setLanguage] = useState(existingProfile?.language || '');
  const [interests, setInterests] = useState(existingProfile?.interests || []);
  const [availability, setAvailability] = useState(existingProfile?.availability || '');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const availableInterests = [
    'Arts & Crafts', 'Sports', 'Music', 'Reading', 'Technology', 
    'Cooking', 'Dancing', 'Photography', 'Games', 'Nature',
    'Science', 'History', 'Languages', 'Movies', 'Travel'
  ];

  const locations = [
    // US States
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 
    'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 
    'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 
    'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 
    'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 
    'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 
    'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 
    'Wisconsin', 'Wyoming',
    // Indian States
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 
    'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 
    'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 
    'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 
    'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
    // Union Territories
    'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu', 
    'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry'
  ];

  const languageOptions = [
    'Hindi', 'English', 'Tamil', 'Telugu', 'Bengali', 'Marathi',
    'Gujarati', 'Kannada', 'Malayalam', 'Punjabi', 'Urdu', 'Odia'
  ];

  const timeSlots = [
    'Morning (8-12 PM)', 'Afternoon (12-4 PM)', 
    'Evening (4-8 PM)', 'Night (8-10 PM)', 'Weekends Only'
  ];

  async function saveProfile(profileData) {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) throw new Error('User not logged in');

    const token = await user.getIdToken();
    const response = await fetch('https://buddybridge-backend-dlkk.onrender.com/profile', {
      method: 'POST', // Always use POST since backend handles upsert
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

  const handleInterestToggle = (interest) => {
    setInterests(prev => 
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const handleLocationChange = (e) => {
    const value = e.target.value;
    setLocation(value);
    
    if (value.length > 0) {
      const filtered = locations.filter(loc => {
        const lowerLoc = loc.toLowerCase();
        const lowerValue = value.toLowerCase();
        
        // Check if location starts with the search value
        if (lowerLoc.startsWith(lowerValue)) {
          return true;
        }
        
        // Check if any word in the location starts with the search value
        const words = lowerLoc.split(' ');
        return words.some(word => word.startsWith(lowerValue));
      });
      setLocationSuggestions(filtered.slice(0, 5)); // Show top 5 matches
      setShowSuggestions(true);
    } else {
      setLocationSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleLocationSelect = (selectedLocation) => {
    setLocation(selectedLocation);
    setLocationSuggestions([]);
    setShowSuggestions(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) {
        setError('You must be logged in to save your profile.');
        return;
      }

      // Validation
      if (!role || !name || !age || !location || !language) {
        setError('Please fill in all required fields.');
        return;
      }

      // Age validation based on role
      if (['Urban', 'Rural', 'NRI'].includes(role)) {
        if (age < 8 || age > 17) {
          setError('Age must be between 8 and 17 years for kids.');
          return;
        }
      } else if (['Mentor', 'Admin'].includes(role)) {
        if (age < 18) {
          setError('Age must be 18 or above for mentors and admins.');
          return;
        }
      }

      const profileData = {
        uid: user.uid,
        email: user.email,
        role,
        name,
        age: parseInt(age),
        location,
        language,
        interests,
        availability,
        profileCompleted: true,
        createdAt: existingProfile?.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      const result = await saveProfile(profileData);
      setSuccess(existingProfile ? 'Profile updated successfully!' : 'Profile created successfully!');

      // Call the callback to update parent component
      if (onProfileComplete) {
        onProfileComplete(profileData);
      }

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      maxWidth: '600px',
      margin: '0 auto',
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(20px)',
      borderRadius: '20px',
      padding: '2rem',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
    }}>
      <h2 style={{
        textAlign: 'center',
        marginBottom: '2rem',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        fontSize: '2rem',
        fontWeight: '700'
      }}>
        {existingProfile ? 'Update Your Profile' : 'Complete Your Profile'}
      </h2>

      <form onSubmit={handleSubmit}>
        {/* Role Selection */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#333' }}>
            Role *
          </label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '0.8rem',
              border: '2px solid #e5e7eb',
              borderRadius: '10px',
              fontSize: '1rem',
              backgroundColor: '#fafafa',
              color: '#333333',
              outline: 'none'
            }}
          >
            <option value="" disabled>Select your role</option>
            <option value="Urban">Urban Kid</option>
            <option value="NRI">NRI Kid</option>
            <option value="Rural">Rural Kid</option>
            <option value="Mentor">Mentor</option>
            <option value="Admin">Admin</option>
          </select>
        </div>

        {/* Name */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#333' }}>
            Full Name *
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Enter your full name"
            style={{
              width: '100%',
              padding: '0.8rem',
              border: '2px solid #e5e7eb',
              borderRadius: '10px',
              fontSize: '1rem',
              backgroundColor: '#ffffff',
              color: '#333333'
            }}
          />
        </div>

        {/* Age */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#333' }}>
            Age * {role && ['Urban', 'Rural', 'NRI'].includes(role) ? '(8-17 years)' : '(18+ years)'}
          </label>
          <div style={{ position: 'relative' }}>
            <input
              type="range"
              value={age || (role && ['Urban', 'Rural', 'NRI'].includes(role) ? 8 : 18)}
              onChange={(e) => setAge(e.target.value)}
              required
              min={role && ['Urban', 'Rural', 'NRI'].includes(role) ? "8" : "18"}
              max={role && ['Urban', 'Rural', 'NRI'].includes(role) ? "17" : "100"}
              style={{
                width: '100%',
                height: '8px',
                borderRadius: '5px',
                background: '#e5e7eb',
                outline: 'none',
                cursor: 'pointer'
              }}
            />
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '0.5rem',
              fontSize: '0.875rem',
              color: '#666'
            }}>
              <span>{role && ['Urban', 'Rural', 'NRI'].includes(role) ? '8' : '18'}</span>
              <span style={{ 
                fontWeight: '600', 
                color: '#667eea',
                background: '#f0f4ff',
                padding: '0.25rem 0.5rem',
                borderRadius: '4px'
              }}>
                {age || (role && ['Urban', 'Rural', 'NRI'].includes(role) ? 8 : 18)} years
              </span>
              <span>{role && ['Urban', 'Rural', 'NRI'].includes(role) ? '17' : '100'}</span>
            </div>
          </div>
          <style>{`
            input[type="number"]::-webkit-outer-spin-button,
            input[type="number"]::-webkit-inner-spin-button {
              -webkit-appearance: none;
              margin: 0;
            }
            
            input[type="number"] {
              -moz-appearance: textfield;
            }
            
            input[type="range"] {
              -webkit-appearance: none;
              appearance: none;
              height: 8px;
              border-radius: 5px;
              background: #e5e7eb;
              outline: none;
            }
            
            input[type="range"]::-webkit-slider-thumb {
              -webkit-appearance: none;
              appearance: none;
              width: 20px;
              height: 20px;
              border-radius: 50%;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              cursor: pointer;
              border: 2px solid white;
              box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
            }
            
            input[type="range"]::-moz-range-thumb {
              width: 20px;
              height: 20px;
              border-radius: 50%;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              cursor: pointer;
              border: 2px solid white;
              box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
            }
            
            input[type="range"]::-webkit-slider-track {
              -webkit-appearance: none;
              appearance: none;
              height: 8px;
              border-radius: 5px;
              background: linear-gradient(to right, #667eea 0%, #764ba2 100%);
            }
            
            input[type="range"]::-moz-range-track {
              height: 8px;
              border-radius: 5px;
              background: linear-gradient(to right, #667eea 0%, #764ba2 100%);
              border: none;
            }
          `}</style>
        </div>

        {/* Location */}
        <div style={{ marginBottom: '1.5rem', position: 'relative' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#333' }}>
            Location * (US States / Indian States)
          </label>
          <input
            type="text"
            value={location}
            onChange={handleLocationChange}
            onFocus={() => {
              if (location.length > 0) {
                setShowSuggestions(true);
              }
            }}
            onBlur={() => {
              // Delay hiding suggestions to allow click selection
              setTimeout(() => setShowSuggestions(false), 200);
            }}
            required
            placeholder="Start typing a US state or Indian state..."
            style={{
              width: '100%',
              padding: '0.8rem',
              border: '2px solid #e5e7eb',
              borderRadius: '10px',
              fontSize: '1rem',
              backgroundColor: '#ffffff',
              color: '#333333'
            }}
          />
          {showSuggestions && locationSuggestions.length > 0 && (
            <div style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              backgroundColor: 'white',
              border: '2px solid #e5e7eb',
              borderTop: 'none',
              borderRadius: '0 0 10px 10px',
              maxHeight: '200px',
              overflowY: 'auto',
              zIndex: 1000,
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}>
              {locationSuggestions.map((suggestion, index) => (
                <div
                  key={index}
                  onClick={() => handleLocationSelect(suggestion)}
                  style={{
                    padding: '0.8rem',
                    cursor: 'pointer',
                    borderBottom: index < locationSuggestions.length - 1 ? '1px solid #f0f0f0' : 'none',
                    transition: 'background-color 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#f8f9fa';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'white';
                  }}
                >
                  {suggestion}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Language Preference */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#333' }}>
            Preferred Language *
          </label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '0.8rem',
              border: '2px solid #e5e7eb',
              borderRadius: '10px',
              fontSize: '1rem',
              backgroundColor: '#fafafa',
              color: '#333333',
              outline: 'none'
            }}
          >
            <option value="" disabled>Select preferred language</option>
            {languageOptions.map(lang => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>
        </div>

        {/* Interests */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#333' }}>
            Interests (Select up to 3)
          </label>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
            gap: '0.5rem'
          }}>
            {availableInterests.map(interest => (
              <button
                key={interest}
                type="button"
                onClick={() => handleInterestToggle(interest)}
                disabled={!interests.includes(interest) && interests.length >= 3}
                style={{
                  padding: '0.5rem',
                  border: '2px solid',
                  borderColor: interests.includes(interest) ? '#667eea' : '#e5e7eb',
                  borderRadius: '8px',
                  backgroundColor: interests.includes(interest) ? '#667eea' : 'white',
                  color: interests.includes(interest) ? 'white' : '#333',
                  cursor: 'pointer',
                  fontSize: '0.85rem',
                  opacity: (!interests.includes(interest) && interests.length >= 3) ? '0.5' : '1'
                }}
              >
                {interest}
              </button>
            ))}
          </div>
        </div>

        {/* Availability */}
        <div style={{ marginBottom: '2rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#333' }}>
            Preferred Time for Sessions
          </label>
          <select
            value={availability}
            onChange={(e) => setAvailability(e.target.value)}
            style={{
              width: '100%',
              padding: '0.8rem',
              border: '2px solid #e5e7eb',
              borderRadius: '10px',
              fontSize: '1rem',
              backgroundColor: '#fafafa',
              color: '#333333',
              outline: 'none'
            }}
          >
            <option value="">Select your preferred time</option>
            {timeSlots.map(slot => (
              <option key={slot} value={slot}>{slot}</option>
            ))}
          </select>
        </div>

        {/* Error and Success Messages */}
        {error && (
          <div style={{
            background: '#fef2f2',
            border: '1px solid #fecaca',
            color: '#dc2626',
            padding: '1rem',
            borderRadius: '8px',
            marginBottom: '1rem'
          }}>
            {error}
          </div>
        )}

        {success && (
          <div style={{
            background: '#f0fdf4',
            border: '1px solid #bbf7d0',
            color: '#16a34a',
            padding: '1rem',
            borderRadius: '8px',
            marginBottom: '1rem'
          }}>
            {success}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '1rem',
            background: loading ? '#9ca3af' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            fontSize: '1.1rem',
            fontWeight: '600',
            cursor: loading ? 'not-allowed' : 'pointer',
            boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)'
          }}
        >
          {loading ? 'Saving...' : (existingProfile ? 'Update Profile' : 'Complete Profile')}
        </button>
      </form>
    </div>
  );
}