# DroneTV AdminLTE Admin Dashboard

AdminLTE 4.9.1 based React + TypeScript admin dashboard for the DroneTV internship assignment.

## Features
- Real enquiry data from the existing Express API
- Total/New/In Progress/Closed statistics
- Search by name, email, or phone
- Student/Customer/Other filter
- View enquiry details
- Update enquiry status
- Delete enquiry with confirmation
- Loading, empty, and friendly error states
- Responsive AdminLTE layout

## API
The dashboard expects the existing backend at:

`http://localhost:5000/api`

Endpoints used:
- GET `/enquiries`
- GET `/enquiries/:id`
- PATCH `/enquiries/:id`
- DELETE `/enquiries/:id`

## Run
```bash
npm install
npm run dev
```

Then open the Vite URL shown in the terminal.

## Important
This package contains the AdminLTE dashboard as a standalone React/Vite frontend. Copy the `src`, `public/adminlte.css`, `public/adminlte.min.css`, `public/adminlte.min.js`, and the required project configuration into the existing frontend if you want to merge it into the main assignment project.

No backend or database changes are required.
