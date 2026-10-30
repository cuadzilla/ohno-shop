# Art Shop (Astro + Sanity + Snipcart on GitHub Pages)

```
Sanity Studio (friend edits here)  --publish-->  Sanity webhook
        |                                              |
   content lives in Sanity cloud              POST to GitHub dispatches API
                                                       |
                                         GitHub Actions: npm ci, astro build
                                         (build fetches content from Sanity)
                                                       |
                                                 GitHub Pages
```

## One-time setup (in this order)

### 1. Put the code on GitHub
1. Create an empty repo on github.com (e.g. `art-shop`). Keep it empty: no README.
2. In this folder:
   ```
   git init -b main
   git add .
   git commit -m "Initial site"
   git remote add origin https://github.com/YOUR-USERNAME/art-shop.git
   git push -u origin main
   ```
3. Repo **Settings > Pages > Build and deployment > Source: GitHub Actions**.
4. Edit `astro.config.mjs`: set `site` to `https://YOUR-USERNAME.github.io` and
   keep `base` equal to your repo name. Commit and push.
5. Watch the **Actions** tab. When it's green, the sample site is live at
   `https://YOUR-USERNAME.github.io/art-shop/`.

### 2. Create the Sanity project
1. Sign in at https://www.sanity.io/manage and create a project (dataset: `production`,
   which is public-read, so the build can fetch without a token).
2. Copy the **Project ID**.
3. Put it in `studio/sanity.config.js` and `studio/sanity.cli.js`, and pick a
   unique `studioHost` in the CLI file.
4. Deploy the studio (this uploads it to Sanity's hosting):
   ```
   cd studio
   npm install
   npx sanity login
   npx sanity deploy
   ```
5. Open the studio URL it prints, add one test artwork, and publish.

### 3. Tell the build about Sanity
Repo **Settings > Secrets and variables > Actions > Variables** tab, add:

| Name | Value |
|---|---|
| `SANITY_PROJECT_ID` | your project ID |
| `SANITY_DATASET` | `production` |

Then Actions tab > **Deploy to GitHub Pages > Run workflow**. Your test piece
should replace the sample data.

### 4. The rebuild webhook
1. GitHub: **Settings > Developer settings > Personal access tokens > Fine-grained tokens**.
   Repository access: only `art-shop`. Permission: **Contents: Read and write**.
   Copy the token.
2. Sanity: project page at sanity.io/manage > **API > Webhooks > Create webhook**:
   - **URL:** `https://api.github.com/repos/YOUR-USERNAME/art-shop/dispatches`
   - **Method:** POST
   - **Trigger on:** Create, Update, Delete
   - **Filter:** `_type == "artwork"`
   - **Projection:** `{"event_type": "sanity-publish"}`
   - **Drafts:** leave off, so only real publishes fire it
   - **HTTP headers:**
     - `Authorization`: `Bearer YOUR_TOKEN`
     - `Accept`: `application/vnd.github+json`
3. Test: edit and publish a piece, then watch the Actions tab for a run
   triggered by `repository_dispatch`. The site updates a minute or two later.

### 5. Snipcart (when ready)
1. Create a Snipcart account, copy the **public** API key (test mode first).
2. Add repo variable `SNIPCART_PUBLIC_KEY`.
3. In Snipcart dashboard > Store configurations > Domains & URLs, set the
   domain to `YOUR-USERNAME.github.io` and the product crawl path to
   `/art-shop/art/` (adjust later when you move to a custom domain).
4. Rerun the workflow. Product pages now show "Add to cart" with a max quantity of 1.

### 6. Custom domain, later
Repo Settings > Pages > Custom domain, add the DNS records GitHub shows,
then change `site` in `astro.config.mjs` to your domain and **delete the `base` line**.
Also update the domain in Snipcart's settings.

## Local development
```
npm install
cp .env.example .env   # fill in values; without them the site shows sample data
npm run dev
```
