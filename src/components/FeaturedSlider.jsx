import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import ProductCard from './ProductCard';

// Swiper CSS imports
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function FeaturedSlider({ 
  products, 
  onProductClick, 
  onAddToWishlist, 
  onAddToCart, 
  wishlist 
}) {
  
  // Filter products for the home page slider (e.g. products marked as featured, or just first 6)
  const featuredProducts = products.slice(0, 6);

  return (
    <section className="py-20 bg-white font-sans">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Editorial Section Header */}
        <div className="text-center mb-12">
          <span className="text-brand-gold text-xs uppercase tracking-[0.25em] font-bold block mb-2">
            Seasonal Favorites
          </span>
          <h2 className="font-serif text-3xl lg:text-4xl font-bold tracking-wide text-brand-charcoal">
            The Featured Collection
          </h2>
          <div className="w-12 h-0.5 bg-brand-gold mx-auto mt-4"></div>
        </div>

        {/* Swiper Slider Container */}
        <div className="relative premium-slider-wrapper">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            autoplay={{
              delay: 4500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true
            }}
            pagination={{ 
              clickable: true,
              dynamicBullets: true
            }}
            navigation={{
              nextEl: '.swiper-button-next-custom',
              prevEl: '.swiper-button-prev-custom'
            }}
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 20 },
              1024: { slidesPerView: 3, spaceBetween: 24 },
              1280: { slidesPerView: 4, spaceBetween: 24 }
            }}
            className="pb-14"
          >
            {featuredProducts.map((product) => (
              <SwiperSlide key={product.id}>
                <ProductCard 
                  product={product}
                  onProductClick={onProductClick}
                  onAddToWishlist={onAddToWishlist}
                  onAddToCart={onAddToCart}
                  isWishlisted={wishlist.includes(product.id)}
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Sleek Slider Navigation Buttons */}
          <button 
            className="swiper-button-prev-custom absolute top-[40%] -left-4 lg:-left-12 w-10 h-10 rounded-full border border-brand-charcoal/10 bg-white flex items-center justify-center text-brand-charcoal hover:border-brand-gold hover:text-brand-gold transition-all duration-300 z-10 shadow-sm cursor-pointer hover:scale-105 active:scale-95 hidden md:flex"
            aria-label="Previous Slide"
          >
            <i className="fa-solid fa-chevron-left text-xs"></i>
          </button>
          <button 
            className="swiper-button-next-custom absolute top-[40%] -right-4 lg:-right-12 w-10 h-10 rounded-full border border-brand-charcoal/10 bg-white flex items-center justify-center text-brand-charcoal hover:border-brand-gold hover:text-brand-gold transition-all duration-300 z-10 shadow-sm cursor-pointer hover:scale-105 active:scale-95 hidden md:flex"
            aria-label="Next Slide"
          >
            <i className="fa-solid fa-chevron-right text-xs"></i>
          </button>
        </div>

      </div>
    </section>
  );
}
