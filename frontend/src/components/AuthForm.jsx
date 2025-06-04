import React, { useState } from 'react';
import { login as signIn, signup as signUp } from '../firebaseAuth';

const AuthForm = ({ onAuthSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Clear all fields and messages
  const clearForm = () => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setError('');
    setSuccess('');
  };

  // Toggle between login and signup modes
  const toggleMode = () => {
    clearForm();
    setIsSignUp(!isSignUp);
  };

  // Validate email format
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Get user-friendly error message
  const getErrorMessage = (error) => {
    const errorCode = error.code;

    switch (errorCode) {
      case 'auth/user-not-found':
        return 'No account found with this email address.';
      case 'auth/wrong-password':
        return 'Incorrect password. Please try again.';
      case 'auth/invalid-email':
        return 'Please enter a valid email address.';
      case 'auth/user-disabled':
        return 'This account has been disabled.';
      case 'auth/too-many-requests':
        return 'Too many failed attempts. Please wait before trying again.';
      case 'auth/weak-password':
        return 'Password must be at least 6 characters long.';
      case 'auth/email-already-in-use':
        return 'An account with this email already exists.';
      case 'auth/invalid-credential':
        return 'Invalid email or password. Please check your credentials and try again.';
      default:
        return 'Authentication failed. Please try again.';
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    // Basic validation
    if (!email.trim()) {
      setError('Please enter your email address.');
      setLoading(false);
      return;
    }

    if (!isValidEmail(email)) {
      setError('Please enter a valid email address.');
      setLoading(false);
      return;
    }

    if (!password) {
      setError('Please enter your password.');
      setLoading(false);
      return;
    }

    if (isSignUp) {
      if (password.length < 6) {
        setError('Password must be at least 6 characters long.');
        setLoading(false);
        return;
      }

      if (!confirmPassword) {
        setError('Please confirm your password.');
        setLoading(false);
        return;
      }

      if (password !== confirmPassword) {
        setError('Passwords do not match.');
        setLoading(false);
        return;
      }
    }

    try {
      let user;
      if (isSignUp) {
        user = await signUp(email, password);
        setSuccess('Account created successfully! Welcome to BuddyBridge!');
      } else {
        user = await signIn(email, password);
        setSuccess('Welcome back!');
      }
      
      setTimeout(() => {
        onAuthSuccess(user);
      }, 1200);
      
    } catch (error) {
      console.error('Authentication error:', error);
      setError(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      display: 'flex',
      maxWidth: '900px',
      width: '100%',
      margin: '0 auto',
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(20px)',
      borderRadius: '20px',
      overflow: 'hidden',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
      minHeight: '600px',
      position: 'relative',
      left: '50%',
      transform: 'translateX(-50%)'
    }}>
      
      {/* Left side - Branding */}
      <div style={{
        flex: '1',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '3rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        textAlign: 'center',
        position: 'relative'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          opacity: 0.3
        }} />
        
        <div style={{ 
          background: 'rgba(255, 255, 255, 0.15)',
          borderRadius: '50%',
          padding: '1.5rem',
          marginBottom: '2rem',
          backdropFilter: 'blur(10px)',
          width: '80px',
          height: '80px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
            <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zM4 18v-6h2.5l.5 5.5s1 1.5 1 1.5V22h-2v-3H4zM12.5 11.5c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5S10.17 10 11 10s1.5.67 1.5 1.5zM5.5 6C4.67 6 4 6.67 4 7.5S4.67 9 5.5 9 7 8.33 7 7.5 6.33 6 5.5 6zm6-2C10.67 4 10 4.67 10 5.5S10.67 7 11.5 7 13 6.33 13 5.5 12.33 4 11.5 4zM20 15l-1.5-1.5L17 15l1.5 1.5L20 15z"/>
          </svg>
        </div>
        
        <h1 style={{ 
          fontSize: '2.5rem',
          marginBottom: '1rem',
          textShadow: '0 2px 4px rgba(0,0,0,0.1)',
          fontWeight: '700'
        }}>
          BuddyBridge
        </h1>
        
        <p style={{ 
          fontSize: '1.2rem',
          opacity: 0.9,
          lineHeight: 1.6,
          maxWidth: '280px',
          margin: 0
        }}>
          Connect with friends, share moments, and build lasting relationships in our vibrant community.
        </p>
        
        <div style={{
          marginTop: '2rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          opacity: 0.8
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
          <span>Join thousands of happy users</span>
        </div>
      </div>

      {/* Right side - Form */}
      <div style={{
        flex: '1',
        padding: '3rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}>
        
        <div style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
          <h2 style={{ 
            fontSize: '2rem',
            color: '#1a1a1a',
            marginBottom: '0.5rem',
            fontWeight: '700'
          }}>
            {isSignUp ? 'Create Account' : 'Welcome Back'}
          </h2>
          <p style={{ 
            fontSize: '1rem', 
            color: '#666',
            margin: 0
          }}>
            {isSignUp ? 'Join our community today' : 'Sign in to continue your journey'}
          </p>
        </div>

        {error && (
          <div style={{
            background: '#fef2f2',
            border: '1px solid #fecaca',
            color: '#dc2626',
            padding: '1rem',
            borderRadius: '8px',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
            <span style={{ fontWeight: '500', fontSize: '0.9rem' }}>{error}</span>
          </div>
        )}

        {success && (
          <div style={{
            background: '#f0fdf4',
            border: '1px solid #bbf7d0',
            color: '#16a34a',
            padding: '1rem',
            borderRadius: '8px',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
            </svg>
            <span style={{ fontWeight: '500', fontSize: '0.9rem' }}>{success}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ marginBottom: '1.5rem' }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ 
              display: 'block',
              fontSize: '1rem', 
              fontWeight: '600', 
              color: '#374151',
              marginBottom: '0.7rem'
            }}>
              Email Address
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  width: '100%',
                  height: '56px',
                  fontSize: '1rem',
                  border: '2px solid #e5e7eb',
                  borderRadius: '10px',
                  backgroundColor: '#fafafa',
                  padding: '0 1rem 0 3rem',
                  transition: 'all 0.2s ease',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#667eea';
                  e.target.style.backgroundColor = '#ffffff';
                  e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                  e.target.style.transform = 'translateY(-1px)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e5e7eb';
                  e.target.style.backgroundColor = '#fafafa';
                  e.target.style.boxShadow = 'none';
                  e.target.style.transform = 'translateY(0)';
                }}
              />
              <svg style={{
                position: 'absolute',
                left: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#9ca3af'
              }} width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
            </div>
          </div>

          <div style={{ marginBottom: isSignUp ? '1.5rem' : '2rem' }}>
            <label style={{ 
              display: 'block',
              fontSize: '1rem', 
              fontWeight: '600', 
              color: '#374151',
              marginBottom: '0.7rem'
            }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  width: '100%',
                  height: '56px',
                  fontSize: '1rem',
                  border: '2px solid #e5e7eb',
                  borderRadius: '10px',
                  backgroundColor: '#fafafa',
                  padding: '0 1rem 0 3rem',
                  transition: 'all 0.2s ease',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#667eea';
                  e.target.style.backgroundColor = '#ffffff';
                  e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                  e.target.style.transform = 'translateY(-1px)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e5e7eb';
                  e.target.style.backgroundColor = '#fafafa';
                  e.target.style.boxShadow = 'none';
                  e.target.style.transform = 'translateY(0)';
                }}
              />
              <svg style={{
                position: 'absolute',
                left: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#9ca3af'
              }} width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
              </svg>
            </div>
          </div>

          {isSignUp && (
            <div style={{ marginBottom: '2rem' }}>
              <label style={{ 
                display: 'block',
                fontSize: '1rem', 
                fontWeight: '600', 
                color: '#374151',
                marginBottom: '0.7rem'
              }}>
                Confirm Password
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    height: '56px',
                    fontSize: '1rem',
                    border: confirmPassword && password !== confirmPassword ? '2px solid #ef4444' : '2px solid #e5e7eb',
                    borderRadius: '10px',
                    backgroundColor: '#fafafa',
                    padding: '0 1rem 0 3rem',
                    transition: 'all 0.2s ease',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => {
                    if (!(confirmPassword && password !== confirmPassword)) {
                      e.target.style.borderColor = '#667eea';
                      e.target.style.backgroundColor = '#ffffff';
                      e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                      e.target.style.transform = 'translateY(-1px)';
                    }
                  }}
                  onBlur={(e) => {
                    if (!(confirmPassword && password !== confirmPassword)) {
                      e.target.style.borderColor = '#e5e7eb';
                      e.target.style.backgroundColor = '#fafafa';
                      e.target.style.boxShadow = 'none';
                      e.target.style.transform = 'translateY(0)';
                    }
                  }}
                />
                <svg style={{
                  position: 'absolute',
                  left: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#9ca3af'
                }} width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
                </svg>
              </div>
              {confirmPassword && password !== confirmPassword && (
                <p style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '0.5rem', margin: '0.5rem 0 0 0' }}>
                  Passwords do not match
                </p>
              )}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              height: '56px',
              fontSize: '1.1rem',
              fontWeight: '600',
              background: loading ? '#9ca3af' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem'
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.target.style.background = 'linear-gradient(135deg, #5a6fd8 0%, #6b4190 100%)';
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.4)';
              }
            }}
            onMouseLeave={(e) => {
              if (!loading) {
                e.target.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.3)';
              }
            }}
          >
            {loading && (
              <div style={{
                width: '20px',
                height: '20px',
                border: '2px solid #ffffff',
                borderTop: '2px solid transparent',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }} />
            )}
            {loading ? (isSignUp ? 'Creating Account...' : 'Signing In...') : (isSignUp ? 'Create Account' : 'Sign In')}
          </button>
        </form>

        <div style={{
          position: 'relative',
          textAlign: 'center',
          margin: '2rem 0',
          color: '#9ca3af',
          fontSize: '0.9rem'
        }}>
          <div style={{
            position: 'absolute',
            top: '50%',
            left: 0,
            right: 0,
            height: '1px',
            backgroundColor: '#e5e7eb'
          }} />
          <span style={{
            backgroundColor: 'white',
            padding: '0 1rem',
            position: 'relative'
          }}>
            OR
          </span>
        </div>

        <p style={{ 
          textAlign: 'center',
          color: '#6b7280',
          fontSize: '1rem',
          margin: 0
        }}>
          {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
          <span
            style={{
              color: '#667eea',
              cursor: 'pointer',
              fontWeight: '600',
              transition: 'color 0.2s ease'
            }}
            onClick={toggleMode}
            onMouseEnter={(e) => e.target.style.color = '#5a6fd8'}
            onMouseLeave={(e) => e.target.style.color = '#667eea'}
          >
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </span>
        </p>
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @media (max-width: 768px) {
          .auth-container {
            flex-direction: column !important;
            margin: 1rem !important;
          }
          .auth-left {
            min-height: 200px !important;
            padding: 2rem !important;
          }
          .auth-right {
            padding: 2rem !important;
          }
          .auth-title {
            font-size: 2rem !important;
          }
          .auth-subtitle {
            font-size: 1.5rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default AuthForm;