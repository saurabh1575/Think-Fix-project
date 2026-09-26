# ThinkFix API Integration Guide

## Current Status

The frontend is fully functional with **mock data and dummy API calls**. This allows the UI/UX to be tested end-to-end without a backend.

## How to Switch to Real API

### 1. Set the API Base URL

Create a `.env.local` file in your project root:

\`\`\`env
NEXT_PUBLIC_API_URL=http://your-backend-api.com/api
\`\`\`

### 2. Update API Configuration

In `lib/api.ts`, change:

\`\`\`typescript
const USE_MOCK_API = false // Switch to real API
\`\`\`

### 3. Expected API Endpoints

Your backend should implement:

#### `/api/analyze-answer` (POST)
**Request:**
\`\`\`json
{
  "questionId": "q1",
  "answer": "Student's answer text",
  "image": "File (optional, multipart/form-data)"
}
\`\`\`

**Response:**
\`\`\`json
{
  "questionId": "q1",
  "questionTitle": "Projectile Motion – Time of Flight",
  "studentAnswer": "t = 2 seconds",
  "correctAnswer": "t = 4 seconds",
  "errorType": "Conceptual Error",
  "rootCause": "Description of error",
  "explanation": ["Point 1", "Point 2", "Point 3"],
  "nextSteps": ["Step 1", "Step 2"],
  "patternDetected": "Optional pattern description"
}
\`\`\`

#### `/api/student/history` (GET)
**Response:** Array of StudentAttempt objects

#### `/api/coach/analytics` (GET)
**Response:**
\`\`\`json
{
  "totalStudents": 80,
  "avgScore": 58,
  "highRiskTopics": 3,
  "atRiskStudents": 12
}
\`\`\`

### 4. Authentication

Add auth token to headers:
\`\`\`typescript
headers: {
  Authorization: `Bearer ${localStorage.getItem("thinkfix_token")}`,
}
\`\`\`

## Features Ready for Backend Integration

✅ Image upload with preview
✅ Text answer input
✅ Question selection (from mock data)
✅ Attempt history with search/filter
✅ Diagnostic feedback display
✅ Coach dashboard with analytics
✅ At-risk student list with search/filter
✅ Loading states and error handling

## Next Steps

1. Implement backend API endpoints
2. Train AI model for answer analysis
3. Create database schema for student data
4. Set up authentication system
5. Deploy backend service
6. Update `USE_MOCK_API` flag and test
