# 🔥 AnimeRush.in — Firebase Deployment Guide

## 📁 Project Structure
```
animerush/
├── firebase.json              ← Firebase hosting config (URL rewrites)
├── public/
│   ├── index.html             ← Homepage
│   ├── sitemap.xml            ← SEO sitemap
│   ├── robots.txt             ← Search engine crawl rules
│   ├── css/
│   │   └── style.css          ← Shared styles for ALL pages
│   ├── js/
│   │   ├── app.js             ← Shared components + API helpers
│   │   └── info-pages.js      ← About/Contact/DMCA/Privacy/Terms content
│   └── pages/
│       ├── anime.html         ← Anime detail page (shows info + episodes)
│       ├── watch.html         ← Video player page (multi-server + HLS)
│       ├── search.html        ← Search with filters
│       ├── anime-list.html    ← Full A-Z anime list
│       ├── movies.html        ← Anime movies page
│       ├── schedule.html      ← Weekly airing schedule
│       ├── genre.html         ← Genre hub + genre detail
│       ├── about.html         ← About us
│       ├── contact.html       ← Contact form
│       ├── privacy.html       ← Privacy policy
│       ├── terms.html         ← Terms of use
│       └── dmca.html          ← DMCA policy
```

---

## ✅ STEP 1 — Install Firebase CLI

Open your terminal / command prompt and run:
```bash
npm install -g firebase-tools
```
If you don't have Node.js: https://nodejs.org (install LTS version)

---

## ✅ STEP 2 — Login to Firebase
```bash
firebase login
```
Opens browser → login with your Google account.

---

## ✅ STEP 3 — Create Firebase Project

1. Go to: https://console.firebase.google.com
2. Click **"Add Project"**
3. Name: `animerush-in`
4. Disable Google Analytics (optional)
5. Click **"Create Project"**

---

## ✅ STEP 4 — Initialize Firebase in your project folder
```bash
cd animerush
firebase init hosting
```
Answer the prompts:
- **Which Firebase project?** → Select `animerush-in`
- **Public directory?** → Type `public`
- **Single-page app (rewrite all to index.html)?** → **No** (we have firebase.json already)
- **Overwrite index.html?** → **No**

---

## ✅ STEP 5 — Deploy to Firebase
```bash
firebase deploy
```
You'll get a URL like: `https://animerush-in.web.app`

**Every time you update files:**
```bash
firebase deploy
```

---

## ✅ STEP 6 — Connect Custom Domain (animerush.in)

### Buy domain (~₹700/year):
- GoDaddy India: https://godaddy.com/in
- Namecheap: https://namecheap.com
- BigRock: https://bigrock.in

### Connect to Firebase:
1. Firebase Console → Hosting → **"Add custom domain"**
2. Enter: `animerush.in`
3. Firebase gives you DNS records to add
4. Go to your domain registrar → DNS settings
5. Add the TXT and A records Firebase shows
6. Wait 24-48 hours for DNS to propagate
7. Firebase auto-issues FREE SSL certificate ✅

---

## ✅ STEP 7 — How URL Routing Works

The `firebase.json` file handles these URL patterns:
```
/anime/12345        → pages/anime.html  (anime detail)
/watch/12345/1      → pages/watch.html  (episode player)
/search?q=naruto    → pages/search.html
/genre/1            → pages/genre.html  (action anime)
/schedule           → pages/schedule.html
/movies             → pages/movies.html
```

Pages read the URL to know which anime to show — no backend needed!

---

## ✅ STEP 8 — Google AdSense Setup

1. Go to: https://adsense.google.com
2. Sign up with your Google account
3. Add site: `animerush.in`
4. Copy the AdSense code snippet
5. In `public/index.html`, find this comment and replace it:
```html
<!-- Google AdSense — add your pub ID here after approval -->
<!-- <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXX" crossorigin="anonymous"></script> -->
```
Change to:
```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR_ID_HERE" crossorigin="anonymous"></script>
```

### Replace ad placeholder divs with real ad units:
Find all `ad-slot` divs in HTML files and replace with:
```html
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
     data-ad-slot="XXXXXXXXXX"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
```

### AdSense Requirements:
- ✅ Website must have Privacy Policy, Terms, Contact, About pages (already done!)
- ✅ Original content (anime info comes from real APIs)
- ✅ Site must be live for 2-6 months before approval
- ✅ Decent traffic (500+ visitors/day helps)

---

## ✅ STEP 9 — Google Search Console (SEO)

1. Go to: https://search.google.com/search-console
2. Add property: `https://animerush.in`
3. Verify (use HTML file method)
4. Submit sitemap: `https://animerush.in/sitemap.xml`
5. Request indexing for homepage

---

## ✅ STEP 10 — Amazon Affiliate Setup

1. Go to: https://affiliate-program.amazon.in
2. Sign up free
3. Search for anime merchandise
4. Copy affiliate links
5. Update the merchandise section in `index.html`

---

## 🚀 How the Website Works (Technical)

### Real Anime Data:
- **Jikan API** (free, no key needed): fetches anime info from MyAnimeList
  - Top anime, season schedule, episode lists, characters
  - Rate limit: ~3 requests/second (handled in code)
- **AniList API** (free, no key needed): trending, popular anime
  - GraphQL API, faster response

### Video Streaming:
- Multiple embed servers (Gogoanime, EmbtakuPro, etc.)
- HLS.js for direct stream links
- User can switch servers if one doesn't work

### Caching:
- All API responses cached in sessionStorage for 10 minutes
- Reduces API calls and speeds up page loads

---

## 💰 Expected Earnings

| Monthly Visitors | AdSense | Affiliate | Total |
|-----------------|---------|-----------|-------|
| 10,000          | ₹500–₹1,500 | ₹200–₹500 | ₹700–₹2K |
| 50,000          | ₹2,500–₹8K | ₹1K–₹3K | ₹3.5K–₹11K |
| 1,00,000+       | ₹10K–₹30K | ₹5K–₹15K | ₹15K–₹45K |

---

## 📱 Grow Your Traffic

1. **Telegram Channel** — post new episode alerts
2. **Instagram** — anime clips, memes, top 10 lists
3. **YouTube** — "Top 10 Anime 2024", "Best Isekai"
4. **Reddit** — r/anime, r/animeindia (be helpful, not spammy)
5. **SEO** — every page has proper title, description, keywords

---

## ⚠️ Legal Tips
- Never host video files yourself — always embed from third parties
- Keep DMCA page updated
- Respond to DMCA requests within 48 hours
- Privacy Policy is required for AdSense ✅
