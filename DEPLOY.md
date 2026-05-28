# Deployment Guide — Alok Deo Singh Personal Website

## Project Structure
```
alok-website/
├── index.html        ← Main portfolio page
├── blog.html         ← Blog page
├── css/
│   └── style.css
├── js/
│   ├── main.js
│   └── blog.js
└── DEPLOY.md         ← This file
```

---

## Option 1: GitHub Pages (Free, Recommended)

### Step 1: Install Git
Download from https://git-scm.com/ and install.

### Step 2: Create GitHub Account
Sign up at https://github.com if you don't have one.

### Step 3: Create a Repository
- Go to github.com → click "New repository"
- Name it exactly: `yourusername.github.io`
  *(e.g., if your GitHub username is `alokdeosingh`, name it `alokdeosingh.github.io`)*
- Set it to Public
- Click "Create repository"

### Step 4: Upload Your Files
**Option A — Via GitHub website (easiest):**
1. Open the repository you just created
2. Click "uploading an existing file"
3. Drag all files and folders (index.html, blog.html, css/, js/)
4. Click "Commit changes"

**Option B — Via terminal:**
```bash
cd /path/to/alok-website
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/yourusername.github.io.git
git push -u origin main
```

### Step 5: Enable GitHub Pages
1. Go to repository → Settings → Pages
2. Source: Deploy from branch → main → / (root)
3. Click Save

### Step 6: Access Your Site
Your site will be live at: `https://yourusername.github.io`
(Takes 1-5 minutes to go live)

### Add a Custom Domain (e.g., alokdeosingh.com)
1. Buy a domain from GoDaddy, Namecheap, or Google Domains
2. In repository Settings → Pages → Custom domain: enter your domain
3. At your domain registrar, add these DNS records:
   ```
   A     @    185.199.108.153
   A     @    185.199.109.153
   A     @    185.199.110.153
   A     @    185.199.111.153
   CNAME www  yourusername.github.io
   ```
4. Check "Enforce HTTPS" after DNS propagates (24-48 hrs)

---

## Option 2: Netlify (Free, Drag & Drop)

1. Go to https://netlify.com → Sign up (free)
2. From the dashboard: drag your entire `alok-website` folder onto the page
3. Your site is instantly live at a URL like `https://random-name-123.netlify.app`
4. To rename: Site settings → Change site name
5. To add custom domain: Domain settings → Add custom domain

**Netlify also gives you:** Form handling, free SSL, CDN — all free on hobby tier.

---

## Option 3: Vercel (Free, Fast)

1. Go to https://vercel.com → Sign up with GitHub
2. Import your GitHub repository
3. Click Deploy — done in seconds
4. Custom domain via Project → Settings → Domains

---

## Updating Your Site

### Via GitHub website:
1. Navigate to the file you want to edit (e.g., `index.html`)
2. Click the pencil (edit) icon
3. Make changes → Commit changes
4. Site updates automatically in ~1 minute

### Via terminal:
```bash
# After making edits to files locally
git add .
git commit -m "Update experience section"
git push
```

---

## Writing Blog Posts

Blog posts are stored in your browser's local storage — no database needed.

1. Open your site → click "Blog"
2. Click "Write a New Post"
3. Fill in Title, Category, Excerpt, and Content
4. Click "Publish Post"

**Content formatting tips:**
- `## Heading` → creates a section heading
- `**bold text**` → makes text bold
- `> Quote here` → creates a pull quote
- `- Item` → creates a bullet point

> Note: Since posts are stored in localStorage, they live in your browser. 
> For a permanent hosted blog, consider upgrading to a static site generator 
> like Hugo or Astro, or adding a CMS like Contentful or Sanity later.

---

## Personalisation Checklist

Before launching, update these in `index.html` and `blog.html`:

- [ ] Add your LinkedIn profile URL (search for `linkedin.com/in/` in index.html)
- [ ] Add a professional photo (replace the `ADS` avatar with an `<img>` tag)
- [ ] Update the meta description tags for SEO
- [ ] Add your actual phone/email (already pre-filled from your resume)
- [ ] Consider adding a favicon (small icon shown in browser tab)

---

## Questions?
Contact: alokdeosingh@gmail.com
