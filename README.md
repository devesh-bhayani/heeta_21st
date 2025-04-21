# Birthday Surprise Website

A professional, interactive, and visually stunning birthday surprise website built with Next.js, Framer Motion, and Styled-components.

## Project Structure

```
birthday-surprise/
├── public/
│   ├── images/         # Your photos, stickers, etc.
│   ├── videos/         # Your video messages
│   └── favicon.ico
├── src/
│   ├── components/     # All React components (NavBar, Timeline, Gallery, etc.)
│   ├── sections/       # Page sections (Landing, Scrapbook, etc.)
│   ├── styles/         # Theme, global styles
│   ├── utils/          # Helper functions (e.g., for quiz logic)
│   └── pages/
│       └── index.js    # Main page
├── .gitignore
├── package.json
└── README.md
```

## How to Add/Replace Media
- Place your photos in `public/images/` and videos in `public/videos/`.
- Replace placeholder content in the respective section/component files in `src/sections/` and `src/components/`.

## Scripts
- `npm run dev` — Start development server
- `npm run build` — Build for production
- `npm run start` — Start production server

---

## Libraries Used
- **Next.js** — React framework for modern web apps
- **Framer Motion** — Animations and transitions
- **Styled-components** — Theming and custom styles
- **React Icons** — Iconography

---

## Customization
- Update theme colors and fonts in `src/styles/theme.js` and `src/styles/GlobalStyle.js`.
- Change section layouts or add new sections in `src/sections/`.

---

## Accessibility
- All images should have descriptive `alt` text.
- Use readable font sizes and good color contrast.
