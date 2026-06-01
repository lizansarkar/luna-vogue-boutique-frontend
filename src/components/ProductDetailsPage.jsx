import React, { useState, useEffect } from 'react';

export default function ProductDetailsPage({ 
  productId, 
  products, 
  onAddToCart, 
  onAddToWishlist, 
  wishlist,
  setActivePage 
}) {
  const product = products.find((p) => p.id === productId);

  if (!product) {
    return (
      <div className="py-20 text-center font-sans">
        <i className="fa-solid fa-triangle-exclamation text-brand-gold text-4xl mb-4"></i>
        <h2 className="font-serif text-xl font-bold text-brand-charcoal mb-4">Garment Not Found</h2>
        <button
          onClick={() => setActivePage('shop')}
          className="bg-brand-charcoal text-white text-xs uppercase tracking-widest py-3 px-8 hover:bg-brand-gold transition-colors cursor-pointer"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  const { id, name, price, category, rating, images, sizes, colors, fabric, care, description, inStock } = product;

  // Local interaction states
  const [activeImage, setActiveImage] = useState(images[0]);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  
  const [accordions, setAccordions] = useState({
    details: true,
    fabric: false,
    shipping: false,
  });

  // Set default selected values on mount or product change
  useEffect(() => {
    setActiveImage(images[0]);
    if (sizes && sizes.length > 0) setSelectedSize(sizes[0]);
    if (colors && colors.length > 0) setSelectedColor(colors[0]);
  }, [productId, product]);

  const toggleAccordion = (section) => {
    setAccordions((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleAddToWishlist = () => {
    onAddToWishlist(id);
  };

  const handleAddToCart = () => {
    if (!inStock) return;
    onAddToCart(product, selectedSize, selectedColor, 1);
    setSuccessMessage('Garment added to your bag.');
    setTimeout(() => setSuccessMessage(''), 4000);
  };

  // Star ratings builder
  const renderStars = (val) => {
    const stars = [];
    const fullStars = Math.floor(val);
    const hasHalf = val % 1 !== 0;
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<i key={i} className="fa-solid fa-star text-[11px] text-brand-gold"></i>);
      } else if (i === fullStars + 1 && hasHalf) {
        stars.push(<i key={i} className="fa-solid fa-star-half-stroke text-[11px] text-brand-gold"></i>);
      } else {
        stars.push(<i key={i} className="fa-regular fa-star text-[11px] text-brand-gold/30"></i>);
      }
    }
    return stars;
  };

  const isWishlisted = wishlist.includes(id);

  return (
    <div className="py-16 bg-[#F8F5F2] font-sans">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center space-x-2 text-[10px] uppercase tracking-widest text-brand-charcoal/40 mb-10">
          <button onClick={() => setActivePage('home')} className="hover:text-brand-gold cursor-pointer">Home</button>
          <i className="fa-solid fa-chevron-right text-[8px]"></i>
          <button onClick={() => setActivePage('shop')} className="hover:text-brand-gold cursor-pointer">Shop</button>
          <i className="fa-solid fa-chevron-right text-[8px]"></i>
          <span className="text-brand-charcoal/70 font-semibold">{category}</span>
        </div>

        {/* Product Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* LEFT: GALLERY PORTRAIT (lg:col-span-7) */}
          <div className="lg:col-span-7 flex flex-col md:flex-row-reverse gap-4">
            
            {/* Main Active Image Viewer */}
            <div className="relative aspect-[3/4] w-full bg-white overflow-hidden border border-brand-charcoal/5 flex-grow">
              <img 
                src={activeImage} 
                alt={`${name} portrait view`} 
                className="w-full h-full object-cover object-top"
              />
              {!inStock && (
                <span className="absolute top-4 left-4 bg-brand-charcoal text-white text-[9px] uppercase tracking-widest font-sans font-medium px-3 py-1">
                  Sold Out
                </span>
              )}
            </div>

            {/* Gallery Thumbnail Strip */}
            <div className="flex md:flex-col gap-3.5 shrink-0 overflow-x-auto md:overflow-x-visible no-scrollbar pb-2 md:pb-0">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`relative aspect-[3/4] w-16 md:w-20 overflow-hidden bg-white border cursor-pointer shrink-0 ${
                    activeImage === img
                      ? 'border-brand-gold ring-1 ring-brand-gold'
                      : 'border-brand-charcoal/10 hover:border-brand-gold/60'
                  }`}
                  aria-label={`View thumbnail ${idx + 1}`}
                >
                  <img 
                    src={img} 
                    alt={`Thumbnail view ${idx + 1}`} 
                    className="w-full h-full object-cover object-top"
                  />
                </button>
              ))}
            </div>

          </div>

          {/* RIGHT: GARMENT CONFIGURATION (lg:col-span-5) */}
          <div className="lg:col-span-5 flex flex-col space-y-8">
            
            {/* Brand Category, Rating & Title */}
            <div>
              <span className="text-brand-gold text-[10px] uppercase tracking-[0.25em] font-bold block mb-1">
                {category}
              </span>
              <h2 className="font-serif text-3xl font-bold tracking-wide text-brand-charcoal leading-tight">
                {name}
              </h2>
              
              <div className="flex items-center space-x-3 mt-3">
                <div className="flex space-x-0.5">
                  {renderStars(rating)}
                </div>
                <span className="text-[10px] text-brand-charcoal/40 uppercase tracking-widest font-semibold">
                  {rating.toFixed(1)} / 5.0 (42 reviews)
                </span>
              </div>
            </div>

            {/* Pricing Section */}
            <div className="border-y border-brand-charcoal/10 py-4 flex items-center justify-between">
              <span className="text-xs uppercase tracking-widest text-brand-charcoal/50 font-bold">Price</span>
              <span className="text-xl font-bold text-brand-charcoal">
                ${price.toFixed(2)}
              </span>
            </div>

            {/* Editorial Description Snippet */}
            <p className="text-xs lg:text-sm text-brand-charcoal/70 leading-relaxed font-light">
              {description}
            </p>

            {/* Selection Inputs Area */}
            <div className="space-y-6 pt-2">
              
              {/* Color Swatch Selectors */}
              <div className="flex flex-col space-y-2">
                <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-widest text-brand-charcoal/50">
                  <span>Selected Color</span>
                  <span className="text-brand-gold font-bold">{selectedColor}</span>
                </div>
                <div className="flex space-x-3">
                  {colors.map((color) => {
                    // Match simple color codes for visual indicators
                    const bgClass = 
                      color === 'Ivory' ? 'bg-[#FDFBF7]' : 
                      color === 'Charcoal' ? 'bg-[#374151]' :
                      color === 'Caramel' ? 'bg-[#A16207]' :
                      color === 'Black' ? 'bg-[#111827]' :
                      color === 'Olive' ? 'bg-[#3F6212]' :
                      color === 'Sage' ? 'bg-[#708238]' : 'bg-[#D4A373]';

                    return (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        title={color}
                        className={`w-6 h-6 rounded-full border cursor-pointer transition-all duration-300 ${bgClass} ${
                          selectedColor === color
                            ? 'ring-2 ring-brand-gold border-white scale-110'
                            : 'border-brand-charcoal/15 hover:scale-105'
                        }`}
                        aria-label={`Select color ${color}`}
                      ></button>
                    );
                  })}
                </div>
              </div>

              {/* Size Selectors & Size Guide */}
              <div className="flex flex-col space-y-2">
                <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-widest text-brand-charcoal/50">
                  <span>Select Size</span>
                  <button 
                    onClick={() => setSizeGuideOpen(true)}
                    className="text-brand-gold hover:text-brand-gold-dark lowercase italic flex items-center space-x-1 cursor-pointer font-normal border-b border-brand-gold/30 pb-0.5"
                  >
                    <i className="fa-solid fa-ruler text-[9px] mr-1"></i>
                    <span>size guidelines</span>
                  </button>
                </div>
                <div className="flex gap-2">
                  {sizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`w-10 h-10 border text-xs tracking-wider font-semibold font-sans flex items-center justify-center transition-all cursor-pointer rounded-none ${
                        selectedSize === sz
                          ? 'border-brand-gold bg-brand-gold text-white shadow-xs'
                          : 'border-brand-charcoal/15 bg-white text-brand-charcoal/70 hover:border-brand-gold'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Action Cart Buttons */}
            <div className="flex flex-col space-y-3 pt-4">
              
              <div className="flex items-center space-x-3">
                
                {/* Main Add to Cart */}
                <button
                  disabled={!inStock}
                  onClick={handleAddToCart}
                  className={`btn-gold text-xs uppercase font-bold tracking-[0.25em] py-4 px-8 flex-grow text-center flex items-center justify-center space-x-3 cursor-pointer rounded-none border-none ${
                    !inStock ? 'bg-brand-charcoal/20 text-brand-charcoal/40 cursor-not-allowed hover:bg-brand-charcoal/20' : ''
                  }`}
                >
                  <i className="fa-solid fa-bag-shopping"></i>
                  <span>{inStock ? 'Add to Shopping Bag' : 'Out of Stock'}</span>
                </button>

                {/* Wishlist Button */}
                <button
                  onClick={handleAddToWishlist}
                  className="w-13 h-13 border border-brand-charcoal/15 bg-white text-brand-charcoal hover:border-brand-gold hover:text-brand-gold flex items-center justify-center transition-colors cursor-pointer rounded-none"
                  aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                >
                  <i className={`${isWishlisted ? 'fa-solid fa-heart text-red-500' : 'fa-regular fa-heart'} text-lg`}></i>
                </button>

              </div>

              {/* Success Notification message */}
              {successMessage && (
                <div className="bg-green-50 border border-green-200 text-green-700 text-xs px-4 py-3 rounded-none flex items-center space-x-2 animate-fade-in">
                  <i className="fa-solid fa-circle-check"></i>
                  <span>{successMessage}</span>
                  <button 
                    onClick={() => setActivePage('cart')} 
                    className="underline text-green-900 font-bold ml-auto hover:text-brand-gold cursor-pointer"
                  >
                    View Bag
                  </button>
                </div>
              )}

            </div>

            {/* COLLAPSIBLE ACCORDIONS */}
            <div className="border-t border-brand-charcoal/15 pt-6 space-y-4">
              
              {/* Accordion 1: Fabric & Care */}
              <div className="border-b border-brand-charcoal/10 pb-4">
                <button
                  onClick={() => toggleAccordion('fabric')}
                  className="w-full flex items-center justify-between text-left text-xs uppercase tracking-widest font-bold text-brand-charcoal hover:text-brand-gold cursor-pointer"
                >
                  <span>Fabric & Care Details</span>
                  <i className={`fa-solid ${accordions.fabric ? 'fa-minus' : 'fa-plus'} text-[10px] text-brand-gold`}></i>
                </button>
                {accordions.fabric && (
                  <div className="mt-3 text-xs text-brand-charcoal/70 leading-relaxed font-light space-y-2 animate-fade-in">
                    <p><span className="font-semibold">Composition:</span> {fabric}</p>
                    <p><span className="font-semibold">Care Instruction:</span> {care}</p>
                    <p>We work exclusively with high-caliber, ethical pre-a-porter mills. For organic linen and wool garments, steam gently; for delicate silks, professional dry cleaning is highly recommended.</p>
                  </div>
                )}
              </div>

              {/* Accordion 2: Luxury Shipping & Packaging */}
              <div className="border-b border-brand-charcoal/10 pb-4">
                <button
                  onClick={() => toggleAccordion('shipping')}
                  className="w-full flex items-center justify-between text-left text-xs uppercase tracking-widest font-bold text-brand-charcoal hover:text-brand-gold cursor-pointer"
                >
                  <span>Premium Shipping & Packaging</span>
                  <i className={`fa-solid ${accordions.shipping ? 'fa-minus' : 'fa-plus'} text-[10px] text-brand-gold`}></i>
                </button>
                {accordions.shipping && (
                  <div className="mt-3 text-xs text-brand-charcoal/70 leading-relaxed font-light space-y-2 animate-fade-in">
                    <p>Each Luna Vogue order is nested in our signature gold-embossed matte charcoal magnetic box, folded in tissue paper, and sealed with a curated botanical scent sachet.</p>
                    <p>Complimentary Standard shipping takes 3-5 business days. Express shipping options are available at checkout. Secure tracking codes are dispatched immediately upon dispatch.</p>
                  </div>
                )}
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* POPUP SIZE GUIDE MODAL (CONDITIONAL OVERLAY) */}
      {sizeGuideOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop overlay */}
          <div 
            onClick={() => setSizeGuideOpen(false)}
            className="fixed inset-0 bg-brand-charcoal/50 backdrop-blur-xs transition-opacity duration-300"
          ></div>

          {/* Modal content */}
          <div className="relative bg-white max-w-lg w-full p-8 shadow-2xl z-50 animate-scale-up rounded-none border border-brand-charcoal/10">
            <button
              onClick={() => setSizeGuideOpen(false)}
              className="absolute top-4 right-4 text-brand-charcoal hover:text-brand-gold p-1 cursor-pointer"
              aria-label="Close modal"
            >
              <i className="fa-solid fa-xmark text-lg"></i>
            </button>

            <div className="text-center mb-6">
              <span className="text-brand-gold text-[10px] uppercase tracking-[0.2em] font-bold block mb-1">Luna Vogue Guide</span>
              <h3 className="font-serif text-xl font-bold text-brand-charcoal">Size Chart Guidelines</h3>
              <p className="text-[10px] text-brand-charcoal/40 uppercase tracking-widest mt-1">Measurements represent body dimensions in centimeters</p>
            </div>

            {/* Size Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-xs font-sans text-brand-charcoal/80 border-collapse">
                <thead>
                  <tr className="bg-brand-ivory border-b border-brand-charcoal/15 text-[10px] uppercase font-bold tracking-wider">
                    <th className="py-3 px-4 text-left">Size</th>
                    <th className="py-3 px-4 text-center">Bust (cm)</th>
                    <th className="py-3 px-4 text-center">Waist (cm)</th>
                    <th className="py-3 px-4 text-center">Hips (cm)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-charcoal/5">
                  <tr>
                    <td className="py-3 px-4 font-bold text-left">XS (0-2)</td>
                    <td className="py-3 px-4 text-center">80-83</td>
                    <td className="py-3 px-4 text-center">61-64</td>
                    <td className="py-3 px-4 text-center">86-89</td>
                  </tr>
                  <tr className="bg-brand-ivory/30">
                    <td className="py-3 px-4 font-bold text-left">S (4-6)</td>
                    <td className="py-3 px-4 text-center">84-88</td>
                    <td className="py-3 px-4 text-center">65-69</td>
                    <td className="py-3 px-4 text-center">90-94</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold text-left">M (8-10)</td>
                    <td className="py-3 px-4 text-center">89-93</td>
                    <td className="py-3 px-4 text-center">70-74</td>
                    <td className="py-3 px-4 text-center">95-99</td>
                  </tr>
                  <tr className="bg-brand-ivory/30">
                    <td className="py-3 px-4 font-bold text-left">L (12-14)</td>
                    <td className="py-3 px-4 text-center">94-98</td>
                    <td className="py-3 px-4 text-center">75-79</td>
                    <td className="py-3 px-4 text-center">100-104</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold text-left">XL (16)</td>
                    <td className="py-3 px-4 text-center">99-104</td>
                    <td className="py-3 px-4 text-center">80-85</td>
                    <td className="py-3 px-4 text-center">105-110</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-6 text-[10px] text-brand-charcoal/50 leading-relaxed italic bg-brand-ivory/40 p-4 border border-brand-charcoal/5">
              <span className="font-bold uppercase tracking-wider text-brand-gold block not-italic mb-1">Fitting Tip:</span>
              If your measurements fall between standard sizes, select the larger size for a relaxed editorial drape, or message our Stylist on WhatsApp for custom consultation.
            </div>

            <button
              onClick={() => setSizeGuideOpen(false)}
              className="mt-6 w-full bg-brand-charcoal text-white text-[10px] uppercase font-bold tracking-widest py-3 hover:bg-brand-gold transition-colors cursor-pointer"
            >
              Close Guide
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
