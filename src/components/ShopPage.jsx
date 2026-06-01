import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';

export default function ShopPage({ 
  products, 
  onProductClick, 
  onAddToWishlist, 
  onAddToCart, 
  wishlist 
}) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [maxPrice, setMaxPrice] = useState(300);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [sortBy, setSortBy] = useState('new');
  const [searchQuery, setSearchQuery] = useState('');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // List of all available filters for rendering
  const categories = ['All', 'Dresses', 'Blazers', 'Knitwear', 'Shirts', 'Coats', 'Footwear'];
  const sizes = ['XS', 'S', 'M', 'L', 'XL'];
  const colors = ['Ivory', 'Charcoal', 'Caramel', 'Black', 'Olive', 'Sage'];

  // Listen for search events dispatched from Navbar
  useEffect(() => {
    const handleShopSearch = (e) => {
      setSearchQuery(e.detail);
      // Reset other filters to ensure results are visible
      setSelectedCategory('All');
      setMaxPrice(300);
      setSelectedSizes([]);
      setSelectedColors([]);
    };

    window.addEventListener('shopSearch', handleShopSearch);
    return () => {
      window.removeEventListener('shopSearch', handleShopSearch);
    };
  }, []);

  const handleSizeToggle = (size) => {
    if (selectedSizes.includes(size)) {
      setSelectedSizes(selectedSizes.filter((s) => s !== size));
    } else {
      setSelectedSizes([...selectedSizes, size]);
    }
  };

  const handleColorToggle = (color) => {
    if (selectedColors.includes(color)) {
      setSelectedColors(selectedColors.filter((c) => c !== color));
    } else {
      setSelectedColors([...selectedColors, color]);
    }
  };

  const resetFilters = () => {
    setSelectedCategory('All');
    setMaxPrice(300);
    setSelectedSizes([]);
    setSelectedColors([]);
    setSortBy('new');
    setSearchQuery('');
  };

  // Filter and Sort Logic
  const filteredProducts = products
    .filter((product) => {
      // Category Filter
      if (selectedCategory !== 'All' && product.category !== selectedCategory) return false;
      
      // Price Filter
      if (product.price > maxPrice) return false;
      
      // Size Filter
      if (selectedSizes.length > 0 && !product.sizes.some((size) => selectedSizes.includes(size))) return false;
      
      // Color Filter
      if (selectedColors.length > 0 && !product.colors.some((color) => selectedColors.includes(color))) return false;
      
      // Search Query Filter
      if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase()) && !product.category.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      // Default: New / ID
      return b.id - a.id;
    });

  return (
    <div className="py-12 bg-[#F8F5F2] font-sans min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Editorial Page Header */}
        <div className="border-b border-brand-charcoal/10 pb-6 mb-10 flex flex-col md:flex-row md:items-end md:justify-between space-y-4 md:space-y-0">
          <div>
            <span className="text-brand-gold text-[10px] uppercase tracking-[0.25em] font-bold block mb-1">
              Boutique Catalog
            </span>
            <h1 className="font-serif text-3xl lg:text-4xl font-bold tracking-wide text-brand-charcoal">
              Shop the Collection
            </h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="text-xs text-brand-charcoal/50 tracking-wider">
              Showing {filteredProducts.length} items
            </span>
            
            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-brand-charcoal/10 text-brand-charcoal text-xs py-2 px-3 focus:outline-none focus:border-brand-gold rounded-none cursor-pointer font-medium tracking-wide"
            >
              <option value="new">New In</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>

            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setShowMobileFilters(true)}
              className="lg:hidden bg-brand-charcoal text-white text-xs py-2 px-4 hover:bg-brand-gold transition-colors font-semibold tracking-wider cursor-pointer"
            >
              <i className="fa-solid fa-sliders mr-2"></i>
              <span>Filters</span>
            </button>
          </div>
        </div>

        {/* Search Query Pill */}
        {searchQuery && (
          <div className="flex items-center space-x-3 mb-8 bg-white py-2 px-4 border border-brand-charcoal/10 max-w-max">
            <span className="text-xs text-brand-charcoal/60">Search query:</span>
            <span className="text-xs font-bold text-brand-charcoal">"{searchQuery}"</span>
            <button 
              onClick={() => setSearchQuery('')}
              className="text-brand-charcoal/40 hover:text-brand-gold p-0.5 cursor-pointer"
            >
              <i className="fa-solid fa-xmark text-xs"></i>
            </button>
          </div>
        )}

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          
          {/* LEFT SIDEBAR: FILTERS (DESKTOP) */}
          <aside className="hidden lg:flex flex-col space-y-8 bg-white p-6 border border-brand-charcoal/5">
            <div className="flex justify-between items-center border-b border-brand-charcoal/15 pb-3">
              <h3 className="font-serif text-sm font-semibold tracking-wider text-brand-charcoal uppercase">
                Filter By
              </h3>
              <button 
                onClick={resetFilters}
                className="text-[9px] uppercase tracking-widest text-brand-charcoal/40 hover:text-brand-gold font-bold transition-colors cursor-pointer"
              >
                Clear All
              </button>
            </div>

            {/* Category Filter */}
            <div className="flex flex-col space-y-2.5">
              <h4 className="text-[10px] uppercase font-bold tracking-widest text-brand-charcoal/50">
                Categories
              </h4>
              <div className="flex flex-col space-y-1.5 items-start">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`text-xs hover:text-brand-gold transition-colors cursor-pointer ${
                      selectedCategory === cat
                        ? 'text-brand-gold font-semibold'
                        : 'text-brand-charcoal/70'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="flex flex-col space-y-3.5 border-t border-brand-charcoal/5 pt-6">
              <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-widest text-brand-charcoal/50">
                <span>Max Price</span>
                <span className="text-brand-gold">${maxPrice}</span>
              </div>
              <input
                type="range"
                min="50"
                max="300"
                step="10"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-brand-gold h-1 bg-brand-charcoal/10 rounded-none appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-brand-charcoal/40 font-medium">
                <span>$50</span>
                <span>$300</span>
              </div>
            </div>

            {/* Size Filter */}
            <div className="flex flex-col space-y-3 border-t border-brand-charcoal/5 pt-6">
              <h4 className="text-[10px] uppercase font-bold tracking-widest text-brand-charcoal/50">
                Sizes
              </h4>
              <div className="flex flex-wrap gap-2">
                {sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => handleSizeToggle(sz)}
                    className={`w-10 h-10 border text-xs tracking-wider font-semibold font-sans flex items-center justify-center transition-all cursor-pointer rounded-none ${
                      selectedSizes.includes(sz)
                        ? 'border-brand-gold bg-brand-gold text-white shadow-xs'
                        : 'border-brand-charcoal/15 bg-white text-brand-charcoal/75 hover:border-brand-gold hover:text-brand-gold'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Filter */}
            <div className="flex flex-col space-y-3 border-t border-brand-charcoal/5 pt-6">
              <h4 className="text-[10px] uppercase font-bold tracking-widest text-brand-charcoal/50">
                Colors
              </h4>
              <div className="flex flex-wrap gap-2">
                {colors.map((clr) => (
                  <button
                    key={clr}
                    onClick={() => handleColorToggle(clr)}
                    className={`text-[10px] uppercase font-medium font-sans px-3.5 py-1.5 border tracking-wider transition-all cursor-pointer rounded-none ${
                      selectedColors.includes(clr)
                        ? 'border-brand-gold bg-brand-gold text-white shadow-xs'
                        : 'border-brand-charcoal/15 bg-white text-brand-charcoal/70 hover:border-brand-gold hover:text-brand-gold'
                    }`}
                  >
                    {clr}
                  </button>
                ))}
              </div>
            </div>

          </aside>

          {/* RIGHT GRID: PRODUCTS */}
          <main className="lg:col-span-3">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onProductClick={onProductClick}
                    onAddToWishlist={onAddToWishlist}
                    onAddToCart={onAddToCart}
                    isWishlisted={wishlist.includes(product.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white border border-brand-charcoal/5 p-16 text-center">
                <i className="fa-regular fa-folder-open text-brand-gold/30 text-4xl mb-4"></i>
                <h3 className="font-serif text-lg font-bold text-brand-charcoal mb-2">
                  No Garments Match Selection
                </h3>
                <p className="text-xs text-brand-charcoal/50 max-w-sm mx-auto mb-6">
                  Try adjusting filters or checking spelling, or clear all configurations to display the complete catalog.
                </p>
                <button
                  onClick={resetFilters}
                  className="bg-brand-charcoal text-white text-[10px] uppercase font-bold tracking-widest py-3 px-8 hover:bg-brand-gold hover:text-white transition-colors duration-300 cursor-pointer"
                >
                  Show All Items
                </button>
              </div>
            )}
          </main>

        </div>

      </div>

      {/* MOBILE DRAWER FILTERS (CONDITIONAL OVERLAY) */}
      {showMobileFilters && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Backdrop overlay */}
          <div 
            onClick={() => setShowMobileFilters(false)}
            className="fixed inset-0 bg-brand-charcoal/40 backdrop-blur-xs transition-opacity duration-300"
          ></div>

          {/* Drawer container */}
          <div className="relative flex flex-col w-4/5 max-w-sm bg-white h-full shadow-2xl z-50 p-6 animate-fade-in-right overflow-y-auto">
            <div className="flex justify-between items-center border-b border-brand-charcoal/10 pb-4 mb-6">
              <h3 className="font-serif text-base font-bold tracking-wider text-brand-charcoal uppercase">
                Refine Selection
              </h3>
              <button 
                onClick={() => setShowMobileFilters(false)}
                className="text-brand-charcoal hover:text-brand-gold p-1 cursor-pointer"
              >
                <i className="fa-solid fa-xmark text-lg"></i>
              </button>
            </div>

            {/* Filter Content */}
            <div className="flex flex-col space-y-8 flex-grow">
              
              {/* Category Filter */}
              <div className="flex flex-col space-y-2.5">
                <h4 className="text-[10px] uppercase font-bold tracking-widest text-brand-charcoal/50">
                  Categories
                </h4>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`text-xs px-3.5 py-1.5 border transition-all cursor-pointer ${
                        selectedCategory === cat
                          ? 'border-brand-gold bg-brand-gold text-white font-semibold'
                          : 'border-brand-charcoal/10 text-brand-charcoal/70 bg-brand-ivory'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div className="flex flex-col space-y-3.5 border-t border-brand-charcoal/5 pt-6">
                <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-widest text-brand-charcoal/50">
                  <span>Max Price</span>
                  <span className="text-brand-gold">${maxPrice}</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="300"
                  step="10"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-brand-gold h-1 bg-brand-charcoal/10 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-brand-charcoal/40 font-medium">
                  <span>$50</span>
                  <span>$300</span>
                </div>
              </div>

              {/* Size Filter */}
              <div className="flex flex-col space-y-3 border-t border-brand-charcoal/5 pt-6">
                <h4 className="text-[10px] uppercase font-bold tracking-widest text-brand-charcoal/50">
                  Sizes
                </h4>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => handleSizeToggle(sz)}
                      className={`w-10 h-10 border text-xs tracking-wider font-semibold flex items-center justify-center transition-all cursor-pointer ${
                        selectedSizes.includes(sz)
                          ? 'border-brand-gold bg-brand-gold text-white shadow-xs'
                          : 'border-brand-charcoal/15 bg-white text-brand-charcoal/70'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Filter */}
              <div className="flex flex-col space-y-3 border-t border-brand-charcoal/5 pt-6">
                <h4 className="text-[10px] uppercase font-bold tracking-widest text-brand-charcoal/50">
                  Colors
                </h4>
                <div className="flex flex-wrap gap-2">
                  {colors.map((clr) => (
                    <button
                      key={clr}
                      onClick={() => handleColorToggle(clr)}
                      className={`text-[10px] uppercase font-medium px-3.5 py-1.5 border tracking-wider transition-all cursor-pointer ${
                        selectedColors.includes(clr)
                          ? 'border-brand-gold bg-brand-gold text-white shadow-xs'
                          : 'border-brand-charcoal/15 bg-white text-brand-charcoal/70'
                      }`}
                    >
                      {clr}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Bottom buttons */}
            <div className="border-t border-brand-charcoal/10 pt-6 mt-6 space-y-3">
              <button
                onClick={() => setShowMobileFilters(false)}
                className="w-full bg-brand-charcoal text-white text-xs uppercase tracking-widest py-3 font-semibold hover:bg-brand-gold hover:text-white transition-colors cursor-pointer"
              >
                Apply Filters
              </button>
              <button
                onClick={() => { resetFilters(); setShowMobileFilters(false); }}
                className="w-full bg-brand-ivory text-brand-charcoal/60 border border-brand-charcoal/10 text-xs uppercase tracking-widest py-3 font-semibold transition-colors cursor-pointer"
              >
                Reset All
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
