# The Pyramid Hotel by Aboki — Guest Wi-Fi Portal (Live Preview)

This is a **click-through preview** of the guest Wi-Fi portal design, built
to be hosted on GitHub Pages so hotel management and stakeholders can try
the full experience in a browser — no router required.

**This is a demo, not the production build.** On the real MikroTik router,
these pages are served by the hotspot server itself, which fills in real
guest data (`$(username)`, session time, data used, etc.) and securely
verifies the entered password. Since GitHub Pages is just static hosting
with no router behind it, this version fakes that part with realistic
sample data so the flow can be clicked through end to end. A small
"Interactive Preview" tag in the corner of every page marks it as such.

## How the flow works here

1. **`login.html`** — enter anything in the Username/Password fields and
   press **Connect to Wi-Fi**. (Leaving a field empty shows the error
   state, so you can preview that too.)
2. **`alogin.html`** — the "already connected" screen, with sample session
   stats. **Log Out** takes you to the logout page; **Continue Browsing**
   shows a small confirmation toast (on the real router this would send
   the guest on to whatever page they originally tried to open).
3. **`logout.html`** — session summary, with **Log In Again** looping back
   to the login page.

## Hosting this on GitHub Pages

1. Create a new GitHub repository (public, or private with GitHub Pages
   enabled on your plan).
2. Upload every file in this folder, keeping the same structure — the
   `pictures` folder needs to stay named exactly that, sitting next to the
   HTML files.
3. In the repo, go to **Settings → Pages**, set **Source** to the branch
   you uploaded to (usually `main`) and the root folder, then save.
4. GitHub will give you a URL like
   `https://yourusername.github.io/repo-name/` — that's your shareable
   link. It may take a minute or two to go live after the first push.

## Swapping in real hotel photos

The `pictures` folder currently has 4 placeholder gold-and-navy abstract
images so the slideshow has something to show out of the box. Replace
them with real photos any time:

- Name your photos `1.jpg`, `2.jpg`, `3.jpg`, `4.jpg`, and so on
  (`.jpeg`/`.png` also work) — same convention as the production version.
- Delete the placeholder files first, or just overwrite them.
- The slideshow shows each photo at full visibility, crossfading to the
  next one automatically every 8 seconds.

## This is separate from the production files

The router-ready version of this portal (the one that actually gets
uploaded to the hotel's MikroTik hotspot folder) lives in the other
delivery folder, with its own `DEPLOY-INSTRUCTIONS.md`. Don't upload
*this* folder's `login.html`/`alogin.html`/`logout.html` to the router —
they're wired for a static demo, not the live hotspot server, and won't
authenticate real guests.
