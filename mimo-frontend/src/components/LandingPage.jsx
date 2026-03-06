import React from 'react'
import { Box, Container, Typography, Button, AppBar, Toolbar, IconButton, Avatar, Card, CardContent, Stack, Chip } from '@mui/material'
import { ChatBubbleOutline as ChatIcon, MicNone as MicIcon, BarChartOutlined as ChartIcon, AccountCircle as ProfileIcon } from '@mui/icons-material'

const LandingPage = ({ onNavigate }) => {
    return (
        <Box sx={{ flexGrow: 1, bgcolor: '#FCFAFF', minHeight: '100vh' }}>
            {/* NAVBAR */}
            <AppBar position="sticky" color="transparent" elevation={0} sx={{ py: 1, backdropFilter: 'blur(12px)', bgcolor: 'rgba(252,250,255,0.85)' }}>
                <Container maxWidth="lg">
                    <Toolbar disableGutters>
                        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1, gap: 1 }}>
                            <Box sx={{ width: 34, height: 34, borderRadius: '50%', bgcolor: '#bb86fc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Typography sx={{ color: 'white', fontWeight: 800, fontSize: '0.85rem' }}>◆</Typography>
                            </Box>
                            <Typography sx={{ fontWeight: 800, fontSize: '1.15rem', color: '#1a1a1a', letterSpacing: -0.5 }}>MIMO</Typography>
                        </Box>
                        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 4, mr: 4 }}>
                            {[
                                { label: 'How it Works', nav: 'howitworks' },
                                { label: 'Features', nav: 'features' },
                                { label: 'Resources', nav: 'resources' },
                            ].map(t => (
                                <Typography key={t.label} onClick={() => onNavigate(t.nav)} sx={{ fontWeight: 500, cursor: 'pointer', color: '#555', fontSize: '0.9rem', '&:hover': { color: '#bb86fc' } }}>{t.label}</Typography>
                            ))}
                        </Box>
                        <Button onClick={() => onNavigate('login')} variant="contained" sx={{ bgcolor: '#bb86fc', color: 'white', borderRadius: '100px', px: 3, py: 0.8, textTransform: 'none', fontWeight: 600, fontSize: '0.85rem', boxShadow: 'none', '&:hover': { bgcolor: '#a76ef5' } }}>Get Started</Button>
                        <IconButton onClick={() => onNavigate('login')} sx={{ ml: 1 }}><ProfileIcon sx={{ color: '#ff4081', fontSize: 26 }} /></IconButton>
                    </Toolbar>
                </Container>
            </AppBar>

            {/* HERO */}
            <Container maxWidth="lg" sx={{ pt: { xs: 6, md: 10 }, pb: { xs: 8, md: 12 } }}>
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', gap: { xs: 4, md: 6 } }}>
                    <Box sx={{ flex: '1 1 55%', minWidth: 0 }}>
                        <Chip label="ALWAYS HERE TO LISTEN" sx={{ bgcolor: '#f3e8ff', color: '#bb86fc', fontWeight: 800, fontSize: '0.6rem', mb: 3, borderRadius: '100px', height: '26px', letterSpacing: '1.5px' }} />
                        <Typography sx={{ fontWeight: 900, fontSize: { xs: '2.6rem', md: '4rem' }, lineHeight: 1.05, color: '#111', mb: 3, letterSpacing: '-2px', fontFamily: '"Outfit", sans-serif' }}>
                            Your AI Companion<br />for Emotional{' '}<Box component="span" sx={{ color: '#bb86fc', fontStyle: 'italic', fontWeight: 400 }}>Well-being</Box>
                        </Typography>
                        <Typography sx={{ color: '#999', fontSize: '1rem', mb: 4, lineHeight: 1.7, maxWidth: '440px' }}>
                            Experience personalized mental health support with MIMO, your AI-powered companion for a calmer mind and a happier life.
                        </Typography>
                        <Stack direction="row" spacing={2} sx={{ mb: 4 }}>
                            <Button onClick={() => onNavigate('login')} variant="contained" sx={{ bgcolor: '#dcc6ff', color: 'white', borderRadius: '100px', px: 4, py: 1.3, textTransform: 'none', fontWeight: 700, boxShadow: 'none', '&:hover': { bgcolor: '#bb86fc' } }}>Get Started Free</Button>
                            <Button onClick={() => onNavigate('resources')} variant="outlined" sx={{ borderColor: '#e8e8e8', color: '#333', borderRadius: '100px', px: 4, py: 1.3, textTransform: 'none', fontWeight: 700, '&:hover': { borderColor: '#bb86fc' } }}>Learn More</Button>
                        </Stack>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Box sx={{ display: 'flex', mr: 2 }}>
                                {[0, 1, 2].map(i => (<Avatar key={i} sx={{ width: 26, height: 26, border: '2px solid white', ml: i > 0 ? -1 : 0, bgcolor: ['#c4b5fd', '#818cf8', '#a78bfa'][i] }} />))}
                            </Box>
                            <Typography sx={{ color: '#ccc', fontWeight: 500, fontSize: '0.8rem' }}>Trusted by 10,000+ individuals</Typography>
                        </Box>
                    </Box>
                    <Box sx={{ flex: '1 1 45%', minWidth: 0, display: 'flex', justifyContent: { xs: 'center', md: 'flex-end' } }}>
                        <Box sx={{ width: '100%', maxWidth: '460px', bgcolor: '#c5d8d5', borderRadius: '40px', overflow: 'hidden', aspectRatio: '1', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', position: 'relative', boxShadow: '0 20px 50px rgba(0,0,0,0.06)' }}>
                            <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '22%', bgcolor: '#e8e8e8' }} />
                            <Box sx={{ position: 'relative', zIndex: 2, width: '68%', mb: '6%', border: '7px solid #c9a96e', borderRadius: '3px', boxShadow: '0 12px 40px rgba(0,0,0,0.12)', overflow: 'hidden', aspectRatio: '0.78' }}>
                                <Box component="img" src="/mimo-hero.png" alt="Meditation" sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Container>

            {/* FEATURES */}
            <Box sx={{ py: 10, bgcolor: 'white' }}>
                <Container maxWidth="lg">
                    <Box sx={{ textAlign: 'center', mb: 7 }}>
                        <Typography sx={{ fontWeight: 800, fontSize: '2rem', mb: 1.5, color: '#111' }}>Key Features for Your Mind</Typography>
                        <Typography sx={{ color: '#aaa', maxWidth: '520px', mx: 'auto', fontSize: '0.95rem', lineHeight: 1.6 }}>Designed with therapists and AI experts to support you whenever and wherever you need it.</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
                        {[
                            { title: 'AI Chatbot', desc: '24/7 empathetic conversations tailored to your unique emotional needs and current state.', icon: <ChatIcon sx={{ color: '#bb86fc', fontSize: 26 }} />, bg: '#f3e8ff', nav: 'chat' },
                            { title: 'Voice Interaction', desc: 'Express yourself naturally through calming voice-led meditation and reflection sessions.', icon: <MicIcon sx={{ color: '#ff4081', fontSize: 26 }} />, bg: '#fff0f3', nav: 'chat' },
                            { title: 'Mood Tracking', desc: 'Visualize your emotional journey with smart analytics and identify patterns in your well-being.', icon: <ChartIcon sx={{ color: '#03dac6', fontSize: 26 }} />, bg: '#e0f2f1', nav: 'dashboard' }
                        ].map((f, i) => (
                            <Card key={i} onClick={() => onNavigate(f.nav)} sx={{ flex: 1, border: '1px solid #f0f0f0', boxShadow: 'none', borderRadius: '20px', cursor: 'pointer', transition: '0.3s', '&:hover': { transform: 'translateY(-6px)', boxShadow: '0 16px 40px rgba(0,0,0,0.04)' } }}>
                                <CardContent sx={{ p: 3.5 }}>
                                    <Box sx={{ width: 48, height: 48, borderRadius: '14px', bgcolor: f.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2.5 }}>{f.icon}</Box>
                                    <Typography sx={{ fontWeight: 700, mb: 1, color: '#111', fontSize: '1.05rem' }}>{f.title}</Typography>
                                    <Typography sx={{ color: '#999', lineHeight: 1.7, fontSize: '0.85rem' }}>{f.desc}</Typography>
                                </CardContent>
                            </Card>
                        ))}
                    </Box>
                </Container>
            </Box>

            {/* HOW IT WORKS */}
            <Container maxWidth="lg" sx={{ py: 10 }}>
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 8, alignItems: 'center' }}>
                    <Box sx={{ flex: '1 1 40%' }}>
                        <Typography sx={{ fontWeight: 800, fontSize: '2rem', mb: 2, color: '#111' }}>How It Works</Typography>
                        <Typography sx={{ color: '#999', mb: 4, lineHeight: 1.7 }}>Your journey to a better mind starts with three simple daily habits.</Typography>
                        <Box component="img" src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=800" alt="Nature" sx={{ width: '100%', borderRadius: '20px', boxShadow: '0 8px 24px rgba(0,0,0,0.06)' }} />
                    </Box>
                    <Box sx={{ flex: '1 1 60%' }}>
                        <Stack spacing={4}>
                            {[
                                { n: '1', t: 'Morning Check-in', d: 'Start your day with a quick, intuitive mood assessment. MIMO helps you set an intention and prepare for the day ahead with simple mindfulness exercises.', c: '#bb86fc', bg: '#f3e8ff' },
                                { n: '2', t: 'Real-time Engagement', d: 'Whenever you feel overwhelmed or just need to talk, MIMO is available. Chat or use voice to express your feelings and receive scientifically-backed guidance.', c: '#ff4081', bg: '#fff0f3' },
                                { n: '3', t: 'Evening Reflection', d: "Review your day's emotional landscape. See insights into what triggers stress and what brings joy, helping you build long-term resilience.", c: '#03dac6', bg: '#e0f2f1' }
                            ].map((s, i) => (
                                <Box key={i} sx={{ display: 'flex', gap: 2.5, alignItems: 'flex-start' }}>
                                    <Box sx={{ minWidth: 38, height: 38, borderRadius: '10px', bgcolor: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: s.c, fontSize: '0.9rem', mt: 0.3 }}>{s.n}</Box>
                                    <Box>
                                        <Typography sx={{ fontWeight: 700, mb: 0.5, color: '#111', fontSize: '1.05rem' }}>{s.t}</Typography>
                                        <Typography sx={{ color: '#999', lineHeight: 1.7, fontSize: '0.85rem' }}>{s.d}</Typography>
                                    </Box>
                                </Box>
                            ))}
                        </Stack>
                    </Box>
                </Box>
            </Container>

            {/* CTA */}
            <Container maxWidth="lg" sx={{ mb: 8 }}>
                <Box sx={{ bgcolor: '#dcc6ff', borderRadius: '36px', p: { xs: 5, md: 7 }, textAlign: 'center', color: 'white' }}>
                    <Typography sx={{ fontWeight: 800, mb: 2.5, fontSize: { xs: '1.8rem', md: '2.6rem' }, lineHeight: 1.1 }}>Ready to start your journey<br />to a calmer mind?</Typography>
                    <Typography sx={{ mb: 4, opacity: 0.85, fontSize: '0.95rem' }}>Join thousands of others who are improving their mental well-being<br />every day with MIMO's personalized AI support.</Typography>
                    <Stack direction="row" spacing={2} justifyContent="center">
                        <Button onClick={() => onNavigate('login')} variant="contained" sx={{ bgcolor: 'white', color: '#bb86fc', fontWeight: 700, px: 4, py: 1.3, borderRadius: '100px', boxShadow: 'none', '&:hover': { bgcolor: '#f8f8f8' } }}>Start Free Trial</Button>
                        <Button variant="outlined" sx={{ borderColor: 'rgba(255,255,255,0.4)', color: 'white', fontWeight: 700, px: 4, py: 1.3, borderRadius: '100px', '&:hover': { borderColor: 'white' } }}>Contact Support</Button>
                    </Stack>
                </Box>
            </Container>

            {/* FOOTER */}
            <Box sx={{ py: 4, borderTop: '1px solid #f0f0f0' }}>
                <Container maxWidth="lg">
                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: { xs: 2, md: 0 } }}>
                            <Box sx={{ width: 22, height: 22, borderRadius: '50%', bgcolor: '#bb86fc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Typography sx={{ color: 'white', fontSize: '0.5rem', fontWeight: 800 }}>◆</Typography></Box>
                            <Typography sx={{ fontWeight: 700, fontSize: '0.85rem', color: '#666' }}>MIMO</Typography>
                            <Typography sx={{ color: '#ccc', fontSize: '0.75rem', ml: 2 }}>Empowering your mental journey with gentle AI support. Available 24/7.</Typography>
                        </Box>
                        <Typography sx={{ color: '#ccc', fontSize: '0.75rem' }}>© 2024 MIMO AI Support.</Typography>
                    </Box>
                </Container>
            </Box>
        </Box>
    )
}

export default LandingPage
