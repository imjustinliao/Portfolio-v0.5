# Portfolio v0.5

This project is a personal portfolio website designed to showcase my work and philosophy. It consists of three main sections: Home, About, and Thinking. I designed the entire interface from scratch in Figma and coded it using React, TypeScript, Vite, and Tailwind CSS.

I integrated Google Analytics for tracking and Formspree for handling form submissions. The site features advanced animations and sound effects, including background music and interactive audio elements, to create an immersive experience. I also designed a changeable theme system and a custom clock and timer that functions seamlessly within the application.

## Project Structure

/
├── public/              # Static assets (served as-is)
│   ├── background.png   # Background image
│   └── UI/             # UI assets (logos, icons)
├── src/                # Source code
│   ├── components/     # Reusable UI components
│   │   └── Navbar.tsx  # Navigation component
│   ├── pages/          # Route-level page components
│   │   ├── Home.tsx    # Homepage
│   │   ├── About.tsx   # About page
│   │   └── Thinking.tsx # Thinking page
│   ├── hooks/          # Custom React hooks
│   ├── context/        # Global state providers
│   ├── assets/         # Bundled media files
│   ├── App.tsx         # Root component with routing
│   ├── main.tsx        # Application entry point
│   └── index.css       # Global styles + Tailwind
├── index.html          # HTML entry point
├── vite.config.ts      # Vite configuration
├── tailwind.config.ts  # Tailwind customization
└── tsconfig.json       # TypeScript configuration

## Development

### Prerequisites

- Node.js 18+ and npm
- Git

### Getting Started

1. Clone the repository
   ```bash
   git clone https://github.com/imjustinliao/Portfolio-v0.5.git
   cd Portfolio-v0.5
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start development server
   ```bash
   npm run dev
   ```
   
   Open http://localhost:5173 in your browser.

### Available Scripts

- npm run dev - Start development server with hot reload
- npm run build - Build for production (output in dist/)
- npm run preview - Preview production build locally
- npm run lint - Run ESLint to check code quality
- npm run deploy - Deploy to GitHub Pages

## Deployment

The project is configured to deploy to GitHub Pages.

### Quick Deploy

1. Commit and push your changes
   ```bash
   git add .
   git commit -m "Update portfolio"
   git push origin main
   ```

2. Build and deploy
   ```bash
   npm run build
   npm run deploy
   ```

3. Configure GitHub Pages
   - Go to repository Settings > Pages
   - Select branch: gh-pages, folder: / (root)
   - Click Save

The site is live at: justinliao.me

## Author

Justin Liao
- GitHub: @imjustinliao
- Website: justinliao.me
