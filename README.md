# User Management API

This project is a user management API built with Node.js and Express. It provides basic functionalities like user registration, login, updating user details, password management, and user deletion. The API uses JWT authentication to secure routes.

## Features

- User registration and login with JWT-based authentication
- Protected routes using JWT middleware
- Password hashing using bcrypt
- CRUD operations for user management

## Tech Stack

- **Node.js**
- **Express**
- **JWT (JSON Web Token)**
- **bcrypt**
- **Neon database (PostgreSQL)**
- **Helmet** for security
- **CORS** for cross-origin requests

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Setup .env file with your database credentials and JWT secret key:
   ```bash
   JWT_SECRET=<your-secret-key>
   DATABASE_URL=<your-database-url>
   ```
4. Start the server:
   ```bash
   npm start
   ```

## API Endpoints

### User Registration

- **Endpoint:** `/api/users/register`
- **Method:** `POST`
- **Description:** Register a new user.
- **Request Body:**
  ```json
  {
    "username": "john_doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```
  - **Response:**
  ```json
  {
    "user_id": 5,
    "username": "john_doe",
    "email": "john@example.com",
    "passwordhash": "hashed_password"
  }
  ```

### User Login

- **Endpoint:** `/api/users/login`
- **Method:** `POST`
- **Description:** Authenticate and log in a user.
- **Request Body:**
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
  - **Response:**
  ```json
  {
    "user": {
      "user_id": 5,
      "username": "john_doe",
      "email": "john@example.com"
    },
    "token": "token_value"
  }
  ```

### Get All Users

- **Endpoint:** `/api/users`
- **Method:** `GET`
- **Headers:**

```json
{
  "Authorization": "Bearer <token>"
}
```

- **Description:** Get a list of all users.
- **Response:**

```json
[
  {
    "user_id": 5,
    "username": "john_doe",
    "email": "john@example.com"
  },
  {
    "user_id": 6,
    "username": "jane_doe",
    "email": "jane@example.com"
  }
]
```

### Get User by ID

- **Endpoint:** `/api/users/:id`
- **Method:** `GET`
- **Headers:**

```json
{
  "Authorization": "Bearer <token>"
}
```

- **Description:** Get a user by their ID.
- **Response:**

```json
{
  "user_id": 5,
  "username": "john_doe",
  "email": "john@example.com"
}
```

### Update User

- **Endpoint:** `/api/users/:id`
- **Method:** `PUT`
- **Request Body:**

```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "new_password" // Optional
}
```

- **Headers:**

```json
{
  "Authorization": "Bearer <token>"
}
```

- **Description:** Update user by ID.
- **Response:**

```json
{
  "user_id": 5,
  "username": "john_doe",
  "email": "john@example.com"
}
```

### Update User Password

- **Endpoint:** `/api/users/:id/password`
- **Method:** `PUT`
- **Request Body:**
```json
{
    "new_password": "new_password"
}
```
- **Headers:**
```json
{
    "Authorization": "Bearer <token>"
}
```
- **Description:** Update user password by ID.
- **Response:**
```json
{
    "user_id": 5,
    "username": "john_doe",
    "email": "john@example.com"
}
```

### Delete User
- **Endpoint:** `/api/users/:id`
- **Method:** `DELETE`
- **Headers:**
```json
{
    "Authorization": "Bearer <token>"
}
```
- **Description:** Delete a user by ID.
- **Response
```json
{
    "user_id": 5,
    "username": "john_doe",
    "email": "john@example.com"
}
```

### Middleware Functions
- **authMiddleware.js:** Middleware for JWT authentication.

### Error Handling
- **Description:** The API returns appropriate status codes and error messages for various scenarios.
	- 200 OK: Request was successful
	- 400 Bad Request: Invalid input or data
	- 401 Unauthorized: Missing or invalid JWT token
	- 403 Forbidden: Access denied due to missing token
	- 404 Not Found: User not found
	- 500 Internal Server Error: Server error while processing the request	•	500 Internal Server Error: Server error while processing the request