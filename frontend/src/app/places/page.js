"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { Search, Star } from "lucide-react";

export default function PlacesPage() {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { user } = useAuth();

  const categories = [
    { value: "", label: "Tất cả" },
    { value: "beach", label: "Biển" },
    { value: "mountain", label: "Núi" },
    { value: "city", label: "Thành phố" },
    { value: "culture", label: "Văn hóa" },
    { value: "food", label: "Ẩm thực" },
    { value: "spiritual", label: "Tâm linh" },
  ];

  useEffect(() => {
    fetchPlaces();
  }, [search, category, currentPage]);

  const fetchPlaces = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: currentPage,
        limit: 12,
        ...(search && { search }),
        ...(category && { category }),
      });
      const res = await fetch(`/api/places?${params}`);
      const data = await res.json();
      setPlaces(data.places);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Failed to fetch places:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchPlaces();
  };

  const handleCategoryChange = (cat) => {
    setCategory(cat);
    setCurrentPage(1);
  };

  // Style
  const containerStyle = {
    maxWidth: "1280px",
    margin: "0 auto",
    padding: "32px 24px",
  };

  const titleStyle = {
    fontSize: "2rem",
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: "24px",
  };

  const searchContainerStyle = {
    display: "flex",
    gap: "12px",
    marginBottom: "32px",
    flexWrap: "wrap",
  };

  const inputStyle = {
    flex: 1,
    padding: "12px 20px",
    borderRadius: "40px",
    border: "1px solid #e2e8f0",
    outline: "none",
    fontSize: "1rem",
  };

  const buttonStyle = {
    backgroundColor: "#f97316",
    color: "white",
    padding: "12px 24px",
    borderRadius: "40px",
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  };

  const categoryFilterStyle = {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
    marginBottom: "32px",
  };

  const categoryBtnStyle = (isActive) => ({
    padding: "8px 20px",
    borderRadius: "40px",
    border: isActive ? "1px solid #f97316" : "1px solid #e2e8f0",
    backgroundColor: isActive ? "#f97316" : "white",
    color: isActive ? "white" : "#374151",
    cursor: "pointer",
    transition: "all 0.2s",
  });

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "24px",
    marginBottom: "40px",
  };

  const cardStyle = {
    backgroundColor: "white",
    borderRadius: "16px",
    overflow: "hidden",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    transition: "transform 0.2s, box-shadow 0.2s",
    cursor: "pointer",
  };

  const imageStyle = {
    width: "100%",
    height: "180px",
    objectFit: "cover",
  };

  const cardContentStyle = {
    padding: "16px",
  };

  const placeNameStyle = {
    fontSize: "1.1rem",
    fontWeight: "bold",
    marginBottom: "6px",
    color: "#1f2937",
  };

  const placeAddressStyle = {
    fontSize: "0.85rem",
    color: "#6b7280",
    marginBottom: "8px",
  };

  const ratingStyle = {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    color: "#f97316",
    fontSize: "0.9rem",
  };

  const paginationStyle = {
    display: "flex",
    justifyContent: "center",
    gap: "12px",
    marginTop: "32px",
  };

  const pageBtnStyle = (isActive) => ({
    padding: "8px 16px",
    borderRadius: "8px",
    backgroundColor: isActive ? "#f97316" : "white",
    color: isActive ? "white" : "#374151",
    border: "1px solid #e2e8f0",
    cursor: "pointer",
  });

  return (
    <div style={{ minHeight: "100vh", background: "#f9fafb" }}>
      <div style={containerStyle}>
        <h1 style={titleStyle}>Khám phá địa điểm</h1>

        {/* Tìm kiếm */}
        <form onSubmit={handleSearch} style={searchContainerStyle}>
          <input
            type="text"
            placeholder="Tìm kiếm địa điểm..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={inputStyle}
          />
          <button type="submit" style={buttonStyle}>
            <Search size={18} /> Tìm kiếm
          </button>
        </form>

        {/* Bộ lọc danh mục */}
        <div style={categoryFilterStyle}>
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => handleCategoryChange(cat.value)}
              style={categoryBtnStyle(category === cat.value)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Danh sách địa điểm */}
        {loading ? (
          <div style={{ textAlign: "center", padding: "40px" }}>Đang tải...</div>
        ) : places.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px" }}>
            Không tìm thấy địa điểm phù hợp.
          </div>
        ) : (
          <>
            <div style={gridStyle}>
              {places.map((place) => (
                <Link href={`/places/${place._id}`} key={place._id} style={{ textDecoration: "none" }}>
                  <div
                    style={cardStyle}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-4px)")}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
                  >
                    <img src={place.image} alt={place.name} style={imageStyle} />
                    <div style={cardContentStyle}>
                      <div style={placeNameStyle}>{place.name}</div>
                      <div style={placeAddressStyle}>{place.address}</div>
                      <div style={ratingStyle}>
                        <Star size={14} fill="#f97316" stroke="none" />
                        {place.rating} ({place.viewCount} lượt xem)
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Phân trang */}
            {totalPages > 1 && (
              <div style={paginationStyle}>
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  style={pageBtnStyle(false)}
                >
                  Trước
                </button>
                <span style={{ padding: "8px 16px" }}>
                  Trang {currentPage} / {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  style={pageBtnStyle(false)}
                >
                  Sau
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}