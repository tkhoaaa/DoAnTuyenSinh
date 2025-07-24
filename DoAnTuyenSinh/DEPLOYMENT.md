# 🚀 Deployment Guide

## 📊 Current Status

- ✅ **Frontend**: Deployed on Vercel
  - **URL**: https://do-an-tuyen-sinh.vercel.app/
  - **Status**: Live & Functional
  - **Auto-deploy**: Enabled from Git

- ⚠️ **Backend**: Running Locally
  - **URL**: http://localhost:3001
  - **Status**: Development Mode
  - **CORS**: Configured for both localhost and Vercel domain

## 🌐 Frontend Deployment (Vercel)

### ✅ Already Deployed

Your frontend is successfully deployed at: [https://do-an-tuyen-sinh.vercel.app/](https://do-an-tuyen-sinh.vercel.app/)

### Configuration Applied:

1. **vercel.json**: Updated with modern syntax
```json
{
  "rewrites": [
    {
      "source": "/((?!api).*)",
      "destination": "/index.html"
    }
  ],
  "headers": [...],
  "cleanUrls": true,
  "trailingSlash": false
}
```

2. **CORS Updated**: Backend now accepts requests from:
   - `http://localhost:5173` (Development)
   - `https://do-an-tuyen-sinh.vercel.app` (Production)

3. **API Configuration**: Created centralized config in `src/config/apiConfig.js`

## 🖥️ Backend Deployment Options

### Option 1: Keep Local (Current Setup)
- **Pros**: Easy development, no hosting costs
- **Cons**: Not accessible from internet, need to run manually

### Option 2: Deploy to Cloud
For production-ready backend, consider:

#### Railway (Recommended)
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway init
railway up
```

#### Render
1. Connect GitHub repository
2. Set environment variables
3. Auto-deploy on push

#### Heroku
```bash
# Install Heroku CLI
npm install -g heroku

# Deploy
heroku create hutech-backend
git push heroku main
```

## 🔧 Environment Variables

### For Vercel (Frontend)
Set in Vercel Dashboard:
```env
VITE_API_URL=http://localhost:3001
VITE_APP_ENV=production
```

### For Backend Hosting
```env
DB_HOST=your_mysql_host
DB_USER=your_mysql_user
DB_PASSWORD=your_mysql_password
DB_NAME=tuyensinh
DB_PORT=3306
PORT=3001
NODE_ENV=production
```

## 📋 Testing Production Setup

### Test Frontend
1. ✅ Visit: https://do-an-tuyen-sinh.vercel.app/
2. ✅ Check all pages load correctly
3. ✅ Verify responsive design

### Test API Connection
1. Ensure backend is running locally
2. Test form submissions from Vercel site
3. Check CORS is working

### Test Admin Functions
1. Login with admin account from production site
2. Verify dashboard loads
3. Test application management

## 🔄 Development Workflow

### Local Development
```bash
# Terminal 1: Backend
cd backend
node index.js

# Terminal 2: Frontend
npm run dev
# Access: http://localhost:5173
```

### Production Testing
```bash
# Build frontend
npm run build

# Preview build
npm run preview

# Deploy to Vercel
vercel --prod
```

## 🚨 Important Notes

1. **Database**: Currently using local MySQL
   - Consider cloud MySQL for production backend
   - Backup data before any changes

2. **File Uploads**: Backend handles uploads locally
   - Consider cloud storage (AWS S3, Cloudinary) for production

3. **Email Service**: No email configured yet
   - Add email service for notifications

4. **SSL**: Vercel provides HTTPS automatically
   - Backend needs SSL for production deployment

## 📈 Next Steps for Full Production

1. **Deploy Backend to Cloud**
2. **Setup Cloud Database**
3. **Configure Cloud Storage**
4. **Add Email Service**
5. **Setup Monitoring & Logs**
6. **Configure CI/CD Pipeline**

---

**Current Status**: ✅ Frontend Production Ready | ⚠️ Backend Development Mode 