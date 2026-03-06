import React from 'react'
import { Box, Typography, Container, Button, AppBar, Toolbar, IconButton, Stack, Paper, Chip } from '@mui/material'
import { AccountCircle as ProfileIcon, ChatBubbleOutline, MicNone, BarChartOutlined, Shield, Favorite, Notifications, Psychology, Group, Speed } from '@mui/icons-material'

const features = [
    {
        title: 'AI Empathy Chat', icon: <ChatBubbleOutline sx={{ fontSize: 28 }} />,
        desc: 'Have deep, meaningful conversations with an AI that truly understands emotions. MIMO uses advanced NLP to provide empathetic, context-aware responses.',
        highlights: ['Context-aware memory across sessions', 'Empathetic tone calibration', 'CBT & DBT techniques integration', 'Suggestion chips for guided conversations'],
        color: '#bb86fc', tag: 'Core'
    },
    {
        title: 'Voice Interaction', icon: <MicNone sx={{ fontSize: 28 }} />,
        desc: 'Sometimes typing isn\'t enough. Speak freely and let MIMO guide you through voice-led meditation, breathing exercises, and reflective conversations.',
        highlights: ['Natural speech recognition', 'Guided voice meditations', 'Calming audio responses', 'Hands-free crisis support'],
        color: '#ff4081', tag: 'Premium'
    },
    {
        title: 'Smart Mood Analytics', icon: <BarChartOutlined sx={{ fontSize: 28 }} />,
        desc: 'Visualize your emotional journey with interactive charts, heatmaps, and trend analysis. Understand what triggers stress and what brings joy.',
        highlights: ['Weekly & monthly mood heatmaps', 'Emotion-activity correlation', 'Sleep-mood pattern analysis', 'Exportable wellness reports'],
        color: '#03dac6', tag: 'Core'
    },
    {
        title: 'Crisis Detection', icon: <Shield sx={{ fontSize: 28 }} />,
        desc: 'MIMO monitors conversations for signs of severe distress and immediately surfaces emergency helpline numbers and grounding exercises.',
        highlights: ['Real-time distress signal detection', 'Instant helpline display', 'Emergency grounding exercises', 'Professional referral suggestions'],
        color: '#e040fb', tag: 'Safety'
    },
    {
        title: 'Personalized Insights', icon: <Psychology sx={{ fontSize: 28 }} />,
        desc: 'AI-powered daily and weekly insights that analyze your mood patterns, suggest actionable improvements, and celebrate your progress.',
        highlights: ['AI daily insight cards', 'Actionable recommendations', 'Streak & consistency tracking', 'Personalized affirmations'],
        color: '#7c4dff', tag: 'AI'
    },
    {
        title: 'Guided Wellness Tools', icon: <Favorite sx={{ fontSize: 28 }} />,
        desc: 'Access a library of breathing exercises, grounding techniques, journaling prompts, and meditation guides — all tailored to your current mood.',
        highlights: ['Box Breathing & 4-7-8 techniques', '5-4-3-2-1 grounding method', 'Gratitude journaling prompts', 'Progressive muscle relaxation'],
        color: '#ffab40', tag: 'Wellness'
    },
    {
        title: 'Smart Notifications', icon: <Notifications sx={{ fontSize: 28 }} />,
        desc: 'Gentle, non-intrusive reminders that help you build consistent mental health habits without feeling overwhelmed or nagged.',
        highlights: ['Customizable reminder times', 'Morning check-in nudges', 'Evening reflection prompts', 'Weekly progress summaries'],
        color: '#00bcd4', tag: 'Core'
    },
    {
        title: 'Community Support', icon: <Group sx={{ fontSize: 28 }} />,
        desc: 'Connect with moderated peer support communities. Share experiences, find solidarity, and grow together in a safe environment.',
        highlights: ['Moderated safe spaces', 'Anonymous participation option', 'Themed support groups', 'Expert-led group sessions'],
        color: '#4caf50', tag: 'Coming Soon'
    },
    {
        title: 'Privacy-First Design', icon: <Speed sx={{ fontSize: 28 }} />,
        desc: 'Your mental health data is sacred. MIMO uses end-to-end encryption, zero data selling, and gives you full control over your information.',
        highlights: ['End-to-end encryption', 'Zero data selling — ever', 'One-click data export', 'GDPR & HIPAA compliance'],
        color: '#795548', tag: 'Security'
    },
]

const FeaturesPage = ({ onNavigate }) => {
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
                            <Typography onClick={() => onNavigate('howitworks')} sx={{ fontWeight: 500, cursor: 'pointer', color: '#555', fontSize: '0.9rem', '&:hover': { color: '#bb86fc' } }}>How it Works</Typography>
                            <Typography sx={{ fontWeight: 700, color: '#bb86fc', fontSize: '0.9rem', borderBottom: '2px solid #bb86fc', pb: 0.3 }}>Features</Typography>
                            <Typography onClick={() => onNavigate('resources')} sx={{ fontWeight: 500, cursor: 'pointer', color: '#555', fontSize: '0.9rem', '&:hover': { color: '#bb86fc' } }}>Resources</Typography>
                        </Box>
                        <Button onClick={() => onNavigate('login')} variant="contained" sx={{ bgcolor: '#bb86fc', color: 'white', borderRadius: '100px', px: 3, py: 0.8, textTransform: 'none', fontWeight: 600, fontSize: '0.85rem', boxShadow: 'none', '&:hover': { bgcolor: '#a76ef5' } }}>Get Started</Button>
                        <IconButton onClick={() => onNavigate('login')} sx={{ ml: 1 }}><ProfileIcon sx={{ color: '#ff4081', fontSize: 26 }} /></IconButton>
                    </Toolbar>
                </Container>
            </AppBar>

            {/* HERO */}
            <Container maxWidth="lg" sx={{ pt: 10, pb: 8, textAlign: 'center' }}>
                <Chip label="EVERYTHING YOU NEED" sx={{ bgcolor: '#f3e8ff', color: '#bb86fc', fontWeight: 800, fontSize: '0.6rem', mb: 3, borderRadius: '100px', height: '26px', letterSpacing: '1.5px' }} />
                <Typography sx={{ fontWeight: 900, fontSize: { xs: '2.4rem', md: '3.5rem' }, lineHeight: 1.1, color: '#111', mb: 2, letterSpacing: '-2px', fontFamily: '"Outfit", sans-serif' }}>
                    Features Designed for<br /><Box component="span" sx={{ color: '#bb86fc', fontStyle: 'italic', fontWeight: 400 }}>Your Well-being</Box>
                </Typography>
                <Typography sx={{ color: '#999', fontSize: '1.05rem', maxWidth: 580, mx: 'auto', lineHeight: 1.7 }}>
                    Every feature in MIMO is carefully crafted with therapists and AI researchers to provide you with the most effective mental health support.
                </Typography>
            </Container>

            {/* FEATURES GRID */}
            <Container maxWidth="lg" sx={{ pb: 10 }}>
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' }, gap: 3 }}>
                    {features.map((f, i) => (
                        <Paper key={i} elevation={0} sx={{
                            border: '1px solid #f0f0f0', borderRadius: '24px', p: 4, transition: '0.3s', cursor: 'default',
                            '&:hover': { transform: 'translateY(-6px)', boxShadow: '0 20px 50px rgba(0,0,0,0.04)', borderColor: f.color + '40' }
                        }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
                                <Box sx={{ width: 56, height: 56, borderRadius: '18px', bgcolor: f.color + '12', display: 'flex', alignItems: 'center', justifyContent: 'center', color: f.color }}>
                                    {f.icon}
                                </Box>
                                <Chip label={f.tag} size="small" sx={{ bgcolor: f.color + '12', color: f.color, fontWeight: 700, fontSize: '0.65rem', borderRadius: '8px' }} />
                            </Box>
                            <Typography sx={{ fontWeight: 800, fontSize: '1.15rem', mb: 1, color: '#111' }}>{f.title}</Typography>
                            <Typography sx={{ color: '#999', fontSize: '0.85rem', lineHeight: 1.7, mb: 3 }}>{f.desc}</Typography>
                            <Stack spacing={1}>
                                {f.highlights.map((h, hi) => (
                                    <Box key={hi} sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
                                        <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: f.color, flexShrink: 0 }} />
                                        <Typography sx={{ fontSize: '0.78rem', color: '#777' }}>{h}</Typography>
                                    </Box>
                                ))}
                            </Stack>
                        </Paper>
                    ))}
                </Box>
            </Container>

            {/* COMPARISON SECTION */}
            <Box sx={{ bgcolor: 'white', py: 10 }}>
                <Container maxWidth="lg">
                    <Typography sx={{ fontWeight: 800, fontSize: '2rem', textAlign: 'center', mb: 1, color: '#111' }}>Why MIMO?</Typography>
                    <Typography sx={{ color: '#999', textAlign: 'center', mb: 6, fontSize: '0.95rem' }}>See how MIMO compares to traditional approaches</Typography>
                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' }, gap: 3 }}>
                        {[
                            { title: 'Traditional Therapy', items: ['Scheduled appointments only', 'High cost per session', 'Limited availability', 'Travel required'], color: '#ccc', icon: '🏥' },
                            { title: 'MIMO AI Companion', items: ['Available 24/7 instantly', 'Free to start, affordable Premium', 'Unlimited conversations', 'From anywhere, any device'], color: '#bb86fc', icon: '◆', highlight: true },
                            { title: 'Self-Help Apps', items: ['Generic one-size content', 'No personalization', 'No real conversation', 'Passive consumption'], color: '#ccc', icon: '📱' },
                        ].map((c, i) => (
                            <Paper key={i} elevation={0} sx={{
                                border: c.highlight ? '2px solid #bb86fc' : '1px solid #f0f0f0', borderRadius: '24px', p: 4, textAlign: 'center',
                                bgcolor: c.highlight ? '#faf5ff' : 'white', transform: c.highlight ? 'scale(1.04)' : 'none', position: 'relative'
                            }}>
                                {c.highlight && <Chip label="RECOMMENDED" size="small" sx={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', bgcolor: '#bb86fc', color: 'white', fontWeight: 700, fontSize: '0.65rem' }} />}
                                <Typography sx={{ fontSize: '2rem', mb: 1 }}>{c.icon}</Typography>
                                <Typography sx={{ fontWeight: 800, fontSize: '1.1rem', mb: 3, color: c.highlight ? '#bb86fc' : '#333' }}>{c.title}</Typography>
                                <Stack spacing={1.5}>
                                    {c.items.map((item, ii) => (
                                        <Box key={ii} sx={{ display: 'flex', gap: 1.5, alignItems: 'center', justifyContent: 'center' }}>
                                            <Box sx={{ width: 20, height: 20, borderRadius: '6px', bgcolor: c.highlight ? '#bb86fc15' : '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                                <Typography sx={{ fontSize: '0.6rem', color: c.highlight ? '#bb86fc' : '#bbb', fontWeight: 800 }}>{c.highlight ? '✓' : '—'}</Typography>
                                            </Box>
                                            <Typography sx={{ fontSize: '0.82rem', color: '#666' }}>{item}</Typography>
                                        </Box>
                                    ))}
                                </Stack>
                            </Paper>
                        ))}
                    </Box>
                </Container>
            </Box>

            {/* CTA */}
            <Container maxWidth="lg" sx={{ py: 10 }}>
                <Box sx={{ bgcolor: '#dcc6ff', borderRadius: '36px', p: { xs: 5, md: 7 }, textAlign: 'center', color: 'white' }}>
                    <Typography sx={{ fontWeight: 800, mb: 2, fontSize: { xs: '1.6rem', md: '2.2rem' }, lineHeight: 1.2 }}>Experience All Features Free</Typography>
                    <Typography sx={{ mb: 4, opacity: 0.85, fontSize: '0.95rem' }}>Start your wellness journey with full access. No credit card needed.</Typography>
                    <Stack direction="row" spacing={2} justifyContent="center">
                        <Button onClick={() => onNavigate('login')} variant="contained" sx={{ bgcolor: 'white', color: '#bb86fc', fontWeight: 700, px: 5, py: 1.3, borderRadius: '100px', boxShadow: 'none', '&:hover': { bgcolor: '#f8f8f8' } }}>Start Free Trial →</Button>
                        <Button onClick={() => onNavigate('howitworks')} variant="outlined" sx={{ borderColor: 'rgba(255,255,255,0.4)', color: 'white', fontWeight: 700, px: 4, py: 1.3, borderRadius: '100px', '&:hover': { borderColor: 'white' } }}>How It Works</Button>
                    </Stack>
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

export default FeaturesPage
