// Shared mood data utilities
// Uses localStorage to persist mood entries across sessions

const STORAGE_KEY = 'mimo_mood_logs'

// Mood definitions
export const MOODS = [
    { emoji: '☀️', label: 'Radiant', value: 5, color: '#ffab40' },
    { emoji: '😊', label: 'Good', value: 4, color: '#4caf50' },
    { emoji: '😐', label: 'Neutral', value: 3, color: '#bb86fc' },
    { emoji: '😞', label: 'Down', value: 2, color: '#ff9800' },
    { emoji: '😰', label: 'Awful', value: 1, color: '#ff4081' },
]

export const TAGS = ['#Work', '#Family', '#Sleep', '#Exercise', '#Health', '#Social', '#Study', '#Hobbies']

// Get all mood logs sorted by date (newest first)
export const getMoodLogs = () => {
    try {
        const raw = localStorage.getItem(STORAGE_KEY)
        return raw ? JSON.parse(raw) : []
    } catch {
        return []
    }
}

// Save a mood entry
export const saveMoodEntry = (entry) => {
    const logs = getMoodLogs()
    const newEntry = {
        id: Date.now(),
        timestamp: new Date().toISOString(),
        moodIndex: entry.moodIndex,
        moodLabel: MOODS[entry.moodIndex].label,
        moodEmoji: MOODS[entry.moodIndex].emoji,
        moodValue: MOODS[entry.moodIndex].value,
        tags: entry.tags,
        note: entry.note || '',
    }
    logs.unshift(newEntry) // add at beginning
    localStorage.setItem(STORAGE_KEY, JSON.stringify(logs))
    return newEntry
}

// Get today's entries
export const getTodayLogs = () => {
    const today = new Date().toDateString()
    return getMoodLogs().filter(l => new Date(l.timestamp).toDateString() === today)
}

// Check if user already logged today
export const hasLoggedToday = () => getTodayLogs().length > 0

// Get streak (consecutive days with at least one entry)
export const getStreak = () => {
    const logs = getMoodLogs()
    if (logs.length === 0) return 0

    const uniqueDays = [...new Set(logs.map(l => new Date(l.timestamp).toDateString()))]
    const sortedDays = uniqueDays.map(d => new Date(d)).sort((a, b) => b - a)

    let streak = 0
    const now = new Date()
    now.setHours(0, 0, 0, 0)

    for (let i = 0; i < sortedDays.length; i++) {
        const expected = new Date(now)
        expected.setDate(expected.getDate() - i)
        const dayStr = expected.toDateString()
        const logDay = sortedDays[i].toDateString()

        if (dayStr === logDay) {
            streak++
        } else {
            break
        }
    }
    return streak
}

// Get weekly chart data (last 7 days)
export const getWeeklyData = () => {
    const logs = getMoodLogs()
    const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
    const result = []

    for (let i = 6; i >= 0; i--) {
        const date = new Date()
        date.setDate(date.getDate() - i)
        const dayStr = date.toDateString()
        const dayLogs = logs.filter(l => new Date(l.timestamp).toDateString() === dayStr)

        const avgMood = dayLogs.length > 0
            ? Math.round((dayLogs.reduce((sum, l) => sum + l.moodValue, 0) / dayLogs.length) * 10) / 10
            : 0

        // Split into mood categories for the area chart
        const happyCount = dayLogs.filter(l => l.moodValue >= 4).length
        const neutralCount = dayLogs.filter(l => l.moodValue === 3).length
        const downCount = dayLogs.filter(l => l.moodValue <= 2).length

        result.push({
            day: days[date.getDay()],
            date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            avg: avgMood,
            happy: happyCount > 0 ? avgMood : 0,
            neutral: neutralCount > 0 ? avgMood * 0.8 : 0,
            peaceful: avgMood > 0 ? avgMood * 0.6 : 0,
            count: dayLogs.length
        })
    }
    return result
}

// Get mood distribution (for insights)
export const getMoodDistribution = () => {
    const logs = getMoodLogs()
    const total = logs.length || 1
    const dist = {}
    MOODS.forEach(m => { dist[m.label] = 0 })
    logs.forEach(l => { dist[l.moodLabel] = (dist[l.moodLabel] || 0) + 1 })
    const result = {}
    Object.keys(dist).forEach(k => { result[k] = Math.round((dist[k] / total) * 100) })
    return result
}

// Get most used tags
export const getTopTags = () => {
    const logs = getMoodLogs()
    const tagCounts = {}
    logs.forEach(l => {
        (l.tags || []).forEach(t => { tagCounts[t] = (tagCounts[t] || 0) + 1 })
    })
    return Object.entries(tagCounts).sort((a, b) => b[1] - a[1]).slice(0, 5)
}

// Generate AI insight based on real data
export const getAIInsight = (name) => {
    const logs = getMoodLogs()
    const streak = getStreak()
    const dist = getMoodDistribution()
    const topTags = getTopTags()
    const totalLogs = logs.length

    if (totalLogs === 0) {
        return `Welcome ${name}! Start by logging your first mood to receive personalized AI insights. The more you log, the smarter MIMO gets at understanding your emotional patterns.`
    }

    const insights = []

    // Streak insight
    if (streak >= 7) insights.push(`Amazing ${streak}-day streak! Consistency is the foundation of emotional awareness.`)
    else if (streak >= 3) insights.push(`Great ${streak}-day streak! You're building a powerful habit.`)
    else if (streak >= 1) insights.push(`You've been logging for ${streak} day(s). Keep it going to unlock deeper insights!`)

    // Mood distribution insight
    if (dist['Radiant'] + dist['Good'] > 60) insights.push(`${dist['Radiant'] + dist['Good']}% of your check-ins are positive — you're in a great emotional space.`)
    else if (dist['Down'] + dist['Awful'] > 40) insights.push(`I notice some tough days recently. Remember, it's okay to not be okay. Consider trying the breathing exercises.`)

    // Tag insight
    if (topTags.length > 0) {
        insights.push(`Your top mood factor is "${topTags[0][0]}" with ${topTags[0][1]} mentions.`)
    }

    // Total logs insight
    if (totalLogs >= 10) insights.push(`With ${totalLogs} entries, your mood pattern analysis is getting more accurate every day.`)

    return insights.length > 0 ? insights.join(' ') : `Keep logging to unlock deeper insights about your emotional patterns, ${name}.`
}

// Get weekly comparison (this week vs last week average)
export const getWeeklyComparison = () => {
    const logs = getMoodLogs()
    const now = new Date()
    const weekAgo = new Date(now)
    weekAgo.setDate(weekAgo.getDate() - 7)
    const twoWeeksAgo = new Date(now)
    twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14)

    const thisWeek = logs.filter(l => new Date(l.timestamp) >= weekAgo)
    const lastWeek = logs.filter(l => new Date(l.timestamp) >= twoWeeksAgo && new Date(l.timestamp) < weekAgo)

    const thisAvg = thisWeek.length > 0 ? thisWeek.reduce((s, l) => s + l.moodValue, 0) / thisWeek.length : 0
    const lastAvg = lastWeek.length > 0 ? lastWeek.reduce((s, l) => s + l.moodValue, 0) / lastWeek.length : 0

    const change = lastAvg > 0 ? Math.round(((thisAvg - lastAvg) / lastAvg) * 100) : 0
    return { thisAvg: Math.round(thisAvg * 10) / 10, lastAvg: Math.round(lastAvg * 10) / 10, change }
}

// Clear all data
export const clearAllData = () => {
    localStorage.removeItem(STORAGE_KEY)
}
