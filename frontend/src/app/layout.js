import '../styles/globals.css';
import { AuthProvider } from '@/context/AuthContext';

export const metadata = {
  title: 'SkyTrip - Khám phá Việt Nam',
  description: 'Trang web du lịch hàng đầu Việt Nam',
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}