# MIMO (Mind In Mind Out)
**AI-Powered Mental Health Support Companion**

## About the Project
MIMO is an AI-powered mental health support system designed to provide accessible, private, and immediate emotional assistance. The platform allows users to interact with an intelligent chatbot through text or voice to express their feelings and receive empathetic guidance. It analyzes user conversations using AI to detect emotional states (stress, anxiety, sadness, or burnout) and provides coping suggestions, guided relaxation techniques, and mental wellness resources. It also features a mood tracking dashboard that visualizes emotional trends over time.

## System Architecture
This project is separated into a frontend client and a backend server.
- **Frontend (`mimo-frontend`)**: React application built with Vite, utilizing Material UI and Firebase.
- **Backend (`mimo-backend`)**: Node.js and Express server with MongoDB, providing integration with AI models (Google Generative AI).

## Getting Started

Prerequisites
- Node.js installed on your machine.
- MongoDB instance (for backend).
- Firebase project configured (for frontend auth/storage).
- Google Gemini and OpenAI API keys (for AI features).

1. Installation

First, clone the repository and install the dependencies for both the frontend and backend.

**Backend Setup:**
```bash
cd mimo-backend
npm install
```

**Frontend Setup:**
```bash
cd mimo-frontend
npm install
```

2. Environment Variables (.env Files)

You will need to create `.env` files in both the frontend and backend directories.
**Do not** commit your actual `.env` files to GitHub (they are automatically ignored by our `.gitignore` configuration).

**Backend (`mimo-backend/.env`)**
Create a `.env` file in the `mimo-backend` folder with the following keys:
```env
PORT=5000
GEMINI_API_KEY=your_gemini_api_key_here
OPENAI_API_KEY=your_openai_api_key_here
```

**Frontend (`mimo-frontend/.env`)**
Create a `.env` file in the `mimo-frontend` folder with your Firebase and Backend API configuration values:
```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=mimo-ai-a136b.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=mimo-ai-a136b
VITE_FIREBASE_STORAGE_BUCKET=mimo-ai-a136b.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
VITE_API_URL=http://localhost:5000
```

 3. Running the Project

**Start the Backend Server:**
```bash
cd mimo-backend
npm start
```

**Start the Frontend App:**
```bash
cd mimo-frontend
npm run dev
```

Your application should now be accessible locally. The frontend will point to the backend API (`http://localhost:5000`) for processing AI sentiment analysis and data querying.
