import React, { useState, useEffect } from 'react'
import { Box, Typography, Paper, Stack, Chip, Button, Avatar, IconButton, Snackbar, Alert, TextField } from '@mui/material'
import { Home, ChatBubbleOutline, BarChart, LibraryBooks, Settings, Logout as LogoutIcon, CheckCircle } from '@mui/icons-material'
import { ResponsiveContainer, BarChart as RechartsBarChart, Bar, XAxis, YAxis } from 'recharts'
import { MOODS, TAGS, saveMoodEntry, getMoodLogs, getWeeklyData, getStreak, getTodayLogs, getMoodDistribution, getTopTags } from '../moodStore'

const Dashboard = ({ onBack, onNavigate, user, onLogout }) => {
    const displayName = user?.displayName || user?.email?.split('@')[0] || 'Friend'
    const photoURL = user?.photoURL
    const [selectedMood, setSelectedMood] = useState(-1)
    const [activeTags, setActiveTags] = useState([])
    const [note, setNote] = useState('')
    const [saved, setSaved] = useState(false)
    const [weeklyData, setWeeklyData] = useState([])
    const [recentLogs, setRecentLogs] = useState([])
    const [streak, setStreak] = useState(0)
    const [moodDist, setMoodDist] = useState({})
    const [topTags, setTopTags] = useState([])

    const refreshData = () => {
        setWeeklyData(getWeeklyData())
        setRecentLogs(getMoodLogs().slice(0, 5))
        setStreak(getStreak())
        setMoodDist(getMoodDistribution())
        setTopTags(getTopTags())
    }

    useEffect(() => { refreshData() }, [])

    const toggleTag = (tag) => {
        setActiveTags(p => p.includes(tag) ? p.filter(t => t !== tag) : [...p, tag])
    }

    const handleSave = () => {
        if (selectedMood < 0) return
        saveMoodEntry({ moodIndex: selectedMood, tags: activeTags, note })
        setSaved(true)
        setSelectedMood(-1)
        setActiveTags([])
        setNote('')
        refreshData()
        setTimeout(() => setSaved(false), 3000)
    }

    const heatColors = ['#fce4ec', '#f8bbd0', '#f48fb1', '#ec407a', '#e91e63', '#ad1457', '#880e4f']

    // Generate seeded heatmap from real data
    const allLogs = getMoodLogs()
    const heatmapData = Array.from({ length: 28 }, (_, i) => {
        const date = new Date()
        date.setDate(date.getDate() - (27 - i))
        const dayStr = date.toDateString()
        const dayLogs = allLogs.filter(l => new Date(l.timestamp).toDateString() === dayStr)
        if (dayLogs.length === 0) return 0
        return Math.min(6, Math.round((dayLogs.reduce((s, l) => s + l.moodValue, 0) / dayLogs.length) - 1))
    })

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
                        { icon: <BarChart sx={{ fontSize: 20 }} />, label: 'Mood Log', nav: 'dashboard', active: true },
                        { icon: <LibraryBooks sx={{ fontSize: 20 }} />, label: 'Resources', nav: 'resources' },
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
                        <IconButton size="small" onClick={() => onNavigate('settings')}><Settings sx={{ fontSize: 18, color: '#ccc' }} /></IconButton>
                    </Box>
                    <Button onClick={onLogout} startIcon={<LogoutIcon sx={{ fontSize: 16 }} />} fullWidth sx={{ color: '#ff4081', borderRadius: '10px', textTransform: 'none', fontWeight: 600, fontSize: '0.8rem', justifyContent: 'flex-start', px: 2, '&:hover': { bgcolor: '#fff0f3' } }}>Sign Out</Button>
                </Box>
            </Box>

            {/* ===== MAIN CONTENT ===== */}
            <Box sx={{ flex: 1, overflow: 'auto' }}>
                <Box sx={{ px: 4, py: 2, display: 'flex', alignItems: 'center', borderBottom: '1px solid #f0f0f0', bgcolor: 'white' }}>
                    <Typography sx={{ fontWeight: 700, fontSize: '1.1rem', flex: 1 }}>Mood Tracker & Analytics</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography sx={{ fontSize: '0.8rem', color: '#bbb' }}>🔥 {streak} day streak</Typography>
                        <Chip label={`${allLogs.length} entries`} size="small" sx={{ bgcolor: '#f3e8ff', color: '#bb86fc', fontWeight: 700, fontSize: '0.7rem' }} />
                    </Box>
                </Box>

                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3, p: 3, maxWidth: 1100, mx: 'auto' }}>
                    {/* LEFT MAIN */}
                    <Box sx={{ flex: '1 1 65%' }}>
                        {/* Mood Check-in Card */}
                        <Paper elevation={0} sx={{ border: '1px solid #f0f0f0', borderRadius: '20px', p: 4, mb: 3 }}>
                            <Typography sx={{ fontWeight: 800, fontSize: '1.5rem', mb: 0.5 }}>How are you feeling?</Typography>
                            <Typography sx={{ color: '#aaa', mb: 4, fontSize: '0.9rem' }}>
                                {getTodayLogs().length > 0
                                    ? `You've logged ${getTodayLogs().length} time(s) today. You can log again anytime!`
                                    : "Log your mood to track your emotional patterns over time."}
                            </Typography>

                            <Typography sx={{ fontWeight: 700, mb: 2 }}>Select your mood</Typography>
                            <Box sx={{ display: 'flex', gap: 2, mb: 4, flexWrap: 'wrap' }}>
                                {MOODS.map((m, i) => (
                                    <Box key={i} onClick={() => setSelectedMood(i)} sx={{
                                        width: 90, height: 90, borderRadius: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: '0.2s',
                                        bgcolor: selectedMood === i ? '#bb86fc' : '#faf8ff', color: selectedMood === i ? 'white' : '#888',
                                        border: selectedMood === i ? '2px solid #a76ef5' : '1px solid #f0f0f0',
                                        transform: selectedMood === i ? 'scale(1.08)' : 'scale(1)',
                                        boxShadow: selectedMood === i ? '0 8px 20px rgba(187,134,252,0.3)' : 'none',
                                        '&:hover': { transform: 'scale(1.05)', boxShadow: '0 4px 12px rgba(0,0,0,0.04)' }
                                    }}>
                                        <Typography sx={{ fontSize: '1.8rem', mb: 0.3 }}>{m.emoji}</Typography>
                                        <Typography sx={{ fontSize: '0.7rem', fontWeight: 600 }}>{m.label}</Typography>
                                    </Box>
                                ))}
                            </Box>

                            <Typography sx={{ fontSize: '0.7rem', fontWeight: 700, color: '#888', letterSpacing: '1px', mb: 1.5 }}>ADD TAGS TO YOUR ENTRY</Typography>
                            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 3 }}>
                                {TAGS.map((t, i) => (
                                    <Chip key={i} label={t} onClick={() => toggleTag(t)}
                                        sx={{
                                            borderRadius: '100px', fontWeight: 600, fontSize: '0.8rem',
                                            bgcolor: activeTags.includes(t) ? '#bb86fc' : 'transparent',
                                            color: activeTags.includes(t) ? 'white' : '#bb86fc',
                                            border: activeTags.includes(t) ? 'none' : '1px solid #e0d0f0',
                                            cursor: 'pointer', '&:hover': { opacity: 0.8 }
                                        }} />
                                ))}
                            </Box>

                            {/* Optional note */}
                            <TextField fullWidth placeholder="Add a note about how you're feeling... (optional)" value={note} onChange={e => setNote(e.target.value)} multiline rows={2}
                                sx={{ mb: 3, '& .MuiOutlinedInput-root': { borderRadius: '14px', bgcolor: '#faf8ff', '& fieldset': { borderColor: '#f0f0f0' } } }} />

                            <Button onClick={handleSave} disabled={selectedMood < 0} fullWidth sx={{
                                background: selectedMood >= 0 ? 'linear-gradient(135deg, #bb86fc, #e040fb)' : '#e0e0e0',
                                color: 'white', borderRadius: '100px', py: 1.8, fontWeight: 700, fontSize: '1rem', textTransform: 'none',
                                '&:hover': selectedMood >= 0 ? { background: 'linear-gradient(135deg, #a76ef5, #d500f9)' } : {},
                                '&.Mui-disabled': { color: '#bbb' }
                            }}>
                                {selectedMood >= 0 ? `Save Check-in — ${MOODS[selectedMood].emoji} ${MOODS[selectedMood].label}` : 'Select a mood to save'}
                            </Button>
                        </Paper>

                        {/* Heatmap + Weekly Trends */}
                        <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', md: 'row' } }}>
                            <Paper elevation={0} sx={{ flex: 1, border: '1px solid #f0f0f0', borderRadius: '20px', p: 3 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                    <Typography sx={{ fontWeight: 700, fontSize: '0.95rem' }}>Monthly Heatmap</Typography>
                                    <Typography sx={{ fontSize: '0.8rem', color: '#999' }}>{new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</Typography>
                                </Box>
                                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 0.6 }}>
                                    {heatmapData.map((intensity, i) => (
                                        <Box key={i} sx={{ aspectRatio: '1', borderRadius: '4px', bgcolor: intensity > 0 ? heatColors[intensity] : '#f5f5f5', transition: '0.2s' }} />
                                    ))}
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1.5 }}>
                                    <Typography sx={{ fontSize: '0.65rem', color: '#bbb' }}>NO DATA</Typography>
                                    <Box sx={{ display: 'flex', gap: 0.3 }}>
                                        {heatColors.slice(0, 5).map((c, i) => <Box key={i} sx={{ width: 12, height: 12, borderRadius: '2px', bgcolor: c }} />)}
                                    </Box>
                                    <Typography sx={{ fontSize: '0.65rem', color: '#bbb' }}>RADIANT</Typography>
                                </Box>
                            </Paper>

                            <Paper elevation={0} sx={{ flex: 1, border: '1px solid #f0f0f0', borderRadius: '20px', p: 3 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                    <Typography sx={{ fontWeight: 700, fontSize: '0.95rem' }}>Weekly Trends</Typography>
                                </Box>
                                {weeklyData.some(d => d.avg > 0) ? (
                                    <Box sx={{ height: 180 }}>
                                        <ResponsiveContainer width="100%" height="100%">
                                            <RechartsBarChart data={weeklyData} barGap={2}>
                                                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#bbb' }} />
                                                <YAxis hide domain={[0, 5]} />
                                                <Bar dataKey="avg" radius={[4, 4, 0, 0]} fill="#bb86fc" barSize={24} />
                                            </RechartsBarChart>
                                        </ResponsiveContainer>
                                    </Box>
                                ) : (
                                    <Box sx={{ height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 1 }}>
                                        <Typography sx={{ fontSize: '2rem' }}>📊</Typography>
                                        <Typography sx={{ color: '#ccc', fontSize: '0.85rem', fontWeight: 500 }}>Log moods to see trends</Typography>
                                    </Box>
                                )}
                            </Paper>
                        </Box>

                        {/* Recent Logs */}
                        {recentLogs.length > 0 && (
                            <Paper elevation={0} sx={{ border: '1px solid #f0f0f0', borderRadius: '20px', p: 3, mt: 3 }}>
                                <Typography sx={{ fontWeight: 700, fontSize: '1rem', mb: 2 }}>Recent Entries</Typography>
                                <Stack spacing={1}>
                                    {recentLogs.map((log, i) => (
                                        <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 2, py: 1.5, borderTop: i > 0 ? '1px solid #f5f5f5' : 'none' }}>
                                            <Avatar sx={{ bgcolor: MOODS[log.moodIndex]?.color + '20', width: 40, height: 40, fontSize: '1.2rem' }}>{log.moodEmoji}</Avatar>
                                            <Box sx={{ flex: 1 }}>
                                                <Typography sx={{ fontWeight: 700, fontSize: '0.9rem' }}>{log.moodLabel}</Typography>
                                                <Typography sx={{ fontSize: '0.72rem', color: '#bbb' }}>
                                                    {new Date(log.timestamp).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })} • {new Date(log.timestamp).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                                                </Typography>
                                            </Box>
                                            <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                                                {(log.tags || []).slice(0, 3).map((t, ti) => (
                                                    <Chip key={ti} label={t} size="small" sx={{ fontSize: '0.6rem', bgcolor: '#f8f6ff', color: '#bb86fc', fontWeight: 600 }} />
                                                ))}
                                            </Box>
                                        </Box>
                                    ))}
                                </Stack>
                            </Paper>
                        )}
                    </Box>

                    {/* RIGHT SIDEBAR */}
                    <Box sx={{ flex: '1 1 35%', display: 'flex', flexDirection: 'column', gap: 3 }}>
                        {/* AI Insights */}
                        <Paper elevation={0} sx={{ border: '1px solid #f0f0f0', borderRadius: '20px', p: 3 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                                <Box sx={{ width: 26, height: 26, borderRadius: '50%', bgcolor: '#bb86fc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Typography sx={{ color: 'white', fontSize: '0.65rem', fontWeight: 800 }}>AI</Typography>
                                </Box>
                                <Typography sx={{ fontWeight: 700, fontSize: '1.05rem' }}>AI Insights</Typography>
                            </Box>
                            {topTags.length > 0 ? (
                                <>
                                    <Box sx={{ borderLeft: '3px solid #bb86fc', pl: 2, mb: 2 }}>
                                        <Typography sx={{ fontSize: '0.85rem', lineHeight: 1.7, color: '#555' }}>
                                            Your most common tag is <Box component="span" sx={{ color: '#bb86fc', fontWeight: 700 }}>{topTags[0][0]}</Box> with {topTags[0][1]} entries.
                                            {topTags.length > 1 && <> Followed by <Box component="span" sx={{ color: '#bb86fc', fontWeight: 700 }}>{topTags[1][0]}</Box>.</>}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ borderLeft: '3px solid #e0d0f0', pl: 2 }}>
                                        <Typography sx={{ fontSize: '0.85rem', lineHeight: 1.7, color: '#555' }}>
                                            You have <Box component="span" sx={{ fontWeight: 700, color: '#bb86fc' }}>{allLogs.length}</Box> total entries.
                                            {moodDist['Radiant'] + moodDist['Good'] > 50 ? ' Most of your moods are positive — great job!' : ' Keep logging to identify patterns.'}
                                        </Typography>
                                    </Box>
                                </>
                            ) : (
                                <Typography sx={{ fontSize: '0.85rem', lineHeight: 1.7, color: '#999', fontStyle: 'italic' }}>
                                    Log a few moods to start receiving AI-powered insights about your emotional patterns.
                                </Typography>
                            )}
                        </Paper>

                        {/* Mood Distribution */}
                        <Paper elevation={0} sx={{ border: '1px solid #f0f0f0', borderRadius: '20px', p: 3 }}>
                            <Typography sx={{ fontWeight: 700, fontSize: '1.05rem', mb: 2.5 }}>Mood Distribution</Typography>
                            {allLogs.length > 0 ? (
                                <Stack spacing={1.5}>
                                    {MOODS.map((m, i) => {
                                        const pct = moodDist[m.label] || 0
                                        return (
                                            <Box key={i}>
                                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                                                    <Typography sx={{ fontSize: '0.8rem', fontWeight: 600 }}>{m.emoji} {m.label}</Typography>
                                                    <Typography sx={{ fontSize: '0.8rem', color: '#bbb', fontWeight: 600 }}>{pct}%</Typography>
                                                </Box>
                                                <Box sx={{ height: 8, bgcolor: '#f5f5f5', borderRadius: '100px', overflow: 'hidden' }}>
                                                    <Box sx={{ height: '100%', width: `${pct}%`, bgcolor: m.color, borderRadius: '100px', transition: '0.5s ease' }} />
                                                </Box>
                                            </Box>
                                        )
                                    })}
                                </Stack>
                            ) : (
                                <Typography sx={{ fontSize: '0.85rem', color: '#ccc', textAlign: 'center', py: 3 }}>No data yet</Typography>
                            )}
                        </Paper>

                        {/* Guided Meditation */}
                        <Box sx={{
                            borderRadius: '20px', overflow: 'hidden', position: 'relative', height: 160,
                            background: 'linear-gradient(135deg, #7c4dff, #e040fb)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', p: 3
                        }}>
                            <Typography sx={{ color: 'white', fontWeight: 800, fontSize: '1.1rem' }}>Guided Meditation</Typography>
                            <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem', mb: 1.5 }}>Relieve stress in 5 minutes</Typography>
                            <Button onClick={() => onNavigate('chat')} sx={{ bgcolor: 'white', color: '#7c4dff', borderRadius: '100px', px: 3, py: 0.6, fontWeight: 700, fontSize: '0.8rem', textTransform: 'none', alignSelf: 'flex-start', '&:hover': { bgcolor: '#f0f0f0' } }}>Start Session</Button>
                        </Box>
                    </Box>
                </Box>
            </Box>

            {/* Success Snackbar */}
            <Snackbar open={saved} autoHideDuration={3000} onClose={() => setSaved(false)} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                <Alert icon={<CheckCircle />} severity="success" sx={{ borderRadius: '14px', fontWeight: 600, bgcolor: '#e8f5e9', color: '#2e7d32', boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }}>
                    Mood logged successfully! 🎉
                </Alert>
            </Snackbar>
        </Box>
    )
}

export default Dashboard
