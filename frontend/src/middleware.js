import { NextResponse } from 'next/server';

export function middleware(request) {
  const token = request.cookies.get('token')?.value || request.headers.get('authorization')?.replace('Bearer ', '');
  const { pathname } = request.nextUrl;

  // Các route công khai
  const publicPaths = ['/login', '/register'];
  if (publicPaths.includes(pathname)) {
    if (token) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    return NextResponse.next();
  }

  // Route admin yêu cầu role admin (sẽ kiểm tra thêm ở client)
  if (pathname.startsWith('/admin')) {
    // Nếu không có token, redirect login
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    // Ở đây chỉ redirect nếu chưa đăng nhập, role sẽ được kiểm tra ở client component
  }

  // Các route cần đăng nhập (trang cá nhân, yêu thích...)
  const protectedPaths = ['/profile', '/favorites'];
  if (protectedPaths.some(p => pathname.startsWith(p))) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};