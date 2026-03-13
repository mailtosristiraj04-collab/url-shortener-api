# URL Shortener API

A production-style Node.js backend project that provides a simple URL shortening service. It demonstrates backend system design, REST API development, database persistence, and URL redirection logic.

## Features

- **Create Short URL**: Accepts a long URL and generates a short unique identifier using `nanoid`.
- **Redirect**: Navigating to the short URL automatically redirects to the original long URL.
- **Error Handling**: Centralized error handling returns proper 404 responses for invalid short IDs.

## Tech Stack

- **Platform**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **ID Generation**: nanoid
- **Environment config**: dotenv

## Project Structure

```
url-shortener-api/
│
├── config/
│   └── db.js                 # MongoDB connection logic
├── controllers/
│   └── urlController.js      # Logic for shortening URLs and redirecting
├── models/
│   └── Url.js                # URL Mongoose schema
├── routes/
│   └── urlRoutes.js          # Express routes for endpoints
│
├── .env                      # Environment variables 
├── .gitignore                # Git ignore rules
├── package.json              # App dependencies & npm scripts
├── server.js                 # Express entry point
└── README.md                 # Project documentation
```

## Getting Started

### Prerequisites
- Node.js installed
- MongoDB installed and running locally on port 27017

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Your `.env` file should look like this (already created):
   ```env
   NODE_ENV=development
   PORT=5001
   MONGO_URI=mongodb://127.0.0.1:27017/url_shortener_db
   BASE_URL=http://localhost:5001
   ```
   *Note: If you run your server on a port other than 5001, make sure to update `BASE_URL` so that the generated links use the correct port.*

3. Run the development server:
   ```bash
   npm run dev
   ```

The server should start on `http://localhost:5001` (or your configured `PORT`).

## API Documentation

### 1. Create Short URL
- **Endpoint**: `POST /api/shorten`
- **Body (JSON)**:
  ```json
  {
    "url": "https://example.com/very-long-url-that-needs-shortening"
  }
  ```
- **Response**:
  ```json
  {
    "shortUrl": "http://localhost:5001/abc123xy"
  }
  ```

### 2. Redirect to Original URL
- **Endpoint**: `GET /:shortId`
- **Example**: Make a GET request (or navigate in your browser) to `http://localhost:5001/abc123xy`.
- **Behavior**: The server will respond with a `302 Found` redirect to the original URL. If the short ID doesn't exist, it returns a `404 Not Found` error response in JSON format.
