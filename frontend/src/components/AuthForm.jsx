import React, { useState } from 'react';
import { signup, login } from '../firebaseAuth';
import { Button, TextInput, Title, Paper, Text, Stack } from '@mantine/core';

const AuthForm = ({ onAuthSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const authFunc = isLogin ? login : signup;
      const userCredential = await authFunc(email, password);
      onAuthSuccess && onAuthSuccess(userCredential.user);
    } catch (err) {
      setError(err.message || 'Failed to authenticate');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper p="xl" shadow="md" style={{ maxWidth: 400, margin: 'auto' }}>
      <Stack spacing="md">
        <Title order={2} align="center">
          {isLogin ? 'Login' : 'Sign Up'}
        </Title>
        <form onSubmit={handleSubmit}>
          <Stack spacing="sm">
            <TextInput
              label="Email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
              required
              type="email"
            />
            <TextInput
              label="Password"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
              required
              type="password"
            />
            {error && (
              <Text color="red" size="sm" align="center">
                {error}
              </Text>
            )}
            <Button type="submit" fullWidth loading={loading}>
              {isLogin ? 'Login' : 'Create Account'}
            </Button>
          </Stack>
        </form>
        <Text
          align="center"
          color="blue"
          style={{ cursor: 'pointer' }}
          onClick={() => setIsLogin(!isLogin)}
          size="sm"
        >
          {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Login'}
        </Text>
      </Stack>
    </Paper>
  );
};

export default AuthForm;
