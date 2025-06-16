
import React, { useState } from 'react';

const HelpSupport = ({ onBack }) => {
  const [activeSection, setActiveSection] = useState('overview');

  const sections = {
    overview: {
      title: 'Welcome to BuddyBridge Support',
      icon: '👋',
      content: (
        <div>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '1.5rem', color: '#555' }}>
            Need help with BuddyBridge? You're in the right place! We're here to help you make the most of your cross-cultural friendship journey.
          </p>
          
          <div style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            padding: '1.5rem',
            borderRadius: '12px',
            marginBottom: '2rem'
          }}>
            <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.3rem' }}>💡 Quick Start Tips</h3>
            <ul style={{ margin: 0, paddingLeft: '1.2rem', lineHeight: '1.8' }}>
              <li>Complete your profile to get better buddy matches</li>
              <li>Be respectful and open-minded during video sessions</li>
              <li>Share your culture, interests, and learn from others</li>
              <li>Use the feedback system to help improve matches</li>
            </ul>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem'
          }}>
            {[
              { icon: '📚', title: 'How to Use', desc: 'Learn platform basics' },
              { icon: '❓', title: 'FAQ', desc: 'Common questions' },
              { icon: '📞', title: 'Contact Us', desc: 'Get direct support' },
              { icon: '🔧', title: 'Troubleshooting', desc: 'Fix common issues' }
            ].map((item, index) => (
              <div
                key={index}
                onClick={() => setActiveSection(item.title.toLowerCase().replace(' ', ''))}
                style={{
                  background: 'rgba(102, 126, 234, 0.1)',
                  border: '1px solid rgba(102, 126, 234, 0.2)',
                  borderRadius: '12px',
                  padding: '1.5rem',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(102, 126, 234, 0.15)';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(102, 126, 234, 0.1)';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{item.icon}</div>
                <div style={{ fontWeight: '600', marginBottom: '0.5rem', color: '#333' }}>{item.title}</div>
                <div style={{ fontSize: '0.9rem', color: '#666' }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      )
    },
    howtouse: {
      title: 'How to Use BuddyBridge',
      icon: '📚',
      content: (
        <div>
          <div style={{
            display: 'grid',
            gap: '2rem'
          }}>
            <div style={{
              background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
              color: 'white',
              padding: '2rem',
              borderRadius: '12px'
            }}>
              <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.4rem' }}>🚀 Getting Started</h3>
              <ol style={{ margin: 0, paddingLeft: '1.5rem', lineHeight: '1.8' }}>
                <li><strong>Complete Your Profile:</strong> Add your interests, location, and role</li>
                <li><strong>Wait for Pairing:</strong> Our admin will match you with a suitable buddy</li>
                <li><strong>Join Video Sessions:</strong> Attend scheduled calls with your buddy</li>
                <li><strong>Build Friendships:</strong> Share cultures, learn, and grow together</li>
              </ol>
            </div>

            <div style={{
              background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
              color: 'white',
              padding: '2rem',
              borderRadius: '12px'
            }}>
              <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.4rem' }}>🎥 Video Session Tips</h3>
              <ul style={{ margin: 0, paddingLeft: '1.5rem', lineHeight: '1.8' }}>
                <li>Test your camera and microphone before sessions</li>
                <li>Find a quiet, well-lit space for calls</li>
                <li>Prepare conversation topics about your culture</li>
                <li>Be patient with language differences</li>
                <li>Share photos, traditions, and experiences</li>
              </ul>
            </div>

            <div style={{
              background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
              color: '#333',
              padding: '2rem',
              borderRadius: '12px'
            }}>
              <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.4rem' }}>🌟 Making the Most of BuddyBridge</h3>
              <ul style={{ margin: 0, paddingLeft: '1.5rem', lineHeight: '1.8' }}>
                <li>Be consistent with session attendance</li>
                <li>Share feedback after each session</li>
                <li>Respect cultural differences and perspectives</li>
                <li>Keep conversations positive and inclusive</li>
                <li>Build long-lasting friendships beyond the platform</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    faq: {
      title: 'Frequently Asked Questions',
      icon: '❓',
      content: (
        <div>
          {[
            {
              q: 'How are buddy pairs created?',
              a: 'Our admin team manually reviews profiles and creates pairs based on complementary backgrounds, shared interests, and language preferences to ensure meaningful connections.'
            },
            {
              q: 'How long are video sessions?',
              a: 'Sessions typically last 30-60 minutes, but you and your buddy can agree on the duration that works best for both of you.'
            },
            {
              q: 'What if I can\'t attend a scheduled session?',
              a: 'Please inform your buddy as early as possible. You can reschedule through the platform or contact support for assistance.'
            },
            {
              q: 'Can I have multiple buddies?',
              a: 'Yes! Once you\'ve established a good relationship with your first buddy, you can request additional pairings to expand your cultural network.'
            },
            {
              q: 'What languages can I use during sessions?',
              a: 'English is the primary language, but you\'re encouraged to share words and phrases from your native language to enhance cultural exchange.'
            },
            {
              q: 'Is BuddyBridge safe for children?',
              a: 'Yes, all users are verified and sessions can be monitored. We recommend parental supervision for younger participants.'
            },
            {
              q: 'How do I report inappropriate behavior?',
              a: 'Use the feedback system after sessions or contact support immediately. We take all reports seriously and act quickly.'
            }
          ].map((faq, index) => (
            <div key={index} style={{
              background: '#f8f9fa',
              border: '1px solid #e9ecef',
              borderRadius: '12px',
              padding: '1.5rem',
              marginBottom: '1rem'
            }}>
              <h4 style={{
                color: '#667eea',
                fontSize: '1.1rem',
                marginBottom: '0.8rem',
                fontWeight: '600'
              }}>
                {faq.q}
              </h4>
              <p style={{
                color: '#555',
                lineHeight: '1.6',
                margin: 0
              }}>
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      )
    },
    contactus: {
      title: 'Contact Support',
      icon: '📞',
      content: (
        <div>
          <div style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            padding: '2rem',
            borderRadius: '12px',
            marginBottom: '2rem',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>👨‍💻</div>
            <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.5rem' }}>Meet Your Support Team</h3>
            <p style={{ margin: 0, opacity: 0.9, fontSize: '1.1rem' }}>
              We're here to help you succeed on BuddyBridge!
            </p>
          </div>

          <div style={{
            background: '#f8f9fa',
            border: '2px solid #667eea',
            borderRadius: '16px',
            padding: '2rem',
            textAlign: 'center',
            marginBottom: '2rem'
          }}>
            <div style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              borderRadius: '50%',
              width: '80px',
              height: '80px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem',
              fontSize: '2rem',
              fontWeight: 'bold'
            }}>
              NK
            </div>
            <h3 style={{ color: '#333', fontSize: '1.4rem', marginBottom: '0.5rem' }}>
              Nayan Ram Kasireddi
            </h3>
            <p style={{ color: '#667eea', fontWeight: '600', marginBottom: '1rem' }}>
              Lead Developer & Support Specialist
            </p>
            <p style={{ color: '#666', marginBottom: '1.5rem', lineHeight: '1.6' }}>
              Working at <strong>TechGrit</strong> to build meaningful connections across cultures
            </p>
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              background: 'white',
              padding: '1rem',
              borderRadius: '8px',
              border: '1px solid #e9ecef'
            }}>
              <span style={{ fontSize: '1.2rem' }}>📧</span>
              <a 
                href="mailto:nayankasireddi@gmail.com"
                style={{
                  color: '#667eea',
                  textDecoration: 'none',
                  fontWeight: '600',
                  fontSize: '1.1rem'
                }}
              >
                nayankasireddi@gmail.com
              </a>
            </div>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
            color: 'white',
            padding: '1.5rem',
            borderRadius: '12px'
          }}>
            <h4 style={{ margin: '0 0 1rem 0' }}>📝 When contacting support, please include:</h4>
            <ul style={{ margin: 0, paddingLeft: '1.5rem', lineHeight: '1.8' }}>
              <li>Your account email address</li>
              <li>Detailed description of the issue</li>
              <li>Screenshots if applicable</li>
              <li>Steps you've already tried</li>
              <li>Your buddy's name (if session-related)</li>
            </ul>
          </div>
        </div>
      )
    },
    troubleshooting: {
      title: 'Troubleshooting',
      icon: '🔧',
      content: (
        <div>
          {[
            {
              issue: 'Video/Audio Not Working',
              icon: '🎥',
              solutions: [
                'Check browser permissions for camera and microphone',
                'Refresh the page and try rejoining',
                'Try a different browser (Chrome recommended)',
                'Restart your device if issues persist',
                'Check your internet connection speed'
              ]
            },
            {
              issue: 'Cannot Join Session',
              icon: '🚫',
              solutions: [
                'Ensure you\'re logged in with the correct account',
                'Check if the session time is correct',
                'Clear browser cache and cookies',
                'Try using an incognito/private window',
                'Contact your buddy to confirm session details'
              ]
            },
            {
              issue: 'Profile Not Updating',
              icon: '👤',
              solutions: [
                'Check all required fields are filled',
                'Try logging out and back in',
                'Clear browser cache',
                'Contact support if changes aren\'t saving',
                'Ensure stable internet connection'
              ]
            },
            {
              issue: 'No Buddy Assigned Yet',
              icon: '👥',
              solutions: [
                'Complete your full profile if not done',
                'Be patient - matching takes 1-3 days',
                'Contact support after 5 business days',
                'Consider updating interests for better matches',
                'Ensure availability times are set'
              ]
            }
          ].map((item, index) => (
            <div key={index} style={{
              background: '#f8f9fa',
              border: '1px solid #e9ecef',
              borderRadius: '12px',
              padding: '1.5rem',
              marginBottom: '1.5rem'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.8rem',
                marginBottom: '1rem'
              }}>
                <span style={{ fontSize: '1.5rem' }}>{item.icon}</span>
                <h4 style={{
                  color: '#333',
                  fontSize: '1.2rem',
                  margin: 0,
                  fontWeight: '600'
                }}>
                  {item.issue}
                </h4>
              </div>
              <ul style={{
                margin: 0,
                paddingLeft: '1.5rem',
                color: '#555',
                lineHeight: '1.7'
              }}>
                {item.solutions.map((solution, sIndex) => (
                  <li key={sIndex}>{solution}</li>
                ))}
              </ul>
            </div>
          ))}

          <div style={{
            background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
            color: 'white',
            padding: '1.5rem',
            borderRadius: '12px',
            textAlign: 'center'
          }}>
            <h4 style={{ margin: '0 0 1rem 0' }}>Still Need Help? 🤝</h4>
            <p style={{ margin: '0 0 1rem 0' }}>
              If these solutions don't work, don't hesitate to reach out!
            </p>
            <button
              onClick={() => setActiveSection('contactus')}
              style={{
                background: 'rgba(255, 255, 255, 0.9)',
                color: '#fa709a',
                border: 'none',
                padding: '0.8rem 1.5rem',
                borderRadius: '8px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Contact Support Team
            </button>
          </div>
        </div>
      )
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
      padding: '2rem',
      position: 'relative'
    }}>
      {/* Background decorative elements */}
      <div style={{
        position: 'absolute',
        top: '10%',
        right: '5%',
        width: '200px',
        height: '200px',
        borderRadius: '50%',
        background: 'rgba(255, 255, 255, 0.05)',
        filter: 'blur(60px)'
      }} />

      <div style={{
        maxWidth: '1000px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Header */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          borderRadius: '20px',
          padding: '2rem',
          marginBottom: '2rem',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ fontSize: '2.5rem' }}>{sections[activeSection].icon}</span>
            <h1 style={{
              fontSize: '2rem',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              margin: 0,
              fontWeight: '700'
            }}>
              {sections[activeSection].title}
            </h1>
          </div>
          
          <button
            onClick={onBack}
            style={{
              background: '#667eea',
              color: 'white',
              border: 'none',
              padding: '0.8rem 1.5rem',
              borderRadius: '12px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            ← Back to Dashboard
          </button>
        </div>

        {/* Navigation */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          borderRadius: '16px',
          padding: '1rem',
          marginBottom: '2rem',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          gap: '0.5rem',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
          {Object.entries(sections).map(([key, section]) => (
            <button
              key={key}
              onClick={() => setActiveSection(key)}
              style={{
                background: activeSection === key 
                  ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                  : 'transparent',
                color: activeSection === key ? 'white' : '#667eea',
                border: '2px solid #667eea',
                padding: '0.8rem 1.2rem',
                borderRadius: '12px',
                cursor: 'pointer',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all 0.3s ease'
              }}
            >
              <span>{section.icon}</span>
              {section.title}
            </button>
          ))}
        </div>

        {/* Content */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          borderRadius: '20px',
          padding: '2rem',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          minHeight: '500px'
        }}>
          {sections[activeSection].content}
        </div>
      </div>
    </div>
  );
};

export default HelpSupport;
