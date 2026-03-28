import Link from 'next/link';
import Image from 'next/image';

export default function PlaceCard({ place }) {
  const {
    _id,
    name,
    images = [],
    province,
    avgRating = 0,
    totalReviews = 0,
    price,
  } = place;

  const imageUrl = images?.[0]; // chỉ lấy ảnh đầu nếu có

  return (
    <Link href={`/place/${_id}`} className="block group">
      <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div className="relative h-48 w-full overflow-hidden bg-gray-200">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              📷 No image
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-bold text-lg mb-1 truncate">{name}</h3>
          {province && <p className="text-gray-500 text-sm mb-2">{province}</p>}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <span className="text-yellow-500">★</span>
              <span className="font-medium">{avgRating.toFixed(1)}</span>
              <span className="text-gray-400 text-sm">({totalReviews})</span>
            </div>
            {price && (
              <div className="text-right">
                <span className="text-sm text-gray-500">Từ</span>
                <span className="font-bold text-blue-600 ml-1">
                  {price.toLocaleString()}đ
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}