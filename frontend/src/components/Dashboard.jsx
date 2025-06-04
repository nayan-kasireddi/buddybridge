import React from 'react';
import { Button, Container, Title, Stack, Text } from '@mantine/core';

const Dashboard = ({ user, onLogout }) => {
  return (
    <Container size="sm" style={{ marginTop: 40 }}>
      <Title order={2} align="center" mb="md">
        Welcome, {user.email}
      </Title>
      <Stack spacing="md" align="center">
        <Button fullWidth variant="outline">Profile Setup</Button>
        <Button fullWidth variant="outline">Buddy Pairing</Button>
        <Button fullWidth variant="outline">Scheduled Video Chat</Button>
        <Button fullWidth variant="outline">Session Feedback</Button>
        <Button fullWidth variant="outline">Admin Dashboard</Button>
        <Button fullWidth color="red" onClick={onLogout}>
          Logout
        </Button>
      </Stack>
      <Text size="sm" color="dimmed" align="center" mt="xl">
        Select an option to get started
      </Text>
    </Container>
  );
};

export default Dashboard;
