# CLA Credentials Client

A minimal web application that authenticates against the CLA Credentials API and displays a user dashboard.

## Features

- **Login Form**: Email and password authentication with client-side validation
- **Dashboard**: Displays user information and university details
- **Session Management**: Persists authentication across browser refreshes using sessionStorage
- **Protected Routing**: Redirects unauthenticated users to login
- **Logout Functionality**: Properly clears session and calls logout API
- **Responsive Design**: Works on desktop and mobile devices
- **Debug Panel**: Collapsible panel showing raw user JSON data

## Tech Stack

- **Framework**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: Custom implementation with sessionStorage

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm run dev
   ```

3. **Open the application**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## Test Credentials

- **Email**: test.user@test.edu.gh
- **Password**: Password@1

## API Integration

- **Base URL**: https://api.clacredentials.com
- **Login**: POST /api/v1/login
- **Logout**: DELETE /api/v1/logout

## Project Structure

```
src/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── AuthProvider.tsx
│   ├── Dashboard.tsx
│   └── LoginForm.tsx
├── types/
│   └── auth.ts
└── utils/
    └── auth.ts
```

## Features Implemented

✅ Client-side form validation (required fields, email format)  
✅ API authentication with error handling  
✅ Secure session storage  
✅ Session persistence across refreshes  
✅ Protected routing  
✅ User information display  
✅ University card with clickable website link  
✅ Responsive layout  
✅ Debug panel with raw JSON  
✅ Proper logout functionality  

## Security Features

- Secure token storage in sessionStorage
- Automatic session cleanup on logout
- Protected routes that redirect to login
- Input validation and sanitization