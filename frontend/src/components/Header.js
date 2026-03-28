'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function Header() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          SkyTrip
        </Link>

        <nav className="hidden md:flex space-x-8">
          <Link href="/" className="text-gray-700 hover:text-blue-600 transition">Trang chủ</Link>
          <Link href="/places" className="text-gray-700 hover:text-blue-600 transition">Địa điểm</Link>
          <Link href="/map" className="text-gray-700 hover:text-blue-600 transition">Bản đồ</Link>
          <Link href="/about" className="text-gray-700 hover:text-blue-600 transition">Giới thiệu</Link>
        </nav>

        <div className="hidden md:flex space-x-4">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center space-x-2 focus:outline-none"
              >
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center">
                  {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <span className="text-gray-700">{user.name || 'User'}</span>
              </button>
              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-10">
                  <Link href="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Hồ sơ</Link>
                  <Link href="/favorites" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Yêu thích</Link>
                  {user.role === 'admin' && (
                    <Link href="/admin/dashboard" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Quản trị</Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Đăng xuất
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link href="/login" className="px-4 py-2 text-gray-700 hover:text-blue-600 transition">Đăng nhập</Link>
              <Link href="/register" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">Đăng ký</Link>
            </>
          )}
        </div>

        <button
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="flex flex-col p-4 space-y-3">
            <Link href="/" className="text-gray-700 hover:text-blue-600">Trang chủ</Link>
            <Link href="/places" className="text-gray-700 hover:text-blue-600">Địa điểm</Link>
            <Link href="/map" className="text-gray-700 hover:text-blue-600">Bản đồ</Link>
            <Link href="/about" className="text-gray-700 hover:text-blue-600">Giới thiệu</Link>
            {user ? (
              <>
                <Link href="/profile" className="text-gray-700 hover:text-blue-600">Hồ sơ</Link>
                <Link href="/favorites" className="text-gray-700 hover:text-blue-600">Yêu thích</Link>
                {user.role === 'admin' && (
                  <Link href="/admin/dashboard" className="text-gray-700 hover:text-blue-600">Quản trị</Link>
                )}
                <button onClick={handleLogout} className="text-left text-gray-700 hover:text-blue-600">Đăng xuất</button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-gray-700 hover:text-blue-600">Đăng nhập</Link>
                <Link href="/register" className="text-gray-700 hover:text-blue-600">Đăng ký</Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}