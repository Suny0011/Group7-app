// API Configuration
export const API_BASE_URL = 'http://localhost:5000/api';

export const API_ENDPOINTS = {
  // Auth
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',

  // Projects
  PROJECTS: '/projects',
  PROJECT_DETAIL: (id) => `/projects/${id}`,

  // AI Generation
  GENERATE_IMAGE: '/ai/generate-image',
  GENERATE_VIDEO: '/ai/generate-video',
  GENERATE_COPY: '/ai/generate-copy',

  // Templates
  TEMPLATES: '/templates',

  // Comments
  ADD_COMMENT: (projectId, assetId) => `/projects/${projectId}/assets/${assetId}/comments`,

  // Health
  HEALTH: '/health'
};
