import React, { useState, useEffect } from 'react'
import { Box, Typography, Paper, Stack, Avatar, IconButton, Chip, Button } from '@mui/material'
import { Search as SearchIcon, NotificationsNone as BellIcon, Home, ChatBubbleOutline, BarChart, LibraryBooks, Settings, Logout as LogoutIcon } from '@mui/icons-material'
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'
import { getMoodLogs, getWeeklyData, getStreak, getAIInsight, getWeeklyComparison, hasLoggedToday, getTodayLogs, MOODS } from '../moodStore'

const UserInsightsDashboard = ({ onBack, onNavigate, user, onLogout }) => {
    const displayName = user?.displayName || user?.email?.split('@')[0] || 'Friend'
    const photoURL = user?.photoURL

    const [chartData, setChartData] = useState([])
    const [streak, setStreak] = useState(0)
    const [insight, setInsight] = useState('')
    const [comparison, setComparison] = useState({ change: 0 })
    const [recentLogs, setRecentLogs] = useState([])
    const [totalLogs, setTotalLogs] = useState(0)
    const [loggedToday, setLoggedToday] = useState(false)

    useEffect(() => {
        setChartData(getWeeklyData())
        setStreak(getStreak())
        setInsight(getAIInsight(displayName))
        setComparison(getWeeklyComparison())
        setRecentLogs(getMoodLogs().slice(0, 3))
        setTotalLogs(getMoodLogs().length)
        setLoggedToday(hasLoggedToday())
    }, [displayName])

    // Build chart data for area chart
    const areaData = chartData.map(d => ({
        day: d.day,
        happy: Math.max(d.happy, d.avg > 3.5 ? d.avg : 0),
        neutral: Math.max(d.neutral, d.avg >= 2.5 && d.avg <= 3.5 ? d.avg : 0),
        peaceful: d.peaceful > 0 ? d.peaceful : (d.avg > 0 ? d.avg * 0.5 : 0),
    }))

    // Dynamic recommendations based on data
    const getRecommendations = () => {
        const today = getTodayLogs()
        const recs = []
        if (!loggedToday) {
            recs.push({ icon: '📝', title: 'Log Your Mood', sub: '2 mins • Build your streak', color: '#bb86fc', action: 'dashboard' })
        }
        if (streak >= 3) {
            recs.push({ icon: '🧘', title: 'Guided Meditation', sub: '5 mins • Reward your consistency', color: '#7c4dff', action: 'chat' })
        }
        if (today.length > 0 && today.some(l => l.moodValue <= 2)) {
            recs.push({ icon: '🫁', title: 'Breathing Exercise', sub: '3 mins • Based on your mood', color: '#ff4081', action: 'resources' })
        }
        recs.push({ icon: '🎧', title: 'Calm Rain Audio', sub: '15 mins • Ideal for focus', color: '#03dac6', action: 'resources' })
        recs.push({ icon: '🧠', title: 'Gratitude Journal', sub: '3 mins • Boost positivity', color: '#ffab40', action: 'chat' })
        return recs.slice(0, 3)
    }

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#faf8ff' }}>
            {/* LEFT SIDEBAR */}
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
                        { icon: <Home sx={{ fontSize: 20 }} />, label: 'Home', active: true, nav: 'insights' },
                        { icon: <ChatBubbleOutline sx={{ fontSize: 20 }} />, label: 'Chat', active: false, nav: 'chat' },
                        { icon: <BarChart sx={{ fontSize: 20 }} />, label: 'Mood Log', active: false, nav: 'dashboard' },
                        { icon: <LibraryBooks sx={{ fontSize: 20 }} />, label: 'Resources', active: false, nav: 'resources' },
                        { icon: <Settings sx={{ fontSize: 20 }} />, label: 'Settings', active: false, nav: 'settings' },
                    ].map((item, i) => (
                        <Box key={i} onClick={() => onNavigate(item.nav)} sx={{
                            display: 'flex', alignItems: 'center', gap: 1.5, py: 1.2, px: 2, borderRadius: '12px', cursor: 'pointer',
                            bgcolor: item.active ? '#f3e8ff' : 'transparent', color: item.active ? '#bb86fc' : '#888',
                            fontWeight: item.active ? 700 : 500, '&:hover': { bgcolor: '#f8f6ff' }
                        }}>
                            {item.icon}
                            <Typography sx={{ fontSize: '0.9rem', fontWeight: 'inherit', color: 'inherit' }}>{item.label}</Typography>
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

            {/* MAIN CONTENT */}
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ px: 4, py: 2, display: 'flex', alignItems: 'center', borderBottom: '1px solid #f0f0f0', bgcolor: 'white' }}>
                    <Typography sx={{ fontWeight: 700, fontSize: '1rem', flex: 1 }}>Dashboard</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: '#faf8ff', borderRadius: '100px', px: 2, py: 0.5, gap: 1, mr: 2, width: 200 }}>
                        <SearchIcon sx={{ fontSize: 18, color: '#ccc' }} />
                        <Typography sx={{ fontSize: '0.8rem', color: '#ccc' }}>Search insights...</Typography>
                    </Box>
                    <IconButton><BellIcon /></IconButton>
                </Box>

                <Box sx={{ p: 4, display: 'flex', gap: 3, flexDirection: { xs: 'column', md: 'row' }, flex: 1, overflow: 'auto' }}>
                    {/* LEFT */}
                    <Box sx={{ flex: '1 1 60%' }}>
                        {/* Greeting */}
                        <Typography sx={{ fontWeight: 900, fontSize: '2rem', mb: 0.5 }}>Hello, {displayName}.</Typography>
                        <Typography sx={{ color: '#888', mb: 4, fontSize: '0.95rem' }}>
                            {totalLogs === 0 ? (
                                'Welcome to MIMO! Start by logging your first mood to see personalized insights.'
                            ) : comparison.change > 0 ? (
                                <>Your emotional resilience is up <Box component="span" sx={{ color: '#4caf50', fontWeight: 700 }}>{comparison.change}%</Box> this week. Keep it up!</>
                            ) : comparison.change < 0 ? (
                                <>Your mood is down <Box component="span" sx={{ color: '#ff9800', fontWeight: 700 }}>{Math.abs(comparison.change)}%</Box> this week. Let's work on that together.</>
                            ) : (
                                <>You have <Box component="span" sx={{ color: '#bb86fc', fontWeight: 700 }}>{totalLogs}</Box> mood entries. Keep logging to unlock deeper patterns!</>
                            )}
                        </Typography>

                        {/* Mood Chart */}
                        <Paper elevation={0} sx={{ border: '1px solid #f0f0f0', borderRadius: '20px', p: 3, mb: 3 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                <Box>
                                    <Typography sx={{ fontWeight: 700, fontSize: '1.1rem' }}>Mood at a Glance</Typography>
                                    <Typography sx={{ color: '#bbb', fontSize: '0.8rem' }}>Weekly emotional trends</Typography>
                                </Box>
                                <Chip label={`${totalLogs} total`} size="small" sx={{ bgcolor: '#f3e8ff', color: '#bb86fc', fontWeight: 700, fontSize: '0.7rem' }} />
                            </Box>
                            {totalLogs > 0 ? (
                                <>
                                    <Box sx={{ display: 'flex', gap: 2, mb: 2, justifyContent: 'flex-end' }}>
                                        {[{ c: '#bb86fc', l: 'HAPPY' }, { c: '#4caf50', l: 'NEUTRAL' }, { c: '#ff4081', l: 'PEACEFUL' }].map((lg, i) => (
                                            <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                                <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: lg.c }} />
                                                <Typography sx={{ fontSize: '0.65rem', color: '#bbb', fontWeight: 600 }}>{lg.l}</Typography>
                                            </Box>
                                        ))}
                                    </Box>
                                    <Box sx={{ height: 220 }}>
                                        <ResponsiveContainer width="100%" height="100%">
                                            <AreaChart data={areaData}>
                                                <defs>
                                                    <linearGradient id="gHappy" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#bb86fc" stopOpacity={0.3} /><stop offset="95%" stopColor="#bb86fc" stopOpacity={0} /></linearGradient>
                                                    <linearGradient id="gNeutral" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#4caf50" stopOpacity={0.3} /><stop offset="95%" stopColor="#4caf50" stopOpacity={0} /></linearGradient>
                                                    <linearGradient id="gPeaceful" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#ff4081" stopOpacity={0.3} /><stop offset="95%" stopColor="#ff4081" stopOpacity={0} /></linearGradient>
                                                </defs>
                                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f5f5" />
                                                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#ccc' }} />
                                                <YAxis hide domain={[0, 6]} />
                                                <Tooltip contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 8px 20px rgba(0,0,0,0.08)' }} />
                                                <Area type="monotone" dataKey="happy" stroke="#bb86fc" strokeWidth={2} fill="url(#gHappy)" />
                                                <Area type="monotone" dataKey="neutral" stroke="#4caf50" strokeWidth={2} fill="url(#gNeutral)" />
                                                <Area type="monotone" dataKey="peaceful" stroke="#ff4081" strokeWidth={2} fill="url(#gPeaceful)" />
                                            </AreaChart>
                                        </ResponsiveContainer>
                                    </Box>
                                </>
                            ) : (
                                <Box sx={{ height: 220, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 2 }}>
                                    <Typography sx={{ fontSize: '3rem' }}>📈</Typography>
                                    <Typography sx={{ color: '#ccc', fontSize: '0.95rem', fontWeight: 500 }}>Your mood chart will appear here</Typography>
                                    <Button onClick={() => onNavigate('dashboard')} sx={{ bgcolor: '#f3e8ff', color: '#bb86fc', borderRadius: '100px', px: 3, py: 0.8, fontWeight: 700, textTransform: 'none', '&:hover': { bgcolor: '#e8d5ff' } }}>Log First Mood →</Button>
                                </Box>
                            )}
                        </Paper>

                        {/* Recent Mood Logs */}
                        <Paper elevation={0} sx={{ border: '1px solid #f0f0f0', borderRadius: '20px', p: 3 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                <Typography sx={{ fontWeight: 700, fontSize: '1rem' }}>Recent Mood Logs</Typography>
                                <Typography onClick={() => onNavigate('dashboard')} sx={{ color: '#bb86fc', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer' }}>View All</Typography>
                            </Box>
                            {recentLogs.length > 0 ? (
                                <Stack spacing={0}>
                                    {recentLogs.map((log, i) => (
                                        <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 2, py: 1.5, borderTop: i > 0 ? '1px solid #f5f5f5' : 'none' }}>
                                            <Avatar sx={{ bgcolor: (MOODS[log.moodIndex]?.color || '#bb86fc') + '20', width: 40, height: 40, fontSize: '1.2rem' }}>{log.moodEmoji}</Avatar>
                                            <Box sx={{ flex: 1 }}>
                                                <Typography sx={{ fontWeight: 700, fontSize: '0.9rem' }}>{log.moodLabel}</Typography>
                                                <Typography sx={{ fontSize: '0.72rem', color: '#bbb' }}>
                                                    {new Date(log.timestamp).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })} • {new Date(log.timestamp).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                                                </Typography>
                                            </Box>
                                            <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                                                {(log.tags || []).slice(0, 2).map((t, ti) => (
                                                    <Chip key={ti} label={t} size="small" sx={{ fontSize: '0.6rem', bgcolor: '#f8f6ff', color: '#bb86fc', fontWeight: 600 }} />
                                                ))}
                                            </Box>
                                        </Box>
                                    ))}
                                </Stack>
                            ) : (
                                <Box sx={{ textAlign: 'center', py: 3, color: '#ccc' }}>
                                    <Typography sx={{ fontSize: '1.5rem', mb: 1 }}>📋</Typography>
                                    <Typography sx={{ fontSize: '0.85rem' }}>No mood logs yet. Start tracking!</Typography>
                                </Box>
                            )}
                        </Paper>
                    </Box>

                    {/* RIGHT */}
                    <Box sx={{ flex: '1 1 40%', display: 'flex', flexDirection: 'column', gap: 3 }}>
                        {/* Streak + Quick Action */}
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <Paper elevation={0} sx={{ flex: 1, border: '1px solid #f0f0f0', borderRadius: '16px', p: 2.5, textAlign: 'center' }}>
                                <Typography sx={{ fontSize: '1.3rem' }}>{streak > 0 ? '🔥' : '🏠'}</Typography>
                                <Typography sx={{ fontSize: '0.65rem', color: '#bbb', fontWeight: 600, mt: 0.5 }}>STREAK</Typography>
                                <Typography sx={{ fontWeight: 900, fontSize: '1.8rem', lineHeight: 1, color: streak > 0 ? '#333' : '#ddd' }}>{streak}</Typography>
                                <Typography sx={{ fontSize: '0.7rem', color: '#bbb' }}>{streak === 1 ? 'Day' : 'Days'} Active</Typography>
                            </Paper>
                            <Box sx={{ flex: 1, bgcolor: '#1e1e2e', borderRadius: '16px', p: 2.5, color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                <Typography sx={{ fontSize: '0.6rem', color: '#bb86fc', fontWeight: 700, letterSpacing: '1px' }}>REC</Typography>
                                <Typography sx={{ fontWeight: 800, fontSize: '0.95rem', mt: 0.5 }}>{loggedToday ? '5-min Breathing' : 'Log Your Mood'}</Typography>
                                <Typography onClick={() => onNavigate(loggedToday ? 'chat' : 'dashboard')} sx={{ color: '#bb86fc', fontWeight: 700, fontSize: '0.8rem', mt: 1, cursor: 'pointer' }}>Start Now</Typography>
                            </Box>
                        </Box>

                        {/* AI Daily Insight */}
                        <Paper elevation={0} sx={{ border: '1px solid #f0f0f0', borderRadius: '20px', p: 3 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                                <Typography sx={{ fontSize: '0.7rem', color: '#bb86fc', fontWeight: 700 }}>✦ AI DAILY INSIGHT</Typography>
                                <Typography sx={{ fontSize: '1rem' }}>✨</Typography>
                            </Box>
                            <Typography sx={{ fontSize: '1rem', lineHeight: 1.7, fontWeight: 500, color: '#333', fontStyle: 'italic' }}>
                                "{insight}"
                            </Typography>
                            <Button onClick={() => onNavigate('dashboard')} fullWidth sx={{
                                mt: 2.5, background: 'linear-gradient(135deg, #bb86fc, #e040fb)', color: 'white',
                                borderRadius: '100px', py: 1.3, fontWeight: 700, textTransform: 'none',
                                '&:hover': { background: 'linear-gradient(135deg, #a76ef5, #d500f9)' }
                            }}>{totalLogs > 0 ? 'Explore Detail →' : 'Log First Mood →'}</Button>
                        </Paper>

                        {/* Recommended Today */}
                        <Paper elevation={0} sx={{ border: '1px solid #f0f0f0', borderRadius: '20px', p: 3 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                                <Typography sx={{ fontSize: '1rem' }}>💎</Typography>
                                <Typography sx={{ fontWeight: 700, fontSize: '0.95rem' }}>Recommended Today</Typography>
                            </Box>
                            <Stack spacing={2}>
                                {getRecommendations().map((r, i) => (
                                    <Box key={i} onClick={() => onNavigate(r.action)} sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 1.5, borderRadius: '12px', border: '1px solid #f5f5f5', cursor: 'pointer', transition: '0.2s', '&:hover': { bgcolor: '#faf8ff', transform: 'translateX(4px)' } }}>
                                        <Box sx={{ width: 40, height: 40, borderRadius: '12px', bgcolor: r.color + '15', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem' }}>{r.icon}</Box>
                                        <Box>
                                            <Typography sx={{ fontWeight: 700, fontSize: '0.85rem' }}>{r.title}</Typography>
                                            <Typography sx={{ fontSize: '0.7rem', color: '#bbb' }}>{r.sub}</Typography>
                                        </Box>
                                    </Box>
                                ))}
                            </Stack>
                        </Paper>
                    </Box>
                </Box>
            </Box>

            {/* FAB Chat */}
            <IconButton onClick={() => onNavigate('chat')} sx={{
                position: 'fixed', bottom: 24, right: 24, width: 52, height: 52,
                bgcolor: '#1e1e2e', color: 'white', boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
                '&:hover': { bgcolor: '#333' }
            }}>
                <ChatBubbleOutline />
            </IconButton>
        </Box>
    )
}

export default UserInsightsDashboard
