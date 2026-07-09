# QA Portfolio

A dusk-rooftop themed QA/testing portfolio, built with React + Vite.

## Run it locally

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually http://localhost:5173).

## Build for production

```bash
npm run build
```

This outputs a static `dist/` folder you can deploy anywhere (Vercel, Netlify, GitHub Pages, etc).

## Where to edit your content

Everything you need to personalize lives at the top of `src/App.jsx`:

- `PROFILE` — your name, role, tagline, contact emails
- `ABOUT` — your bio + the "test log" skills list
- `EXPERIENCE` — your work history cards
- `PROJECTS` — your GitHub projects (title, description, tags, status, links)

Search for `PLACEHOLDER` comments in `src/App.jsx` for the two spots that need real assets:

1. **Avatar** — set `PROFILE.avatarUrl` to your image path (e.g. `"/avatar.png"`), and drop the file into `public/avatar.png`. It fills the circle perfectly on its own (`object-fit: cover`) — no matter the image's original shape or size. Leave it as `""` to keep the placeholder text.
2. **Company logos** — each entry in `EXPERIENCE` has a `logoUrl` field. Set it to your logo's path (e.g. `"/logos/company-one.png"`) and drop the file into `public/logos/`. It sits on a light badge and fits inside without cropping (`object-fit: contain`), so square or wide logos both look right. Leave it as `""` to keep the initials fallback.
3. **Project screenshots** — inside each project card's `.qp-card-media`, swap the placeholder `<span>` for `<img src="..." alt={p.title} />`.

## Notes

- Fonts (Big Shoulders Display, IBM Plex Sans, IBM Plex Mono) load from Google Fonts via `@import` in `App.jsx`.
- The hero scene is hand-drawn SVG (no external image), with mouse-parallax and a clickable rooftop figure that pops up a random QA one-liner.
- Respects `prefers-reduced-motion`.
