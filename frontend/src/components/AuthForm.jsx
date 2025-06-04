import React, { useState } from 'react';
import { TextInput, PasswordInput, Button, Alert, Text, Divider, Loader, Paper, Group } from '@mantine/core';
import { IconAlertCircle, IconCheck, IconMail, IconLock } from '@tabler/icons-react';
import { signIn, signUp } from '../firebaseAuth';

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
    clearForm(); // Clear fields when switching modes
    setIsSignUp(!isSignUp);
  };

  // Validate email format
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Get user-friendly error message
  const getErrorMessage = (error) => {
    const errorCode = error.code;
    const errorMessage = error.message;

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
      
      // Wait a moment to show success message
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
    <Paper 
      shadow="xl" 
      p="xl" 
      radius="lg"
      style={{
        width: '100%',
        maxWidth: '450px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        border: 'none'
      }}
    >
      <div style={{
        background: 'white',
        borderRadius: '12px',
        padding: '2.5rem',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
      }}>
        
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <Text 
            size="xl" 
            weight={700}
            style={{ 
              fontSize: '2rem',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '0.5rem'
            }}
          >
            {isSignUp ? 'Join BuddyBridge' : 'Welcome Back'}
          </Text>
          <Text 
            color="dimmed" 
            size="md"
            style={{ fontSize: '1rem' }}
          >
            {isSignUp ? 'Create your account to get started' : 'Sign in to your account'}
          </Text>
        </div>

        {error && (
          <Alert 
            icon={<IconAlertCircle size="1.2rem" />} 
            color="red" 
            radius="md"
            style={{ 
              marginBottom: '1.5rem',
              backgroundColor: '#fee2e2',
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
            radius="md"
            style={{ 
              marginBottom: '1.5rem',
              backgroundColor: '#dcfce7',
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
            radius="md"
            icon={<IconMail size="1.1rem" />}
            style={{ marginBottom: '1.2rem' }}
            styles={{
              label: { 
                fontSize: '0.95rem', 
                fontWeight: 600, 
                color: '#374151',
                marginBottom: '0.5rem'
              },
              input: { 
                height: '50px',
                fontSize: '1rem',
                border: '2px solid #e5e7eb',
                '&:focus': {
                  borderColor: '#667eea',
                  boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.1)'
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
            radius="md"
            icon={<IconLock size="1.1rem" />}
            style={{ marginBottom: isSignUp ? '1.2rem' : '2rem' }}
            styles={{
              label: { 
                fontSize: '0.95rem', 
                fontWeight: 600, 
                color: '#374151',
                marginBottom: '0.5rem'
              },
              input: { 
                height: '50px',
                fontSize: '1rem',
                border: '2px solid #e5e7eb',
                '&:focus': {
                  borderColor: '#667eea',
                  boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.1)'
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
              radius="md"
              icon={<IconLock size="1.1rem" />}
              style={{ marginBottom: '2rem' }}
              styles={{
                label: { 
                  fontSize: '0.95rem', 
                  fontWeight: 600, 
                  color: '#374151',
                  marginBottom: '0.5rem'
                },
                input: { 
                  height: '50px',
                  fontSize: '1rem',
                  border: '2px solid #e5e7eb',
                  '&:focus': {
                    borderColor: '#667eea',
                    boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.1)'
                  }
                }
              }}
              error={confirmPassword && password !== confirmPassword ? 'Passwords do not match' : null}
            />
          )}

          <Button
            type="submit"
            fullWidth
            size="lg"
            radius="md"
            loading={loading}
            disabled={loading}
            style={{ 
              height: '55px',
              fontSize: '1.1rem',
              fontWeight: '600',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              border: 'none',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)'
              }
            }}
            styles={{
              root: {
                '&:hover': {
                  background: 'linear-gradient(135deg, #5a6fd8 0%, #6b4190 100%)',
                  transform: 'translateY(-1px)'
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
          style={{ margin: '1.5rem 0' }}
          styles={{
            label: { 
              color: '#6b7280',
              fontSize: '0.9rem'
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
              textDecoration: 'underline',
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
    </Paper>
  );
};

export default AuthForm;