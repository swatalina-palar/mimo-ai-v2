import React, { useState, useRef, useEffect } from 'react'
import { Box, Typography, TextField, IconButton, Avatar, Stack, Chip, Paper, CircularProgress, Button } from '@mui/material'
import { Send as SendIcon, Mic as MicIcon, Add as AddIcon, MoreVert, Search as SearchIcon, Home, ChatBubbleOutline, BarChart, LibraryBooks, Settings, Logout as LogoutIcon } from '@mui/icons-material'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const ChatInterface = ({ onBack, onNavigate, user, onLogout }) => {
    const displayName = user?.displayName || user?.email?.split('@')[0] || 'Friend'
    const photoURL = user?.photoURL

    const [messages, setMessages] = useState([
        { text: `Hi there, I'm MIMO. I'm here to listen and support you. How are you feeling today, ${displayName}?`, sender: 'ai' }
    ])
    const [input, setInput] = useState('')
    const [isTyping, setIsTyping] = useState(false)
    const [sessionId, setSessionId] = useState(`session_${Date.now()}`)
    const [emotion, setEmotion] = useState('neutral')
    const endRef = useRef(null)

    useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages])

    const sendToAI = async (userMessage) => {
        try {
            const response = await fetch(`${API_URL}/api/chat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: userMessage, sessionId })
            })
            const data = await response.json()
            return data
        } catch (error) {
            console.error('API Error:', error)
            return {
                reply: "I'm still here with you. It seems like there's a connection hiccup on my end. Could you try sharing that again?",
                emotion: 'neutral'
            }
        }
    }

    const handleSend = async () => {
        if (!input.trim() || isTyping) return
        const msg = input.trim()
        setMessages(p => [...p, { text: msg, sender: 'user' }])
        setInput('')
        setIsTyping(true)

        const data = await sendToAI(msg)
        setEmotion(data.emotion || 'neutral')

        // Add suggestion chips based on emotion
        let chips = null
        if (data.emotion === 'anxiety' || data.emotion === 'stress') {
            chips = ['Try breathing exercise', 'Tell me more', 'I need a break']
        } else if (data.emotion === 'sadness') {
            chips = ['I want to talk about it', 'Suggest something calming', 'I need help']
        } else if (data.emotion === 'crisis') {
            chips = ['Show helpline numbers', 'I need immediate help']
        } else if (data.emotion === 'happy') {
            chips = ['Keep talking', 'Log my mood', 'Thank you']
        }

        setMessages(p => [...p, { text: data.reply, sender: 'ai', chips, emotion: data.emotion }])
        setIsTyping(false)
    }

    const handleChip = async (label) => {
        setMessages(p => [...p, { text: label, sender: 'user' }])
        setIsTyping(true)

        // Handle special chip actions
        if (label === 'Show helpline numbers') {
            setMessages(p => [...p, {
                text: "Here are some helplines you can reach out to right now:\n\n🆘 KIRAN Helpline: 1800-599-0019 (24/7, toll-free)\n📱 Crisis Text Line: Text HOME to 741741\n📞 Vandrevala Foundation: 1860-2662-345\n📞 AASRA: 9820466726\n\nPlease don't hesitate to call. You deserve support, and these people are trained to help.",
                sender: 'ai'
            }])
            setIsTyping(false)
            return
        }

        if (label === 'Log my mood') {
            onNavigate('dashboard')
            return
        }

        const data = await sendToAI(label)
        setEmotion(data.emotion || 'neutral')
        setMessages(p => [...p, { text: data.reply, sender: 'ai' }])
        setIsTyping(false)
    }

    const handleNewSession = () => {
        const newId = `session_${Date.now()}`
        setSessionId(newId)
        setMessages([
            { text: `Fresh start! I'm here whenever you're ready to talk, ${displayName}. What's on your mind?`, sender: 'ai' }
        ])
        setEmotion('neutral')
    }

    // Emotion-based accent color
    const emotionColors = {
        anxiety: '#ff9800', stress: '#ff5722', sadness: '#2196f3',
        anger: '#f44336', happy: '#4caf50', crisis: '#ff1744', neutral: '#bb86fc'
    }
    const accentColor = emotionColors[emotion] || '#bb86fc'

    return (
        <Box sx={{ display: 'flex', height: '100vh', bgcolor: '#faf8ff' }}>
            {/* LEFT SIDEBAR */}
            <Box sx={{ width: 260, bgcolor: 'white', borderRight: '1px solid #f0f0f0', display: { xs: 'none', md: 'flex' }, flexDirection: 'column', p: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                    <Box sx={{ width: 28, height: 28, borderRadius: '50%', bgcolor: '#1e1e2e', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Typography sx={{ color: 'white', fontSize: '0.6rem', fontWeight: 800 }}>◆</Typography>
                    </Box>
                    <Box>
                        <Typography sx={{ fontWeight: 800, fontSize: '1rem', lineHeight: 1 }}>MIMO</Typography>
                        <Typography sx={{ fontSize: '0.55rem', color: '#bb86fc', fontWeight: 600 }}>AI MENTAL COMPANION</Typography>
                    </Box>
                </Box>

                {/* Nav links */}
                <Stack spacing={0.5} sx={{ mb: 3 }}>
                    {[
                        { icon: <Home sx={{ fontSize: 18 }} />, label: 'Home', nav: 'insights' },
                        { icon: <ChatBubbleOutline sx={{ fontSize: 18 }} />, label: 'Chat', nav: 'chat', active: true },
                        { icon: <BarChart sx={{ fontSize: 18 }} />, label: 'Mood Log', nav: 'dashboard' },
                        { icon: <LibraryBooks sx={{ fontSize: 18 }} />, label: 'Resources', nav: 'resources' },
                        { icon: <Settings sx={{ fontSize: 18 }} />, label: 'Settings', nav: 'settings' },
                    ].map((item, i) => (
                        <Box key={i} onClick={() => onNavigate(item.nav)} sx={{
                            display: 'flex', alignItems: 'center', gap: 1.5, py: 1, px: 2, borderRadius: '10px', cursor: 'pointer',
                            bgcolor: item.active ? '#f3e8ff' : 'transparent', color: item.active ? '#bb86fc' : '#888',
                            '&:hover': { bgcolor: '#f8f6ff' }
                        }}>
                            {item.icon}
                            <Typography sx={{ fontSize: '0.85rem', fontWeight: item.active ? 700 : 500, color: 'inherit' }}>{item.label}</Typography>
                        </Box>
                    ))}
                </Stack>

                {/* New Session */}
                <Box onClick={handleNewSession} sx={{ bgcolor: '#bb86fc', color: 'white', borderRadius: '12px', py: 1.3, textAlign: 'center', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer', mb: 3, '&:hover': { bgcolor: '#a76ef5' } }}>
                    ✚ New Session
                </Box>

                {/* Emotion Indicator */}
                <Paper elevation={0} sx={{ border: '1px solid #f0f0f0', borderRadius: '12px', p: 2, mb: 3 }}>
                    <Typography sx={{ fontSize: '0.65rem', fontWeight: 700, color: '#bbb', letterSpacing: '0.5px', mb: 1 }}>DETECTED MOOD</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: accentColor }} />
                        <Typography sx={{ fontSize: '0.85rem', fontWeight: 600, textTransform: 'capitalize', color: accentColor }}>{emotion}</Typography>
                    </Box>
                </Paper>

                {/* Quick Actions */}
                <Typography sx={{ fontSize: '0.65rem', fontWeight: 700, color: '#bbb', letterSpacing: '0.5px', mb: 1 }}>QUICK ACTIONS</Typography>
                <Stack spacing={1}>
                    {[
                        { label: 'Breathing Exercise', action: "Can you guide me through a breathing exercise?" },
                        { label: 'Grounding Technique', action: "I need help grounding myself right now." },
                        { label: 'Positive Affirmation', action: "I could use some positive affirmations." },
                    ].map((q, i) => (
                        <Box key={i} onClick={() => { setInput(q.action); }} sx={{
                            py: 1, px: 2, borderRadius: '10px', border: '1px solid #f0f0f0', cursor: 'pointer',
                            fontSize: '0.8rem', color: '#888', fontWeight: 500, '&:hover': { bgcolor: '#f8f6ff', color: '#bb86fc' }
                        }}>{q.label}</Box>
                    ))}
                </Stack>

                {/* Bottom Mood Bar */}
                <Box sx={{ mt: 'auto', pt: 2, borderTop: '1px solid #f0f0f0' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
                        <Avatar src={photoURL} sx={{ bgcolor: '#ffab40', width: 32, height: 32, fontSize: '0.8rem' }}>{displayName[0]}</Avatar>
                        <Box sx={{ flex: 1, minWidth: 0 }}>
                            <Typography sx={{ fontWeight: 700, fontSize: '0.8rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{displayName}</Typography>
                            <Typography sx={{ fontSize: '0.65rem', color: '#bbb' }}>Premium Member</Typography>
                        </Box>
                    </Box>
                    <Button onClick={onLogout} startIcon={<LogoutIcon sx={{ fontSize: 14 }} />} fullWidth size="small" sx={{ color: '#ff4081', borderRadius: '8px', textTransform: 'none', fontWeight: 600, fontSize: '0.75rem', justifyContent: 'flex-start', px: 2, '&:hover': { bgcolor: '#fff0f3' } }}>Sign Out</Button>
                </Box>
            </Box>

            {/* MAIN CHAT */}
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                {/* Chat Header */}
                <Box sx={{ px: 3, py: 2, borderBottom: '1px solid #f0f0f0', display: 'flex', alignItems: 'center', bgcolor: 'white' }}>
                    <Box sx={{ display: { xs: 'block', md: 'none' }, mr: 2 }}>
                        <Typography onClick={() => onNavigate('insights')} sx={{ cursor: 'pointer', fontWeight: 700, color: '#bb86fc' }}>← Back</Typography>
                    </Box>
                    <Avatar sx={{ bgcolor: '#1e1e2e', mr: 2, width: 40, height: 40 }}>
                        <Typography sx={{ fontSize: '0.8rem' }}>✦</Typography>
                    </Avatar>
                    <Box sx={{ flex: 1 }}>
                        <Typography sx={{ fontWeight: 700, fontSize: '1rem' }}>MIMO AI</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: '#4caf50' }} />
                            <Typography sx={{ fontSize: '0.75rem', color: '#4caf50' }}>Always here to listen</Typography>
                        </Box>
                    </Box>
                    {/* Crisis Help */}
                    <Box onClick={() => handleChip('Show helpline numbers')} sx={{ bgcolor: '#ff4081', color: 'white', borderRadius: '100px', px: 2, py: 0.7, fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 0.5, mr: 1, '&:hover': { bgcolor: '#e91e63' } }}>
                        ✦ CRISIS HELP
                    </Box>
                </Box>

                {/* Messages */}
                <Box sx={{ flex: 1, overflowY: 'auto', px: { xs: 2, md: 4 }, py: 3, display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                    {messages.map((m, i) => (
                        <Box key={i}>
                            <Box sx={{ display: 'flex', justifyContent: m.sender === 'user' ? 'flex-end' : 'flex-start', mb: 0.5, gap: 1, alignItems: 'center' }}>
                                {m.sender === 'ai' && <Avatar sx={{ width: 22, height: 22, bgcolor: '#1e1e2e', fontSize: '0.5rem' }}>✦</Avatar>}
                                <Typography sx={{ fontSize: '0.7rem', fontWeight: 700, color: m.sender === 'user' ? '#999' : '#bb86fc' }}>{m.sender === 'user' ? 'YOU' : 'MIMO'}</Typography>
                                {m.sender === 'user' && <Avatar src={photoURL} sx={{ width: 22, height: 22, bgcolor: '#ffab40', fontSize: '0.5rem' }}>{displayName[0]}</Avatar>}
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: m.sender === 'user' ? 'flex-end' : 'flex-start' }}>
                                <Paper elevation={0} sx={{
                                    maxWidth: '70%', p: 2.5, borderRadius: m.sender === 'user' ? '20px 20px 4px 20px' : '20px 20px 20px 4px',
                                    bgcolor: m.sender === 'user' ? '#fff3e0' : '#f8f0ff',
                                    ...(m.emotion === 'crisis' && m.sender === 'ai' ? { border: '1px solid #ff4081', bgcolor: '#fff8f9' } : {})
                                }}>
                                    <Typography sx={{ fontSize: '0.9rem', lineHeight: 1.7, whiteSpace: 'pre-line' }}>{m.text}</Typography>
                                </Paper>
                            </Box>
                            {m.chips && (
                                <Box sx={{ display: 'flex', gap: 1, mt: 1.5, ml: 3, flexWrap: 'wrap' }}>
                                    {m.chips.map((c, ci) => (
                                        <Chip key={ci} label={c} onClick={() => handleChip(c)} variant="outlined" sx={{ borderColor: '#e0d0f0', color: '#bb86fc', fontWeight: 600, fontSize: '0.78rem', cursor: 'pointer', '&:hover': { bgcolor: '#f8f0ff' } }} />
                                    ))}
                                </Box>
                            )}
                        </Box>
                    ))}
                    {isTyping && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <CircularProgress size={14} sx={{ color: '#bb86fc' }} />
                            <Typography sx={{ fontSize: '0.8rem', color: '#bbb' }}>MIMO is thinking...</Typography>
                        </Box>
                    )}
                    <div ref={endRef} />
                </Box>

                {/* Input */}
                <Box sx={{ px: { xs: 2, md: 4 }, py: 2, borderTop: '1px solid #f0f0f0', bgcolor: 'white' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, bgcolor: '#faf8ff', borderRadius: '100px', px: 2, py: 0.5 }}>
                        <TextField fullWidth placeholder="Share what's on your mind..." variant="standard" value={input} onChange={e => setInput(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && !e.shiftKey && handleSend()}
                            InputProps={{ disableUnderline: true }} sx={{ '& input': { fontSize: '0.9rem' } }} />
                        <IconButton onClick={handleSend} disabled={!input.trim() || isTyping} sx={{
                            bgcolor: input.trim() ? '#bb86fc' : '#e0e0e0', color: 'white', width: 36, height: 36,
                            '&:hover': { bgcolor: '#a76ef5' }, '&.Mui-disabled': { color: '#ccc' }
                        }}>
                            <SendIcon sx={{ fontSize: 18 }} />
                        </IconButton>
                    </Box>
                    <Typography sx={{ textAlign: 'center', fontSize: '0.65rem', color: '#ccc', mt: 1 }}>
                        MIMO is an AI companion and not a replacement for professional therapy. If you're in danger, please use the <Box component="span" onClick={() => handleChip('Show helpline numbers')} sx={{ color: '#ff4081', cursor: 'pointer', fontWeight: 600 }}>Crisis Help</Box> button.
                    </Typography>
                </Box>
            </Box>
        </Box>
    )
}

export default ChatInterface
