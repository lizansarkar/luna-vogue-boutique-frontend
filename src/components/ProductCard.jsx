import React from 'react';

export default function ProductCard({ 
  product, 
  onProductClick, 
  onAddToWishlist, 
  onAddToCart, 
  isWishlisted 
}) {
  const { id, name, price, category, rating, images, inStock } = product;

  // Render Star Ratings
  const renderStars = (ratingValue) => {
    const stars = [];
    const fullStars = Math.floor(ratingValue);
    const hasHalfStar = ratingValue % 1 !== 0;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<i key={i} className="fa-solid fa-star text-[10px] text-brand-gold"></i>);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<i key={i} className="fa-solid fa-star-half-stroke text-[10px] text-brand-gold"></i>);
      } else {
        stars.push(<i key={i} className="fa-regular fa-star text-[10px] text-brand-gold/40"></i>);
      }
    }
    return stars;
  };

  const handleWishlistToggle = (e) => {
    e.stopPropagation();
    onAddToWishlist(id);
  };

  const handleQuickAdd = (e) => {
    e.stopPropagation();
    if (!inStock) return;
    // Default size S, default first color
    onAddToCart(product, product.sizes?.[0] || 'S', product.colors?.[0] || 'Ivory', 1);
  };

  return (
    <div 
      onClick={() => onProductClick(id)}
      className="group relative flex flex-col bg-white overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 cursor-pointer"
    >
      
      {/* Product Image Frame */}
      <div className="relative aspect-[3/4] overflow-hidden bg-brand-ivory">
        
        {/* Out of Stock Label */}
        {!inStock && (
          <span className="absolute top-3 left-3 bg-brand-charcoal text-white text-[8px] uppercase tracking-widest font-sans font-medium px-2 py-1 z-10">
            Out of Stock
          </span>
        )}

        {/* Primary Image */}
        <img 
          src={images[0]} 
          alt={name}
          className={`w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105 ${
            images[1] ? 'group-hover:opacity-0' : ''
          }`}
          loading="lazy"
        />

        {/* Secondary Detail Image (Hover Swap) */}
        {images[1] && (
          <img 
            src={images[1]} 
            alt={`${name} alternative view`}
            className="absolute inset-0 w-full h-full object-cover object-top opacity-0 transition-all duration-700 ease-out group-hover:opacity-100 group-hover:scale-105"
            loading="lazy"
          />
        )}

        {/* Wishlist Floating Toggle */}
        <button 
          onClick={handleWishlistToggle}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 shadow-sm flex items-center justify-center text-brand-charcoal hover:text-red-500 hover:scale-105 transition-all duration-300 cursor-pointer z-10"
          aria-label={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
        >
          <i className={`${isWishlisted ? 'fa-solid fa-heart text-red-500' : 'fa-regular fa-heart'} text-sm`}></i>
        </button>

        {/* Quick Add To Cart Overlay Panel */}
        {inStock && (
          <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out bg-brand-charcoal/80 backdrop-blur-xs py-3 px-4 flex items-center justify-center z-10">
            <button
              onClick={handleQuickAdd}
              className="w-full bg-brand-gold text-white text-[10px] uppercase font-bold tracking-widest py-2 hover:bg-brand-gold-dark transition-colors duration-300 flex items-center justify-center space-x-2 cursor-pointer"
            >
              <i className="fa-solid fa-plus text-[9px]"></i>
              <span>Quick Add (S)</span>
            </button>
          </div>
        )}

      </div>

      {/* Product Content Details */}
      <div className="p-4 flex flex-col flex-grow justify-between bg-white text-center">
        <div>
          {/* Category */}
          <span className="text-[10px] uppercase tracking-widest text-brand-charcoal/40 font-sans font-medium">
            {category}
          </span>
          
          {/* Title */}
          <h3 className="font-serif text-sm font-semibold tracking-wide text-brand-charcoal mt-1 group-hover:text-brand-gold transition-colors duration-300 line-clamp-1">
            {name}
          </h3>
        </div>

        {/* Ratings and Pricing Row */}
        <div className="flex flex-col items-center mt-2.5">
          <div className="flex space-x-0.5 mb-1.5">
            {renderStars(rating)}
          </div>
          
          {/* Pricing */}
          <span className="font-sans text-sm font-semibold text-brand-charcoal/90">
            ${price.toFixed(2)}
          </span>
        </div>

      </div>

    </div>
  );
}
