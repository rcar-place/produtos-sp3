// ============================================
// SP3 CONECTORES — ProductGallery Component
// ============================================

import { useState, memo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs, FreeMode } from 'swiper/modules';
import LazyImage from '../common/LazyImage';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/free-mode';
import './ProductGallery.css';

/**
 * Product image gallery with Swiper
 * @param {Object} props
 * @param {Array} props.images
 * @param {string} props.productName
 */
function ProductGallery({ images = [], productName = '', galleryId = 'product-gallery' }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  // Use placeholder if no images
  const displayImages = images.length > 0
    ? images
    : ['/images/placeholder.jpg'];

  return (
    <div className="product-gallery" id={galleryId}>
      {/* Main Image */}
      <Swiper
        modules={[Navigation, Thumbs, FreeMode]}
        navigation
        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
        className="product-gallery__main"
        spaceBetween={0}
        slidesPerView={1}
      >
        {displayImages.map((img, i) => (
          <SwiperSlide key={i}>
            <div className="product-gallery__slide">
              <LazyImage
                src={img}
                alt={`${productName} - Imagem ${i + 1}`}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Thumbnails */}
      {displayImages.length > 1 && (
        <Swiper
          modules={[FreeMode, Thumbs]}
          onSwiper={setThumbsSwiper}
          spaceBetween={12}
          slidesPerView={4}
          freeMode
          watchSlidesProgress
          className="product-gallery__thumbs"
        >
          {displayImages.map((img, i) => (
            <SwiperSlide key={i}>
              <div className="product-gallery__thumb">
                <LazyImage
                  src={img}
                  alt={`${productName} - Miniatura ${i + 1}`}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}

export default memo(ProductGallery);
