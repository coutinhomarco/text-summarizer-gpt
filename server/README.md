# Nest API Project

This project is a Nest API that interacts with a Flask microservice for text summarization and uses PostgreSQL as the database, managed through Prisma ORM. The project uses Docker Compose for easy setup and deployment.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Configuration](#configuration)
4. [Running the Application](#running-the-application)
5. [API Endpoints](#api-endpoints)
6. [Database Schema](#database-schema)
## Prerequisites

- Docker and Docker Compose
- Node.js and npm
- Prisma CLI (`npm install -g prisma`)

## Installation

1. **Clone the repository:**

   ```bash
   git clone git@github.com:coutinhomarco/text-summarizer-gpt.git
   cd server
   ```

2. **Install dependencies:**

   ```bash
   cd server
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory and fill in the necessary environment variables. You can use the provided `.env.example` as a reference.

4. **Generate Prisma Client:**

   ```bash
   npx prisma generate
   ```

## Configuration

Make sure to configure the following environment variables in your `.env` file:

- `DATABASE_URL` - PostgreSQL connection string
- `FLASK_SERVICE_URL` - URL of the Flask microservice
- `JWT_SECRET` - Secret key for JWT authentication

Example `.env`:

```env
PORT=4000
DATABASE_URL=postgresql://user:password@localhost:5432/mydb
FLASK_SERVICE_URL=http://flask-service:5000
JWT_SECRET=your_jwt_secret
```

## Running the Application

1. **Start the Docker containers:**

   ```bash
   docker-compose up
   ```

2. **Apply Prisma Migrations:**

   ```bash
   npx prisma migrate deploy
   ```

3. **Start the Nest API:**

   ```bash
   npm run start:dev
   ```

The Nest API will be running on `http://localhost:3000`.

## Request flow
![Request Flow](../docs/workflow.png)

## API Endpoints

### Authentication

- **POST /auth/login** - Authenticate a user
- **POST /auth/register** - Register a new user

### Text Summarization

- **POST /summarize** - Summarize text using the Flask microservice

### Message Log

- **GET /summarize/logs** - Get all message logs for that user

### User Management

- **GET /users** - Get all users
- **GET /users/:id** - Get a user by ID
- **POST /users** - Create a new user
- **PUT /users/:id** - Update a user by ID
- **DELETE /users/:id** - Delete a user by ID



## Database Schema

The database schema includes two main tables: `User` and `MessageLog`.

### User Table

| Column      | Type    | Description         |
|-------------|---------|---------------------|
| id          | Integer | Primary key         |
| username    | String  | Unique, not null    |
| password    | String  | Hashed, not null    |
| logs        | Array   | Timestamp           |

### MessageLog Table

| Column      | Type    | Description         |
|-------------|---------|---------------------|
| id          | Integer | Primary key         |
| userId      | Integer | Foreign key (User)  |
| text        | String  | The message content |
| summary     | String  | The resumed text    |
| createdAt   | Date    | Timestamp           |