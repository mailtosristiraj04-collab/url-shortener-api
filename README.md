# URL Shortener API

This project is a simple backend service that converts long URLs into short links.
When a user visits the short link, the server redirects them to the original URL.

The goal of this project was to practice backend API development, URL mapping logic, and database persistence using Node.js and MongoDB.

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- nanoid

## Features

- Generate short URLs for long links
- Store URL mappings in MongoDB
- Redirect users from the short URL to the original URL
- Simple REST API architecture


## Project Structure

```
url-shortener-api
│
├── config/
│   └── db.js
├── controllers/
│   └── urlController.js
├── models/
│   └── Url.js
├── routes/
│   └── urlRoutes.js
│
├── .env
├── package.json
├── server.js
└── README.md     
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
   
3. Run the development server:
   ```bash
   npm run dev
   ```

The server should start on `http://localhost:5001` (or your configured `PORT`).

## API Endpoints

| Method | Endpoint | Description |
|------|------|-------------|
| POST | /api/shorten | Generate a short URL |
| GET | /:shortId | Redirect to the original URL |

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

## Learning Objectives

This project helped practice:

- Building REST APIs with Express.js
- Generating unique IDs using nanoid
- Designing database schemas in MongoDB
- Implementing URL redirection logic
