# Setup Instructions

## Overview

This is a full-stack example application for an AI-powered creative media platform designed for SMEs. It demonstrates:

- **Mobile-first design** (React Native)
- **REST API** (Node.js/Express)
- **AI integration patterns** (image, video, copy generation)
- **Collaboration workflows** (comments, approvals)
- **Publishing capabilities**

## Quick Start

### Backend Setup

```bash
# Install dependencies
npm install

# Start the API server
npm run dev

# Server will run on http://localhost:5000
# Test it: curl http://localhost:5000/api/health
```

### Frontend Setup (React Native with Expo)

```bash
# Install Expo CLI globally
npm install -g expo-cli

# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start Expo development server
npm start

# Choose platform:
# - Press 'i' for iOS simulator
# - Press 'a' for Android emulator
# - Press 'w' for web browser
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - Create new account

### Projects
- `GET /api/projects` - List all projects
- `GET /api/projects/:id` - Get project details
- `POST /api/projects` - Create new project

### AI Generation
- `POST /api/ai/generate-image` - Generate image
- `POST /api/ai/generate-video` - Generate video
- `POST /api/ai/generate-copy` - Generate copy

### Templates
- `GET /api/templates` - Get all templates

### Collaboration
- `POST /api/projects/:projectId/assets/:assetId/comments` - Add comment

## Project Structure

```
creative-media-app/
├── backend/
│   └── server.js           # Express API with mock endpoints
├── frontend/
│   ├── App.js              # Main navigation
│   ├── app.json            # Expo configuration
│   └── screens/
│       ├── DashboardScreen.js      # Project list
│       └── AICoCreationScreen.js   # AI generation
└── package.json            # Dependencies
```

## Features

✅ **Project Dashboard** - View all projects and quick stats
✅ **AI Co-Creation** - Generate images, videos, and copy
✅ **Collaboration** - Comments and feedback workflow
✅ **Templates** - Pre-built templates for quick starts
✅ **Mock API** - No backend setup required to start

## Next Steps

1. Create additional screens (Login, Project Detail, Publish)
2. Connect to real AI APIs (OpenAI, Replicate)
3. Add database (MongoDB/PostgreSQL)
4. Implement authentication
5. Deploy to production

## Support

For questions or issues, refer to the FEATURES.md file for detailed feature documentation.
