import React, { useState } from 'react';

export default function Navbar({ activePage, setActivePage, cartCount, wishlistCount, user, setUser }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navLinks = [
    { label: 'Home', id: 'home' },
    { label: 'Shop', id: 'shop' },
    { label: 'Dashboard', id: 'admin' },
  ];

  const handleNavClick = (id) => {
    setActivePage(id);
    setMobileMenuOpen(false);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setActivePage('shop');
      setSearchOpen(false);
      // Custom event to trigger search in shop component
      const event = new CustomEvent('shopSearch', { detail: searchQuery });
      window.dispatchEvent(event);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      {/* Editorial Announcement Bar */}
      <div className="bg-brand-charcoal text-white text-[10px] uppercase tracking-[0.25em] py-2.5 px-4 text-center font-medium font-sans">
        Complimentary Worldwide Shipping on Orders Over $150 • Code: <span className="text-brand-gold font-bold">LUNAVOGUE10</span>
      </div>

      {/* Main Navbar */}
      <nav className="glass-header w-full px-4 lg:px-8 py-4 transition-all duration-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Mobile Menu Toggle button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-brand-charcoal hover:text-brand-gold p-1 transition-colors duration-300 cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            <i className={`fa-solid ${mobileMenuOpen ? 'fa-xmark' : 'fa-bars'} text-xl`}></i>
          </button>

          {/* Luxury Brand Logo */}
          <div 
            onClick={() => handleNavClick('home')} 
            className="flex flex-col items-center justify-center cursor-pointer select-none group"
          >
            <span className="font-serif text-xl lg:text-2xl font-bold tracking-[0.2em] text-brand-charcoal transition-colors duration-300 group-hover:text-brand-gold">
              LUNA VOGUE
            </span>
            <span className="text-[8px] tracking-[0.4em] text-brand-charcoal/60 uppercase font-sans -mt-0.5">
              Boutique
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-10">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-xs uppercase tracking-[0.2em] font-sans font-medium transition-all duration-300 border-b pb-0.5 cursor-pointer ${
                  activePage === link.id
                    ? 'text-brand-gold border-brand-gold'
                    : 'text-brand-charcoal/80 border-transparent hover:text-brand-gold'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Action Icons */}
          <div className="flex items-center space-x-4 lg:space-x-6">
            
            {/* Search Trigger */}
            <div className="relative flex items-center">
              {searchOpen && (
                <form onSubmit={handleSearchSubmit} className="absolute right-8 animate-fade-in-left">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search Pre-a-Porter..."
                    className="bg-[#F8F5F2] border border-brand-charcoal/20 px-3 py-1 text-xs rounded-none w-40 lg:w-56 focus:outline-none focus:border-brand-gold text-brand-charcoal font-sans"
                  />
                </form>
              )}
              <button 
                onClick={() => setSearchOpen(!searchOpen)} 
                className="text-brand-charcoal hover:text-brand-gold transition-colors duration-300 p-1 cursor-pointer"
                aria-label="Search Catalog"
              >
                <i className={`fa-solid ${searchOpen ? 'fa-xmark' : 'fa-magnifying-glass'} text-base lg:text-lg`}></i>
              </button>
            </div>

            {/* Account Profile / Login */}
            <button 
              onClick={() => handleNavClick('auth')}
              className="text-brand-charcoal hover:text-brand-gold transition-colors duration-300 p-1 relative group cursor-pointer"
              aria-label="Account Login"
            >
              <i className="fa-regular fa-user text-base lg:text-lg"></i>
              {user && (
                <span className="absolute -top-1 -right-1 bg-green-500 w-2.5 h-2.5 rounded-full border border-white"></span>
              )}
            </button>

            {/* Wishlist */}
            <button 
              onClick={() => handleNavClick('shop')}
              className="text-brand-charcoal hover:text-brand-gold transition-colors duration-300 p-1 relative cursor-pointer"
              aria-label="View Wishlist"
            >
              <i className="fa-regular fa-heart text-base lg:text-lg"></i>
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-brand-gold text-white font-sans text-[8px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center animate-pulse">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Icon */}
            <button 
              onClick={() => handleNavClick('cart')}
              className="text-brand-charcoal hover:text-brand-gold transition-colors duration-300 p-1 relative cursor-pointer"
              aria-label="Shopping Cart"
            >
              <i className="fa-solid fa-bag-shopping text-base lg:text-lg"></i>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-brand-charcoal text-white font-sans text-[8px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

          </div>
        </div>
      </nav>

      {/* Mobile Sidebar Overlay Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 flex">
          {/* Backdrop overlay */}
          <div 
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-brand-charcoal/40 backdrop-blur-sm transition-opacity duration-300"
          ></div>

          {/* Navigation Drawer DrawerPanel */}
          <div className="relative flex flex-col w-4/5 max-w-sm bg-[#F8F5F2] h-full shadow-2xl z-50 p-6 animate-fade-in-right justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-brand-charcoal/10 pb-4 mb-8">
                <span className="font-serif text-lg font-bold tracking-[0.2em] text-brand-charcoal">
                  LUNA VOGUE
                </span>
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-brand-charcoal hover:text-brand-gold p-1 cursor-pointer"
                >
                  <i className="fa-solid fa-xmark text-lg"></i>
                </button>
              </div>

              <div className="flex flex-col space-y-6">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className={`text-left text-sm uppercase tracking-[0.2em] font-sans font-medium border-b border-transparent pb-1 cursor-pointer ${
                      activePage === link.id
                        ? 'text-brand-gold'
                        : 'text-brand-charcoal hover:text-brand-gold'
                    }`}
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="border-t border-brand-charcoal/10 pt-6">
              {user ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-brand-gold/20 flex items-center justify-center">
                      <span className="text-brand-gold font-serif font-bold text-xs uppercase">
                        {user.name.charAt(0)}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase text-brand-charcoal/50 tracking-wider">Welcome</span>
                      <span className="text-xs font-bold text-brand-charcoal font-sans">{user.name}</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => { setUser(null); setMobileMenuOpen(false); }}
                    className="text-[10px] uppercase font-bold text-red-500 tracking-wider hover:text-red-700 cursor-pointer"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => handleNavClick('auth')}
                  className="w-full text-center bg-brand-charcoal text-white text-xs uppercase tracking-[0.2em] py-3 font-medium hover:bg-brand-gold hover:text-white transition-colors duration-300 cursor-pointer"
                >
                  Sign In / Register
                </button>
              )}
              <p className="text-[9px] text-brand-charcoal/40 text-center mt-6 tracking-wide">
                © {new Date().getFullYear()} Luna Vogue Boutique.
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
