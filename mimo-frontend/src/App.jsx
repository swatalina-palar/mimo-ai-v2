import React, { useState, useEffect } from 'react'
import { auth, onAuthStateChanged, signOut } from './firebase'
import LandingPage from './components/LandingPage'
import LoginScreen from './components/LoginScreen'
import ChatInterface from './components/ChatInterface'
import Dashboard from './components/Dashboard'
import UserInsightsDashboard from './components/UserInsightsDashboard'
import SettingsScreen from './components/SettingsScreen'
import ResourcesPage from './components/ResourcesPage'
import HowItWorksPage from './components/HowItWorksPage'
import FeaturesPage from './components/FeaturesPage'

function App() {
    const [screen, setScreen] = useState('landing')
    const [user, setUser] = useState(null)
    const [authChecked, setAuthChecked] = useState(false)

    // Listen to Firebase auth state
    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (firebaseUser) => {
            setUser(firebaseUser)
            setAuthChecked(true)
            // If user just logged in and still on login screen, go to insights
            if (firebaseUser && screen === 'login') {
                setScreen('insights')
            }
        })
        return () => unsub()
    }, [screen])

    const navigateTo = (scr) => {
        // If user is already logged in and tries to go to login, go to insights instead
        if (scr === 'login' && user) {
            setScreen('insights')
            return
        }
        // If navigating to protected screens, require auth
        const protectedScreens = ['chat', 'dashboard', 'insights', 'settings', 'resources']
        if (protectedScreens.includes(scr) && !user) {
            setScreen('login')
            return
        }
        setScreen(scr)
    }

    const handleLogout = async () => {
        await signOut(auth)
        setUser(null)
        setScreen('landing')
    }

    const handleLoginSuccess = () => {
        setScreen('insights')
    }

    // Loading state while checking auth
    if (!authChecked) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#faf8ff' }}>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#bb86fc', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', boxShadow: '0 8px 24px rgba(187,134,252,0.3)' }}>
                        <span style={{ color: 'white', fontSize: '1.5rem', fontWeight: 800 }}>◆</span>
                    </div>
                    <p style={{ color: '#bb86fc', fontWeight: 700, fontFamily: 'Outfit, sans-serif', fontSize: '1.2rem' }}>MIMO</p>
                </div>
            </div>
        )
    }

    return (
        <div className="App">
            {screen === 'landing' && <LandingPage onNavigate={navigateTo} />}
            {screen === 'login' && <LoginScreen onSuccess={handleLoginSuccess} />}
            {screen === 'chat' && <ChatInterface onBack={() => setScreen('insights')} onNavigate={navigateTo} user={user} onLogout={handleLogout} />}
            {screen === 'dashboard' && <Dashboard onBack={() => setScreen('insights')} onNavigate={navigateTo} user={user} onLogout={handleLogout} />}
            {screen === 'insights' && <UserInsightsDashboard onBack={() => setScreen('landing')} onNavigate={navigateTo} user={user} onLogout={handleLogout} />}
            {screen === 'settings' && <SettingsScreen onNavigate={navigateTo} user={user} onLogout={handleLogout} />}
            {screen === 'resources' && <ResourcesPage onNavigate={navigateTo} user={user} onLogout={handleLogout} />}
            {screen === 'howitworks' && <HowItWorksPage onNavigate={navigateTo} />}
            {screen === 'features' && <FeaturesPage onNavigate={navigateTo} />}
        </div>
    )
}

export default App
