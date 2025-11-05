import toast from 'react-hot-toast';

// Custom toast configurations
const toastConfig = {
  duration: 4000,
  position: 'top-center' as const,
  style: {
    borderRadius: '8px',
    background: '#fff',
    color: '#333',
    fontSize: '14px',
    fontWeight: '500',
    padding: '16px 20px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
    border: '1px solid #e5e7eb',
  },
};

// Success toast
export const showSuccessToast = (message: string) => {
  return toast.success(message, {
    ...toastConfig,
    iconTheme: {
      primary: '#10b981',
      secondary: '#fff',
    },
    style: {
      ...toastConfig.style,
      borderColor: '#10b981',
    },
  });
};

// Error toast
export const showErrorToast = (message: string) => {
  return toast.error(message, {
    ...toastConfig,
    iconTheme: {
      primary: '#ef4444',
      secondary: '#fff',
    },
    style: {
      ...toastConfig.style,
      borderColor: '#ef4444',
    },
  });
};

// Loading toast
export const showLoadingToast = (message: string) => {
  return toast.loading(message, {
    ...toastConfig,
    style: {
      ...toastConfig.style,
      borderColor: '#3b82f6',
    },
  });
};

// Info toast
export const showInfoToast = (message: string) => {
  return toast(message, {
    ...toastConfig,
    icon: 'ℹ️',
    style: {
      ...toastConfig.style,
      borderColor: '#3b82f6',
    },
  });
};

// Dismiss all toasts
export const dismissAllToasts = () => {
  toast.dismiss();
};

// Promise toast for async operations
export const showPromiseToast = <T>(
  promise: Promise<T>,
  messages: {
    loading: string;
    success: string;
    error: string;
  }
) => {
  return toast.promise(
    promise,
    {
      loading: messages.loading,
      success: messages.success,
      error: messages.error,
    },
    toastConfig
  );
};

// Authentication specific toasts
export const authToasts = {
  loginLoading: () => showLoadingToast('Đang đăng nhập...'),
  loginSuccess: (email: string) => showSuccessToast(`Chào mừng ${email}! Đăng nhập thành công.`),
  loginError: (error: string) => showErrorToast(`Đăng nhập thất bại: ${error}`),
  
  registerLoading: () => showLoadingToast('Đang tạo tài khoản...'),
  registerSuccess: (email: string) => showSuccessToast(`Tài khoản ${email} đã được tạo thành công!`),
  registerError: (error: string) => showErrorToast(`Đăng ký thất bại: ${error}`),
  
  logoutLoading: () => showLoadingToast('Đang đăng xuất...'),
  logoutSuccess: () => showSuccessToast('Đăng xuất thành công!'),
  logoutError: () => showErrorToast('Có lỗi xảy ra khi đăng xuất'),
  
  tokenRefreshError: () => showErrorToast('Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.'),
  networkError: () => showErrorToast('Lỗi kết nối mạng. Vui lòng thử lại.'),
  
  passwordMismatch: () => showErrorToast('Mật khẩu xác nhận không khớp'),
  invalidEmail: () => showErrorToast('Email không hợp lệ'),
  weakPassword: () => showErrorToast('Mật khẩu phải có ít nhất 6 ký tự'),
};