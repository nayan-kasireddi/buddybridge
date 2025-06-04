import React from 'react';
import { Button, Group, Title, Text, Paper, Card, Avatar, Badge, Box, Grid, Container } from '@mantine/core';
import { 
  IconUser, 
  IconUsers, 
  IconVideo, 
  IconStar, 
  IconSettings, 
  IconLogout,
  IconHeart,
  IconCalendar,
  IconMessageCircle,
  IconTrendingUp
} from '@tabler/icons-react';

const Dashboard = ({ user, onLogout }) => {
  const getInitials = (email) => {
    return email.charAt(0).toUpperCase();
  };

  const dashboardCards = [
    {
      title: 'Profile Setup',
      description: 'Complete your profile and preferences',
      icon: IconUser,
      color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      stats: 'Setup Progress: 60%'
    },
    {
      title: 'Buddy Pairing',
      description: 'Find and connect with your perfect buddy',
      icon: IconUsers,
      color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      stats: '3 Matches Found'
    },
    {
      title: 'Video Chat',
      description: 'Schedule or join video sessions',
      icon: IconVideo,
      color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      stats: 'Next: Today 3:00 PM'
    },
    {
      title: 'Session Feedback',
      description: 'Rate and review your buddy sessions',
      icon: IconStar,
      color: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
      stats: '5 Sessions Completed'
    },
    {
      title: 'Admin Dashboard',
      description: 'Manage settings and preferences',
      icon: IconSettings,
      color: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
      stats: 'System Status: Active'
    }
  ];

  return (
    <Box
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background decorative elements */}
      <div
        style={{
          position: 'absolute',
          top: '5%',
          right: '10%',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.05)',
          filter: 'blur(60px)',
          animation: 'float 8s ease-in-out infinite'
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '10%',
          left: '5%',
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.03)',
          filter: 'blur(40px)',
          animation: 'float 6s ease-in-out infinite reverse'
        }}
      />

      <Container size="xl" style={{ position: 'relative', zIndex: 1 }}>
        {/* Header Section */}
        <Paper
          style={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '20px',
            padding: '2rem',
            margin: '2rem 0',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
          }}
        >
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <div style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '50%',
                padding: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)'
              }}>
                <Avatar
                  size="lg"
                  radius="xl"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    color: 'white',
                    fontSize: '1.5rem',
                    fontWeight: 'bold'
                  }}
                >
                  {getInitials(user.email)}
                </Avatar>
              </div>
              
              <div>
                <Title
                  order={1}
                  style={{
                    fontSize: '2.2rem',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    marginBottom: '0.5rem',
                    fontWeight: 700
                  }}
                >
                  Welcome back!
                </Title>
                <Text
                  size="lg"
                  style={{
                    color: '#666',
                    fontSize: '1.1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <IconHeart size={18} fill="currentColor" style={{ color: '#f5576c' }} />
                  {user.email}
                </Text>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <Badge
                size="lg"
                style={{
                  background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                  color: 'white',
                  border: 'none',
                  padding: '0.8rem 1.2rem',
                  fontSize: '0.9rem'
                }}
              >
                <IconTrendingUp size={16} style={{ marginRight: '0.3rem' }} />
                Active User
              </Badge>
              
              <Button
                color="red"
                variant="light"
                size="md"
                onClick={onLogout}
                leftIcon={<IconLogout size={18} />}
                style={{
                  borderRadius: '12px',
                  fontWeight: 600,
                  padding: '0.8rem 1.5rem'
                }}
              >
                Logout
              </Button>
            </div>
          </div>
        </Paper>

        {/* Quick Stats */}
        <Grid style={{ marginBottom: '2rem' }}>
          <Grid.Col span={12} md={4}>
            <Paper
              style={{
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '16px',
                padding: '1.5rem',
                textAlign: 'center',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
              }}
            >
              <IconMessageCircle size={32} style={{ color: '#667eea', marginBottom: '0.5rem' }} />
              <Text size="xl" weight={700} style={{ color: '#333' }}>12</Text>
              <Text size="sm" color="dimmed">Active Chats</Text>
            </Paper>
          </Grid.Col>
          <Grid.Col span={12} md={4}>
            <Paper
              style={{
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '16px',
                padding: '1.5rem',
                textAlign: 'center',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
              }}
            >
              <IconCalendar size={32} style={{ color: '#f5576c', marginBottom: '0.5rem' }} />
              <Text size="xl" weight={700} style={{ color: '#333' }}>3</Text>
              <Text size="sm" color="dimmed">Upcoming Sessions</Text>
            </Paper>
          </Grid.Col>
          <Grid.Col span={12} md={4}>
            <Paper
              style={{
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '16px',
                padding: '1.5rem',
                textAlign: 'center',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
              }}
            >
              <IconStar size={32} style={{ color: '#fcb69f', marginBottom: '0.5rem' }} />
              <Text size="xl" weight={700} style={{ color: '#333' }}>4.9</Text>
              <Text size="sm" color="dimmed">Average Rating</Text>
            </Paper>
          </Grid.Col>
        </Grid>

        {/* Main Dashboard Cards */}
        <div style={{ marginBottom: '3rem' }}>
          <Title
            order={2}
            style={{
              color: 'white',
              textAlign: 'center',
              marginBottom: '2rem',
              fontSize: '1.8rem',
              textShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            What would you like to do today?
          </Title>

          <Grid>
            {dashboardCards.map((card, index) => {
              const IconComponent = card.icon;
              return (
                <Grid.Col key={index} span={12} md={6} lg={4}>
                  <Card
                    shadow="xl"
                    radius="xl"
                    style={{
                      height: '100%',
                      background: 'rgba(255, 255, 255, 0.95)',
                      backdropFilter: 'blur(20px)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      overflow: 'hidden',
                      position: 'relative'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-8px)';
                      e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0px)';
                      e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
                    }}
                  >
                    <div
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '4px',
                        background: card.color
                      }}
                    />
                    
                    <div style={{ padding: '1.5rem' }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '1rem'
                      }}>
                        <div
                          style={{
                            background: card.color,
                            borderRadius: '12px',
                            padding: '0.8rem',
                            marginRight: '1rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          <IconComponent size={24} color="white" />
                        </div>
                        <div>
                          <Text
                            size="lg"
                            weight={700}
                            style={{ color: '#333', marginBottom: '0.2rem' }}
                          >
                            {card.title}
                          </Text>
                          <Badge
                            size="sm"
                            variant="light"
                            style={{
                              background: 'rgba(102, 126, 234, 0.1)',
                              color: '#667eea',
                              border: 'none'
                            }}
                          >
                            {card.stats}
                          </Badge>
                        </div>
                      </div>

                      <Text
                        size="md"
                        color="dimmed"
                        style={{ 
                          marginBottom: '1.5rem',
                          lineHeight: 1.5
                        }}
                      >
                        {card.description}
                      </Text>

                      <Button
                        fullWidth
                        size="md"
                        radius="lg"
                        style={{
                          background: card.color,
                          border: 'none',
                          fontWeight: 600,
                          height: '45px'
                        }}
                      >
                        Get Started
                      </Button>
                    </div>
                  </Card>
                </Grid.Col>
              );
            })}
          </Grid>
        </div>
      </Container>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
      `}</style>
    </Box>
  );
};

export default Dashboard;