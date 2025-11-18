# Portfolio v0.5

Portfolio for Justin Liao — Tech Designer and Philosopher.

## 🚀 Tech Stack

- **React 19** - Modern UI library
- **TypeScript 5.9** - Type-safe JavaScript
- **Vite 7** - Lightning-fast build tool
- **React Router DOM 7** - Client-side routing with HashRouter
- **Tailwind CSS 3.4** - Utility-first CSS framework
- **ESLint 9** - Code quality and consistency

## 📁 Project Structure

```
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
```

## 🛠️ Development

### Prerequisites

- Node.js 18+ and npm
- Git

### Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/imjustinliao/Portfolio-v0.5.git
   cd Portfolio-v0.5
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```
   
   Open [http://localhost:5173](http://localhost:5173) in your browser.

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production (output in `dist/`)
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint to check code quality
- `npm run deploy` - Deploy to GitHub Pages

## 🚢 Deployment

### Option 1: Deploy to Custom Domain (justinliao.me)

#### Initial Setup

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Create CNAME file for custom domain**
   ```bash
   echo "justinliao.me" > dist/CNAME
   ```

3. **Commit and push your changes**
   ```bash
   git add .
   git commit -m "Update portfolio"
   git push origin main
   ```

4. **Deploy to GitHub Pages**
   ```bash
   npm run deploy
   ```

5. **Configure Custom Domain on GitHub**
   - Go to your repository on GitHub
   - Navigate to **Settings** > **Pages**
   - Under "Custom domain", enter: `justinliao.me`
   - Click **Save**
   - Wait for DNS check to complete

6. **Configure DNS with your domain provider**
   - Add an **A record** pointing to GitHub's IPs:
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`
   - Add a **CNAME record** for `www` pointing to `imjustinliao.github.io`

7. **Wait for propagation** (can take up to 24 hours)

#### Subsequent Deployments

After the initial setup, just run:

```bash
# 1. Make your changes to the code
# 2. Build and deploy
npm run build
echo "justinliao.me" > dist/CNAME  # Re-create CNAME
npm run deploy

# 3. Commit your source changes
git add .
git commit -m "Update portfolio"
git push origin main
```

### Option 2: Deploy to GitHub Pages (without custom domain)

If you want to deploy to `https://imjustinliao.github.io/Portfolio-v0.5` instead:

1. **Update `vite.config.ts`** - Change base to:
   ```typescript
   base: '/Portfolio-v0.5/',
   ```

2. **Deploy**
   ```bash
   npm run build
   npm run deploy
   ```

3. **Configure GitHub Pages**
   - Go to repository **Settings** > **Pages**
   - Select branch: `gh-pages`
   - Click **Save**

## 🧭 Routing

The project uses **HashRouter** for GitHub Pages compatibility:

- **Local Development**: 
  - Homepage: `http://localhost:5173/#/`
  - About: `http://localhost:5173/#/about`
  - Thinking: `http://localhost:5173/#/thinking`

- **Custom Domain (justinliao.me)**:
  - Homepage: `https://justinliao.me`
  - About: `https://justinliao.me/#/about`
  - Thinking: `https://justinliao.me/#/thinking`

### Adding New Routes

1. Create a new page component in `src/pages/`
2. Import and add the route in `src/App.tsx`:

```typescript
// src/pages/Contact.tsx
export default function Contact() {
  return <div>Contact Page</div>
}

// src/App.tsx
import Contact from './pages/Contact'

<Routes>
  <Route path="/contact" element={<Contact />} />
</Routes>
```

## 🎨 Styling with Tailwind CSS

The project uses Tailwind CSS for styling. Examples:

```typescript
// Text styling
<h1 className="text-4xl font-bold text-white">Title</h1>

// Layout
<div className="flex items-center justify-between gap-4">

// Responsive design
<div className="px-4 md:px-8 lg:px-16">

// Custom colors (defined in tailwind.config.ts)
<div className="bg-brand-background text-brand-white">
```

### Customizing Theme

Edit `tailwind.config.ts`:

```typescript
theme: {
  extend: {
    colors: {
      brand: {
        white: '#ffffff',
        accent: '#d9d9d9',
        background: '#000c2c',
      },
    },
  },
}
```

## 🐛 Troubleshooting

### Dev server won't start?
```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Build fails?
- Check for TypeScript errors: `npm run build`
- Run linter: `npm run lint`

### Images not loading?
- Ensure files are in the `public/` folder
- Use absolute paths: `/background.png`, `/UI/logo.svg`
- Check file name casing (case-sensitive on servers)

## 📝 License

ISC

## 👤 Author

Justin Liao
- GitHub: [@imjustinliao](https://github.com/imjustinliao)
- Website: [justinliao.me](https://justinliao.me)
- Company: [reunifylabs.com](https://reunifylabs.com)

---

Built with ⚡ Vite, ⚛️ React, and 🎨 Tailwind CSS
