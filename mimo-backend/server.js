const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { GoogleGenerativeAI } = require('@google/generative-ai');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// MIMO System Prompt
const MIMO_SYSTEM_PROMPT = `You are MIMO (Mind In Mind Out), an AI-powered mental health support system designed to provide accessible, private, and immediate emotional assistance. Your primary purpose is to act as a preventive mental wellness assistant. You analyze user conversations to detect emotional states, provide empathetic guidance and coping suggestions, and escalate support to professional helplines if signs of severe emotional distress are detected.

VOICE & PERSONA:
- Sound empathetic, non-judgmental, and deeply supportive.
- Project a calm and grounding presence, especially when users express anxiety or overwhelm.
- Maintain a conversational and warm tone, ensuring the user feels heard and validated.
- Be proactive in offering support without sounding clinical or robotic.
- Use gentle, validating language (e.g., "I hear you," "It's completely okay to feel that way," "Take your time").
- Keep responses concise (2-4 sentences max) so as not to overwhelm a user who might be experiencing stress or burnout.

EMOTIONAL STATE HANDLING:
- Stress: Feeling overwhelmed by external pressures. Offer breathing exercises and prioritization tips.
- Anxiety: Feelings of worry, nervousness, or unease. Offer grounding techniques and validation.
- Sadness: Feelings of sorrow or low energy. Offer validation, gentle suggestions, and positive affirmations.
- Burnout: State of emotional, physical, and mental exhaustion. Suggest rest and basic self-care.
- Neutral/Happy: Reinforce positive states and encourage continued self-care.

COPING TECHNIQUES YOU CAN SUGGEST:
- Box Breathing: Inhale 4s, Hold 4s, Exhale 4s, Hold 4s
- 4-7-8 Breathing: Inhale 4s, Hold 7s, Exhale 8s
- 5-4-3-2-1 Grounding: Name 5 things you see, 4 you touch, 3 you hear, 2 you smell, 1 you taste
- Positive Affirmations: Reminders of self-worth and resilience
- Journaling prompts: Help users express thoughts in writing

CRISIS HANDLING:
If you detect signs of severe emotional distress, self-harm ideation, or extreme hopelessness:
- Pivot immediately to safety
- Say: "I want to make sure you're safe. What you're going through sounds really difficult."
- Provide emergency resources: "Please reach out to KIRAN Helpline at 1800-599-0019 (24/7, toll-free) or text HOME to 741741."
- Do NOT attempt to be a therapist. Recommend professional help.

IMPORTANT RULES:
- Ask only ONE question at a time
- Never medically diagnose
- Frame all insights as "wellness suggestions"
- Mirror the user's language where appropriate to build rapport
- If user gives short answers like "fine" or "okay", gently probe: "No pressure, but if something is on your mind, I'm here."
- Use emoji sparingly and naturally
- Do NOT use markdown formatting like **, ##, or bullet points in responses. Write in plain conversational text.
- Keep responses warm, human-like, and conversational.`;

// Store conversation histories in memory (per session)
const conversations = new Map();

// ========== GEMINI AI ==========
async function callGemini(message, sessionId) {
    if (!conversations.has(sessionId)) {
        conversations.set(sessionId, []);
    }
    const history = conversations.get(sessionId);
    history.push({ role: 'user', parts: [{ text: message }] });

    const model = genAI.getGenerativeModel({
        model: 'gemini-2.0-flash',
        systemInstruction: MIMO_SYSTEM_PROMPT,
    });

    const chat = model.startChat({ history: history.slice(0, -1) });
    const result = await chat.sendMessage(message);
    const reply = result.response.text();

    history.push({ role: 'model', parts: [{ text: reply }] });
    if (history.length > 20) conversations.set(sessionId, history.slice(-20));

    return reply;
}

// ========== OPENAI FALLBACK ==========
async function callOpenAI(message, sessionId) {
    const openaiKey = process.env.OPENAI_API_KEY;
    if (!openaiKey) return null;

    // Build message history for OpenAI format
    if (!conversations.has(sessionId)) {
        conversations.set(sessionId, []);
    }

    const history = conversations.get(sessionId);
    const openaiMessages = [
        { role: 'system', content: MIMO_SYSTEM_PROMPT },
    ];

    // Convert existing history to OpenAI format
    for (const msg of history) {
        const role = msg.role === 'model' ? 'assistant' : 'user';
        openaiMessages.push({ role, content: msg.parts[0].text });
    }

    openaiMessages.push({ role: 'user', content: message });

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${openaiKey}`
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: openaiMessages,
            max_tokens: 300,
            temperature: 0.8,
        })
    });

    const data = await response.json();

    if (data.error) {
        console.error('OpenAI Error:', data.error.message);
        return null;
    }

    const reply = data.choices[0].message.content;

    // Store in history (Gemini format for consistency)
    history.push({ role: 'user', parts: [{ text: message }] });
    history.push({ role: 'model', parts: [{ text: reply }] });
    if (history.length > 20) conversations.set(sessionId, history.slice(-20));

    return reply;
}

// ========== SMART LOCAL FALLBACK ==========
function getLocalFallbackReply(message) {
    const lower = message.toLowerCase();

    if (/\b(suicide|kill|die|harm|end it|give up|no point|hopeless)\b/.test(lower)) {
        return "I want to make sure you're safe. Please reach out to KIRAN Helpline at 1800-599-0019 (24/7, toll-free) or text HOME to 741741. You don't have to go through this alone. I'm here with you.";
    }
    if (/\b(breath|breathing|breathe)\b/.test(lower)) {
        return "Let's do Box Breathing together. Inhale slowly for 4 seconds... Hold gently for 4 seconds... Exhale slowly for 4 seconds... Hold again for 4 seconds. Repeat this 4 times. How does that feel?";
    }
    if (/\b(ground|grounding|overwhelm|panic)\b/.test(lower)) {
        return "Let's try the 5-4-3-2-1 grounding technique. Look around and name: 5 things you see, 4 things you touch, 3 things you hear, 2 things you smell, and 1 thing you taste. This helps bring you back to the present moment.";
    }
    if (/\b(affirm|positive|motivation|encourage)\b/.test(lower)) {
        return "Remember: You are stronger than you think. Every challenge you've faced has built your resilience. You deserve kindness, especially from yourself. Take a moment to acknowledge how far you've come.";
    }
    if (/\b(anxious|anxiety|worried|worry|nervous|scared|fear)\b/.test(lower)) {
        return "Anxiety can feel really heavy, and it's okay to feel this way. Your feelings are valid. Would you like to try a quick breathing exercise to help settle your nervous system?";
    }
    if (/\b(stressed|stress|pressure|too much|burnout|exhausted)\b/.test(lower)) {
        return "It sounds like you're carrying a lot right now. What's one small thing you could do for yourself in the next 10 minutes? Even a brief walk or a glass of water can make a difference.";
    }
    if (/\b(sad|depressed|crying|lonely|alone|empty|down|unhappy)\b/.test(lower)) {
        return "I'm sorry you're feeling this way. It takes courage to acknowledge when things are tough. Would you like to talk about what's weighing on you, or would a gentle activity help?";
    }
    if (/\b(sleep|insomnia|tired|restless|can't sleep)\b/.test(lower)) {
        return "Sleep is so important for well-being. Try the 4-7-8 breathing technique before bed: inhale 4 seconds, hold 7 seconds, exhale 8 seconds. Would you like more sleep tips?";
    }
    if (/\b(work|job|boss|career|deadline|office)\b/.test(lower)) {
        return "Work pressures can really take a toll. Remember, your worth isn't defined by your productivity. What aspect of work is affecting you the most right now?";
    }
    if (/\b(happy|great|good|wonderful|amazing|grateful|better)\b/.test(lower)) {
        return "That's wonderful to hear! What made today feel good for you? Reflecting on positive moments, no matter how small, builds emotional resilience over time.";
    }
    if (/^(hi|hello|hey|hii|hyi|howdy|sup|yo)\b/.test(lower)) {
        return "Hey there! I'm glad you're here. How are you feeling today? Whether it's something big or just a small thought, I'm here to listen.";
    }
    if (/\b(thank|thanks|thx)\b/.test(lower)) {
        return "You're welcome. Reaching out and talking about how you feel is a sign of strength. I'm always here whenever you need someone to listen.";
    }

    const defaults = [
        "Thank you for sharing that. Can you tell me more about how that makes you feel?",
        "I hear you, and what you're feeling matters. Would you like to explore this further, or try a relaxation exercise?",
        "It sounds like there's a lot on your mind. Take your time. What feels most important to you right now?",
        "I appreciate you opening up. What would feel most supportive for you right now?",
        "I'm here for you. Would you like to talk more about this, or shall we try a calming exercise?"
    ];
    return defaults[Math.floor(Math.random() * defaults.length)];
}

// ========== EMOTION DETECTION ==========
function detectEmotion(message) {
    const lower = message.toLowerCase();
    if (/\b(hurt|harm|suicide|kill|die|end it|give up|no point)\b/.test(lower)) return 'crisis';
    if (/\b(anxious|anxiety|worried|panic|nervous|scared|fear)\b/.test(lower)) return 'anxiety';
    if (/\b(sad|depressed|crying|lonely|hopeless|empty|lost)\b/.test(lower)) return 'sadness';
    if (/\b(stressed|overwhelmed|pressure|burnout|exhausted|tired)\b/.test(lower)) return 'stress';
    if (/\b(angry|frustrated|furious|mad|annoyed|irritated)\b/.test(lower)) return 'anger';
    if (/\b(happy|great|good|amazing|wonderful|excited|grateful)\b/.test(lower)) return 'happy';
    return 'neutral';
}

// ========== MAIN CHAT ENDPOINT ==========
app.post('/api/chat', async (req, res) => {
    try {
        const { message, sessionId = 'default' } = req.body;

        if (!message || message.trim() === '') {
            return res.status(400).json({ error: 'Message is required' });
        }

        const emotion = detectEmotion(message);
        let reply = null;
        let source = 'gemini';

        // Try OpenAI first (primary)
        try {
            reply = await callOpenAI(message, sessionId);
            if (reply) source = 'openai';
        } catch (openaiError) {
            console.error('OpenAI failed:', openaiError.message);
        }

        // Try Gemini as fallback
        if (!reply) {
            try {
                reply = await callGemini(message, sessionId);
                source = 'gemini';
            } catch (geminiError) {
                console.error('Gemini failed:', geminiError.message);
            }
        }

        // If both AI services failed, use local fallback
        if (!reply) {
            reply = getLocalFallbackReply(message);
            source = 'local';
        }

        res.json({ reply, emotion, sessionId, source });

    } catch (error) {
        console.error('Server Error:', error.message);
        res.json({
            reply: getLocalFallbackReply(req.body.message || 'hello'),
            emotion: 'neutral',
            sessionId: req.body.sessionId,
            source: 'local'
        });
    }
});

// New session endpoint
app.post('/api/chat/new-session', (req, res) => {
    const sessionId = `session_${Date.now()}`;
    conversations.set(sessionId, []);
    res.json({ sessionId });
});

// Clear session
app.delete('/api/chat/:sessionId', (req, res) => {
    conversations.delete(req.params.sessionId);
    res.json({ success: true });
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', service: 'MIMO Backend', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
    console.log(`🧠 MIMO Backend running on port ${PORT}`);
    console.log(`✅ Gemini AI: ${process.env.GEMINI_API_KEY ? 'configured' : 'not set'}`);
    console.log(`✅ OpenAI: ${process.env.OPENAI_API_KEY ? 'configured' : 'not set'}`);
});
