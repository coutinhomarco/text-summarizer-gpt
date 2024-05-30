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
version: '3.8'

services:
  flask-service:
    build: ./services/flask-summarizer
    ports:
      - "5000:5000"
    env_file:
      - ./services/flask-summarizer/.env
    depends_on:
      - nest-backend

  nest-backend:
    build: ./server
    ports:
      - "4000:4000"
    env_file:
      - .env
    depends_on:
      - postgres

  postgres:
    image: postgres:latest
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: your_database
    ports:
      - "5432:5432"
    volumes:
      - postgres-data:/var/lib/postgresql/data

volumes:
  postgres-data:

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