# ✅ Pre-Deploy Checklist

Kiểm tra các items sau trước khi deploy:

## 🔧 Backend Checklist

### Code & Configuration
- [ ] `package.json` có scripts `render-build` và `render-start`
- [ ] Environment variables được config trong code (JWT secrets, MongoDB URI)
- [ ] CORS settings cho phép frontend domain
- [ ] Health check endpoint (`/health`) hoạt động
- [ ] Build thành công: `npm run build`

### Security
- [ ] JWT_SECRET và JWT_REFRESH_SECRET đủ mạnh (32+ characters)
- [ ] MongoDB Atlas whitelist IP addresses
- [ ] Không commit sensitive data vào git
- [ ] Password hashing with bcrypt hoạt động

### Database
- [ ] MongoDB Atlas cluster được tạo
- [ ] Database user được tạo với quyền read/write
- [ ] Connection string đã test thành công
- [ ] Indexes được tạo cho User collection

## 🎨 Frontend Checklist

### Code & Configuration
- [ ] `VITE_API_BASE_URL` environment variable
- [ ] Build thành công: `npm run build`
- [ ] React Router setup với protected routes
- [ ] API client với interceptors hoạt động

### Dependencies
- [ ] Tất cả packages trong `package.json` đều cần thiết
- [ ] No deprecated packages
- [ ] Bundle size reasonable (<1MB)

### Features
- [ ] Login/Register forms hoạt động
- [ ] Token refresh tự động
- [ ] Protected routes redirect đúng
- [ ] Toast notifications hiển thị
- [ ] Logout clear tokens

## 🌐 General Checklist

### Repository
- [ ] Code được push lên GitHub
- [ ] `.env` files KHÔNG được commit
- [ ] `.gitignore` đầy đủ
- [ ] README.md updated với deployment info

### Documentation
- [ ] DEPLOYMENT.md guide hoàn chỉnh
- [ ] Environment variables documented
- [ ] API endpoints documented

### Testing
- [ ] Manual testing complete trên localhost
- [ ] Authentication flow tested end-to-end
- [ ] Error handling tested
- [ ] Mobile responsive tested

## 🚀 Ready to Deploy?

Nếu tất cả ✅ đều checked, bạn đã sẵn sàng deploy!

### Next Steps:
1. Follow `DEPLOYMENT.md` guide
2. Deploy backend lên Render
3. Deploy frontend lên Vercel  
4. Test production URLs
5. Update README với live URLs

**Good luck! 🍀**