import { NextRequest, NextResponse } from 'next/server';

export function middleware(req) {
  // Lấy cookie tên "user" từ request
  const userCookie = req.cookies.get('userId');

  // Kiểm tra nếu request đến từ đường dẫn `/exams`
  if (req.nextUrl.pathname.startsWith('/exams')) {
    // Nếu không có cookie "user", chuyển hướng đến trang chủ
    if (userCookie && userCookie.value === 'null') {
      return NextResponse.redirect(new URL('/', req.url));
    }
  }

  // Trả về tiếp tục request nếu mọi thứ hợp lệ
  return NextResponse.next();
}

// Định nghĩa các đường dẫn mà middleware sẽ áp dụng
export const config = {
  matcher: ['/exams/:path*'], // Áp dụng middleware cho tất cả các đường dẫn bắt đầu bằng `/exams`
};
