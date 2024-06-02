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

### Docker Configuration

**Dockerfile**:
```dockerfile
FROM python:3.10-slim

# Set the working directory
WORKDIR /app

# Copy the requirements file
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code
COPY . .

# Set environment variables
ENV FLASK_APP=wsgi.py
ENV FLASK_RUN_HOST=0.0.0.0

# Expose the port
EXPOSE 5000

# Command to run the application
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "wsgi:app"]
```

**docker-compose.yml**:
```yaml
version: '3.9'

services:
  nest_api:
    build:
      context: ./server
      dockerfile: Dockerfile
    container_name: nest_api
    working_dir: /app
    ports:
      - "4000:4000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://myuser:mypassword@postgres:5432/mydatabase
      - FLASK_SERVICE_URL=http://flask_service:5000/summarize
    depends_on:
      - postgres
      - flask_service

  flask_service:
    build:
      context: ./services/flask-summarizer
      dockerfile: Dockerfile
    container_name: flask_service
    working_dir: /app
    ports:
      - "5000:5000"
    environment:
      - FLASK_ENV=production
      - DATABASE_URL=postgresql://myuser:mypassword@postgres:5432/mydatabase
    depends_on:
      - postgres
    command: ["gunicorn", "--bind", "0.0.0.0:5000", "wsgi:app"]

  postgres:
    image: postgres:13
    container_name: postgres
    environment:
      POSTGRES_USER: myuser
      POSTGRES_PASSWORD: mypassword
      POSTGRES_DB: mydatabase
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  prisma_migrate:
    image: node:18
    container_name: prisma_migrate
    working_dir: /app
    volumes:
      - ./server:/app
    environment:
      - DATABASE_URL=postgresql://myuser:mypassword@postgres:5432/mydatabase
    depends_on:
      - postgres
    command: ["npx", "prisma", "migrate", "deploy"]

volumes:
  postgres_data:


```

## Running Tests

To run the unit tests for the Flask service, use the following command:
```bash
docker-compose run --rm flask-service python -m unittest discover -s tests
```

Or running tests outside docker container:
```bash
python -m unittest discover -s tests
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