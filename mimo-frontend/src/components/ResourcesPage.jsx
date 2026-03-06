import React, { useState } from 'react'
import {
    Box, Typography, Paper, Stack, Avatar, IconButton, Button, Chip, Tabs, Tab,
    Accordion, AccordionSummary, AccordionDetails, Divider, TextField, InputAdornment
} from '@mui/material'
import {
    Search as SearchIcon, NotificationsNone as BellIcon, Home, ChatBubbleOutline, BarChart,
    LibraryBooks, Settings, Logout as LogoutIcon, ExpandMore, Phone, Chat as ChatMsgIcon,
    Warning, SelfImprovement, Headphones, Psychology, LocalHospital, Groups, Forum,
    ArrowForward, Favorite, Air, Visibility, School, MenuBook, OpenInNew
} from '@mui/icons-material'

const ResourcesPage = ({ onNavigate, user, onLogout }) => {
    const displayName = user?.displayName || user?.email?.split('@')[0] || 'Friend'
    const photoURL = user?.photoURL
    const [activeTab, setActiveTab] = useState(0)
    const [searchQuery, setSearchQuery] = useState('')

    // ============ DATA ============
    const crisisHelplines = [
        { name: 'KIRAN Mental Health Helpline', number: '1800-599-0019', desc: 'Government of India — 24/7 toll-free', type: 'call', color: '#ff4081' },
        { name: 'Vandrevala Foundation', number: '1860-2662-345', desc: 'Multilingual support — 24/7', type: 'call', color: '#e040fb' },
        { name: 'AASRA', number: '9820466726', desc: 'Mumbai-based — 24/7 crisis intervention', type: 'call', color: '#7c4dff' },
        { name: 'iCall (TISS)', number: '9152987821', desc: 'Mon-Sat, 8 AM to 10 PM', type: 'call', color: '#bb86fc' },
        { name: 'Crisis Text Line', number: 'Text HOME to 741741', desc: 'US-based text support — 24/7', type: 'text', color: '#03dac6' },
        { name: 'Befrienders Worldwide', number: 'befrienders.org', desc: 'International emotional support directory', type: 'web', color: '#ffab40' },
    ]

    const breathingExercises = [
        { title: 'Box Breathing', duration: '4 min', desc: 'Inhale 4s → Hold 4s → Exhale 4s → Hold 4s. Used by Navy SEALs for extreme stress.', icon: '🫁', color: '#bb86fc', steps: ['Inhale slowly for 4 seconds', 'Hold your breath for 4 seconds', 'Exhale slowly for 4 seconds', 'Hold empty for 4 seconds', 'Repeat 4 times'] },
        { title: '4-7-8 Technique', duration: '3 min', desc: 'Developed by Dr. Andrew Weil. Activates your parasympathetic nervous system.', icon: '🌬️', color: '#03dac6', steps: ['Inhale through nose for 4 seconds', 'Hold your breath for 7 seconds', 'Exhale through mouth for 8 seconds', 'Repeat 3-4 cycles'] },
        { title: 'Physiological Sigh', duration: '1 min', desc: 'The fastest known way to calm down. Double inhale followed by a long exhale.', icon: '😤', color: '#ff4081', steps: ['Take a sharp inhale through nose', 'Immediately take a second short inhale', 'Long, slow exhale through mouth', 'Repeat 2-3 times'] },
    ]

    const groundingSteps = [
        { sense: '5 things you can SEE', icon: <Visibility sx={{ fontSize: 20 }} />, color: '#bb86fc', examples: 'A clock on the wall, the color of your shirt, a bird outside...' },
        { sense: '4 things you can TOUCH', icon: <SelfImprovement sx={{ fontSize: 20 }} />, color: '#e040fb', examples: 'The fabric of your chair, the cool desk surface, your phone case...' },
        { sense: '3 things you can HEAR', icon: <Headphones sx={{ fontSize: 20 }} />, color: '#7c4dff', examples: 'Traffic outside, a fan humming, distant conversation...' },
        { sense: '2 things you can SMELL', icon: <Air sx={{ fontSize: 20 }} />, color: '#03dac6', examples: 'Coffee brewing, your hand lotion, fresh air...' },
        { sense: '1 thing you can TASTE', icon: <Favorite sx={{ fontSize: 20 }} />, color: '#ff4081', examples: 'A sip of water, mint gum, the aftertaste of your last meal...' },
    ]

    const audioLibrary = [
        { title: 'Morning Calm Meditation', duration: '5 min', type: 'Guided Meditation', icon: '🧘', color: '#bb86fc' },
        { title: 'Rain & Thunder Ambiance', duration: '30 min', type: 'Nature Sounds', icon: '🌧️', color: '#03dac6' },
        { title: 'Daily Positive Affirmations', duration: '3 min', type: 'Affirmations', icon: '💜', color: '#e040fb' },
        { title: 'Deep Sleep Body Scan', duration: '15 min', type: 'Sleep Aid', icon: '🌙', color: '#7c4dff' },
        { title: 'Anxiety Relief Breathing', duration: '7 min', type: 'Breathwork', icon: '🫧', color: '#ff4081' },
        { title: 'Focus & Concentration', duration: '20 min', type: 'Binaural Beats', icon: '🎵', color: '#ffab40' },
    ]

    const educationalContent = [
        { title: 'Stress vs Anxiety vs Burnout', desc: 'Learn how to tell the difference between these commonly confused states and what each one needs.', tag: 'Infographic', color: '#bb86fc', icon: '📊' },
        { title: 'What is Depression, Really?', desc: 'Beyond "feeling sad" — understand the clinical signs, causes, and when to seek professional help.', tag: 'Article', color: '#ff4081', icon: '📖' },
        { title: 'The Science of Sleep & Mood', desc: 'How your sleep quality directly impacts emotional regulation and mental resilience.', tag: 'Research', color: '#03dac6', icon: '🔬' },
        { title: 'Breaking the Stigma', desc: "Why seeking help is brave, not weak. Real stories from people who chose therapy.", tag: 'Stories', color: '#e040fb', icon: '💪' },
        { title: 'Digital Detox Guide', desc: 'How screen time affects your mental health and practical steps to find balance.', tag: 'Guide', color: '#7c4dff', icon: '📱' },
        { title: 'Understanding Panic Attacks', desc: 'What happens in your body during a panic attack and how to ride through it safely.', tag: 'Article', color: '#ffab40', icon: '🫀' },
    ]

    const therapyDirectories = [
        { name: 'Practo', desc: 'Find verified therapists near you. Filter by specialty, language, and budget.', url: 'practo.com', color: '#bb86fc', icon: '🏥' },
        { name: 'Amaha', desc: 'India\'s leading digital mental health platform. Therapy, self-care, and psychiatry.', url: 'amaha.in', color: '#03dac6', icon: '💚' },
        { name: 'BetterHelp', desc: 'World\'s largest online counseling platform. Match with a therapist in 24 hours.', url: 'betterhelp.com', color: '#e040fb', icon: '🌐' },
        { name: 'Psychology Today', desc: 'Comprehensive therapist directory with detailed profiles and specializations.', url: 'psychologytoday.com', color: '#7c4dff', icon: '🧠' },
        { name: 'Talkspace', desc: 'Text, audio, and video therapy from licensed professionals.', url: 'talkspace.com', color: '#ff4081', icon: '💬' },
    ]

    const communityResources = [
        { name: 'r/MentalHealth', desc: 'Reddit community with 1M+ members sharing experiences and support.', type: 'Online Forum', color: '#ff4081', members: '1M+' },
        { name: '7 Cups', desc: 'Free emotional support via trained volunteer listeners. Chat-based.', type: 'Peer Support', color: '#03dac6', members: '500K+' },
        { name: 'NAMI Support Groups', desc: 'National Alliance on Mental Illness — local and virtual support groups.', type: 'Support Group', color: '#bb86fc', members: '600K+' },
        { name: 'Calm Collective Asia', desc: 'South & Southeast Asia mental health community and resources.', type: 'Regional', color: '#e040fb', members: '50K+' },
    ]

    const tabLabels = ['🚨 Crisis Help', '🧘 Coping Tools', '📚 Learn', '🏥 Find Therapy', '👥 Community']

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#faf8ff' }}>
            {/* ===== LEFT SIDEBAR ===== */}
            <Box sx={{ width: 240, bgcolor: 'white', borderRight: '1px solid #f0f0f0', display: { xs: 'none', md: 'flex' }, flexDirection: 'column', p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                    <Box sx={{ width: 32, height: 32, borderRadius: '50%', bgcolor: '#1e1e2e', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Typography sx={{ color: 'white', fontSize: '0.7rem' }}>◆</Typography>
                    </Box>
                    <Box>
                        <Typography sx={{ fontWeight: 800, fontSize: '1rem', lineHeight: 1 }}>MIMO</Typography>
                        <Typography sx={{ fontSize: '0.6rem', color: '#bb86fc', fontWeight: 600, letterSpacing: '0.5px' }}>AI MENTAL COMPANION</Typography>
                    </Box>
                </Box>
                <Stack spacing={0.5} sx={{ mt: 4 }}>
                    {[
                        { icon: <Home sx={{ fontSize: 20 }} />, label: 'Home', nav: 'insights' },
                        { icon: <ChatBubbleOutline sx={{ fontSize: 20 }} />, label: 'Chat', nav: 'chat' },
                        { icon: <BarChart sx={{ fontSize: 20 }} />, label: 'Mood Log', nav: 'dashboard' },
                        { icon: <LibraryBooks sx={{ fontSize: 20 }} />, label: 'Resources', nav: 'resources', active: true },
                        { icon: <Settings sx={{ fontSize: 20 }} />, label: 'Settings', nav: 'settings' },
                    ].map((item, i) => (
                        <Box key={i} onClick={() => onNavigate(item.nav)} sx={{
                            display: 'flex', alignItems: 'center', gap: 1.5, py: 1.2, px: 2, borderRadius: '12px', cursor: 'pointer',
                            bgcolor: item.active ? '#f3e8ff' : 'transparent', color: item.active ? '#bb86fc' : '#888',
                            '&:hover': { bgcolor: '#f8f6ff' }
                        }}>
                            {item.icon}
                            <Typography sx={{ fontSize: '0.9rem', fontWeight: item.active ? 700 : 500, color: 'inherit' }}>{item.label}</Typography>
                        </Box>
                    ))}
                </Stack>
                <Box sx={{ mt: 'auto', pt: 3, borderTop: '1px solid #f0f0f0' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
                        <Avatar src={photoURL} sx={{ bgcolor: '#ffab40', width: 36, height: 36 }}>{displayName[0]}</Avatar>
                        <Box sx={{ flex: 1, minWidth: 0 }}>
                            <Typography sx={{ fontWeight: 700, fontSize: '0.85rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{displayName}</Typography>
                            <Typography sx={{ fontSize: '0.7rem', color: '#bbb' }}>Premium Member</Typography>
                        </Box>
                    </Box>
                    <Button onClick={onLogout} startIcon={<LogoutIcon sx={{ fontSize: 16 }} />} fullWidth sx={{ color: '#ff4081', borderRadius: '10px', textTransform: 'none', fontWeight: 600, fontSize: '0.8rem', justifyContent: 'flex-start', px: 2, '&:hover': { bgcolor: '#fff0f3' } }}>Sign Out</Button>
                </Box>
            </Box>

            {/* ===== MAIN CONTENT ===== */}
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                {/* Top Bar */}
                <Box sx={{ px: 4, py: 2, display: 'flex', alignItems: 'center', borderBottom: '1px solid #f0f0f0', bgcolor: 'white', flexShrink: 0 }}>
                    <Typography sx={{ fontWeight: 800, fontSize: '1.2rem', mr: 3 }}>Resources</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: '#faf8ff', borderRadius: '100px', px: 2, py: 0.5, gap: 1, flex: 1, maxWidth: 400 }}>
                        <SearchIcon sx={{ fontSize: 18, color: '#ccc' }} />
                        <TextField fullWidth placeholder="Search resources..." variant="standard" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                            InputProps={{ disableUnderline: true }} sx={{ '& input': { fontSize: '0.85rem' } }} />
                    </Box>
                    <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center', gap: 1 }}>
                        <IconButton><BellIcon /></IconButton>
                    </Box>
                </Box>

                {/* Sticky "Get Help Now" Banner */}
                <Box sx={{
                    mx: 3, mt: 2, p: 2, borderRadius: '16px', display: 'flex', alignItems: 'center', gap: 2,
                    background: 'linear-gradient(135deg, #ff4081, #e040fb)', color: 'white', flexShrink: 0,
                    boxShadow: '0 6px 20px rgba(255,64,129,0.25)'
                }}>
                    <Warning sx={{ fontSize: 28 }} />
                    <Box sx={{ flex: 1 }}>
                        <Typography sx={{ fontWeight: 800, fontSize: '0.95rem' }}>In immediate danger or crisis?</Typography>
                        <Typography sx={{ fontSize: '0.78rem', opacity: 0.9 }}>Call KIRAN Helpline 1800-599-0019 (24/7, toll-free) or your local emergency number.</Typography>
                    </Box>
                    <Button onClick={() => { window.open('tel:18005990019') }} sx={{
                        bgcolor: 'white', color: '#ff4081', borderRadius: '100px', px: 3, py: 0.8,
                        fontWeight: 700, fontSize: '0.8rem', textTransform: 'none', whiteSpace: 'nowrap',
                        '&:hover': { bgcolor: '#fff0f3' }
                    }}>
                        <Phone sx={{ fontSize: 16, mr: 0.5 }} /> Get Help Now
                    </Button>
                </Box>

                {/* Tabs */}
                <Box sx={{ px: 3, mt: 2, flexShrink: 0 }}>
                    <Tabs value={activeTab} onChange={(_, v) => setActiveTab(v)} variant="scrollable" scrollButtons="auto"
                        sx={{
                            '& .MuiTab-root': { textTransform: 'none', fontWeight: 600, fontSize: '0.85rem', minHeight: 44, borderRadius: '12px', mr: 1 },
                            '& .Mui-selected': { color: '#bb86fc !important' },
                            '& .MuiTabs-indicator': { bgcolor: '#bb86fc', borderRadius: '8px', height: 3 }
                        }}>
                        {tabLabels.map((l, i) => <Tab key={i} label={l} />)}
                    </Tabs>
                </Box>

                {/* Tab Content */}
                <Box sx={{ flex: 1, overflow: 'auto', px: 3, pb: 6, mt: 2 }}>

                    {/* ====== TAB 0: CRISIS HELP ====== */}
                    {activeTab === 0 && (
                        <Box>
                            <Typography sx={{ fontWeight: 800, fontSize: '1.3rem', mb: 1 }}>Crisis & Emergency Contacts</Typography>
                            <Typography sx={{ color: '#999', mb: 3, fontSize: '0.9rem' }}>Verified helplines available 24/7. You are never alone.</Typography>
                            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
                                {crisisHelplines.map((h, i) => (
                                    <Paper key={i} elevation={0} sx={{ border: '1px solid #f0f0f0', borderRadius: '20px', p: 3, display: 'flex', gap: 2, alignItems: 'flex-start', transition: '0.2s', '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 8px 24px rgba(0,0,0,0.04)' } }}>
                                        <Box sx={{ width: 44, height: 44, borderRadius: '14px', bgcolor: h.color + '15', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                            {h.type === 'call' ? <Phone sx={{ color: h.color, fontSize: 22 }} /> : h.type === 'text' ? <ChatMsgIcon sx={{ color: h.color, fontSize: 22 }} /> : <OpenInNew sx={{ color: h.color, fontSize: 22 }} />}
                                        </Box>
                                        <Box sx={{ flex: 1 }}>
                                            <Typography sx={{ fontWeight: 700, fontSize: '0.95rem', mb: 0.3 }}>{h.name}</Typography>
                                            <Typography sx={{ fontSize: '0.78rem', color: '#999', mb: 1 }}>{h.desc}</Typography>
                                            <Chip label={h.number} size="small" sx={{ bgcolor: h.color + '12', color: h.color, fontWeight: 700, fontSize: '0.78rem', borderRadius: '8px' }} />
                                        </Box>
                                    </Paper>
                                ))}
                            </Box>
                            <Paper elevation={0} sx={{ border: '1px solid #f0e0f0', borderRadius: '20px', p: 3, mt: 3, bgcolor: '#fef7ff' }}>
                                <Typography sx={{ fontWeight: 700, mb: 1, fontSize: '0.9rem' }}>💡 Remember</Typography>
                                <Typography sx={{ fontSize: '0.85rem', color: '#666', lineHeight: 1.7 }}>
                                    MIMO is an AI companion and <strong>not a replacement for professional therapy</strong>. If you are experiencing thoughts of self-harm or are in immediate danger, please contact emergency services or the helplines listed above.
                                </Typography>
                            </Paper>
                        </Box>
                    )}

                    {/* ====== TAB 1: COPING TOOLS ====== */}
                    {activeTab === 1 && (
                        <Box>
                            <Typography sx={{ fontWeight: 800, fontSize: '1.3rem', mb: 1 }}>Coping & Relaxation Toolkit</Typography>
                            <Typography sx={{ color: '#999', mb: 3, fontSize: '0.9rem' }}>Evidence-based techniques to calm your mind right now.</Typography>

                            {/* Breathing Exercises */}
                            <Typography sx={{ fontWeight: 700, fontSize: '1rem', mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}><Air sx={{ color: '#bb86fc' }} /> Breathing Exercises</Typography>
                            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' }, gap: 2, mb: 4 }}>
                                {breathingExercises.map((ex, i) => (
                                    <Paper key={i} elevation={0} sx={{ border: '1px solid #f0f0f0', borderRadius: '20px', p: 3, transition: '0.2s', '&:hover': { transform: 'translateY(-3px)', boxShadow: '0 10px 30px rgba(0,0,0,0.04)' } }}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                                            <Typography sx={{ fontSize: '2rem' }}>{ex.icon}</Typography>
                                            <Chip label={ex.duration} size="small" sx={{ bgcolor: ex.color + '15', color: ex.color, fontWeight: 600, fontSize: '0.7rem' }} />
                                        </Box>
                                        <Typography sx={{ fontWeight: 700, mb: 0.5 }}>{ex.title}</Typography>
                                        <Typography sx={{ fontSize: '0.78rem', color: '#999', mb: 2, lineHeight: 1.6 }}>{ex.desc}</Typography>
                                        <Divider sx={{ mb: 1.5 }} />
                                        <Stack spacing={0.8}>
                                            {ex.steps.map((s, si) => (
                                                <Box key={si} sx={{ display: 'flex', gap: 1, alignItems: 'flex-start' }}>
                                                    <Box sx={{ width: 18, height: 18, borderRadius: '50%', bgcolor: ex.color + '20', color: ex.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6rem', fontWeight: 800, flexShrink: 0, mt: 0.2 }}>{si + 1}</Box>
                                                    <Typography sx={{ fontSize: '0.78rem', color: '#666' }}>{s}</Typography>
                                                </Box>
                                            ))}
                                        </Stack>
                                        <Button onClick={() => onNavigate('chat')} fullWidth sx={{ mt: 2, bgcolor: ex.color + '12', color: ex.color, borderRadius: '12px', py: 1, fontWeight: 700, textTransform: 'none', fontSize: '0.8rem', '&:hover': { bgcolor: ex.color + '25' } }}>
                                            Start Guided Session →
                                        </Button>
                                    </Paper>
                                ))}
                            </Box>

                            {/* 5-4-3-2-1 Grounding */}
                            <Typography sx={{ fontWeight: 700, fontSize: '1rem', mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}><SelfImprovement sx={{ color: '#e040fb' }} /> 5-4-3-2-1 Grounding Technique</Typography>
                            <Paper elevation={0} sx={{ border: '1px solid #f0f0f0', borderRadius: '20px', p: 3, mb: 4 }}>
                                <Typography sx={{ fontSize: '0.85rem', color: '#888', mb: 3, lineHeight: 1.7 }}>When you feel anxious or disconnected, this sensory exercise brings you back to the present moment.</Typography>
                                <Stack spacing={2}>
                                    {groundingSteps.map((g, i) => (
                                        <Box key={i} sx={{ display: 'flex', gap: 2, alignItems: 'flex-start', p: 2, borderRadius: '14px', bgcolor: g.color + '08', border: `1px solid ${g.color}15` }}>
                                            <Box sx={{ width: 40, height: 40, borderRadius: '12px', bgcolor: g.color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center', color: g.color, flexShrink: 0 }}>{g.icon}</Box>
                                            <Box>
                                                <Typography sx={{ fontWeight: 700, fontSize: '0.9rem', color: g.color }}>{g.sense}</Typography>
                                                <Typography sx={{ fontSize: '0.78rem', color: '#999', mt: 0.3 }}>{g.examples}</Typography>
                                            </Box>
                                        </Box>
                                    ))}
                                </Stack>
                            </Paper>

                            {/* Audio Library */}
                            <Typography sx={{ fontWeight: 700, fontSize: '1rem', mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}><Headphones sx={{ color: '#7c4dff' }} /> Audio Library</Typography>
                            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' }, gap: 2 }}>
                                {audioLibrary.map((a, i) => (
                                    <Paper key={i} elevation={0} sx={{ border: '1px solid #f0f0f0', borderRadius: '16px', p: 2.5, display: 'flex', gap: 2, alignItems: 'center', cursor: 'pointer', transition: '0.2s', '&:hover': { bgcolor: '#faf8ff', transform: 'translateY(-2px)' } }}>
                                        <Box sx={{ width: 48, height: 48, borderRadius: '14px', bgcolor: a.color + '15', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', flexShrink: 0 }}>{a.icon}</Box>
                                        <Box>
                                            <Typography sx={{ fontWeight: 700, fontSize: '0.85rem' }}>{a.title}</Typography>
                                            <Typography sx={{ fontSize: '0.7rem', color: '#bbb' }}>{a.duration} • {a.type}</Typography>
                                        </Box>
                                    </Paper>
                                ))}
                            </Box>
                        </Box>
                    )}

                    {/* ====== TAB 2: LEARN ====== */}
                    {activeTab === 2 && (
                        <Box>
                            <Typography sx={{ fontWeight: 800, fontSize: '1.3rem', mb: 1 }}>Educational Content & Awareness</Typography>
                            <Typography sx={{ color: '#999', mb: 3, fontSize: '0.9rem' }}>Understand your mind better with evidence-based content.</Typography>
                            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
                                {educationalContent.map((c, i) => (
                                    <Paper key={i} elevation={0} sx={{ border: '1px solid #f0f0f0', borderRadius: '20px', p: 3, cursor: 'pointer', transition: '0.2s', '&:hover': { transform: 'translateY(-3px)', boxShadow: '0 10px 30px rgba(0,0,0,0.04)' } }}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                                            <Typography sx={{ fontSize: '2rem' }}>{c.icon}</Typography>
                                            <Chip label={c.tag} size="small" sx={{ bgcolor: c.color + '15', color: c.color, fontWeight: 600, fontSize: '0.7rem' }} />
                                        </Box>
                                        <Typography sx={{ fontWeight: 700, fontSize: '1rem', mb: 0.5 }}>{c.title}</Typography>
                                        <Typography sx={{ fontSize: '0.82rem', color: '#888', lineHeight: 1.6, mb: 2 }}>{c.desc}</Typography>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: c.color }}>
                                            <Typography sx={{ fontSize: '0.8rem', fontWeight: 700 }}>Read More</Typography>
                                            <ArrowForward sx={{ fontSize: 16 }} />
                                        </Box>
                                    </Paper>
                                ))}
                            </Box>
                            {/* De-stigmatization Banner */}
                            <Box sx={{ mt: 4, borderRadius: '20px', p: 4, background: 'linear-gradient(135deg, #f3e8ff, #e8daf8)', textAlign: 'center' }}>
                                <Typography sx={{ fontSize: '2rem', mb: 1 }}>🤝</Typography>
                                <Typography sx={{ fontWeight: 800, fontSize: '1.2rem', mb: 1, color: '#333' }}>Seeking Help is Strength</Typography>
                                <Typography sx={{ color: '#888', fontSize: '0.9rem', maxWidth: 500, mx: 'auto', lineHeight: 1.7 }}>
                                    Mental health matters just as much as physical health. Talking about your feelings isn't weakness — it takes real courage. You deserve support.
                                </Typography>
                            </Box>
                        </Box>
                    )}

                    {/* ====== TAB 3: FIND THERAPY ====== */}
                    {activeTab === 3 && (
                        <Box>
                            <Typography sx={{ fontWeight: 800, fontSize: '1.3rem', mb: 1 }}>Professional Therapy Directories</Typography>
                            <Typography sx={{ color: '#999', mb: 3, fontSize: '0.9rem' }}>Find verified therapists and teletherapy platforms near you.</Typography>
                            <Stack spacing={2}>
                                {therapyDirectories.map((t, i) => (
                                    <Paper key={i} elevation={0} sx={{ border: '1px solid #f0f0f0', borderRadius: '20px', p: 3, display: 'flex', gap: 3, alignItems: 'center', transition: '0.2s', cursor: 'pointer', '&:hover': { transform: 'translateX(4px)', boxShadow: '0 8px 24px rgba(0,0,0,0.03)' } }}>
                                        <Box sx={{ width: 56, height: 56, borderRadius: '16px', bgcolor: t.color + '12', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', flexShrink: 0 }}>{t.icon}</Box>
                                        <Box sx={{ flex: 1 }}>
                                            <Typography sx={{ fontWeight: 700, fontSize: '1rem' }}>{t.name}</Typography>
                                            <Typography sx={{ fontSize: '0.82rem', color: '#999', lineHeight: 1.5, mt: 0.3 }}>{t.desc}</Typography>
                                            <Typography sx={{ fontSize: '0.75rem', color: t.color, fontWeight: 600, mt: 0.5 }}>{t.url}</Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: t.color, flexShrink: 0 }}>
                                            <Typography sx={{ fontSize: '0.8rem', fontWeight: 700 }}>Visit</Typography>
                                            <OpenInNew sx={{ fontSize: 16 }} />
                                        </Box>
                                    </Paper>
                                ))}
                            </Stack>
                            {/* Insurance tip */}
                            <Paper elevation={0} sx={{ border: '1px solid #e8f5e9', borderRadius: '20px', p: 3, mt: 3, bgcolor: '#f5fff7' }}>
                                <Typography sx={{ fontWeight: 700, mb: 1, fontSize: '0.9rem' }}>💡 Pro Tip</Typography>
                                <Typography sx={{ fontSize: '0.85rem', color: '#666', lineHeight: 1.7 }}>
                                    Many insurance plans now cover online therapy sessions. Check with your provider before booking to save on costs. Some platforms also offer sliding-scale pricing based on your income.
                                </Typography>
                            </Paper>
                        </Box>
                    )}

                    {/* ====== TAB 4: COMMUNITY ====== */}
                    {activeTab === 4 && (
                        <Box>
                            <Typography sx={{ fontWeight: 800, fontSize: '1.3rem', mb: 1 }}>Community & Peer Support</Typography>
                            <Typography sx={{ color: '#999', mb: 3, fontSize: '0.9rem' }}>Connect with others on similar journeys. You're not alone.</Typography>
                            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
                                {communityResources.map((c, i) => (
                                    <Paper key={i} elevation={0} sx={{ border: '1px solid #f0f0f0', borderRadius: '20px', p: 3, transition: '0.2s', cursor: 'pointer', '&:hover': { transform: 'translateY(-3px)', boxShadow: '0 10px 30px rgba(0,0,0,0.04)' } }}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                                            <Box sx={{ width: 44, height: 44, borderRadius: '14px', bgcolor: c.color + '15', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                {c.type === 'Online Forum' ? <Forum sx={{ color: c.color, fontSize: 22 }} /> : <Groups sx={{ color: c.color, fontSize: 22 }} />}
                                            </Box>
                                            <Chip label={c.type} size="small" sx={{ bgcolor: c.color + '12', color: c.color, fontWeight: 600, fontSize: '0.7rem' }} />
                                        </Box>
                                        <Typography sx={{ fontWeight: 700, fontSize: '1rem', mb: 0.5 }}>{c.name}</Typography>
                                        <Typography sx={{ fontSize: '0.82rem', color: '#888', lineHeight: 1.6, mb: 1.5 }}>{c.desc}</Typography>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <Chip label={`${c.members} members`} size="small" variant="outlined" sx={{ borderColor: '#f0f0f0', color: '#bbb', fontSize: '0.7rem' }} />
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: c.color }}>
                                                <Typography sx={{ fontSize: '0.8rem', fontWeight: 700 }}>Join</Typography>
                                                <ArrowForward sx={{ fontSize: 14 }} />
                                            </Box>
                                        </Box>
                                    </Paper>
                                ))}
                            </Box>
                            {/* Safety notice */}
                            <Paper elevation={0} sx={{ border: '1px solid #fff3e0', borderRadius: '20px', p: 3, mt: 3, bgcolor: '#fffaf2' }}>
                                <Typography sx={{ fontWeight: 700, mb: 1, fontSize: '0.9rem' }}>🛡️ Safety First</Typography>
                                <Typography sx={{ fontSize: '0.85rem', color: '#666', lineHeight: 1.7 }}>
                                    All recommended communities are moderated spaces. Never share personal identifiable information in online forums. If someone in a group appears to be in danger, report it to the platform moderators immediately.
                                </Typography>
                            </Paper>
                        </Box>
                    )}
                </Box>
            </Box>
        </Box>
    )
}

export default ResourcesPage
