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