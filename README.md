# DroneTV AI Support & Lead Assistant

A full-stack web application developed as a Full Stack Developer Intern technical assignment for DroneTV.

The application provides a responsive DroneTV website, chatbot support for common service and course-related questions, an enquiry form, REST APIs, PostgreSQL database integration, and an admin dashboard for managing enquiries.

---

## Tech Stack

### Frontend

- React.js
- TypeScript
- HTML5
- CSS3
- Bootstrap
- Vite

### Backend

- Node.js
- Express.js
- REST API
- CORS

### Database

- PostgreSQL
## Database Setup

The project uses PostgreSQL for storing enquiries.

### 1. Install PostgreSQL

Install PostgreSQL on your local machine.

### 2. Create the Database

Create a PostgreSQL database named:

```text
dronetv_support

Create the Enquiries Table

Run the database.sql file included in the project.

This will create the enquiries table and required constraints.

Configure Environment Variables

Create a .env file inside the backend folder:

PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=dronetv_support
DB_USER=postgres
DB_PASSWORD=
GROQ_API_KEY=groq_api_key
GROQ_MODEL=openai/gpt-oss-20b

Start the Backend
cd backend
npm install
node src/server.js

The backend will run on:
http://localhost:5000

### AI / Chatbot

- Groq API
- OpenAI GPT-OSS 20B model

### Development Tools

- Visual Studio Code
- Git
- GitHub
- Postman

---

## Features

### Public Website

- Responsive DroneTV website
- Home page
- Services page
- Courses / Training page
- Projects page
- Contact page
- Responsive navigation
- Mobile-friendly layout

### Chatbot

- DroneTV service-related questions
- DroneTV course-related questions
- Contact-related questions
- Quick question buttons
- Session conversation history
- Clear / reset conversation
- Fallback responses
- Make an enquiry option
- Enquiry form inside the chatbot

### Enquiry Management

- User enquiry form
- Name validation
- Email validation
- Phone validation
- User type selection
- Service / course interest selection
- Message field
- Success and error messages
- PostgreSQL data storage

### Admin Dashboard

- Admin dashboard
- View enquiries
- Search enquiries
- Filter enquiries by user type
- View complete enquiry details
- Update enquiry status
- Delete enquiries
- Status management:
  - New
  - Contacted
  - In Progress
  - Closed

---

## Project Structure

```text
FullStack_Chatbot_Hameed_Ansari/
│
├── Admin_Dashboard/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
│
├── DroneTV/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
│
├── backend/
│   ├── src/
│   ├── package.json
│   ├── .env
│   └── ...
│
├── .gitignore
└── README.md