# The Hair Lab (La Tonique) — Website

A single-page static website for The Hair Lab, a hairdresser at 239 Manukau Road, Epsom, Auckland.

## Structure

- `index.html` — page markup (hero, about, services, hours, reviews, contact/map)
- `style.css` — all styling (no build step, no framework)
- `script.js` — mobile nav toggle + footer year

## Running locally

No build tools needed. Open `index.html` directly in a browser, or serve the folder:

```
python3 -m http.server 8000
```

then visit `http://localhost:8000`.

## Content notes

- Business info (address, phone, rating, Thu–Sat hours, Instagram handle) is sourced from the salon's public Google Business / Instagram listings.
- Sunday–Wednesday hours were not publicly listed, so the site asks visitors to call ahead for those days — update `index.html`'s `#hours` section once confirmed.
- The services list is a general hairdresser service set as a starting point — replace with the salon's actual menu/pricing.
- The "Book Online" call-to-action currently routes to a phone call since no online booking platform was provided. Swap the `href="tel:+6496002608"` links in `index.html` for a booking widget (e.g. Fresha, Timely, Booksy) if/when one is set up.
