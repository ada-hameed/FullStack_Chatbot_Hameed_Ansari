# DroneTV React + TypeScript Website

Converted from the supplied Udrone HTML template into a React + TypeScript + Vite website.

## Pages
- Home
- Services
- Courses & Training
- Projects
- Contact / Enquiry
- Floating DroneTV Support chatbot

## Backend integration
The enquiry form sends a POST request to:
`http://localhost:5000/api/enquiries`

You can override it with:
`VITE_API_URL=http://localhost:5000/api`

## Run
```bash
npm install
npm run dev
```

Open `http://localhost:5173`.

## Build
```bash
npm run build
```

## Notes
- The supplied template's visual direction, imagery, typography and black/yellow styling are retained.
- Template demo/WordPress branding and placeholder copy were replaced with DroneTV-specific content.
- Navigation works as client-side page navigation without requiring react-router.
- The chatbot is rule-based, as allowed by the assignment; no external AI API is required.
