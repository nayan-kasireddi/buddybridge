import React, { useState } from 'react';
import { signup, login } from '../firebaseAuth';
import { Button, TextInput, Title, Paper, Text } from '@mantine/core';

const AuthForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await signup(email, password);
      }
      console.log('Success! API Base URL:', apiUrl);
    } catch (err) {
      setError(err.message || 'Failed to authenticate');
    }
    setLoading(false);
  };

  return (
    <Paper p="md" shadow="sm" style={{ maxWidth: 400, margin: 'auto' }}>
      <Title style={{ textAlign: 'center', marginBottom: 16 }}>
        {isLogin ? 'Login' : 'Sign Up'}
      </Title>
      <form onSubmit={handleSubmit}>
        <TextInput
          label="Email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
          required
          mb={16}
          type="email"
        />
        <TextInput
          label="Password"
          placeholder="Your password"
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
          required
          mb={16}
          type="password"
        />
        {error && (
          <Text color="red" size="sm" mb={16}>
            {error}
          </Text>
        )}
        <Button type="submit" fullWidth loading={loading}>
          {isLogin ? 'Login' : 'Create Account'}
        </Button>
      </form>
      <Text
        style={{ textAlign: 'center', marginTop: 16, cursor: 'pointer', color: 'blue' }}
        onClick={() => setIsLogin(!isLogin)}
      >
        {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Login'}
      </Text>
    </Paper>
  );
};

export default AuthForm;
