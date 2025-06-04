import React from 'react';
import { Button, Group, Title, Text } from '@mantine/core';

const Dashboard = ({ user, onLogout }) => {
  return (
    <div style={{
      width: '100%',
      maxWidth: '1200px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      minHeight: '70vh',
      justifyContent: 'space-between'
    }}>
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <Title order={2} style={{ 
          fontSize: '2rem', 
          marginBottom: '1rem',
          color: '#333'
        }}>
          Welcome, {user.email}
        </Title>
        <Text size="lg" style={{ 
          fontSize: '1.2rem',
          color: '#666',
          marginBottom: '3rem'
        }}>
          Select an option to get started
        </Text>
      </div>

      {/* Main action buttons at bottom */}
      <div style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '2rem',
        marginBottom: '3rem'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1.5rem',
          width: '100%',
          maxWidth: '800px'
        }}>
          <Button 
            size="lg" 
            style={{ 
              height: '60px', 
              fontSize: '1.1rem',
              fontWeight: '600'
            }}
          >
            Profile Setup
          </Button>
          <Button 
            size="lg" 
            style={{ 
              height: '60px', 
              fontSize: '1.1rem',
              fontWeight: '600'
            }}
          >
            Buddy Pairing
          </Button>
          <Button 
            size="lg" 
            style={{ 
              height: '60px', 
              fontSize: '1.1rem',
              fontWeight: '600'
            }}
          >
            Scheduled Video Chat
          </Button>
          <Button 
            size="lg" 
            style={{ 
              height: '60px', 
              fontSize: '1.1rem',
              fontWeight: '600'
            }}
          >
            Session Feedback
          </Button>
          <Button 
            size="lg" 
            style={{ 
              height: '60px', 
              fontSize: '1.1rem',
              fontWeight: '600'
            }}
          >
            Admin Dashboard
          </Button>
        </div>
        
        {/* Logout button separate and styled differently */}
        <Button 
          color="red" 
          size="lg"
          onClick={onLogout}
          style={{ 
            height: '50px', 
            fontSize: '1rem',
            fontWeight: '600',
            minWidth: '150px'
          }}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;