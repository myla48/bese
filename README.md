# Besufikad Zerihun — Portfolio

Cinematic portfolio site built with React, Vite, Tailwind CSS v4, Three.js
(via React Three Fiber), and Framer Motion.

## Getting started

```bash
npm install
npm run dev       # local dev server
npm run build     # production build -> dist/
npm run preview   # preview the production build locally
```

## Adding your media

The site is fully wired up to use real photos and videos as soon as you drop
them into `public/`. Nothing needs to change in the code — every section
already points at these paths and shows a clean "coming soon" placeholder
until the file exists.

```
public/
├── images/
│   ├── besufikad-profile.jpg        ← hero + about portrait
│   ├── showreel-poster.jpg          ← optional poster frame for the reel
│   └── cinematography/
│       ├── cinema-01.jpg ... cinema-06.jpg
│
└── videos/
    ├── showreel.mp4                 ← main showreel section
    └── edit-01.mp4 ... edit-06.mp4  ← video editing grid
```

Recommended specs:
- Profile portrait: portrait orientation, at least 1200x1500px, JPG.
- Cinematography photos: at least 1600px on the long edge, JPG.
- Videos: H.264 MP4, 1080p, under ~15MB each if possible so hover-preview
  stays snappy. Keep the showreel under a couple minutes.

## Editing content

All copy for the two portfolio grids lives in data files, not JSX — edit
these directly to change titles, categories, or add/remove projects:

- `src/data/videos.js` — the 6 video-editing projects
- `src/data/projects.js` — the 6 cinematography photos
- `src/data/navigation.js` — nav links and the Telegram/YouTube/email contact
  details shown in Contact and Footer

## Structure

```
src/
├── App.jsx                 composition only — no section logic lives here
├── components/              one component per section + shared primitives
│   └── three/                the cinematic Three.js background
├── data/                     editable content (see above)
└── index.css                 design tokens (colors, type, motion)
```

## Notes

- The vertical timecode readout on the left edge (desktop only) tracks
  scroll position like an edit timeline — that's the site's signature
  detail, not a bug.
- The custom cursor and timecode rail both disable automatically on touch
  devices and when the OS "reduce motion" setting is on.
- Three.js is lazy-loaded after the hero mounts, so it doesn't block first
  paint on slower connections.
