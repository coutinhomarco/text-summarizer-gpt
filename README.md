# Text Summarizer Project

This project consists of a NestJS API that interacts with a Flask microservice for text summarization and uses PostgreSQL as the database, managed through Prisma ORM. The project is set up and managed using Docker Compose for easy deployment. Additionally, it includes a front-end application built with Next.js, providing a user interface for text summarization.

## Table of Contents

1. [Request Flow](#request-flow)
2. [Prerequisites](#prerequisites)
3. [Installation](#installation)
4. [Configuration](#configuration)
5. [Running the Application](#running-the-application)
6. [API Endpoints](#api-endpoints)
7. [Database Schema](#database-schema)
8. [Flask Summarization Service](#flask-summarization-service)
9. [Front End](#front-end)
10. [Running Tests](#running-tests)
11. [Development](#development)

## Request Flow

![Request Flow](docs/workflow.png)

## Prerequisites

- Docker and Docker Compose
- Node.js and npm
- Prisma CLI (`npm install -g prisma`)
- Nest CLI (`npm install -g @nestjs/cli`)
- PostgreSQL

## Installation

### Clone the repository:

```bash
git clone git@github.com:coutinhomarco/text-summarizer-gpt.git
cd text-summarizer-gpt
```

### Install dependencies (only needed if not using Docker):

```bash
cd server
npm install
```

### Set up environment variables:

Create a `.env` file in the root directory and fill in the necessary environment variables. You can use the provided `.env.dev` as a reference.

### Generate Prisma Client (only needed if not using Docker):

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

### Using Docker Compose:

1. **Start the Docker containers:**

   ```bash
   docker-compose up --build
   ```

The NestJS API will be running on `http://localhost:4000` and the Flask service will be running on `http://localhost:5000`.

### Without Docker:

#### Backend (NestJS):

1. **Navigate to the NestJS server directory:**

   ```bash
   cd server
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Set up Environment Variables:**

   Ensure that the `.env` file is correctly configured as mentioned in the Configuration section.

4. **Run NestJS Application:**

   ```bash
   npm run start:dev
   ```

#### PostgreSQL:

1. **Ensure PostgreSQL is running:**
   You can either run PostgreSQL locally or through Docker.

2. **Run Prisma Migrations:**

   ```bash
   npx prisma migrate dev
   ```

#### Flask:

1. **Create and Activate a Virtual Environment:**

   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```

2. **Install Dependencies:**

   ```bash
   pip install -r requirements.txt
   ```

3. **Run the Flask Application:**

   ```bash
   export FLASK_APP=wsgi.py
   flask run
   ```

#### Front-End (Next.js):

1. **Navigate to the front-end directory:**

   ```bash
   cd client
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Ensure that the `.env.local` file is correctly configured as mentioned in the Configuration section.

4. **Run the Next.js Application:**

   ```bash
   npm run dev
   ```

The front-end application will be running on `http://localhost:3000`.

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

## Flask Summarization Service

### Overview

This Flask service provides an API endpoint to summarize text using the OpenAI GPT-3.5 Turbo model. The service is designed to be a microservice within a larger application, where it receives requests from a NestJS backend API. The entire application is orchestrated using Docker Compose for ease of deployment and management.

### Features

- **Text Summarization**: Summarizes provided text using the OpenAI GPT-3.5 Turbo model.
- **Error Handling**: Handles cases where no text is provided or when an exception occurs during summarization.
- **Environment Variables**: Uses environment variables to manage sensitive information like the OpenAI API key.

### Directory Structure

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

### Setup Instructions

#### Prerequisites

- Docker and Docker Compose
- OpenAI API key

#### Installation

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

### Inside Docker Container:

To run the unit tests for the Flask service, use the following command:
```bash
docker-compose run --rm flask-service python -m unittest discover -s tests
```
To run tests for NestJS:
```bash
docker-compose run --rm nest_api_test
```

### Outside Docker Container:

For Flask:
```bash
python -m unittest discover -s tests
```
For Next.js or NestJS:
```bash
npm run test
```

## Front End

### Overview

The front-end application is built with Next.js and provides a user interface for interacting with the NestJS API for text summarization. It includes user authentication, text summarization, and viewing summarization logs.

### Directory Structure

```
client/
├── components/
│   ├── button/
│   ├── card/
│   ├── chatbot/
│   ├── header/
│   ├── input/
│   ├── messagesList/
│   ├── notification/
├── context/
│   ├── authContext.tsx
│   ├── useAuth.ts
├── layouts/
│   ├── layout.css
│   ├── layout.tsx
├── pages/
│   ├── api/
│   ├── auth/
│   ├── summarize/
│   ├── users/
│   ├── login/
│   ├── register/
│   ├── _app.tsx
│   ├── index.tsx
├── styles/
│   ├── globals.css
├── .env
├── .env.local
├── .env.dev
├── .eslintrc.json
├── .gitignore
├── favicon.ico
├── next-env.d.ts
├── next.config.js
├── package.json
```

### Installation

1. **Navigate to the front-end directory:**

   ```bash
   cd client
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env

.local` file in the `client` directory and fill in the necessary environment variables. You can use the provided `.env.dev` as a reference.

### Configuration

Make sure to configure the following environment variables in your `.env.local` file:

- `NEXT_PUBLIC_API_URL` - URL of the NestJS API

Example `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000
```

### Running the Application

1. **Start the development server:**

   ```bash
   npm run dev
   ```

The front-end application will be running on `http://localhost:3000`.

## Development

### Local Development for Backend (NestJS)

1. **Navigate to the NestJS server directory**:
   ```bash
   cd server
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Set up Environment Variables**:
   Ensure that the `.env` file is correctly configured as mentioned in the Configuration section.

4. **Run NestJS Application**:
   ```bash
   npm run start:dev
   ```

### Local Development for PostgreSQL

1. **Ensure PostgreSQL is running**:
   You can either run PostgreSQL locally or through Docker.

2. **Run Prisma Migrations**:
   ```bash
   npx prisma migrate dev
   ```

### Local Development for Flask

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

### Local Development for Front-End (Next.js)

1. **Navigate to the front-end directory**:
  

 ```bash
   cd client
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Ensure that the `.env.local` file is correctly configured as mentioned in the Configuration section.

4. **Run the Next.js Application**:
   ```bash
   npm run dev
   ```

The front-end application will be running on `http://localhost:3000`.

### Final Notes

By following these instructions, you should be able to set up, run, and develop the Text Summarizer Project both locally and using Docker. Make sure to configure all environment variables correctly to ensure smooth operation of the services. If you encounter any issues or have any questions, please refer to the documentation or open an issue on the project's GitHub repository.