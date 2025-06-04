import React from 'react';
import { Button, Group, Title, Text } from '@mantine/core';

const Dashboard = ({ user, onLogout }) => {
  return (
    <div>
      <Text size="sm" align="right" style={{ position: 'absolute', top: 10, right: 10 }}>
        Users from Backend
      </Text>

      <Title order={2} align="center" mb="md">
        Welcome, {user.email}
      </Title>

      <Group position="center" spacing="md" mb="md">
        <Button>Profile Setup</Button>
        <Button>Buddy Pairing</Button>
        <Button>Scheduled Video Chat</Button>
        <Button>Session Feedback</Button>
        <Button>Admin Dashboard</Button>
        <Button color="red" onClick={onLogout}>Logout</Button>
      </Group>

      <Text align="center">Select an option to get started</Text>
    </div>
  );
};

export default Dashboard;
