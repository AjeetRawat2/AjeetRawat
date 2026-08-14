# Personal Portfolio Website

A modern, responsive personal portfolio website built with **React, TypeScript, Vite, Tailwind CSS, and Supabase**.

The website presents personal information, skills, education, certifications, experience, and social profiles through a clean, animated interface with dark/light mode support and interactive visual effects.

## ✨ Features

* 🎨 Modern responsive portfolio design
* 🌙 Dark and light theme support
* ✨ Animated particle background
* 🎬 Loading screen animation
* 📊 Dynamic statistics section
* 💻 Skills and proficiency display
* 🎓 Education timeline
* 📜 Certifications section
* 💼 Experience and project section
* 🔗 GitHub, LinkedIn, Instagram, and other social links
* 📧 Contact information
* 🗄️ Dynamic portfolio data powered by Supabase
* 📱 Fully responsive for desktop, tablet, and mobile
* ⚡ Fast development and production builds with Vite
* 🔍 Smooth reveal animations while scrolling

## 🛠️ Tech Stack

### Frontend

* **React 18**
* **TypeScript**
* **Vite**
* **Tailwind CSS**
* **Lucide React**

### Backend / Database

* **Supabase**
* Supabase JavaScript Client

### Development Tools

* ESLint
* TypeScript ESLint
* PostCSS
* Autoprefixer

## 📁 Project Structure

```text
project/
├── public/
│
├── src/
│   ├── components/
│   │   ├── Certificates.tsx
│   │   ├── Counter.tsx
│   │   ├── Education.tsx
│   │   ├── Experience.tsx
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   ├── LoadingScreen.tsx
│   │   ├── ParticleBackground.tsx
│   │   ├── Reveal.tsx
│   │   ├── SectionHeader.tsx
│   │   ├── Skills.tsx
│   │   ├── Stats.tsx
│   │   └── ThemeToggle.tsx
│   │
│   ├── lib/
│   │   ├── supabase.ts
│   │   ├── types.ts
│   │   ├── usePortfolio.ts
│   │   └── useReveal.ts
│   │
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   └── vite-env.d.ts
│
├── .bolt/
├── index.html
├── package.json
├── package-lock.json
├── vite.config.ts
├── eslint.config.js
└── ...
```

## 🗄️ Supabase Database

The portfolio retrieves its content dynamically from Supabase.

The application currently uses the following tables:

```text
profile
skills
education
certificates
experience
```

### Profile

Contains basic personal information such as:

* Name
* Professional title
* Bio
* Email
* Phone
* Location
* Profile photo
* GitHub
* LinkedIn
* Instagram
* Resume

### Skills

Stores:

* Skill name
* Category
* Proficiency
* Icon

### Education

Stores:

* Institution
* Degree
* Field
* Start date
* End date
* GPA
* Description

### Certificates

Stores:

* Certificate title
* Issuer
* Issue date
* Expiry date
* Certificate URL
* Description

### Experience

Stores:

* Position/project title
* Company
* Experience type
* Start date
* End date
* Description
* Technologies

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

* [Node.js](https://nodejs.org/)
* npm
* Git

You can verify your installation with:

```bash
node -v
npm -v
```

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
```

Move into the project directory:

```bash
cd project
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root.

Add the Supabase configuration required by the project.

Example:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Use the actual values from your Supabase project.

> **Important:** Never commit private secrets or sensitive credentials to GitHub.

### 4. Start the development server

```bash
npm run dev
```

The application will normally be available at:

```text
http://localhost:5173
```

## 📦 Available Commands

### Start development server

```bash
npm run dev
```

### Create production build

```bash
npm run build
```

### Preview production build locally

```bash
npm run preview
```

### Run ESLint

```bash
npm run lint
```

### Run TypeScript type checking

```bash
npm run typecheck
```

## 🌐 Deployment

This project can be deployed to platforms such as **Vercel**, **Netlify**, or other services that support Vite applications.

For Vercel:

1. Push the project to GitHub.
2. Import the repository into Vercel.
3. Select **Vite** as the framework if it isn't detected automatically.
4. Set the build command to:

```bash
npm run build
```

5. Set the output directory to:

```text
dist
```

6. Add the required Supabase environment variables.
7. Deploy.

After deployment, Vercel will provide a public URL for the portfolio.

## 🔐 Environment Variables

The `.env` file should remain local and should not be committed to GitHub.

Recommended `.gitignore` entries:

```gitignore
node_modules/
dist/
.env
.env.local
.env.*.local
```

If environment variables are required in production, configure them through your hosting provider's environment-variable settings.

## 🎨 Customization

Most portfolio content is managed through Supabase rather than hard-coded into the React components.

To update portfolio information:

1. Open your Supabase project.
2. Open **Table Editor**.
3. Select the relevant table.
4. Add or update the required records.
5. Refresh the portfolio website.

This allows the portfolio content to be updated without modifying the frontend code.

## 🧩 Main Components

| Component            | Purpose                               |
| -------------------- | ------------------------------------- |
| `Hero`               | Main introduction and profile section |
| `Stats`              | Portfolio statistics                  |
| `Skills`             | Displays technical skills             |
| `Education`          | Displays educational background       |
| `Certificates`       | Displays certifications               |
| `Experience`         | Displays work/project experience      |
| `Footer`             | Contact and social links              |
| `ThemeToggle`        | Dark/light theme switching            |
| `ParticleBackground` | Animated background effect            |
| `LoadingScreen`      | Initial loading animation             |
| `Reveal`             | Scroll-based reveal animation         |
| `Counter`            | Animated numerical counters           |
| `SectionHeader`      | Reusable section heading              |

## 🔄 Data Flow

The application loads portfolio information from Supabase when the application starts.

```text
React Application
       │
       ▼
usePortfolio Hook
       │
       ▼
Supabase Client
       │
       ├── profile
       ├── skills
       ├── education
       ├── certificates
       └── experience
       │
       ▼
Portfolio Components
       │
       ▼
Rendered Website
```

## 📱 Responsive Design

The website is designed to work across:

* Desktop
* Laptop
* Tablet
* Mobile devices

Tailwind CSS utility classes are used to handle responsive layouts and styling.

## 🔧 Development

The project uses the `@/` path alias for importing files from the `src` directory.

Example:

```typescript
import { Hero } from '@/components/Hero';
```

instead of:

```typescript
import { Hero } from '../../components/Hero';
```

## 📝 Future Improvements

Potential improvements include:

* [ ] Admin dashboard for managing portfolio content
* [ ] Contact form with email notifications
* [ ] Blog section
* [ ] Project showcase with live demos
* [ ] Resume download tracking
* [ ] SEO optimization
* [ ] Open Graph/social sharing metadata
* [ ] Analytics integration
* [ ] Improved accessibility
* [ ] Automated deployment pipeline

## 📄 License

This project is available for personal and educational use.

If you use this project as a base for your own portfolio, customize the content, branding, images, and personal information accordingly.

---

## 👨‍💻 Author

**Ajeet Rawat**

BTech Computer Science Engineering Student

Built with ❤️ using React, TypeScript, Vite, Tailwind CSS, and Supabase.
