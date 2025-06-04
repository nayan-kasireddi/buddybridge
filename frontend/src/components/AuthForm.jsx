import React, { useState } from 'react';
import { TextInput, PasswordInput, Button, Alert, Text, Divider, Loader, Paper, Group, Container, Box } from '@mantine/core';
import { IconAlertCircle, IconCheck, IconMail, IconLock, IconHeart, IconUsers } from '@tabler/icons-react';
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
    <Box
      style={{
        minHeight: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
        padding: '0',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden'
      }}
    >
      {/* Background decorative elements */}
      <div
        style={{
          position: 'absolute',
          top: '10%',
          left: '10%',
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.1)',
          filter: 'blur(40px)',
          animation: 'float 6s ease-in-out infinite'
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '15%',
          right: '15%',
          width: '150px',
          height: '150px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.08)',
          filter: 'blur(30px)',
          animation: 'float 8s ease-in-out infinite reverse'
        }}
      />
      
      <div style={{ 
        width: '90%', 
        maxWidth: '1000px', 
        zIndex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Paper 
          shadow="2xl" 
          radius="xl"
          style={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            overflow: 'hidden',
            width: '100%',
            maxWidth: '900px'
          }}
        >
          <div style={{ 
            display: 'flex', 
            minHeight: '600px',
            '@media (max-width: 768px)': {
              flexDirection: 'column'
            }
          }}>
            
            {/* Left side - Branding */}
            <div style={{
              flex: 1,
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
                backdropFilter: 'blur(10px)'
              }}>
                <IconUsers size={48} stroke={1.5} />
              </div>
              
              <Text 
                size="xl" 
                weight={700}
                style={{ 
                  fontSize: '2.5rem',
                  marginBottom: '1rem',
                  textShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}
              >
                BuddyBridge
              </Text>
              
              <Text 
                size="lg" 
                style={{ 
                  fontSize: '1.2rem',
                  opacity: 0.9,
                  lineHeight: 1.6,
                  maxWidth: '280px'
                }}
              >
                Connect with friends, share moments, and build lasting relationships in our vibrant community.
              </Text>
              
              <div style={{
                marginTop: '2rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                opacity: 0.8
              }}>
                <IconHeart size={20} fill="currentColor" />
                <Text size="sm">Join thousands of happy users</Text>
              </div>
            </div>

            {/* Right side - Form */}
            <div style={{
              flex: 1,
              padding: '3rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}>
              
              <div style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
                <Text 
                  size="xl" 
                  weight={700}
                  style={{ 
                    fontSize: '2rem',
                    color: '#1a1a1a',
                    marginBottom: '0.5rem'
                  }}
                >
                  {isSignUp ? 'Create Account' : 'Welcome Back'}
                </Text>
                <Text 
                  color="dimmed" 
                  size="md"
                  style={{ fontSize: '1rem', color: '#666' }}
                >
                  {isSignUp ? 'Join our community today' : 'Sign in to continue your journey'}
                </Text>
              </div>

              {error && (
                <Alert 
                  icon={<IconAlertCircle size="1.2rem" />} 
                  color="red" 
                  radius="lg"
                  style={{ 
                    marginBottom: '1.5rem',
                    backgroundColor: '#fef2f2',
                    border: '1px solid #fecaca',
                    color: '#dc2626'
                  }}
                  variant="light"
                >
                  <Text weight={500} size="sm">{error}</Text>
                </Alert>
              )}

              {success && (
                <Alert 
                  icon={<IconCheck size="1.2rem" />} 
                  color="green" 
                  radius="lg"
                  style={{ 
                    marginBottom: '1.5rem',
                    backgroundColor: '#f0fdf4',
                    border: '1px solid #bbf7d0',
                    color: '#16a34a'
                  }}
                  variant="light"
                >
                  <Text weight={500} size="sm">{success}</Text>
                </Alert>
              )}

              <form onSubmit={handleSubmit} style={{ marginBottom: '1.5rem' }}>
                <TextInput
                  label="Email Address"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  size="lg"
                  radius="lg"
                  icon={<IconMail size="1.1rem" />}
                  style={{ marginBottom: '1.5rem' }}
                  styles={{
                    label: { 
                      fontSize: '1rem', 
                      fontWeight: 600, 
                      color: '#374151',
                      marginBottom: '0.7rem'
                    },
                    input: { 
                      height: '56px',
                      fontSize: '1rem',
                      border: '2px solid #e5e7eb',
                      backgroundColor: '#fafafa',
                      transition: 'all 0.2s ease',
                      '&:focus': {
                        borderColor: '#667eea',
                        backgroundColor: '#ffffff',
                        boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.1)',
                        transform: 'translateY(-1px)'
                      }
                    }
                  }}
                />

                <PasswordInput
                  label="Password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  size="lg"
                  radius="lg"
                  icon={<IconLock size="1.1rem" />}
                  style={{ marginBottom: isSignUp ? '1.5rem' : '2rem' }}
                  styles={{
                    label: { 
                      fontSize: '1rem', 
                      fontWeight: 600, 
                      color: '#374151',
                      marginBottom: '0.7rem'
                    },
                    input: { 
                      height: '56px',
                      fontSize: '1rem',
                      border: '2px solid #e5e7eb',
                      backgroundColor: '#fafafa',
                      transition: 'all 0.2s ease',
                      '&:focus': {
                        borderColor: '#667eea',
                        backgroundColor: '#ffffff',
                        boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.1)',
                        transform: 'translateY(-1px)'
                      }
                    }
                  }}
                />

                {isSignUp && (
                  <PasswordInput
                    label="Confirm Password"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    size="lg"
                    radius="lg"
                    icon={<IconLock size="1.1rem" />}
                    style={{ marginBottom: '2rem' }}
                    styles={{
                      label: { 
                        fontSize: '1rem', 
                        fontWeight: 600, 
                        color: '#374151',
                        marginBottom: '0.7rem'
                      },
                      input: { 
                        height: '56px',
                        fontSize: '1rem',
                        border: '2px solid #e5e7eb',
                        backgroundColor: '#fafafa',
                        transition: 'all 0.2s ease',
                        '&:focus': {
                          borderColor: '#667eea',
                          backgroundColor: '#ffffff',
                          boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.1)',
                          transform: 'translateY(-1px)'
                        }
                      }
                    }}
                    error={confirmPassword && password !== confirmPassword ? 'Passwords do not match' : null}
                  />
                )}

                <Button
                  type="submit"
                  fullWidth
                  size="xl"
                  radius="lg"
                  loading={loading}
                  disabled={loading}
                  style={{ 
                    height: '56px',
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    border: 'none',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)'
                  }}
                  styles={{
                    root: {
                      '&:hover': {
                        background: 'linear-gradient(135deg, #5a6fd8 0%, #6b4190 100%)',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 8px 25px rgba(102, 126, 234, 0.4)'
                      }
                    }
                  }}
                >
                  {loading ? (
                    <Group spacing="sm">
                      <Loader size="sm" color="white" />
                      <Text>{isSignUp ? 'Creating Account...' : 'Signing In...'}</Text>
                    </Group>
                  ) : (
                    isSignUp ? 'Create Account' : 'Sign In'
                  )}
                </Button>
              </form>

              <Divider 
                labelPosition="center" 
                style={{ margin: '2rem 0' }}
                styles={{
                  label: { 
                    color: '#9ca3af',
                    fontSize: '0.9rem',
                    backgroundColor: 'white',
                    padding: '0 1rem'
                  }
                }}
              />

              <Text 
                align="center" 
                size="md" 
                style={{ 
                  color: '#6b7280',
                  fontSize: '1rem'
                }}
              >
                {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
                <Text
                  component="span"
                  weight={600}
                  style={{
                    color: '#667eea',
                    cursor: 'pointer',
                    transition: 'color 0.2s ease',
                    '&:hover': {
                      color: '#5a6fd8'
                    }
                  }}
                  onClick={toggleMode}
                >
                  {isSignUp ? 'Sign In' : 'Sign Up'}
                </Text>
              </Text>
            </div>
          </div>
        </Paper>
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
        
        @media (max-width: 768px) {
          .auth-flex {
            flex-direction: column !important;
          }
          .auth-left {
            min-height: 200px !important;
          }
          .auth-right {
            padding: 2rem !important;
          }
        }
      `}</style>
    </Box>
  );
};

export default AuthForm;