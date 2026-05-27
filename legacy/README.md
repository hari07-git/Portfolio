# Portfolio (Hari Biyyani)

Static, fast, and deployable portfolio site. No build step required.

## Edit content

- Update your details in `data.js`
- Replace the profile image at `assets/profile-placeholder.svg` (or change the `<img>` in `index.html`)
- Replace the resume file at `assets/resume.pdf`

## Run locally

For the best experience (multi-page navigation + page-to-page animations), run a local static server.

```bash
python3 -m http.server 5173
```

Then open http://localhost:5173

If you open `index.html` directly (file://), the site still works, but browser features like page transitions may be limited.

## Deploy

- **GitHub Pages**: push this folder to a repo and enable Pages (deploy from root).
- **Netlify/Vercel**: deploy as a static site (no build command, publish directory = project root).
