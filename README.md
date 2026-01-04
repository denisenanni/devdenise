# DevDenise Portfolio

Personal portfolio website for Denise Nanni - Full Stack Engineer.

## Tech Stack

- **React 18** + **TypeScript**
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations

## Features

- Responsive design (mobile-first)
- Smooth scroll-triggered animations
- **Working contact form** - Submits to Google Apps Script for email notifications
- Downloadable resume PDF

## Sections

- **Home** - Hero introduction
- **About** - Bio and tech stack
- **Resume** - Work experience, certifications, education
- **Contact** - Contact form with validation

## Getting Started

```bash
# Install dependencies
yarn

# Start dev server
yarn dev

# Build for production
yarn build
```

## Environment Variables

Create a `.env` file in the root:

```
VITE_GOOGLE_SCRIPT_URL=your_google_apps_script_url
```

The contact form sends submissions to a Google Apps Script web app. Set up your own script to handle form data and forward it to your email.

## License

MIT
