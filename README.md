# JWT Authentication Demo with React & NestJS

A complete JWT authentication system with Access & Refresh tokens, built with React frontend and NestJS backend.

## 🌐 Live Demo
- **Frontend**: https://your-app.vercel.app *(Deploy và cập nhật URL)*
- **Backend API**: https://your-backend.onrender.com *(Deploy và cập nhật URL)*
- **Local Development**:
  - Frontend: http://localhost:5173/
  - Backend API: http://localhost:3000/

## 🚀 Deployment

### Production Ready ✅
Project này đã được cấu hình sẵn cho production deployment:

- **📖 [Complete Deployment Guide](./DEPLOYMENT.md)** - Hướng dẫn deploy chi tiết
- **✅ [Pre-Deploy Checklist](./PRE_DEPLOY_CHECKLIST.md)** - Checklist trước khi deploy
- **🖥️ Backend**: Render.com với MongoDB Atlas
- **🌐 Frontend**: Vercel.com với environment variables
- **🔧 Configuration**: Docker, CORS, Environment variables đã setup

### Quick Deploy Commands
```bash
# Build và test trước khi deploy
npm run build:all

# Deploy backend lên Render (theo hướng dẫn)
# Deploy frontend lên Vercel (theo hướng dẫn)
```

## 📋 Features

### Authentication Features
- ✅ **JWT Access & Refresh Tokens** - Secure authentication with dual token system
- ✅ **Automatic Token Refresh** - Seamless token renewal using Axios interceptors
- ✅ **Secure Token Storage** - Access tokens in memory, refresh tokens in localStorage
- ✅ **Protected Routes** - Route-level authentication guards
- ✅ **Multi-device Logout** - Logout from all devices functionality

### Technical Features
- ✅ **React Query Integration** - Efficient server state management with caching
- ✅ **React Hook Form** - Form handling with comprehensive validation
- ✅ **Toast Notifications** - User feedback with react-hot-toast
- ✅ **TypeScript** - Full type safety across frontend and backend
- ✅ **Responsive UI** - Mobile-friendly design with Tailwind CSS
- ✅ **Error Handling** - Comprehensive error management and user feedback

### Notification Features
- ✅ **Toast Notifications** - Real-time user feedback with react-hot-toast
- ✅ **Vietnamese Language Support** - All notifications in Vietnamese
- ✅ **Multiple Toast Types** - Success, Error, Info, Loading, Warning
- ✅ **Auto-dismiss** - Automatic dismissal after 4 seconds
- ✅ **Custom Styling** - Consistent design with app theme
- ✅ **Smart Positioning** - Top-center positioning for optimal UX

### Backend Features
- ✅ **NestJS** - Scalable Node.js server framework
- ✅ **MongoDB** - Database with Mongoose ODM
- ✅ **Passport JWT** - Authentication middleware
- ✅ **CORS Support** - Cross-origin resource sharing
- ✅ **Validation** - Input validation with class-validator

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for build tooling
- **React Router DOM** for routing
- **React Query (TanStack Query)** for server state
- **React Hook Form** for form management
- **Axios** for HTTP requests with interceptors
- **React Hot Toast** for notifications
- **Tailwind CSS** for styling

### Backend
- **NestJS** with TypeScript
- **MongoDB** with Mongoose
- **JWT & Passport** for authentication
- **bcrypt** for password hashing
- **class-validator** for input validation

## 📁 Project Structure

```
├── backend/                 # NestJS Backend
│   ├── src/
│   │   ├── auth/           # Authentication module
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── auth.module.ts
│   │   │   ├── dto/         # Data transfer objects
│   │   │   ├── schemas/     # Database schemas
│   │   │   └── strategies/  # Passport strategies
│   │   ├── user/           # User module
│   │   └── main.ts         # Application entry point
│   └── package.json
│
├── frontend/               # React Frontend
│   ├── src/
│   │   ├── api/           # API client and configuration
│   │   ├── components/    # Reusable components
│   │   ├── contexts/      # React contexts
│   │   ├── hooks/         # Custom hooks
│   │   ├── pages/         # Page components
│   │   ├── types/         # TypeScript type definitions
│   │   └── App.tsx        # Main App component
│   └── package.json
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- MongoDB database
- npm or yarn

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create `.env` file in backend directory:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   PORT=3000
   JWT_SECRET=your_super_secret_jwt_key_here_should_be_long_and_complex
   JWT_EXPIRES_IN=15m
   JWT_REFRESH_SECRET=your_super_secret_refresh_key_here_should_be_different_and_long
   JWT_REFRESH_EXPIRES_IN=7d
   ```

4. **Start the backend server**
   ```bash
   npm run start:dev
   ```

   Backend will be available at: http://localhost:3000

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create `.env` file in frontend directory:
   ```env
   VITE_API_BASE_URL=http://localhost:3000
   ```

4. **Start the frontend development server**
   ```bash
   npm run dev
   ```

   Frontend will be available at: http://localhost:5173

## 🔐 Authentication Flow

### Registration Flow
1. User submits registration form with email and password
2. Backend validates input and hashes password
3. User account is created in MongoDB
4. Automatic login after successful registration

### Login Flow
1. User submits email and password
2. Backend validates credentials
3. Server generates access token (15min) and refresh token (7d)
4. Access token stored in memory, refresh token in localStorage
5. User redirected to dashboard

### Token Refresh Flow
1. Access token expires during API request
2. Axios interceptor catches 401 error
3. Automatically calls refresh endpoint with refresh token
4. New access token generated and stored
5. Original request retried with new token
6. Seamless user experience without logout

### Logout Flow
1. User clicks logout button
2. Refresh token revoked in database
3. All tokens cleared from storage
4. User redirected to login page

## 🛡️ Security Features

- **Access Token**: Short-lived (15min), stored in memory
- **Refresh Token**: Long-lived (7d), stored in localStorage, revokable
- **Password Hashing**: bcrypt with salt rounds
- **CORS Protection**: Configured for cross-origin requests
- **Input Validation**: Server-side validation for all inputs
- **Error Handling**: Secure error messages without data leakage

## � Notification System

Ứng dụng sử dụng **react-hot-toast** để hiển thị thông báo thân thiện với người dùng:

### Authentication Notifications
- 🔄 **Loading**: "Đang đăng nhập...", "Đang tạo tài khoản...", "Đang đăng xuất..."
- ✅ **Success**: "Chào mừng [email]! Đăng nhập thành công.", "Tài khoản [email] đã được tạo thành công!"
- ❌ **Error**: "Đăng nhập thất bại: [lỗi]", "Đăng ký thất bại: [lỗi]"

### Validation Notifications
- 📧 **Invalid Email**: "Email không hợp lệ"
- 🔒 **Weak Password**: "Mật khẩu phải có ít nhất 6 ký tự"
- ⚠️ **Password Mismatch**: "Mật khẩu xác nhận không khớp"

### System Notifications
- 🔄 **Token Refresh Error**: "Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại."
- 🌐 **Network Error**: "Lỗi kết nối mạng. Vui lòng thử lại."
- 👋 **Welcome Message**: "🎉 Chào mừng bạn trở lại, [email]!"

### Notification Demo
Truy cập Dashboard sau khi đăng nhập để xem demo tất cả các loại notifications.

## 📱 Usage

1. **Visit the application**: http://localhost:5173
2. **Sign Up**: Create a new account with email and password
3. **Login**: Sign in with your credentials
4. **Dashboard**: Access protected dashboard with user information
5. **Test Notifications**: Use the notification demo section in dashboard
6. **Logout**: Sign out to clear all authentication data

## 🧪 Testing the Authentication

### Test Scenarios
- ✅ User registration with validation
- ✅ User login with valid/invalid credentials
- ✅ Access to protected routes
- ✅ Automatic token refresh on expiration
- ✅ Logout functionality
- ✅ Multi-device logout

### API Endpoints

#### Authentication Endpoints
- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `POST /auth/refresh` - Refresh access token
- `POST /auth/logout` - Logout (revoke refresh token)
- `GET /auth/profile` - Get user profile (protected)
- `POST /auth/logout-all` - Logout from all devices (protected)

## 🌐 Deployment

### Frontend Deployment
The React application can be deployed to:
- **Netlify** (recommended)
- **Vercel**
- **GitHub Pages**
- **Firebase Hosting**

Build command: `npm run build`

### Backend Deployment
The NestJS application can be deployed to:
- **Heroku**
- **Railway**
- **DigitalOcean**
- **AWS**

## 🌐 Deployment

### Production Ready
Ứng dụng đã được cấu hình sẵn sàng cho production deployment:

- **Backend**: Render.com
  - Auto-build from GitHub
  - Environment variables configuration
  - Health checks enabled
  - MongoDB Atlas integration

- **Frontend**: Vercel.com  
  - Zero-config deployment
  - Automatic HTTPS
  - Global CDN
  - Environment variables support

### Deployment Guide
📖 **[Complete Deployment Guide](./DEPLOYMENT.md)**

Hướng dẫn chi tiết deploy lên production với:
- ✅ Backend deployment lên Render
- ✅ Frontend deployment lên Vercel  
- ✅ Database setup với MongoDB Atlas
- ✅ Environment variables configuration
- ✅ CORS và security setup
- ✅ Troubleshooting guide

### One-Click Deploy

#### Backend (Render)
[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy)

#### Frontend (Vercel)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🙋‍♂️ Support

For questions or issues, please:
1. Check existing documentation
2. Review the [Deployment Guide](./DEPLOYMENT.md)
3. Check the troubleshooting section
4. Create an issue in the repository

---

**Happy coding! 🚀**