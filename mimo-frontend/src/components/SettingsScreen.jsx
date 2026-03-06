import React, { useState } from 'react'
import {
    Box, Typography, Paper, Avatar, Switch, Stack, IconButton, Button, TextField,
    Divider, Slider, Select, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material'
import {
    ArrowBack, PhotoCamera, NotificationsNone, Lock, Palette, DataUsage,
    DeleteForever, Download, Info, ChevronRight, DarkMode, LightMode,
    VolumeUp, Vibration, Email, Security, Logout as LogoutIcon
} from '@mui/icons-material'

const SettingsScreen = ({ onNavigate, user, onLogout }) => {
    const displayName = user?.displayName || user?.email?.split('@')[0] || 'User'
    const photoURL = user?.photoURL
    const userEmail = user?.email || ''

    // State for all toggles and settings
    const [notifications, setNotifications] = useState({
        dailyReminder: true,
        moodCheckIn: true,
        weeklyReport: true,
        soundEnabled: false,
        vibration: true,
    })
    const [privacy, setPrivacy] = useState({
        shareAnalytics: false,
        showProfile: true,
        dataCollection: true,
    })
    const [appearance, setAppearance] = useState('light')
    const [reminderTime, setReminderTime] = useState('09:00')
    const [fontSize, setFontSize] = useState(14)
    const [language, setLanguage] = useState('en')
    const [deleteDialog, setDeleteDialog] = useState(false)
    const [editingName, setEditingName] = useState(false)
    const [newName, setNewName] = useState(displayName)

    const toggleNotification = (key) => {
        setNotifications(p => ({ ...p, [key]: !p[key] }))
    }
    const togglePrivacy = (key) => {
        setPrivacy(p => ({ ...p, [key]: !p[key] }))
    }

    const SectionTitle = ({ icon, title }) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2, mt: 4 }}>
            <Box sx={{ width: 32, height: 32, borderRadius: '10px', bgcolor: '#f3e8ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#bb86fc' }}>
                {icon}
            </Box>
            <Typography sx={{ fontWeight: 800, fontSize: '1rem', color: '#1a1a1a' }}>{title}</Typography>
        </Box>
    )

    const SettingRow = ({ label, desc, children, onClick }) => (
        <Box onClick={onClick} sx={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            py: 1.8, px: 0, cursor: onClick ? 'pointer' : 'default',
            '&:hover': onClick ? { bgcolor: '#faf8ff', mx: -2, px: 2, borderRadius: '12px' } : {}
        }}>
            <Box sx={{ flex: 1, mr: 2 }}>
                <Typography sx={{ fontWeight: 600, fontSize: '0.9rem', color: '#333' }}>{label}</Typography>
                {desc && <Typography sx={{ fontSize: '0.75rem', color: '#bbb', mt: 0.3, lineHeight: 1.4 }}>{desc}</Typography>}
            </Box>
            {children}
        </Box>
    )

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#faf8ff' }}>
            {/* LEFT SIDEBAR - matching the insights dashboard */}
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
                        { icon: '🏠', label: 'Home', nav: 'insights' },
                        { icon: '💬', label: 'Chat', nav: 'chat' },
                        { icon: '📊', label: 'Mood Log', nav: 'dashboard' },
                        { icon: '📚', label: 'Resources', nav: 'resources' },
                        { icon: '⚙️', label: 'Settings', nav: 'settings', active: true },
                    ].map((item, i) => (
                        <Box key={i} onClick={() => onNavigate(item.nav)} sx={{
                            display: 'flex', alignItems: 'center', gap: 1.5, py: 1.2, px: 2, borderRadius: '12px', cursor: 'pointer',
                            bgcolor: item.active ? '#f3e8ff' : 'transparent', color: item.active ? '#bb86fc' : '#888',
                            '&:hover': { bgcolor: '#f8f6ff' }
                        }}>
                            <Typography sx={{ fontSize: '1rem' }}>{item.icon}</Typography>
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

            {/* MAIN CONTENT */}
            <Box sx={{ flex: 1, overflow: 'auto' }}>
                {/* Top Bar */}
                <Box sx={{ px: 4, py: 2, display: 'flex', alignItems: 'center', borderBottom: '1px solid #f0f0f0', bgcolor: 'white', position: 'sticky', top: 0, zIndex: 10 }}>
                    <IconButton onClick={() => onNavigate('insights')} sx={{ mr: 1 }}><ArrowBack /></IconButton>
                    <Typography sx={{ fontWeight: 700, fontSize: '1.1rem' }}>Settings</Typography>
                </Box>

                <Box sx={{ maxWidth: 680, mx: 'auto', px: 4, pb: 8 }}>
                    {/* ============ PROFILE ============ */}
                    <SectionTitle icon={<PhotoCamera sx={{ fontSize: 18 }} />} title="Profile" />
                    <Paper elevation={0} sx={{ border: '1px solid #f0f0f0', borderRadius: '20px', p: 3 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 3 }}>
                            <Box sx={{ position: 'relative' }}>
                                <Avatar src={photoURL} sx={{ width: 72, height: 72, bgcolor: '#bb86fc', fontSize: '1.8rem', boxShadow: '0 4px 16px rgba(187,134,252,0.2)' }}>{displayName[0]}</Avatar>
                                <Box sx={{
                                    position: 'absolute', bottom: -2, right: -2, width: 28, height: 28, borderRadius: '50%',
                                    bgcolor: '#bb86fc', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    border: '3px solid white', cursor: 'pointer'
                                }}>
                                    <PhotoCamera sx={{ fontSize: 12, color: 'white' }} />
                                </Box>
                            </Box>
                            <Box sx={{ flex: 1 }}>
                                {editingName ? (
                                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                                        <TextField size="small" value={newName} onChange={e => setNewName(e.target.value)}
                                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '10px', bgcolor: '#faf8ff' } }} />
                                        <Button onClick={() => setEditingName(false)} size="small" sx={{ color: '#bb86fc', fontWeight: 700, textTransform: 'none' }}>Save</Button>
                                    </Box>
                                ) : (
                                    <Box>
                                        <Typography sx={{ fontWeight: 700, fontSize: '1.1rem' }}>{displayName}</Typography>
                                        <Typography sx={{ fontSize: '0.8rem', color: '#bbb' }}>{userEmail}</Typography>
                                        <Typography onClick={() => setEditingName(true)} sx={{ fontSize: '0.78rem', color: '#bb86fc', fontWeight: 600, cursor: 'pointer', mt: 0.5, '&:hover': { color: '#a76ef5' } }}>Edit name</Typography>
                                    </Box>
                                )}
                            </Box>
                        </Box>
                        <Divider sx={{ my: 1 }} />
                        <SettingRow label="Member Since" desc="Your journey started here">
                            <Typography sx={{ fontSize: '0.85rem', color: '#bb86fc', fontWeight: 600 }}>
                                {user?.metadata?.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Recently'}
                            </Typography>
                        </SettingRow>
                        <SettingRow label="Account Type">
                            <Box sx={{ bgcolor: '#f3e8ff', color: '#bb86fc', px: 2, py: 0.4, borderRadius: '100px', fontSize: '0.75rem', fontWeight: 700 }}>Premium</Box>
                        </SettingRow>
                    </Paper>

                    {/* ============ NOTIFICATIONS ============ */}
                    <SectionTitle icon={<NotificationsNone sx={{ fontSize: 18 }} />} title="Notifications" />
                    <Paper elevation={0} sx={{ border: '1px solid #f0f0f0', borderRadius: '20px', p: 3 }}>
                        <SettingRow label="Daily Mood Reminder" desc="Get a gentle nudge to log your mood">
                            <Switch checked={notifications.dailyReminder} onChange={() => toggleNotification('dailyReminder')} sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#bb86fc' }, '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { bgcolor: '#dcc6ff' } }} />
                        </SettingRow>
                        {notifications.dailyReminder && (
                            <SettingRow label="Reminder Time" desc="When should MIMO check in?">
                                <TextField type="time" size="small" value={reminderTime} onChange={e => setReminderTime(e.target.value)}
                                    sx={{ width: 130, '& .MuiOutlinedInput-root': { borderRadius: '10px', bgcolor: '#faf8ff', '& fieldset': { borderColor: '#f0f0f0' } } }} />
                            </SettingRow>
                        )}
                        <Divider sx={{ my: 0.5 }} />
                        <SettingRow label="Morning Check-in" desc="Start your day with intention">
                            <Switch checked={notifications.moodCheckIn} onChange={() => toggleNotification('moodCheckIn')} sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#bb86fc' }, '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { bgcolor: '#dcc6ff' } }} />
                        </SettingRow>
                        <Divider sx={{ my: 0.5 }} />
                        <SettingRow label="Weekly Insights Report" desc="AI-powered summary of your week">
                            <Switch checked={notifications.weeklyReport} onChange={() => toggleNotification('weeklyReport')} sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#bb86fc' }, '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { bgcolor: '#dcc6ff' } }} />
                        </SettingRow>
                        <Divider sx={{ my: 0.5 }} />
                        <SettingRow label="Sound Effects" desc="Play sounds for interactions">
                            <Switch checked={notifications.soundEnabled} onChange={() => toggleNotification('soundEnabled')} sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#bb86fc' }, '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { bgcolor: '#dcc6ff' } }} />
                        </SettingRow>
                        <Divider sx={{ my: 0.5 }} />
                        <SettingRow label="Haptic Feedback" desc="Vibrate on key actions">
                            <Switch checked={notifications.vibration} onChange={() => toggleNotification('vibration')} sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#bb86fc' }, '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { bgcolor: '#dcc6ff' } }} />
                        </SettingRow>
                    </Paper>

                    {/* ============ APPEARANCE ============ */}
                    <SectionTitle icon={<Palette sx={{ fontSize: 18 }} />} title="Appearance" />
                    <Paper elevation={0} sx={{ border: '1px solid #f0f0f0', borderRadius: '20px', p: 3 }}>
                        <Typography sx={{ fontWeight: 600, fontSize: '0.85rem', mb: 2, color: '#555' }}>Theme</Typography>
                        <Box sx={{ display: 'flex', gap: 1.5, mb: 3 }}>
                            {[
                                { key: 'light', icon: <LightMode sx={{ fontSize: 20 }} />, label: 'Light' },
                                { key: 'dark', icon: <DarkMode sx={{ fontSize: 20 }} />, label: 'Dark' },
                                { key: 'auto', icon: <Palette sx={{ fontSize: 20 }} />, label: 'Auto' },
                            ].map(t => (
                                <Box key={t.key} onClick={() => setAppearance(t.key)} sx={{
                                    flex: 1, py: 2, textAlign: 'center', borderRadius: '14px', cursor: 'pointer', transition: '0.2s',
                                    border: appearance === t.key ? '2px solid #bb86fc' : '1px solid #f0f0f0',
                                    bgcolor: appearance === t.key ? '#f8f0ff' : 'white',
                                    '&:hover': { transform: 'scale(1.02)' }
                                }}>
                                    <Box sx={{ color: appearance === t.key ? '#bb86fc' : '#bbb', mb: 0.5 }}>{t.icon}</Box>
                                    <Typography sx={{ fontSize: '0.78rem', fontWeight: 600, color: appearance === t.key ? '#bb86fc' : '#888' }}>{t.label}</Typography>
                                </Box>
                            ))}
                        </Box>
                        <Divider sx={{ my: 1 }} />
                        <SettingRow label="Font Size" desc={`${fontSize}px — ${fontSize <= 12 ? 'Small' : fontSize <= 14 ? 'Medium' : fontSize <= 16 ? 'Large' : 'Extra Large'}`}>
                            <Box sx={{ width: 140 }}>
                                <Slider value={fontSize} min={11} max={18} onChange={(_, v) => setFontSize(v)}
                                    sx={{ color: '#bb86fc', '& .MuiSlider-thumb': { width: 18, height: 18, bgcolor: '#bb86fc', boxShadow: '0 2px 8px rgba(187,134,252,0.3)' } }} />
                            </Box>
                        </SettingRow>
                        <Divider sx={{ my: 1 }} />
                        <SettingRow label="Language">
                            <Select size="small" value={language} onChange={e => setLanguage(e.target.value)}
                                sx={{ borderRadius: '10px', bgcolor: '#faf8ff', minWidth: 120, '& fieldset': { borderColor: '#f0f0f0' } }}>
                                <MenuItem value="en">English</MenuItem>
                                <MenuItem value="hi">Hindi</MenuItem>
                                <MenuItem value="es">Spanish</MenuItem>
                                <MenuItem value="fr">French</MenuItem>
                                <MenuItem value="de">German</MenuItem>
                                <MenuItem value="ja">Japanese</MenuItem>
                            </Select>
                        </SettingRow>
                    </Paper>

                    {/* ============ PRIVACY & SECURITY ============ */}
                    <SectionTitle icon={<Lock sx={{ fontSize: 18 }} />} title="Privacy & Security" />
                    <Paper elevation={0} sx={{ border: '1px solid #f0f0f0', borderRadius: '20px', p: 3 }}>
                        <SettingRow label="Share Analytics" desc="Help us improve MIMO with anonymous usage data">
                            <Switch checked={privacy.shareAnalytics} onChange={() => togglePrivacy('shareAnalytics')} sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#bb86fc' }, '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { bgcolor: '#dcc6ff' } }} />
                        </SettingRow>
                        <Divider sx={{ my: 0.5 }} />
                        <SettingRow label="Profile Visibility" desc="Show your profile to the MIMO community">
                            <Switch checked={privacy.showProfile} onChange={() => togglePrivacy('showProfile')} sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#bb86fc' }, '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { bgcolor: '#dcc6ff' } }} />
                        </SettingRow>
                        <Divider sx={{ my: 0.5 }} />
                        <SettingRow label="Data Collection" desc="Allow MIMO to learn your patterns for better insights">
                            <Switch checked={privacy.dataCollection} onChange={() => togglePrivacy('dataCollection')} sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#bb86fc' }, '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { bgcolor: '#dcc6ff' } }} />
                        </SettingRow>
                        <Divider sx={{ my: 0.5 }} />
                        <SettingRow label="Change Password" onClick={() => alert('Password reset email will be sent to ' + userEmail)}>
                            <ChevronRight sx={{ color: '#ccc' }} />
                        </SettingRow>
                    </Paper>

                    {/* ============ DATA MANAGEMENT ============ */}
                    <SectionTitle icon={<DataUsage sx={{ fontSize: 18 }} />} title="Data Management" />
                    <Paper elevation={0} sx={{ border: '1px solid #f0f0f0', borderRadius: '20px', p: 3 }}>
                        <SettingRow label="Export My Data" desc="Download all your mood logs, chats, and insights" onClick={() => alert('Your data export is being prepared. You will receive an email shortly.')}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: '#bb86fc' }}>
                                <Download sx={{ fontSize: 18 }} />
                                <Typography sx={{ fontSize: '0.8rem', fontWeight: 600 }}>Export</Typography>
                            </Box>
                        </SettingRow>
                        <Divider sx={{ my: 0.5 }} />
                        <SettingRow label="Clear Chat History" desc="Remove all conversation data" onClick={() => alert('Chat history cleared.')}>
                            <ChevronRight sx={{ color: '#ccc' }} />
                        </SettingRow>
                        <Divider sx={{ my: 0.5 }} />
                        <SettingRow label="Clear Mood Logs" desc="Remove all mood tracking data" onClick={() => alert('Mood logs cleared.')}>
                            <ChevronRight sx={{ color: '#ccc' }} />
                        </SettingRow>
                    </Paper>

                    {/* ============ ABOUT ============ */}
                    <SectionTitle icon={<Info sx={{ fontSize: 18 }} />} title="About MIMO" />
                    <Paper elevation={0} sx={{ border: '1px solid #f0f0f0', borderRadius: '20px', p: 3 }}>
                        <SettingRow label="Version">
                            <Typography sx={{ fontSize: '0.85rem', color: '#bbb', fontWeight: 500 }}>1.0.0</Typography>
                        </SettingRow>
                        <Divider sx={{ my: 0.5 }} />
                        <SettingRow label="Terms of Service" onClick={() => { }}>
                            <ChevronRight sx={{ color: '#ccc' }} />
                        </SettingRow>
                        <Divider sx={{ my: 0.5 }} />
                        <SettingRow label="Privacy Policy" onClick={() => { }}>
                            <ChevronRight sx={{ color: '#ccc' }} />
                        </SettingRow>
                        <Divider sx={{ my: 0.5 }} />
                        <SettingRow label="Open Source Licenses" onClick={() => { }}>
                            <ChevronRight sx={{ color: '#ccc' }} />
                        </SettingRow>
                    </Paper>

                    {/* ============ DANGER ZONE ============ */}
                    <Box sx={{ mt: 5, mb: 2 }}>
                        <Typography sx={{ fontWeight: 800, fontSize: '0.85rem', color: '#ff4081', letterSpacing: '0.5px' }}>DANGER ZONE</Typography>
                    </Box>
                    <Paper elevation={0} sx={{ border: '1px solid #ffcdd2', borderRadius: '20px', p: 3, bgcolor: '#fff8f8' }}>
                        <SettingRow label="Delete My Account" desc="Permanently remove your account and all associated data. This action cannot be undone.">
                            <Button onClick={() => setDeleteDialog(true)} variant="outlined" size="small" sx={{
                                borderColor: '#ff4081', color: '#ff4081', borderRadius: '10px', textTransform: 'none', fontWeight: 700, fontSize: '0.8rem',
                                '&:hover': { bgcolor: '#fff0f3', borderColor: '#ff4081' }
                            }}>Delete</Button>
                        </SettingRow>
                    </Paper>

                    {/* Sign Out Button (bottom) */}
                    <Button onClick={onLogout} fullWidth variant="outlined" startIcon={<LogoutIcon />} sx={{
                        mt: 4, borderColor: '#f0f0f0', color: '#ff4081', borderRadius: '14px', py: 1.5,
                        textTransform: 'none', fontWeight: 700, fontSize: '0.9rem',
                        '&:hover': { borderColor: '#ff4081', bgcolor: '#fff0f3' }
                    }}>
                        Sign Out
                    </Button>

                    {/* Footer */}
                    <Typography sx={{ textAlign: 'center', mt: 4, fontSize: '0.75rem', color: '#ddd' }}>
                        Made with 💜 by MIMO AI Team
                    </Typography>
                </Box>
            </Box>

            {/* Delete Account Dialog */}
            <Dialog open={deleteDialog} onClose={() => setDeleteDialog(false)} PaperProps={{ sx: { borderRadius: '20px', p: 1 } }}>
                <DialogTitle sx={{ fontWeight: 700 }}>Delete Account?</DialogTitle>
                <DialogContent>
                    <Typography sx={{ color: '#666', lineHeight: 1.7 }}>
                        This will permanently delete your account, including all mood logs, chat history, and insights. This action <strong>cannot be undone</strong>.
                    </Typography>
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 3 }}>
                    <Button onClick={() => setDeleteDialog(false)} sx={{ color: '#888', textTransform: 'none', fontWeight: 600 }}>Cancel</Button>
                    <Button onClick={() => { setDeleteDialog(false); onLogout() }} variant="contained" sx={{ bgcolor: '#ff4081', borderRadius: '10px', textTransform: 'none', fontWeight: 700, '&:hover': { bgcolor: '#e91e63' } }}>
                        Delete Forever
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}

export default SettingsScreen
