# 🚀 Nikunj Portal - Live Deployment Guide

## Deploy for FREE with Vercel + Railway

### **Prerequisites**
- GitHub account (free)
- Vercel account (free - sign up with GitHub)
- Railway account (free - sign up with GitHub)

---

## **STEP 1: Push Code to GitHub**

```powershell
# Initialize git (if not already done)
cd d:\nikunj-portal
git init
git add .
git commit -m "Initial commit: Nikunj Portal"

# Create new repo on GitHub.com, then:
git remote add origin https://github.com/YOUR_USERNAME/nikunj-portal.git
git branch -M main
git push -u origin main
```

---

## **STEP 2: Deploy Backend on Railway**

### 2.1 Update Server Environment Variables

Create `.env` file in `/server` folder:
```
PORT=5000
NODE_ENV=production
FRONTEND_URL=https://your-vercel-app.vercel.app
```

### 2.2 Deploy to Railway
1. Go to **railway.app** → Sign up with GitHub
2. Click **New Project** → **Deploy from GitHub repo**
3. Select `nikunj-portal` repository
4. Select `/server` directory as root
5. Click **Deploy**
6. Wait for deployment ✅
7. Copy the live URL (e.g., `https://nikunj-portal-backend.railway.app`)

### 2.3 Add Environment Variables in Railway Dashboard
- `NODE_ENV` = `production`
- `FRONTEND_URL` = (Your Vercel URL - add after step 3)

---

## **STEP 3: Deploy Frontend on Vercel**

### 3.1 Update Client Environment Variables

Create `.env.production` in `/client` folder:
```
REACT_APP_BACKEND_URL=https://your-railway-app.railway.app
```

### 3.2 Deploy to Vercel
1. Go to **vercel.com** → Sign up with GitHub
2. Click **New Project** → **Import Git Repository**
3. Select `nikunj-portal` repository
4. **Framework Preset**: React
5. **Root Directory**: `client`
6. **Environment Variables**:
   - `REACT_APP_BACKEND_URL` = `https://your-railway-backend-url`
7. Click **Deploy**
8. Wait for build ✅
9. Your live URL: `https://your-app.vercel.app`

---

## **STEP 4: Connect Frontend & Backend**

1. Copy your **Vercel** frontend URL
2. Go to **Railway Dashboard** → Your backend project
3. Add/Update `FRONTEND_URL` environment variable with Vercel URL
4. Redeploy railway backend
5. Test: Open your Vercel URL in browser

---

## **Testing Your Live App**

✅ Visit: `https://your-app.vercel.app`

**Test Accounts:**
- `EMP-001` - Nikunj (PM)
- `DEV-001` - Alice (Developer)
- `QA-001` - Diana (QA)
- `TL-MEDIA-01` - Media Lead

**Features to Test:**
- ✅ Dashboard loads with demo data
- ✅ User switcher dropdown works
- ✅ Create tasks
- ✅ Report issues
- ✅ Switch between users

---

## **Troubleshooting**

### Backend not reaching frontend
```
Check FRONTEND_URL matches your Vercel domain
Check REACT_APP_BACKEND_URL matches your Railway domain
```

### CORS errors
```
Backend server.js has CORS config for:
- localhost:3000
- localhost:5000
- Your Vercel URL (via FRONTEND_URL env var)
```

### Firebase config
- If you have Firebase, add credentials to Railway environment variables
- Without Firebase, app runs in demo mode (works great for testing!)

---

## **Custom Domain (Optional)**

### Domain on Vercel
1. Go to Vercel → Project Settings → Domains
2. Add your custom domain
3. Point DNS to Vercel nameservers

### Domain on Railway
1. Railway → Domain Settings
2. Add custom domain
3. Update DNS records

---

## **Live Deployment Summary**

| Component | Hosting | Free | URL Format |
|-----------|---------|------|-----------|
| React Frontend | Vercel | ✅ | `https://app-name.vercel.app` |
| Node Backend | Railway | ✅ | `https://service-name.railway.app` |
| Database | Firebase | ✅ (Spark) | Cloud hosted |

**Total Cost: $0** 🎉

---

## **Environment Variables Checklist**

### Frontend (.env.production)
- [ ] `REACT_APP_BACKEND_URL` = Railway URL

### Backend (.env in Railway)
- [ ] `PORT` = 5000
- [ ] `NODE_ENV` = production  
- [ ] `FRONTEND_URL` = Vercel URL

---

Need help? Check Railway & Vercel docs or redeploy!
