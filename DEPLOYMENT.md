# 🚀 Hướng Dẫn Deploy Production - JWT Authentication

Hướng dẫn chi tiết deploy JWT Authentication App lên production với:
- **Backend**: NestJS trên Render.com
- **Frontend**: React trên Vercel.com  
- **Database**: MongoDB Atlas

## 📋 Prerequisites

- GitHub account và repository đã push code
- Render account (https://render.com) 
- Vercel account (https://vercel.com)
- MongoDB Atlas account (https://cloud.mongodb.com)
- Domain knowledge: Environment variables, CORS, JWT

## 🗄️ Database Setup (MongoDB Atlas)

1. **Create MongoDB Atlas Account**: https://cloud.mongodb.com
2. **Create a New Cluster**:
   - Choose Free Tier (M0)
   - Select region closest to your users
3. **Create Database User**:
   - Database Access → Add New Database User
   - Choose "Password" authentication
   - Create strong username/password
4. **Whitelist IP Addresses**:
   - Network Access → Add IP Address
   - For production: Add `0.0.0.0/0` (allow from anywhere)
5. **Get Connection String**:
   - Clusters → Connect → Connect your application
   - Copy the connection string
   - Replace `<password>` with your actual password

## 🖥️ Backend Deployment (Render)

### Step 1: Push Code to GitHub
```bash
cd backend
git init
git add .
git commit -m "Backend ready for deployment"
git remote add origin https://github.com/yourusername/jwt-auth-backend.git
git push -u origin main
```

### Step 2: Create Render Service
1. **Go to Render Dashboard**: https://dashboard.render.com
2. **Click "New +"** → Web Service
3. **Connect GitHub Repository**:
   - Select your backend repository
   - Click "Connect"

### Step 3: Configure Service
```
Name: jwt-auth-backend
Region: Singapore (or closest to your users)
Branch: main
Root Directory: (leave empty if backend is in root, or specify "backend")
Runtime: Node
Build Command: npm run render-build
Start Command: npm run render-start
```

### Step 4: Set Environment Variables
⚠️ **CRITICAL**: In Render dashboard, add these environment variables EXACTLY:
```
NODE_ENV=production
MONGODB_URI=mongodb+srv://vinh:abcdef05@cluster0.v00nt.mongodb.net/jwt-auth?retryWrites=true&w=majority
JWT_SECRET=kF8!rZp3^wT@7Lq9uC#2vB6$eN1xJ*DgR5yM&hS0tQz
JWT_REFRESH_SECRET=sX9@eL2$yT5#rV8!hC1^pQ6&nB3*zG7wM0dJfK4uZtR
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
PORT=10000
```

🚨 **Important Notes**:
- Copy EXACT values from your `.env` file
- Change database name from `test` to `jwt-auth` 
- Ensure no extra spaces or line breaks
- Click "Save" after each variable

**🔑 Generate Strong Secrets:**
```bash
# Generate JWT secrets (run in terminal)
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Step 5: Deploy
- Click "Create Web Service"
- Wait for build and deployment (5-10 minutes)
- Your backend will be available at: `https://your-service-name.onrender.com`

### Step 6: Test Backend
```bash
curl https://your-service-name.onrender.com/auth/profile
# Should return 401 Unauthorized (expected for protected route)
```

## 🌐 Frontend Deployment (Vercel)

### Step 1: Update Environment Variables
Update `frontend/.env`:
```
VITE_API_BASE_URL=https://your-backend-service.onrender.com
```

### Step 2: Push Code to GitHub
```bash
cd frontend
git init
git add .
git commit -m "Frontend ready for deployment"
git remote add origin https://github.com/yourusername/jwt-auth-frontend.git
git push -u origin main
```

### Step 3: Deploy to Vercel

#### Option A: Vercel CLI (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
cd frontend
vercel

# Follow prompts:
# ? Set up and deploy? Yes
# ? Which scope? Your username
# ? Link to existing project? No
# ? What's your project's name? jwt-auth-frontend
# ? In which directory is your code located? ./
```

#### Option B: Vercel Dashboard
1. **Go to Vercel Dashboard**: https://vercel.com/dashboard
2. **Click "New Project"**
3. **Import Git Repository**:
   - Connect GitHub account
   - Select frontend repository
4. **Configure Project**:
   ```
   Framework Preset: Vite
   Root Directory: frontend (if needed)
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

### Step 4: Set Environment Variables in Vercel
1. **Go to Project Settings** → Environment Variables
2. **Add Variable**:
   ```
   Name: VITE_API_BASE_URL
   Value: https://your-backend-service.onrender.com
   ```

### Step 5: Redeploy
- If using CLI: `vercel --prod`
- If using dashboard: Trigger redeploy from dashboard

## 🧪 Testing Production Deployment

1. **Visit your frontend URL**: `https://your-project.vercel.app`
2. **Test Registration**:
   - Create a new account
   - Check for success notifications
3. **Test Login**:
   - Login with created credentials
   - Verify dashboard access
4. **Test Authentication Flow**:
   - Check protected routes
   - Test logout functionality
   - Verify token refresh (wait 15 minutes or modify token)

## 📊 Monitoring

### Backend (Render)
- **Logs**: Render Dashboard → Service → Logs
- **Metrics**: Monitor CPU/Memory usage
- **Health Checks**: Automatic health monitoring

### Frontend (Vercel)
- **Analytics**: Vercel Dashboard → Analytics
- **Function Logs**: Real-time function execution logs
- **Performance**: Core Web Vitals monitoring

## 🔧 Troubleshooting

### Critical MongoDB Connection Issues
**Error**: `querySrv ENOTFOUND _mongodb._tcp.cluster.mongodb.net`

**Solution**:
1. **Verify MongoDB Atlas Cluster**:
   ```bash
   # Check if cluster URL is correct
   # Go to MongoDB Atlas → Clusters → Connect → Connect your application
   # Copy EXACT connection string
   ```

2. **Correct MongoDB URI Format**:
   ```
   # ✅ Correct format:
   mongodb+srv://<username>:<password>@<cluster-name>.<random-string>.mongodb.net/<database>?retryWrites=true&w=majority
   
   # ❌ Common mistakes:
   - Wrong cluster name
   - Wrong password (special characters need URL encoding)
   - Missing database name
   ```

3. **Environment Variables on Render**:
   ```
   # Make sure these are set in Render dashboard:
   MONGODB_URI=mongodb+srv://username:password@cluster0.abc123.mongodb.net/jwt-auth?retryWrites=true&w=majority
   NODE_ENV=production
   JWT_SECRET=your-secret
   JWT_REFRESH_SECRET=your-refresh-secret
   PORT=10000
   ```

4. **MongoDB Atlas Settings**:
   - **IP Whitelist**: Add `0.0.0.0/0` (allow all)
   - **Database User**: Ensure user has read/write permissions
   - **Network Access**: Allow access from anywhere

### Common Backend Issues
1. **Build Fails**:
   ```bash
   # Check package.json scripts
   npm run render-build
   ```

2. **Database Connection Error**:
   - Verify MongoDB URI format exactly
   - Check IP whitelist in MongoDB Atlas: 0.0.0.0/0
   - Ensure database user has correct permissions
   - Test connection string locally first

3. **CORS Issues**:
   - Update frontend URL in CORS configuration
   - Check main.ts CORS settings

### Common Frontend Issues
1. **Build Fails**:
   ```bash
   # Test build locally
   npm run build
   ```

2. **API Connection Issues**:
   - Verify VITE_API_BASE_URL environment variable
   - Check browser Network tab for API calls
   - Ensure backend is running and accessible

3. **Routing Issues**:
   - Check vercel.json rewrites configuration
   - Verify React Router setup

## 🔄 CI/CD Setup (Optional)

### GitHub Actions for Backend
Create `.github/workflows/backend-deploy.yml`:
```yaml
name: Deploy Backend to Render
on:
  push:
    branches: [main]
    paths: ['backend/**']

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Trigger Render Deploy
        run: |
          curl -X POST "${{ secrets.RENDER_DEPLOY_HOOK_URL }}"
```

### Automatic Vercel Deployment
Vercel automatically deploys on every push to main branch when connected to GitHub.

## 📝 Environment Variables Summary

### Backend (Render)
```
NODE_ENV=production
MONGODB_URI=mongodb+srv://...
JWT_SECRET=32+ character secret
JWT_REFRESH_SECRET=different 32+ character secret
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
PORT=10000
```

### Frontend (Vercel)
```
VITE_API_BASE_URL=https://your-backend.onrender.com
```

## 🎉 Success!

Your JWT Authentication app is now live in production:
- **Backend**: `https://your-backend.onrender.com`
- **Frontend**: `https://your-frontend.vercel.app`

Share these URLs and enjoy your deployed authentication system! 🚀