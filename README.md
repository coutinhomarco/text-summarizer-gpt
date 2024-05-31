# Text Summarizer Project

This project consists of a NestJS API that interacts with a Flask microservice for text summarization and uses PostgreSQL as the database, managed through Prisma ORM. The project is set up and managed using Docker Compose for easy deployment.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Configuration](#configuration)
4. [Running the Application](#running-the-application)
5. [API Endpoints](#api-endpoints)
6. [Database Schema](#database-schema)
7. [Flask Summarization Service](#flask-summarization-service)
8. [Running Tests](#running-tests)
9. [Development](#development)

## Request flow

![Request Flow](docs/workflow.png)


## Prerequisites

- Docker and Docker Compose
- Node.js and npm
- Prisma CLI (`npm install -g prisma`)


## Installation

1. **Clone the repository:**

   ```bash
   git clone git@github.com:coutinhomarco/text-summarizer-gpt.git
   cd text-summarizer-gpt
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
DATABASE_URL=postgresql://myuser:mypassword@postgres:5432/mydatabase
FLASK_SERVICE_URL=http://flask-service:5000
JWT_SECRET=your_jwt_secret
```

## Running the Application

1. **Start the Docker containers:**

   ```bash
   docker-compose up --build
   ```

2. **Apply Prisma Migrations:**

   ```bash
   npx prisma migrate deploy
   ```

The NestJS API will be running on `http://localhost:4000` and the Flask service will be running on `http://localhost:5000`.

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
- **DELETE /users/:id** - Delete a user by ID

## Database Schema

The database schema includes two main tables: `User` and `MessageLog`.

### User Table

| Column      | Type    | Description         |
|-------------|---------|---------------------|
| id          | Integer | Primary key         |
| username    | String  | Unique, not null    |
| password    | String  | Hashed, not null    |
| logs        | Array   | List of message logs|

### MessageLog Table

| Column      | Type    | Description         |
|-------------|---------|---------------------|
| id          | Integer | Primary key         |
| userId      | Integer | Foreign key (User)  |
| text        | String  | The message content |
| summary     | String  | The summarized text |
| createdAt   | Date    | Timestamp           |

# Flask Summarization Service

## Overview

This Flask service provides an API endpoint to summarize text using the OpenAI GPT-3.5 Turbo model. The service is designed to be a microservice within a larger application, where it receives requests from a NestJS backend API. The entire application is orchestrated using Docker Compose for ease of deployment and management.

## Features

- **Text Summarization**: Summarizes provided text using the OpenAI GPT-3.5 Turbo model.
- **Error Handling**: Handles cases where no text is provided or when an exception occurs during summarization.
- **Environment Variables**: Uses environment variables to manage sensitive information like the OpenAI API key.

## Directory Structure

```
flask-summarizer/
├── app/
│   ├── __init__.py
│   ├── routes.py
├── tests/
│   ├── test_routes.py
├── venv/
├── .env
├── .env.dev
├── config.py
├── wsgi.py
├── Dockerfile
├── requirements.txt
├── README.md
```

## Setup Instructions

### Prerequisites

- Docker and Docker Compose
- OpenAI API key

### Installation

1. **Set Up Environment Variables**:
   Create a `.env` file in the `flask-summarizer` directory with the following content:
   ```env
   OPENAI_API_KEY=your-openai-api-key
   ```

2. **Build and Run with Docker Compose**:
   Ensure Docker and Docker Compose are installed on your machine. Use the following commands to build and start the Flask service along with other services:
   ```bash
   docker-compose up --build
   ```

## Running Tests

To run the unit tests for the Flask service, use the following command:
```bash
docker-compose run --rm flask-service python -m unittest discover -s tests
```

## API Endpoints

### POST /summarize

**Description**: Summarizes the provided text using the OpenAI GPT-3.5 Turbo model.

**Request**:
- Headers: `Content-Type: application/json`
- Body:
  ```json
  {
    "text": "Your text to summarize."
  }
  ```

**Response**:
- Success (200):
  ```json
  {
    "summary": "The summarized text."
  }
  ```
- Error (400 or 500):
  ```json
  {
    "error": "Error message"
  }
  ```

## Development

### Local Development

1. **Create and Activate a Virtual Environment**:
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```

2. **Install Dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

3. **Run the Flask Application**:
   ```bash
   export FLASK_APP=wsgi.py
   flask run
   ```