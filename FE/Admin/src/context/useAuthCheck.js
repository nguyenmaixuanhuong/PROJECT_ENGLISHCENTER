// useAuthCheck.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useAuthCheck = () => {
  const Navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem('isLogin'); // Đây là một ví dụ, bạn có thể thay đổi cách lưu trữ
    if (!isLoggedIn) {
      Navigate('/login')
    }
  }, [Navigate]);

  return;
};

export default useAuthCheck;