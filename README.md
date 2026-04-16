# InternAdda – Backend

## Overview
This is the backend for InternAdda, a platform for managing internships, applications, and recommendations.
Built using Node.js, Express, and MongoDB.

## Features
- Authentication (JWT-based)
- Role-based access (Admin/User)
- Internship CRUD operations
- Apply & Save internships
- AI-lite recommendation system (TF-IDF)

## Tech Stack
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Natural (for recommendations)

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com
   cd internshipHub-backend
2. **Install dependencies**
   ```bash
   npm install
3. **Configure Environment Variables**
- Create a .env file in the root directory and add the following:
  ```bash
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
5. **Start the server**
   ```bash
   # For development (with nodemon)
   npm run dev
