import React from 'react'
import { Box, Typography, Container, Button, AppBar, Toolbar, IconButton, Stack, Paper, Avatar } from '@mui/material'
import { AccountCircle as ProfileIcon } from '@mui/icons-material'

const steps = [
    {
        num: '01', title: 'Create Your Account', icon: '🔐',
        desc: 'Sign up in seconds with your email or Google account. Your data is encrypted end-to-end and never shared with third parties.',
        details: ['Quick email or Google sign-up', 'Secure end-to-end encryption', 'HIPAA-compliant data storage', 'No credit card required'],
        color: '#bb86fc'
    },
    {
        num: '02', title: 'Complete Your Profile', icon: '👤',
        desc: 'Tell MIMO a bit about yourself — your goals, triggers, and preferences. This helps the AI personalize your experience from day one.',
        details: ['Set your mental health goals', 'Identify personal triggers', 'Choose preferred coping styles', 'Customize notification preferences'],
        color: '#e040fb'
    },
    {
        num: '03', title: 'Daily Morning Check-in', icon: '🌅',
        desc: 'Start each day with a quick 2-minute mood assessment. MIMO helps you set an intention and prepare mentally for the day ahead.',
        details: ['Intuitive emoji-based mood selector', 'Tag activities affecting your mood', 'Set a daily intention', 'Receive a personalized morning affirmation'],
        color: '#7c4dff'
    },
    {
        num: '04', title: 'Chat Anytime You Need', icon: '💬',
        desc: 'Whenever you feel overwhelmed, anxious, or just need to talk — MIMO is available 24/7. Express yourself through text or voice.',
        details: ['24/7 empathetic AI conversations', 'Voice interaction support', 'Science-backed coping strategies', 'Real-time emotional validation'],
        color: '#03dac6'
    },
    {
        num: '05', title: 'Track Your Progress', icon: '📊',
        desc: 'Visualize your emotional journey with beautiful analytics. See patterns, identify triggers, and celebrate your growth over time.',
        details: ['Weekly & monthly mood heatmaps', 'Trend analysis with AI insights', 'Actionable wellness recommendations', 'Streak tracking for consistency'],
        color: '#ff4081'
    },
    {
        num: '06', title: 'Evening Reflection', icon: '🌙',
        desc: "End your day by reviewing your emotional landscape. MIMO helps you recognize what brought joy and what triggered stress.",
        details: ['Guided evening journaling prompts', 'Stress trigger identification', 'Gratitude practice integration', 'Sleep preparation techniques'],
        color: '#ffab40'
    },
]

const HowItWorksPage = ({ onNavigate }) => {
    return (
        <Box sx={{ minHeight: '100vh', bgcolor: '#FCFAFF' }}>
            {/* NAVBAR */}
            <AppBar position="sticky" color="transparent" elevation={0} sx={{ py: 1, backdropFilter: 'blur(12px)', bgcolor: 'rgba(252,250,255,0.85)' }}>
                <Container maxWidth="lg">
                    <Toolbar disableGutters>
                        <Box onClick={() => onNavigate('landing')} sx={{ display: 'flex', alignItems: 'center', flexGrow: 1, gap: 1, cursor: 'pointer' }}>
                            <Box sx={{ width: 34, height: 34, borderRadius: '50%', bgcolor: '#bb86fc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Typography sx={{ color: 'white', fontWeight: 800, fontSize: '0.85rem' }}>◆</Typography>
                            </Box>
                            <Typography sx={{ fontWeight: 800, fontSize: '1.15rem', color: '#1a1a1a', letterSpacing: -0.5 }}>MIMO</Typography>
                        </Box>
                        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 4, mr: 4 }}>
                            <Typography sx={{ fontWeight: 700, color: '#bb86fc', fontSize: '0.9rem', borderBottom: '2px solid #bb86fc', pb: 0.3 }}>How it Works</Typography>
                            <Typography onClick={() => onNavigate('features')} sx={{ fontWeight: 500, cursor: 'pointer', color: '#555', fontSize: '0.9rem', '&:hover': { color: '#bb86fc' } }}>Features</Typography>
                            <Typography onClick={() => onNavigate('resources')} sx={{ fontWeight: 500, cursor: 'pointer', color: '#555', fontSize: '0.9rem', '&:hover': { color: '#bb86fc' } }}>Resources</Typography>
                        </Box>
                        <Button onClick={() => onNavigate('login')} variant="contained" sx={{ bgcolor: '#bb86fc', color: 'white', borderRadius: '100px', px: 3, py: 0.8, textTransform: 'none', fontWeight: 600, fontSize: '0.85rem', boxShadow: 'none', '&:hover': { bgcolor: '#a76ef5' } }}>Get Started</Button>
                        <IconButton onClick={() => onNavigate('login')} sx={{ ml: 1 }}><ProfileIcon sx={{ color: '#ff4081', fontSize: 26 }} /></IconButton>
                    </Toolbar>
                </Container>
            </AppBar>

            {/* HERO */}
            <Container maxWidth="lg" sx={{ pt: 10, pb: 6, textAlign: 'center' }}>
                <Typography sx={{ fontWeight: 900, fontSize: { xs: '2.4rem', md: '3.5rem' }, lineHeight: 1.1, color: '#111', mb: 2, letterSpacing: '-2px', fontFamily: '"Outfit", sans-serif' }}>
                    Your Journey to a<br /><Box component="span" sx={{ color: '#bb86fc', fontStyle: 'italic', fontWeight: 400 }}>Calmer Mind</Box>
                </Typography>
                <Typography sx={{ color: '#999', fontSize: '1.05rem', maxWidth: 560, mx: 'auto', lineHeight: 1.7, mb: 4 }}>
                    MIMO makes mental wellness effortless. Here's how our 6-step process transforms your daily routine into a powerful self-care practice.
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                    {steps.map((s, i) => <Box key={i} sx={{ width: 40, height: 4, borderRadius: '100px', bgcolor: s.color, opacity: 0.6 }} />)}
                </Box>
            </Container>

            {/* STEPS */}
            <Container maxWidth="lg" sx={{ pb: 10 }}>
                <Stack spacing={4}>
                    {steps.map((s, i) => (
                        <Paper key={i} elevation={0} sx={{
                            border: '1px solid #f0f0f0', borderRadius: '28px', overflow: 'hidden',
                            display: 'flex', flexDirection: { xs: 'column', md: i % 2 === 0 ? 'row' : 'row-reverse' },
                            transition: '0.3s', '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 16px 48px rgba(0,0,0,0.04)' }
                        }}>
                            {/* Number + Icon Side */}
                            <Box sx={{
                                flex: '0 0 280px', bgcolor: s.color + '08', display: 'flex', flexDirection: 'column',
                                alignItems: 'center', justifyContent: 'center', p: 5, borderRight: i % 2 === 0 ? '1px solid #f0f0f0' : 'none',
                                borderLeft: i % 2 !== 0 ? '1px solid #f0f0f0' : 'none'
                            }}>
                                <Typography sx={{ fontSize: '4rem', mb: 1 }}>{s.icon}</Typography>
                                <Typography sx={{ fontSize: '3rem', fontWeight: 900, color: s.color, opacity: 0.2, fontFamily: '"Outfit", sans-serif' }}>STEP</Typography>
                                <Typography sx={{ fontSize: '4rem', fontWeight: 900, color: s.color, lineHeight: 1, fontFamily: '"Outfit", sans-serif' }}>{s.num}</Typography>
                            </Box>
                            {/* Content Side */}
                            <Box sx={{ flex: 1, p: { xs: 3, md: 5 }, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                <Typography sx={{ fontWeight: 800, fontSize: '1.4rem', mb: 1.5, color: '#111' }}>{s.title}</Typography>
                                <Typography sx={{ color: '#888', lineHeight: 1.8, mb: 3, fontSize: '0.95rem' }}>{s.desc}</Typography>
                                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 1.5 }}>
                                    {s.details.map((d, di) => (
                                        <Box key={di} sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
                                            <Box sx={{ width: 24, height: 24, borderRadius: '8px', bgcolor: s.color + '15', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                                <Typography sx={{ color: s.color, fontSize: '0.65rem', fontWeight: 800 }}>✓</Typography>
                                            </Box>
                                            <Typography sx={{ fontSize: '0.82rem', color: '#666' }}>{d}</Typography>
                                        </Box>
                                    ))}
                                </Box>
                            </Box>
                        </Paper>
                    ))}
                </Stack>
            </Container>

            {/* CTA */}
            <Container maxWidth="lg" sx={{ pb: 10 }}>
                <Box sx={{ bgcolor: '#dcc6ff', borderRadius: '36px', p: { xs: 5, md: 7 }, textAlign: 'center', color: 'white' }}>
                    <Typography sx={{ fontWeight: 800, mb: 2, fontSize: { xs: '1.6rem', md: '2.2rem' }, lineHeight: 1.2 }}>Ready to Begin?</Typography>
                    <Typography sx={{ mb: 4, opacity: 0.85, fontSize: '0.95rem' }}>Start your free trial today. No credit card required.</Typography>
                    <Button onClick={() => onNavigate('login')} variant="contained" sx={{ bgcolor: 'white', color: '#bb86fc', fontWeight: 700, px: 5, py: 1.3, borderRadius: '100px', boxShadow: 'none', '&:hover': { bgcolor: '#f8f8f8' } }}>Get Started Free →</Button>
                </Box>
            </Container>

            {/* FOOTER */}
            <Box sx={{ py: 4, borderTop: '1px solid #f0f0f0' }}>
                <Container maxWidth="lg">
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Box sx={{ width: 22, height: 22, borderRadius: '50%', bgcolor: '#bb86fc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Typography sx={{ color: 'white', fontSize: '0.5rem', fontWeight: 800 }}>◆</Typography></Box>
                            <Typography sx={{ fontWeight: 700, fontSize: '0.85rem', color: '#666' }}>MIMO</Typography>
                        </Box>
                        <Typography sx={{ color: '#ccc', fontSize: '0.75rem' }}>© 2024 MIMO AI Support.</Typography>
                    </Box>
                </Container>
            </Box>
        </Box>
    )
}

export default HowItWorksPage
