// Backend API Server
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Mock Database
const mockUsers = [
  {
    id: 1,
    name: 'Sarah Chen',
    email: 'sarah@smebiz.com',
    company: 'Creative Solutions Ltd',
    role: 'Marketing Manager',
    avatar: 'https://i.pravatar.cc/150?img=1'
  }
];

const mockProjects = [
  {
    id: 1,
    userId: 1,
    title: 'Summer Campaign - Social Media Pack',
    description: 'Need 10 Instagram posts and 5 TikTok videos for summer product launch',
    mediaType: ['images', 'videos'],
    status: 'in-progress',
    aiSuggestions: {
      style: 'Modern, vibrant, professional',
      tone: 'Energetic, friendly',
      colors: ['#FF6B6B', '#4ECDC4', '#FFE66D']
    },
    createdAt: new Date('2026-06-01'),
    deadline: new Date('2026-06-20'),
    assets: [
      {
        id: 1,
        type: 'image',
        title: 'Social Media Carousel - Post 1',
        status: 'approved',
        url: 'https://via.placeholder.com/1080x1350?text=Social+Post+1',
        aiGenerated: true,
        comments: []
      },
      {
        id: 2,
        type: 'image',
        title: 'Social Media Carousel - Post 2',
        status: 'in-review',
        url: 'https://via.placeholder.com/1080x1350?text=Social+Post+2',
        aiGenerated: true,
        comments: [
          {
            author: 'Sarah Chen',
            text: 'Can we adjust the color palette to match our brand more closely?',
            timestamp: new Date()
          }
        ]
      }
    ]
  },
  {
    id: 2,
    userId: 1,
    title: 'Product Demo Video',
    description: 'Create a 30-second product demo video showcasing our new software features',
    mediaType: ['videos'],
    status: 'draft',
    aiSuggestions: {
      style: 'Professional, tech-forward',
      tone: 'Confident, informative',
      format: 'Vertical video (for social)'
    },
    createdAt: new Date('2026-06-05'),
    deadline: new Date('2026-06-25'),
    assets: []
  }
];

const mockTemplates = [
  {
    id: 1,
    name: 'Instagram Story',
    category: 'Social Media',
    size: '1080x1920',
    description: 'Perfect for Instagram Stories',
    thumbnail: 'https://via.placeholder.com/200x300?text=Story+Template'
  },
  {
    id: 2,
    name: 'LinkedIn Article Cover',
    category: 'Professional',
    size: '1200x628',
    description: 'Ideal for LinkedIn articles',
    thumbnail: 'https://via.placeholder.com/200x300?text=LinkedIn+Template'
  },
  {
    id: 3,
    name: 'YouTube Thumbnail',
    category: 'Video',
    size: '1280x720',
    description: 'Eye-catching YouTube thumbnail',
    thumbnail: 'https://via.placeholder.com/200x300?text=YouTube+Thumbnail'
  }
];

// Routes

// Auth Routes (Mock)
app.post('/api/auth/login', (req, res) => {
  res.json({
    success: true,
    user: mockUsers[0],
    token: 'mock-jwt-token-12345'
  });
});

app.post('/api/auth/register', (req, res) => {
  const { email, name, company } = req.body;
  const newUser = {
    id: mockUsers.length + 1,
    email,
    name,
    company,
    role: 'Creator',
    avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`
  };
  mockUsers.push(newUser);
  res.json({ success: true, user: newUser, token: 'mock-jwt-token-new' });
});

// Project Routes
app.get('/api/projects', (req, res) => {
  res.json(mockProjects);
});

app.get('/api/projects/:id', (req, res) => {
  const project = mockProjects.find(p => p.id === parseInt(req.params.id));
  res.json(project || { error: 'Project not found' });
});

app.post('/api/projects', (req, res) => {
  const newProject = {
    id: mockProjects.length + 1,
    userId: 1,
    ...req.body,
    status: 'draft',
    createdAt: new Date(),
    assets: [],
    aiSuggestions: {
      style: 'Modern and professional',
      tone: 'Engaging',
      colors: ['#3498DB', '#2ECC71', '#E74C3C']
    }
  };
  mockProjects.push(newProject);
  res.json({ success: true, project: newProject });
});

// AI Generation Routes (Mock)
app.post('/api/ai/generate-image', (req, res) => {
  const { prompt, style } = req.body;
  res.json({
    success: true,
    image: {
      id: Math.random().toString(36).substr(2, 9),
      url: `https://via.placeholder.com/1080x1350?text=AI+Generated+${Date.now()}`,
      prompt,
      style,
      timestamp: new Date()
    }
  });
});

app.post('/api/ai/generate-video', (req, res) => {
  const { script, style, duration } = req.body;
  res.json({
    success: true,
    video: {
      id: Math.random().toString(36).substr(2, 9),
      url: 'https://via.placeholder.com/1280x720?text=AI+Generated+Video',
      thumbnail: 'https://via.placeholder.com/640x360?text=Video+Thumbnail',
      script,
      style,
      duration,
      status: 'processing',
      timestamp: new Date()
    }
  });
});

app.post('/api/ai/generate-copy', (req, res) => {
  const { brief, tone, maxLength } = req.body;
  const copies = [
    'Unleash your creative potential with our AI-powered platform.',
    'Transform your vision into stunning digital content effortlessly.',
    'Professional media creation has never been easier or faster.',
    'Your brand deserves premium creative content. Let AI help.'
  ];
  res.json({
    success: true,
    copy: copies[Math.floor(Math.random() * copies.length)],
    tone,
    brief
  });
});

// Templates Route
app.get('/api/templates', (req, res) => {
  res.json(mockTemplates);
});

// Comments/Collaboration Routes
app.post('/api/projects/:projectId/assets/:assetId/comments', (req, res) => {
  const { projectId, assetId } = req.params;
  const { text, author } = req.body;
  
  const project = mockProjects.find(p => p.id === parseInt(projectId));
  if (project) {
    const asset = project.assets.find(a => a.id === parseInt(assetId));
    if (asset) {
      asset.comments.push({
        author,
        text,
        timestamp: new Date()
      });
    }
  }
  
  res.json({ success: true, comment: { author, text, timestamp: new Date() } });
});

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'API is running', timestamp: new Date() });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`API Health: http://localhost:${PORT}/api/health`);
});
