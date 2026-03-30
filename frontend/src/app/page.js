"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from '@/context/AuthContext';
import { Home as HomeIcon, MapPin, Map, Info, LogIn, UserPlus, ChevronLeft, ChevronRight, Play, User } from 'lucide-react';

export default function Home() {
  const { user, logout } = useAuth(); // Lấy user và logout từ AuthContext

  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    '/image/03.jpg',
    '/image/04.jpg',
    '/image/05.jpg',
    '/image/06.jpg',
    '/image/07.jpg',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Header style (giữ nguyên)
  const headerContainerStyle = {
    position: 'sticky',
    top: 0,
    zIndex: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(8px)',
    borderBottom: '1px solid #e2e8f0',
    overflowX: 'auto',
    whiteSpace: 'nowrap',
  };

  const innerStyle = {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '0 24px',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '64px',
    gap: '16px',
  };

  const buttonMenuStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 12px',
    background: 'transparent',
    border: 'none',
    borderRadius: '8px',
    color: '#000000',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    fontSize: '1rem',
    transition: 'all 0.2s',
    textDecoration: 'none',
  };

  // Style cho nút đăng nhập (khi chưa đăng nhập)
  const loginBtnStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 12px',
    background: '#f97316',
    border: 'none',
    borderRadius: '8px',
    color: '#ffffff',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    fontSize: '1rem',
    transition: 'all 0.2s',
    textDecoration: 'none',
  };

  const registerBtnStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 12px',
    background: '#ffffff',
    border: '1px solid #f97316',
    borderRadius: '8px',
    color: '#f97316',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    fontSize: '1rem',
    transition: 'all 0.2s',
    textDecoration: 'none',
  };

  // Style cho tên user và nút đăng xuất
  const userInfoStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 12px',
    color: '#000000',
    whiteSpace: 'nowrap',
    fontSize: '1rem',
  };

  const logoutBtnStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 12px',
    background: '#f97316',
    border: 'none',
    borderRadius: '8px',
    color: '#ffffff',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    fontSize: '1rem',
    transition: 'all 0.2s',
  };

  const logoStyle = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#f97316',
  };

  const categoryButtonStyle = {
    ...buttonMenuStyle,
    padding: '8px 16px',
    fontWeight: '500',
  };

  const categories = [
    'Khu vực phổ biến',
    'Điểm đến phổ biến',
    'Địa danh phổ biến',
    'Khám phá SkyTrip'
  ];

  // Carousel
  const carouselContainerStyle = {
    position: 'relative',
    width: '100%',
    height: '65vh',
    overflow: 'hidden',
  };

  const slideStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundImage: `url(${images[currentIndex]})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    transition: 'background-image 0.5s ease-in-out',
  };

  const overlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
    zIndex: 2,
  };

  const contentStyle = {
    position: 'relative',
    zIndex: 3,
    maxWidth: '1280px',
    margin: '0 auto',
    textAlign: 'left',
    padding: '0 24px',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  };

  const titleStyle = {
    fontSize: '3.5rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
    color: '#ffffff',
    textShadow: '2px 2px 8px rgba(0,0,0,0.5)',
  };

  const descriptionStyle = {
    fontSize: '1.35rem',
    color: '#ffffff',
    maxWidth: '42rem',
    margin: '0 0 2rem 0',
    textShadow: '1px 1px 4px rgba(0,0,0,0.5)',
  };

  const searchContainerStyle = {
    display: 'flex',
    justifyContent: 'flex-start',
    gap: '1rem',
    flexWrap: 'wrap',
  };

  const inputStyle = {
    width: '30rem',
    padding: '0.75rem 1.5rem',
    borderRadius: '14px',
    border: '1px solid #d1d5db',
    outline: 'none',
    backgroundColor: 'white',
    color: '#1f2937',
  };

  const searchButtonStyle = {
    backgroundColor: '#f97316',
    color: 'white',
    padding: '0.75rem 2rem',
    borderRadius: '12px',
    border: 'none',
    cursor: 'pointer',
  };

  const arrowButtonStyle = {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    backgroundColor: 'rgba(0,0,0,0.5)',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    zIndex: 4,
    transition: 'background-color 0.2s',
  };

  const leftArrowStyle = {
    ...arrowButtonStyle,
    left: '20px',
  };

  const rightArrowStyle = {
    ...arrowButtonStyle,
    right: '20px',
  };

  const dotsContainerStyle = {
    position: 'absolute',
    bottom: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    gap: '10px',
    zIndex: 4,
  };

  const dotStyle = (isActive) => ({
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    backgroundColor: isActive ? '#f97316' : 'rgba(255,255,255,0.5)',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  });

  // Phần ưu đãi
  const offersContainerStyle = {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '48px 24px 24px 24px',
  };

  const offersTitleStyle = {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'left',
    marginBottom: '24px',
  };

  const offersGridStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '24px',
    justifyContent: 'space-between',
  };

  const offerCardStyle = {
    flex: '1',
    minWidth: '200px',
    backgroundColor: 'white',
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    transition: 'transform 0.2s, box-shadow 0.2s',
    cursor: 'pointer',
  };

  const offerImageStyle = {
    width: '100%',
    height: '180px',
    objectFit: 'cover',
  };

  const offerContentStyle = {
    padding: '16px',
  };

  const offerCardTitleStyle = {
    fontSize: '1.1rem',
    fontWeight: 'bold',
    marginBottom: '8px',
    color: '#1f2937',
  };

  const offerDescStyle = {
    fontSize: '0.9rem',
    color: '#6b7280',
  };

  const offers = [
    { image: '/image/08.jpg', title: 'Ưu đãi đặc biệt', desc: 'Giảm 30% cho đặt phòng đầu tiên' },
    { image: '/image/09.jpg', title: 'Tour hè 2025', desc: 'Combo tiết kiệm lên đến 1.000.000đ' },
    { image: '/image/10.jpg', title: 'Vé máy bay giá rẻ', desc: 'Bay khắp Đông Nam Á chỉ từ 99k' },
    { image: '/image/11.jpg', title: 'Khám phá văn hóa', desc: 'Trải nghiệm bản địa độc đáo' },
  ];

  // Phần Bạn muốn đi đâu chơi?
  const sectionStyle = {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '48px 24px 24px 24px',
  };

  const sectionHeaderStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: '24px',
  };

  const sectionTitleStyle = {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#000000',
  };

  const seeMoreStyle = {
    fontSize: '0.9rem',
    color: '#f97316',
    textDecoration: 'none',
    cursor: 'pointer',
    fontWeight: '500',
  };

  const videoGridStyle = {
    display: 'flex',
    overflowX: 'auto',
    gap: '20px',
    paddingBottom: '8px',
    scrollbarWidth: 'thin',
  };

  const videoCardStyle = {
    flex: '0 0 auto',
    width: '320px',
    backgroundColor: 'white',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    transition: 'transform 0.2s, box-shadow 0.2s',
    cursor: 'pointer',
  };

  const videoThumbStyle = {
    position: 'relative',
    width: '100%',
    height: '200px',
    backgroundColor: '#e5e7eb',
    overflow: 'hidden',
  };

  const videoImageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  };

  const playIconStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: '50%',
    padding: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const videos = [
    { image: '/image/video1.jpg' },
    { image: '/image/video2.jpg' },
    { image: '/image/video3.jpg' },
    { image: '/image/video4.jpg' },
    { image: '/image/video5.jpg' },
    { image: '/image/video6.jpg' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom right, #f8fafc, #eff6ff)' }}>
      <div style={headerContainerStyle}>
        <div style={innerStyle}>
          <div style={logoStyle}>SkyTrip</div>
          <div style={{ display: 'flex', gap: '4px', flexWrap: 'nowrap' }}>
  <Link href="/" style={buttonMenuStyle}><HomeIcon size={18} /> Trang chủ</Link>
  <Link href="/places" style={buttonMenuStyle}><MapPin size={18} /> Địa điểm</Link>
  <Link href="/map" style={buttonMenuStyle}><Map size={18} /> Bản đồ</Link>
  <Link href="/about" style={buttonMenuStyle}><Info size={18} /> Giới thiệu</Link>
            {/* Phần Auth: hiển thị user nếu đã đăng nhập */}
            {user ? (
              <>
                <div style={userInfoStyle}>
                  <User size={18} /> {user.name || user.email}
                </div>
                <button onClick={logout} style={logoutBtnStyle}>
                  Đăng xuất
                </button>
              </>
            ) : (
              <>
                <Link href="/login" style={loginBtnStyle}><LogIn size={18} /> Đăng nhập</Link>
                <Link href="/register" style={registerBtnStyle}><UserPlus size={18} /> Đăng ký</Link>
              </>
            )}
          </div>
        </div>
      </div>

           {/* Khung trắng 4 mục */}
      <div style={{ backgroundColor: 'white', boxShadow: '0 1px 3px 0 rgba(0,0,0,0.05)', borderBottom: '1px solid #eef2f6' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '12px 24px' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'flex-start' }}>
            {categories.map((cat) => (
              <Link
                key={cat}
                href={`/places?category=${encodeURIComponent(cat)}`}
                style={categoryButtonStyle}
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Carousel */}
      <div style={carouselContainerStyle}>
        <div style={slideStyle}></div>
        <div style={overlayStyle}></div>
        <div style={contentStyle}>
          <h1 style={titleStyle}>THẾ GIỚI TRỌN NIỀM VUI</h1>
          <p style={descriptionStyle}>
            Khám phá niềm vui của bạn mọi lúc, mọi nơi - từ chuyến du lịch ngẫu hứng tới những cuộc phiêu lưu khắp thế giới
          </p>
          <div style={searchContainerStyle}>
            <input type="text" placeholder="Bạn muốn đi đâu?" style={inputStyle} />
            <button style={searchButtonStyle}>Tìm kiếm</button>
          </div>
        </div>
        <button onClick={prevSlide} style={leftArrowStyle}><ChevronLeft size={24} /></button>
        <button onClick={nextSlide} style={rightArrowStyle}><ChevronRight size={24} /></button>
        <div style={dotsContainerStyle}>
          {images.map((_, idx) => (
            <div key={idx} style={dotStyle(currentIndex === idx)} onClick={() => setCurrentIndex(idx)} />
          ))}
        </div>
      </div>

      {/* Ưu đãi dành cho bạn */}
      <div style={offersContainerStyle}>
        <h2 style={offersTitleStyle}>Ưu đãi dành cho bạn</h2>
        <div style={offersGridStyle}>
          {offers.map((offer, idx) => (
            <div
              key={idx}
              style={offerCardStyle}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-5px)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
            >
              <img src={offer.image} alt={offer.title} style={offerImageStyle} />
              <div style={offerContentStyle}>
                <h3 style={offerCardTitleStyle}>{offer.title}</h3>
                <p style={offerDescStyle}>{offer.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Phần Bạn muốn đi đâu chơi? */}
      <div style={sectionStyle}>
        <div style={sectionHeaderStyle}>
          <h2 style={sectionTitleStyle}>Bạn muốn đi đâu chơi?</h2>
          <Link href="#" style={seeMoreStyle}>Xem thêm →</Link>
        </div>
        <div style={videoGridStyle}>
          {videos.map((video, idx) => (
            <div
              key={idx}
              style={videoCardStyle}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-4px)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
            >
              <div style={videoThumbStyle}>
                <img src={video.image} alt="video" style={videoImageStyle} />
                <div style={playIconStyle}>
                  <Play size={32} color="white" fill="white" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}