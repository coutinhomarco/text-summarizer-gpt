# Text Summarizer Client

This project is the front-end application for the Text Summarizer project. It is built with Next.js and provides a user interface for interacting with the NestJS API for text summarization. It includes user authentication, text summarization, and viewing summarization logs.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Configuration](#configuration)
4. [Running the Application](#running-the-application)
5. [Project Structure](#project-structure)
6. [Components](#components)
7. [Pages](#pages)
8. [Development](#development)

## Prerequisites

- Node.js and npm

## Installation

1. **Clone the repository:**

   ```bash
   git clone git@github.com:coutinhomarco/text-summarizer-gpt.git
   cd text-summarizer-gpt/client
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

## Configuration

Make sure to configure the following environment variables in your `.env.local` file:

- `NEXT_PUBLIC_API_URL` - URL of the NestJS API

Example `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000
```

## Running the Application

1. **Start the development server:**

   ```bash
   npm run dev
   ```

The application will be running on `http://localhost:3000`.

## Project Structure

```
client/
├── components/
│   ├── button/
│   │   └── CustomButton.tsx
│   ├── card/
│   │   ├── CustomCard.tsx
│   │   ├── CustomCardBody.tsx
│   │   └── CustomCardHeader.tsx
│   ├── chatbot/
│   │   └── Chatbot.tsx
│   ├── header/
│   │   └── Header.tsx
│   ├── input/
│   │   └── CustomInput.tsx
│   ├── messagesList/
│   │   └── MessagesList.tsx
│   └── notification/
│       └── Notification.tsx
├── context/
│   ├── authContext.tsx
│   └── useAuth.ts
├── layouts/
│   ├── layout.css
│   └── layout.tsx
├── pages/
│   ├── api/
│   ├── auth/
│   │   ├── login.tsx
│   │   └── register.tsx
│   ├── summarize/
│   ├── users/
│   ├── _app.tsx
│   └── index.tsx
├── styles/
│   └── globals.css
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

## Components

### Button

- **CustomButton.tsx**: A reusable button component.

### Card

- **CustomCard.tsx**: A reusable card component.
- **CustomCardBody.tsx**: A component for the body of the card.
- **CustomCardHeader.tsx**: A component for the header of the card.

### Chatbot

- **Chatbot.tsx**: A component for the chatbot interface.

### Header

- **Header.tsx**: A component for the header of the application.

### Input

- **CustomInput.tsx**: A reusable input component.

### MessagesList

- **MessagesList.tsx**: A component to display a list of messages.

### Notification

- **Notification.tsx**: A component to display notifications.

## Pages

### Auth

- **login.tsx**: The login page.
- **register.tsx**: The registration page.

### Summarize

- **summarize.tsx**: The page for text summarization.

### Users

- **users.tsx**: The page to manage users.

### Others

- **_app.tsx**: The custom App component to initialize pages.
- **index.tsx**: The home page.

## Development

1. **Start the development server:**

   ```bash
   npm run dev
   ```

2. **Build the application for production:**

   ```bash
   npm run build
   ```

3. **Run the production build:**

   ```bash
   npm start
   ```

4. **Lint the code:**

   ```bash
   npm run lint
   ```