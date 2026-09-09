# Karen's Blog — Setup & How It Works

Karen writes at **northgaluxuryrealtor.com/admin/** in a Word-like editor. Publishing commits a
Markdown file to `_posts/`; GitHub Pages (Jekyll) rebuilds the site and the post appears at
`/blog/post-slug/` in the site's design, listed automatically on `/blog.html` and in `sitemap.xml`.

## One-time setup (Westyn, ~15 min)

**1. GitHub account for Karen**
- Karen creates a free github.com account (she'll never use it directly — it's just her login).
- Repo → Settings → Collaborators → invite her account (Write access). She accepts the email invite.

**2. GitHub OAuth App** (github.com → Settings → Developer settings → OAuth Apps → New)
- Application name: `Karen Blog Editor`
- Homepage URL: `https://northgaluxuryrealtor.com`
- Authorization callback URL: `https://<YOUR-WORKER>.workers.dev/callback` (fill after step 3, then update)
- Save the **Client ID** and generate a **Client Secret**.

**3. Cloudflare Worker** (free plan is fine)
- dash.cloudflare.com → Workers & Pages → Create Worker → name it `karen-blog-auth` → paste
  `worker/decap-oauth-worker.js` → Deploy.
- Worker → Settings → Variables and Secrets → add `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET`.
- Copy the worker URL (e.g. `https://karen-blog-auth.<acct>.workers.dev`).
- Go back to the OAuth App and set the callback URL to `<worker-url>/callback`.

**4. Point the CMS at the worker**
- Edit `admin/config.yml` → replace `base_url: https://REPLACE-ME.workers.dev` with the worker URL. Push.

**5. Test**
- Open `https://northgaluxuryrealtor.com/admin/` → Login with GitHub (as Karen) → authorize →
  you should see the three existing posts. Publish a test post, wait ~2 min, confirm it's live, delete it.

## Scheduling
- Set the **Publish Date** to any future date → the post commits immediately but stays invisible.
- A GitHub Action rebuilds the site **daily at ~8:00 AM Eastern**; the first rebuild after the
  post's date publishes it. To publish a scheduled post *right now*: repo → Actions →
  "Publish scheduled posts" → Run workflow.

## Writing guide for Karen (what actually helps Google)
- One post = one question a buyer or seller types into Google. Put the place in the title.
  Good: "What Lakefront Sellers on Lanier Should Do Before Listing" · "Cumming vs. Gainesville:
  Where Does $700K Go Further?" · "Big Canoe HOA Fees, Explained".
- 300–600 words is plenty. Fill in the Short Description — it becomes the Google snippet.
- Pick the Area/Topic tag; add a photo when you have a real one (your listings > stock).
- Cadence beats length: one post a week is worth more than four on the first day.

## Notes
- `future: false` + America/New_York timezone are set in `_config.yml`.
- All existing pages are untouched by Jekyll (no front matter = copied as-is).
- Post images upload to `/blog-images/`.
- `worker/` and this file are excluded from the built site.
