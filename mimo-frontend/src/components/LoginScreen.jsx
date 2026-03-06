import React, { useState } from 'react'
import { Box, Typography, TextField, Button, Paper, Divider, Alert, CircularProgress, IconButton, InputAdornment } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { auth, googleProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword } from '../firebase'

const LoginScreen = ({ onSuccess }) => {
    const [isSignUp, setIsSignUp] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleEmail = async () => {
        setError('')
        if (!email || !password) return setError('Please fill in all fields.')
        if (isSignUp && password !== confirmPassword) return setError('Passwords do not match.')
        if (password.length < 6) return setError('Password must be at least 6 characters.')
        setLoading(true)
        try {
            if (isSignUp) {
                await createUserWithEmailAndPassword(auth, email, password)
            } else {
                await signInWithEmailAndPassword(auth, email, password)
            }
            onSuccess()
        } catch (err) {
            const code = err.code
            if (code === 'auth/user-not-found') setError('No account found. Please sign up first.')
            else if (code === 'auth/wrong-password' || code === 'auth/invalid-credential') setError('Invalid email or password.')
            else if (code === 'auth/email-already-in-use') setError('This email is already registered. Try signing in.')
            else if (code === 'auth/invalid-email') setError('Please enter a valid email address.')
            else setError(err.message)
        }
        setLoading(false)
    }

    const handleGoogle = async () => {
        setError('')
        setLoading(true)
        try {
            await signInWithPopup(auth, googleProvider)
            onSuccess()
        } catch (err) {
            if (err.code !== 'auth/popup-closed-by-user') setError('Google sign-in failed. Please try again.')
        }
        setLoading(false)
    }

    return (
        <Box sx={{
            minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'linear-gradient(135deg, #f8f0ff 0%, #e8daf8 30%, #d4c5f0 60%, #faf8ff 100%)',
            p: 2
        }}>
            {/* Decorative circles */}
            <Box sx={{ position: 'fixed', top: -120, right: -120, width: 400, height: 400, borderRadius: '50%', bgcolor: 'rgba(187,134,252,0.08)' }} />
            <Box sx={{ position: 'fixed', bottom: -80, left: -80, width: 300, height: 300, borderRadius: '50%', bgcolor: 'rgba(224,64,251,0.06)' }} />

            <Paper elevation={0} sx={{
                width: '100%', maxWidth: 440, borderRadius: '32px', p: { xs: 4, sm: 5 },
                bgcolor: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(20px)',
                boxShadow: '0 30px 80px rgba(187,134,252,0.12), 0 8px 32px rgba(0,0,0,0.04)',
                position: 'relative', zIndex: 1
            }}>
                {/* Logo */}
                <Box sx={{ textAlign: 'center', mb: 4 }}>
                    <Box sx={{
                        width: 56, height: 56, borderRadius: '50%', bgcolor: '#bb86fc', mx: 'auto', mb: 2,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        boxShadow: '0 8px 24px rgba(187,134,252,0.3)'
                    }}>
                        <Typography sx={{ color: 'white', fontSize: '1.5rem', fontWeight: 800 }}>◆</Typography>
                    </Box>
                    <Typography sx={{ fontWeight: 900, fontSize: '1.6rem', color: '#1a1a1a', letterSpacing: '-0.5px', fontFamily: '"Outfit", sans-serif' }}>
                        Welcome to MIMO
                    </Typography>
                    <Typography sx={{ color: '#999', fontSize: '0.9rem', mt: 0.5 }}>
                        {isSignUp ? 'Create your account to begin' : 'Your AI companion is waiting for you'}
                    </Typography>
                </Box>

                {error && <Alert severity="error" sx={{ mb: 3, borderRadius: '12px', fontSize: '0.85rem' }}>{error}</Alert>}

                {/* Google Sign-in */}
                <Button fullWidth onClick={handleGoogle} disabled={loading} sx={{
                    border: '1px solid #e8e8e8', borderRadius: '14px', py: 1.5, textTransform: 'none',
                    fontWeight: 700, fontSize: '0.9rem', color: '#333', bgcolor: 'white', mb: 2.5,
                    display: 'flex', gap: 1.5, '&:hover': { bgcolor: '#faf8ff', borderColor: '#bb86fc' }
                }}>
                    <svg width="20" height="20" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" /><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" /><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" /><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" /></svg>
                    Continue with Google
                </Button>

                {/* Divider */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2.5 }}>
                    <Box sx={{ flex: 1, height: '1px', bgcolor: '#f0f0f0' }} />
                    <Typography sx={{ fontSize: '0.75rem', color: '#ccc', fontWeight: 600 }}>OR</Typography>
                    <Box sx={{ flex: 1, height: '1px', bgcolor: '#f0f0f0' }} />
                </Box>

                {/* Email & Password */}
                <Box sx={{ mb: 2 }}>
                    <Typography sx={{ fontSize: '0.78rem', fontWeight: 700, color: '#888', mb: 0.8 }}>EMAIL</Typography>
                    <TextField fullWidth value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com"
                        type="email" variant="outlined" size="small"
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px', bgcolor: '#faf8ff', '& fieldset': { borderColor: '#f0f0f0' }, '&:hover fieldset': { borderColor: '#dcc6ff' }, '&.Mui-focused fieldset': { borderColor: '#bb86fc' } } }} />
                </Box>

                <Box sx={{ mb: isSignUp ? 2 : 0.5 }}>
                    <Typography sx={{ fontSize: '0.78rem', fontWeight: 700, color: '#888', mb: 0.8 }}>PASSWORD</Typography>
                    <TextField fullWidth value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter your password"
                        type={showPassword ? 'text' : 'password'} variant="outlined" size="small"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton size="small" onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword ? <VisibilityOff sx={{ fontSize: 18 }} /> : <Visibility sx={{ fontSize: 18 }} />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px', bgcolor: '#faf8ff', '& fieldset': { borderColor: '#f0f0f0' }, '&:hover fieldset': { borderColor: '#dcc6ff' }, '&.Mui-focused fieldset': { borderColor: '#bb86fc' } } }} />
                </Box>

                {isSignUp && (
                    <Box sx={{ mb: 0.5 }}>
                        <Typography sx={{ fontSize: '0.78rem', fontWeight: 700, color: '#888', mb: 0.8 }}>CONFIRM PASSWORD</Typography>
                        <TextField fullWidth value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Confirm your password"
                            type="password" variant="outlined" size="small"
                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px', bgcolor: '#faf8ff', '& fieldset': { borderColor: '#f0f0f0' }, '&:hover fieldset': { borderColor: '#dcc6ff' }, '&.Mui-focused fieldset': { borderColor: '#bb86fc' } } }} />
                    </Box>
                )}

                {!isSignUp && (
                    <Box sx={{ textAlign: 'right', mb: 2.5 }}>
                        <Typography sx={{ fontSize: '0.78rem', color: '#bb86fc', fontWeight: 600, cursor: 'pointer', '&:hover': { color: '#a76ef5' } }}>Forgot password?</Typography>
                    </Box>
                )}

                {isSignUp && <Box sx={{ mb: 2.5 }} />}

                {/* Submit */}
                <Button fullWidth onClick={handleEmail} disabled={loading} sx={{
                    background: 'linear-gradient(135deg, #bb86fc, #e040fb)', color: 'white',
                    borderRadius: '14px', py: 1.5, fontWeight: 700, fontSize: '0.95rem', textTransform: 'none',
                    boxShadow: '0 8px 24px rgba(187,134,252,0.3)', mb: 3,
                    '&:hover': { background: 'linear-gradient(135deg, #a76ef5, #d500f9)' },
                    '&:disabled': { opacity: 0.7 }
                }}>
                    {loading ? <CircularProgress size={22} sx={{ color: 'white' }} /> : (isSignUp ? 'Create Account' : 'Sign In')}
                </Button>

                {/* Toggle */}
                <Typography sx={{ textAlign: 'center', fontSize: '0.85rem', color: '#999' }}>
                    {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
                    <Box component="span" onClick={() => { setIsSignUp(!isSignUp); setError('') }}
                        sx={{ color: '#bb86fc', fontWeight: 700, cursor: 'pointer', '&:hover': { color: '#a76ef5' } }}>
                        {isSignUp ? 'Sign In' : 'Sign Up'}
                    </Box>
                </Typography>
            </Paper>
        </Box>
    )
}

export default LoginScreen
