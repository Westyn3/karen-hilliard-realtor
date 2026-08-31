# Karen Hilliard — North Georgia Luxury Realtor Website

Static marketing site for **Karen Hilliard**, REALTOR® with Keller Williams North Atlanta and co-founder of The Legacy Team. Positioned for **luxury, Lake Lanier waterfront, North Georgia mountain, and land** buyers and sellers.

**Live site:** https://northgaluxuryrealtor.com/ (GitHub Pages, custom domain via `CNAME`)

Built from the same architecture as Britney Javens' site (northatlantarealtor.homes), with a differentiated market lane so the two sites don't compete for the same searches.

## Pages
| File | Purpose |
|---|---|
| `index.html` | Home — video hero, stats, services, about, communities, testimonial |
| `about.html` | Karen's bio, The Legacy Team, values |
| `market.html` | All communities hub (Lake Lanier · Milton & Alpharetta · Cumming · Mountains) |
| `lake-lanier.html` | Lakefront hub — docks, water depth, Corps rules, lake communities |
| `gainesville.html`, `flowery-branch.html`, `buford.html`, `cumming.html`, `milton.html`, `alpharetta.html`, `dawsonville.html`, `dahlonega.html`, `blue-ridge.html` | City pages with FAQ schema and IDX city search links |
| `luxury-homes.html` | $1M+ specialty page |
| `land-lots.html` | Land, lots & buildability specialty page |
| `buying.html`, `selling.html` | Buyer / seller process pages |
| `blog.html` | On-page articles with BlogPosting schema |
| `trusted-vendors.html` | Vendor referrals |
| `contact.html` | Contact + reviews |

## Build
Pages are generated from `/build` (not in repo) — `common.py` (shared head/nav/footer + schema), `areas.py` (city content), `build.py`. Edit content there and regenerate, or edit HTML directly for small fixes.

## TODO before launch
- [ ] Create Karen's Formspree form and replace `KAREN_FORMSPREE_TODO` in every page (`grep -rl KAREN_FORMSPREE_TODO .`)
- [ ] Replace `hero.mp4` + `hero-poster.jpg` with Karen's lake footage
- [ ] Add a mountain photo (`mountains.jpg`) — Dahlonega / Blue Ridge / Dawsonville / Mountains section currently reuse `hero-house.jpg`
- [ ] Set up Google Reviews widget on `contact.html` (placeholder buttons in place)
- [ ] Add GA4 + Search Console tags
- [ ] 301s from old GoDaddy URLs (`/buy-a-home`, `/sell-a-home`, `/about`, `/contact`, `/blog`, `/reviews`, `/trusted-vendors`, `/commercial-properties`)
- [ ] Point GBP product buttons to `selling.html`, `lake-lanier.html`, `luxury-homes.html`, `contact.html`

## Tech
HTML5 · CSS (`style.css`) · vanilla JS (`main.js`) · Formspree · Schema.org JSON-LD (RealEstateAgent, Person, FAQPage, BreadcrumbList, BlogPosting) · GAMLS IDX (`karenhilliard.georgiamls.com`)
