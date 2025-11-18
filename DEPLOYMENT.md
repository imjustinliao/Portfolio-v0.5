# 🚀 Deployment Guide

Complete step-by-step guide to deploy your portfolio to **justinliao.me** using GitHub Pages.

---

## 📋 Prerequisites

- [x] GitHub repository created: `Portfolio-v0.5`
- [x] Custom domain registered: `justinliao.me`
- [x] Code is working locally (`npm run dev`)

---

## 🎯 Deployment Steps

### Step 1: Prepare Your Code

Make sure all your changes are saved and the project builds successfully:

```bash
# Test the build
npm run build

# Verify no errors
npm run lint
```

---

### Step 2: Commit Your Changes to Git

Commit all your source code changes to the `main` branch:

```bash
# Check what files have changed
git status

# Add all changes
git add .

# Commit with a descriptive message
git commit -m "Initial portfolio setup"

# Push to GitHub
git push origin main
```

> ⚠️ **Important**: This pushes your **source code** to the `main` branch, not the built website yet.

---

### Step 3: Build and Deploy to GitHub Pages

Now deploy the built website to the `gh-pages` branch:

```bash
# Build the project
npm run build

# Create CNAME file for custom domain
echo "justinliao.me" > dist/CNAME

# Deploy to gh-pages branch
npm run deploy
```

This will:
1. ✅ Build your site into the `dist/` folder
2. ✅ Create a CNAME file so GitHub knows your custom domain
3. ✅ Push the `dist/` folder to the `gh-pages` branch
4. ✅ Make your site available on GitHub Pages

You should see output like:
```
Published
```

---

### Step 4: Configure GitHub Pages

1. **Go to your GitHub repository**: 
   - Navigate to `https://github.com/imjustinliao/Portfolio-v0.5`

2. **Click on "Settings"** (top navigation)

3. **Click on "Pages"** (left sidebar)

4. **Configure the source**:
   - Under "Build and deployment"
   - **Source**: Select "Deploy from a branch"
   - **Branch**: Select `gh-pages` and `/ (root)`
   - Click **Save**

5. **Configure custom domain**:
   - Under "Custom domain"
   - Enter: `justinliao.me`
   - Click **Save**
   - Wait for the DNS check (may take a few minutes)

6. **Enable HTTPS** (recommended):
   - Check the box for "Enforce HTTPS"
   - (This may only appear after DNS is configured)

---

### Step 5: Configure DNS with Your Domain Provider

Go to your domain registrar (where you bought justinliao.me) and configure DNS:

#### A Records (for apex domain)

Add **4 A records** pointing to GitHub's servers:

| Type | Name | Value |
|------|------|-------|
| A | @ | `185.199.108.153` |
| A | @ | `185.199.109.153` |
| A | @ | `185.199.110.153` |
| A | @ | `185.199.111.153` |

#### CNAME Record (for www subdomain)

| Type | Name | Value |
|------|------|-------|
| CNAME | www | `imjustinliao.github.io` |

> 📝 **Note**: DNS changes can take up to 24 hours to propagate, but usually take 15-30 minutes.

---

### Step 6: Verify Deployment

After DNS propagates, test your site:

1. **Direct link**: `https://imjustinliao.github.io/Portfolio-v0.5`
2. **Custom domain**: `https://justinliao.me`
3. **With www**: `https://www.justinliao.me`

All three should work!

Test the routes:
- ✅ Homepage: `https://justinliao.me`
- ✅ About: `https://justinliao.me/#/about`
- ✅ Thinking: `https://justinliao.me/#/thinking`

---

## 🔄 Making Updates (After Initial Deploy)

Once your site is deployed, here's how to update it:

### 1. Make Your Changes

Edit your code locally (pages, components, styles, etc.)

```bash
# Test locally
npm run dev
```

### 2. Build and Deploy

```bash
# Build the updated site
npm run build

# Re-create CNAME file (important!)
echo "justinliao.me" > dist/CNAME

# Deploy to GitHub Pages
npm run deploy
```

### 3. Commit Source Code

```bash
# Commit your source code changes
git add .
git commit -m "Update portfolio content"
git push origin main
```

> 💡 **Pro Tip**: You can create a script to automate this!

---

## 🤖 Automation Script (Optional)

Create a `deploy.sh` file to automate deployment:

```bash
#!/bin/bash

echo "🚀 Starting deployment..."

# Build the project
echo "📦 Building..."
npm run build

# Create CNAME file
echo "🔗 Creating CNAME..."
echo "justinliao.me" > dist/CNAME

# Deploy to GitHub Pages
echo "🚢 Deploying to GitHub Pages..."
npm run deploy

# Commit source code
echo "💾 Committing source code..."
git add .
git commit -m "Deploy: $(date +'%Y-%m-%d %H:%M:%S')"
git push origin main

echo "✅ Deployment complete!"
echo "🌐 Your site will be live at https://justinliao.me in a few minutes"
```

Make it executable and use it:

```bash
chmod +x deploy.sh
./deploy.sh
```

---

## 🐛 Troubleshooting

### Problem: DNS not resolving

**Solution**: DNS can take up to 24 hours. Check with:
```bash
dig justinliao.me
nslookup justinliao.me
```

### Problem: Site shows 404

**Solutions**:
1. Verify `gh-pages` branch exists on GitHub
2. Check GitHub Pages settings are correct
3. Make sure CNAME file exists in `gh-pages` branch
4. Wait a few minutes for GitHub to rebuild

### Problem: Routes not working (404 on refresh)

**Solution**: This shouldn't happen with HashRouter, but if it does:
- Verify you're using HashRouter (not BrowserRouter)
- Check that routes have `#` in URL: `/#/about`

### Problem: Images/assets not loading

**Solutions**:
1. Check file paths use `/` prefix: `/UI/logo.svg`
2. Verify files exist in `public/` folder
3. Check file name casing (case-sensitive on servers!)
4. Clear browser cache and hard refresh (Cmd+Shift+R)

### Problem: Custom domain not working

**Solutions**:
1. Check CNAME file exists in `gh-pages` branch
2. Verify DNS is configured correctly
3. Check GitHub Pages settings show your domain
4. Wait for DNS propagation (up to 24 hours)

### Problem: HTTPS certificate error

**Solution**: After DNS propagates:
1. Go to GitHub Pages settings
2. Uncheck "Enforce HTTPS"
3. Wait a few minutes
4. Check "Enforce HTTPS" again
5. GitHub will provision a new certificate

---

## 📊 Deployment Checklist

Use this checklist for each deployment:

### Initial Setup
- [ ] Repository created on GitHub
- [ ] Code pushed to `main` branch
- [ ] Build successful locally
- [ ] Deployed to `gh-pages` branch
- [ ] GitHub Pages configured in settings
- [ ] Custom domain added in GitHub settings
- [ ] DNS configured with domain provider
- [ ] DNS propagation complete
- [ ] Site accessible at custom domain
- [ ] HTTPS enabled

### Regular Updates
- [ ] Changes tested locally (`npm run dev`)
- [ ] Build successful (`npm run build`)
- [ ] CNAME file created
- [ ] Deployed to gh-pages (`npm run deploy`)
- [ ] Source code committed to main
- [ ] Source code pushed to GitHub
- [ ] Site verified on live domain
- [ ] All routes working

---

## 🎯 Quick Command Reference

```bash
# Development
npm run dev              # Start dev server (localhost:5173)
npm run build           # Build for production
npm run preview         # Preview production build

# Deployment (Full Process)
npm run build                      # 1. Build
echo "justinliao.me" > dist/CNAME  # 2. Add CNAME
npm run deploy                     # 3. Deploy to gh-pages
git add .                          # 4. Stage changes
git commit -m "Update"             # 5. Commit
git push origin main               # 6. Push to GitHub

# Git Commands
git status              # Check changes
git add .              # Stage all changes
git commit -m "message" # Commit changes
git push origin main   # Push to GitHub
```

---

## 📚 Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Custom Domain Setup](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)
- [DNS Configuration Guide](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)

---

## ✅ Success!

If you've followed all steps, your portfolio should now be live at:

- 🌐 **https://justinliao.me**
- 🌐 **https://www.justinliao.me**
- 🌐 **https://imjustinliao.github.io/Portfolio-v0.5** (fallback)

Congratulations! 🎉

