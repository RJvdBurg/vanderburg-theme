# vanderburg-theme

The **design source** (theme) for the Van der Burg Coaching website, served on GitHub Pages.
It is the authoring source that the [Stateless CMS](https://github.com/RJvdBurg/stateless-cms)
bakes into flat HTML — the live site does **not** load these files at runtime.

## Contents

| File | Role |
|------|------|
| `theme.css` | All visual design: `:root` design tokens (colours, gradient, fonts, `--maxw`), layout, components, the site-centering rule |
| `theme.js` | Shared **chrome**: builds header, footer, WhatsApp button + behaviour (scroll-blur, mobile menu, count-up, contact form) |
| `assets/` | Generic **default** logo placeholders only (`default-logo.svg`, `-white.svg`) — real logos live in the site repo |

## `theme.js` — one source, two roles

1. **Runtime** (`<script defer src=".../theme.js">`): reads `site.json` from the site repo and
   injects the chrome. Used while a site is not yet baked.
2. **Baker library**: exposes pure builders on `window.Theme` (and `module.exports` for node) —
   `headerOuterHTML`, `footerOuterHTML`, `waOuterHTML`, `wireBehaviour`, `bakePage`, `DEFAULTS`.
   The CMS and Theme Builder call these to bake self-contained flat pages. Auto-run is skipped
   when `window.THEME_LIB_ONLY` is set.

All site-specific data (brand, logo paths, nav, footer/NAP, socials, WhatsApp) comes from
`site.json` in the **site** repo — so one theme can drive multiple sites. Missing values fall
back to the `DEFAULTS` baked into `theme.js`.

## `site.json` contract (lives in the site repo)

```json
{
  "brand": "…", "logo": "assets/logo.svg", "logoWhite": "assets/logo-white.svg", "logoAlt": "…",
  "cta": { "label": "…", "href": "contact.html" },
  "nav": [ { "href": "index.html", "label": "Home" },
           { "href": "diensten.html", "label": "Diensten", "sub": [ { "href": "…", "label": "…" } ] } ],
  "footer": { "tagline": "…",
              "columns": [ { "title": "…", "links": [ { "href": "…", "label": "…" } ] } ],
              "contact": { "title": "Contact", "address": ["…"], "phone": "…", "phoneHref": "tel:…", "email": "…" },
              "bottom": "© …" },
  "social": [ { "label": "LinkedIn", "short": "in", "href": "https://…" } ],
  "whatsapp": { "number": "31…", "text": "…", "label": "…" }
}
```

Edit all of this visually with the **Theme Builder** in the CMS (🎨). Colours/fonts here
(`theme.css` tokens) are edited there too; `applyTokens()` rebuilds `--grad`/`--grad-soft`
from the three gradient stops.
