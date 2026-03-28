'use client';

import { useEffect, useRef } from 'react';

export default function MapPreview({ places = [], height = '300px' }) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    // Import leaflet động – chỉ chạy ở client
    const initMap = async () => {
      const L = await import('leaflet');
      await import('leaflet/dist/leaflet.css');

      // Fix missing marker icons in Next.js
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      });

      if (!mapRef.current) return;

      // Khởi tạo bản đồ nếu chưa có
      if (!mapInstanceRef.current) {
        mapInstanceRef.current = L.map(mapRef.current).setView([14.0583, 108.2772], 6);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; OpenStreetMap contributors',
        }).addTo(mapInstanceRef.current);
      }

      // Xóa marker cũ
      mapInstanceRef.current.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          mapInstanceRef.current.removeLayer(layer);
        }
      });

      // Thêm marker mới
      places.forEach((place) => {
        if (place.coordinates?.lat && place.coordinates?.lng) {
          const marker = L.marker([place.coordinates.lat, place.coordinates.lng])
            .bindPopup(`
              <b>${place.name}</b><br/>
              ${place.province || ''}<br/>
              <a href="/place/${place._id}">Xem chi tiết</a>
            `);
          marker.addTo(mapInstanceRef.current);
        }
      });
    };

    initMap();
  }, [places]);

  return <div ref={mapRef} style={{ height, width: '100%' }} />;
}