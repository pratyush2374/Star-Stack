# Star Stack 🌟

Star Stack is a web application that enables business owners to manage their Google Business reviews efficiently. The application provides a centralized dashboard where users can log in with their Google Business account to view and respond to their business reviews.

## Demo 🎥

Check out the application demo: [Watch Demo Video](https://drive.google.com/file/d/1tCePL48YXjh8cFtwCB24uNz_3QBueWTl/view?usp=sharing)

The demo showcases the application's key features and user interface. Watch it to get a quick overview of it

## Note on Google Business API
Currently, the application uses dummy data for demonstration purposes as the Google Business API is not available. The structure remains in place to integrate the real API when access is granted.

## Project Structure 📁

The project consists of two main components:
- **Client**: A Vite React application
- **Server**: An Express.js backend server

### Client Setup 🖥️

The client is built using Vite and React, providing a modern and efficient development experience.

```bash
# Navigate to client directory
cd client

# Install dependencies
npm install

# Run in development mode
npm run dev
```

The client runs on `http://localhost:3000`

#### Client Environment Variables
Create a `.env` file in the client directory:
```
VITE_BACKEND_URL=<your_backend_url>
```

### Server Setup ⚙️

The server is built with Express.js, handling authentication and business logic.

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Run in development mode
npm run start
```

The server runs on `http://localhost:3001`

#### Server Environment Variables
Create a `.env` file in the server directory:
```
PORT=3001
SESSION_SECRET=your_session_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
CLIENT_URL=http://localhost:3000
DATABASE_URL=your_database_url
```

### Where to Get Environment Variables 🔑

1. **SESSION_SECRET**: Create your own secure random string
2. **GOOGLE_CLIENT_ID** & **GOOGLE_CLIENT_SECRET**: 
   - Go to [Google Cloud Console](https://console.cloud.google.com)
   - Create a new project or select an existing one
   - Enable the Google Business Profile API
   - Go to "Credentials"
   - Create OAuth 2.0 credentials
3. **DATABASE_URL**: Set up your database (MongoDB's cloud cluster recommended) and use its connection URL
4. **CLIENT_URL**: URL where your frontend is running
5. **PORT**: Can be any available port (default: 3001)

## Features ✨

- Google Business Account Integration
- Review Dashboard
- Review Response Management
- Dummy Data Implementation (temporarily)

## Getting Started 🚀

1. Clone the repository
2. Set up environment variables as described above
3. Start the server
4. Start the client
5. Visit `http://localhost:3000` in your browser
