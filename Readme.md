# Wysa API assignment

A Node.js/Express REST API for user onboarding, question/response management, and analytics. Built with TypeScript, MongoDB (Mongoose), and JWT authentication.

## Features
- User registration and login with JWT authentication
- Onboarding questions and user responses
- Drop-off analytics per question
- Input validation with Joi

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB instance
- pnpm (or npm/yarn)

### Installation
```bash
pnpm install
```

### Environment Variables
Create a `.env` file in the root directory with:
```
MONGO_URI=your_mongodb_connection_string
PORT=4000
JWT_SECRET=your_jwt_secret
```

### Running the Server
```bash
pnpm dev
```

## HAR File Usage

A `.har` (HTTP Archive) file is included in this project to help you test and debug the API endpoints. HAR files can be imported into tools like Postman, Insomnia, or your browser's DevTools to replay, inspect, or share API requests and responses.

- **Location:** Place your HAR file in the project root folder.
- **How to use:**
  1. Open Postman or your preferred API tool.
  2. Import the HAR file.
  3. Use the pre-recorded requests to test the API endpoints as documented below.
- **Purpose:**
  - Quickly test all endpoints with real request/response examples.
  - Share API usage and debugging info with your team.
  - Reproduce and diagnose issues using actual request data.

## API Endpoints

### Auth & User

#### POST `/api/user/signup`
Register a new user.
- **Body:**
  - `firstName` (string, required)
  - `lastName` (string, required)
  - `nickName` (string, required)
  - `emailId` (string, required, email)
  - `password` (string, required, min 8 chars)
- **Response:**
  - `201 Created` with user info (no password)

#### POST `/api/user/login`
Authenticate user and get JWT token.
- **Body:**
  - `emailId` (string, required)
  - `password` (string, required)
- **Response:**
  - `200 OK` with `{ token }`

### Questions

#### GET `/questions`
Fetch all onboarding questions.
- **Response:**
  - `200 OK` with array of questions

### Responses

#### POST `/api/onboard`
Submit or update a user's answer to a question. Requires JWT auth.
- **Headers:**
  - `Authorization: Bearer <token>`
- **Body:**
  - `userId` (string, required)
  - `questionId` (string, required)
  - `answer` (string, optional)
- **Response:**
  - `200 OK` with saved response

### Analytics

#### GET `/api/stats/dropoffs`
Get drop-off stats for each question, including question text, step number, and users who dropped off.
- **Response:**
  - `200 OK` with array of:
    - `questionId`
    - `question`
    - `stepNo`
    - `dropOffs`
    - `users`: array of `{ nickName, emailId }`

## Project Structure
```
src/
  config/           # Environment config
  controllers/      # Route controllers (User, Questions, Stats)
  middleware/       # Auth middleware
  models/           # Mongoose models
  types/            # TypeScript interfaces
```

## License
MIT
