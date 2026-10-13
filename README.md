# Ajeet Rawat — Portfolio

A personal portfolio for **Ajeet Rawat**, a Computer Science student focused on AI/ML, software engineering, and product design.

**Live site:** [ajeetrawat.me](https://ajeetrawat.me)

## Features

- Responsive portfolio with animated visuals and 3D navigation buttons
- Light and dark themes
- Project, skills, education, experience, and certification details from Ajeet’s resume
- **Remi**, a chat-style assistant that answers from a curated set of resume-based responses
- No AI provider or API key is required for Remi

## Site files

The published site lives in `portfolio/`:

- `portfolio/index.html` — page content and metadata
- `portfolio/style.css` — layout, themes, and motion
- `portfolio/main.js` — interactions and resume-based Remi responses
- `portfolio/CNAME` — custom domain for GitHub Pages

The repository also contains the original Vite/React source in `src/`. GitHub Pages currently publishes the static site from `portfolio/`.

## Update the portfolio

Edit the files in `portfolio/` and push the changes to `main`. The GitHub Actions workflow at `.github/workflows/deploy.yml` publishes that folder to GitHub Pages automatically.

To change Remi’s answers, edit the `remiAnswers` entries in `portfolio/main.js`. Keep them grounded in the resume and public portfolio information.

## Local preview

Open `portfolio/index.html` in a browser, or serve the `portfolio/` directory with any static file server.

## Contact

- Email: [rawatajeet287@gmail.com](mailto:rawatajeet287@gmail.com)
- GitHub: [AjeetRawat2](https://github.com/AjeetRawat2)
- Location: Gurugram, Haryana, India
