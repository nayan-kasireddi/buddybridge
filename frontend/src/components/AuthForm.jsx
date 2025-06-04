import React, { useState } from 'react';
import { TextInput, PasswordInput, Button, Alert, Text, Divider, Loader } from '@mantine/core';
import { IconAlertCircle, IconCheck } from '@tabler/icons-react';
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
        return 'No account found with this email address. Please check your email or sign up for a new account.';
      case 'auth/wrong-password':
        return 'Incorrect password. Please check your password and try again.';
      case 'auth/invalid-email':
        return 'Please enter a valid email address.';
      case 'auth/user-disabled':
        return 'This account has been disabled. Please contact support.';
      case 'auth/too-many-requests':
        return 'Too many failed attempts. Please wait a moment before trying again.';
      case 'auth/weak-password':
        return 'Password is too weak. Please use at least 6 characters.';
      case 'auth/email-already-in-use':
        return 'An account with this email already exists. Please try logging in instead.';
      case 'auth/operation-not-allowed':
        return 'Email/password accounts are not enabled. Please contact support.';
      case 'auth/invalid-credential':
        return 'Invalid login credentials. Please check your email and password.';
      default:
        return errorMessage || 'An unexpected error occurred. Please try again.';
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
        setError('Passwords do not match. Please try again.');
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
        setSuccess('Login successful! Welcome back!');
      }
      
      // Wait a moment to show success message
      setTimeout(() => {
        onAuthSuccess(user);
      }, 1000);
      
    } catch (error) {
      console.error('Authentication error:', error);
      setError(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ width: '100%', maxWidth: '400px' }}>
      <Text 
        size="xl" 
        weight={600} 
        align="center" 
        style={{ 
          marginBottom: '2rem',
          fontSize: '1.5rem',
          color: '#333'
        }}
      >
        {isSignUp ? 'Create Your Account' : 'Welcome Back'}
      </Text>

      {error && (
        <Alert 
          icon={<IconAlertCircle size="1rem" />} 
          title="Authentication Error" 
          color="red" 
          style={{ marginBottom: '1rem' }}
          variant="filled"
        >
          {error}
        </Alert>
      )}

      {success && (
        <Alert 
          icon={<IconCheck size="1rem" />} 
          title="Success!" 
          color="green" 
          style={{ marginBottom: '1rem' }}
          variant="filled"
        >
          {success}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <TextInput
          label="Email Address"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          size="md"
          style={{ marginBottom: '1rem' }}
          error={email && !isValidEmail(email) ? 'Please enter a valid email' : null}
        />

        <PasswordInput
          label="Password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          size="md"
          style={{ marginBottom: isSignUp ? '1rem' : '1.5rem' }}
        />

        {isSignUp && (
          <PasswordInput
            label="Confirm Password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            size="md"
            style={{ marginBottom: '1.5rem' }}
            error={confirmPassword && password !== confirmPassword ? 'Passwords do not match' : null}
          />
        )}

        <Button
          type="submit"
          fullWidth
          size="lg"
          loading={loading}
          style={{ 
            height: '50px',
            fontSize: '1.1rem',
            fontWeight: '600',
            marginBottom: '1rem'
          }}
        >
          {loading ? (
            <Loader size="sm" color="white" />
          ) : (
            isSignUp ? 'Create Account' : 'Sign In'
          )}
        </Button>
      </form>

      <Divider 
        label="or" 
        labelPosition="center" 
        style={{ margin: '1.5rem 0' }} 
      />

      <Text align="center" size="sm" style={{ marginBottom: '1rem' }}>
        {isSignUp ? 'Already have an account?' : "Don't have an account?"}
      </Text>

      <Button
        variant="outline"
        fullWidth
        size="md"
        onClick={toggleMode}
        disabled={loading}
        style={{ 
          height: '45px',
          fontSize: '1rem'
        }}
      >
        {isSignUp ? 'Sign In Instead' : 'Create New Account'}
      </Button>

      <Text 
        size="xs" 
        color="dimmed" 
        align="center" 
        style={{ marginTop: '1.5rem', lineHeight: 1.4 }}
      >
        {isSignUp ? (
          'By creating an account, you agree to our Terms of Service and Privacy Policy.'
        ) : (
          'Having trouble signing in? Make sure your email and password are correct.'
        )}
      </Text>
    </div>
  );
};

export default AuthForm;