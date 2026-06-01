import React, { useState } from 'react';

export default function AuthPage({ 
  user, 
  setUser, 
  setActivePage 
}) {
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'register'
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      // Simulate authentication
      const mockUser = {
        name: email.split('@')[0].toUpperCase(),
        email: email,
        isAdmin: email.includes('admin') // Let "admin@lunavogue.com" access the dashboard
      };
      setUser(mockUser);
      if (mockUser.isAdmin) {
        setActivePage('admin');
      } else {
        setActivePage('home');
      }
    }
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (name && email && password) {
      const mockUser = {
        name: name,
        email: email,
        isAdmin: false
      };
      setUser(mockUser);
      setActivePage('home');
    }
  };

  const handleGuestCheckout = () => {
    // Navigate straight to cart or catalog
    setActivePage('shop');
  };

  return (
    <div className="min-h-screen bg-[#F8F5F2] font-sans flex items-center justify-center py-16 px-4">
      <div className="bg-white max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 border border-brand-charcoal/10 shadow-lg overflow-hidden rounded-none">
        
        {/* LEFT COLUMN: EDITORIAL LOOKBOOK BRAND BANNER */}
        <div className="relative bg-brand-charcoal overflow-hidden hidden md:flex flex-col justify-between p-10 text-white min-h-[500px]">
          {/* Backdrop Image */}
          <div className="absolute inset-0">
            <img 
              src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&auto=format&fit=crop&q=80" 
              alt="Luna Vogue lookbook portrait" 
              className="w-full h-full object-cover object-top opacity-50 scale-102"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal via-brand-charcoal/30 to-transparent"></div>
          </div>

          {/* Logo */}
          <div className="relative z-10 flex flex-col">
            <span className="font-serif text-lg font-bold tracking-[0.2em] text-white">LUNA VOGUE</span>
            <span className="text-[7px] tracking-[0.3em] text-brand-gold uppercase -mt-1">Pret-A-Porter</span>
          </div>

          {/* Slogan */}
          <div className="relative z-10 space-y-3">
            <h3 className="font-serif text-xl lg:text-2xl font-bold tracking-wide text-brand-gold leading-snug">
              Welcome to the <br />House of Elegance.
            </h3>
            <p className="text-[10px] text-white/70 leading-relaxed font-light tracking-wide max-w-xs">
              Synchronize your measurements, view purchase history, and tracking codes by establishing your private Vogue account profile.
            </p>
          </div>

          {/* Footer copyright */}
          <span className="relative z-10 text-[9px] text-white/30 tracking-wider">
            © {new Date().getFullYear()} Luna Vogue Boutique.
          </span>
        </div>

        {/* RIGHT COLUMN: AUTHENTICATION INTERACTIVE PANELS */}
        <div className="p-8 lg:p-12 flex flex-col justify-center bg-white">
          
          {/* Selector Tabs */}
          <div className="flex border-b border-brand-charcoal/10 pb-4 gap-6 mb-8 select-none">
            <button
              onClick={() => setAuthMode('login')}
              className={`text-xs uppercase tracking-widest font-semibold pb-1 cursor-pointer transition-colors ${
                authMode === 'login' 
                  ? 'text-brand-gold border-b-2 border-brand-gold' 
                  : 'text-brand-charcoal/40 border-transparent hover:text-brand-gold'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setAuthMode('register')}
              className={`text-xs uppercase tracking-widest font-semibold pb-1 cursor-pointer transition-colors ${
                authMode === 'register' 
                  ? 'text-brand-gold border-b-2 border-brand-gold' 
                  : 'text-brand-charcoal/40 border-transparent hover:text-brand-gold'
              }`}
            >
              Register
            </button>
          </div>

          {/* LOGIN FORM PANEL */}
          {authMode === 'login' ? (
            <form onSubmit={handleLoginSubmit} className="space-y-5">
              
              <div className="flex flex-col space-y-1">
                <label className="text-[9px] uppercase font-bold tracking-widest text-brand-charcoal/50">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. guest@lunavogue.com"
                  className="bg-brand-ivory border border-brand-charcoal/10 text-xs px-3.5 py-3 w-full focus:outline-none focus:border-brand-gold rounded-none"
                />
              </div>

              <div className="flex flex-col space-y-1">
                <div className="flex justify-between items-center">
                  <label className="text-[9px] uppercase font-bold tracking-widest text-brand-charcoal/50">Password</label>
                  <a href="#reset" className="text-[9px] text-brand-gold hover:underline">Forgot password?</a>
                </div>
                <div className="relative flex items-center">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="bg-brand-ivory border border-brand-charcoal/10 text-xs px-3.5 py-3 w-full focus:outline-none focus:border-brand-gold rounded-none pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 text-brand-charcoal/40 hover:text-brand-gold cursor-pointer"
                    aria-label="Toggle password view"
                  >
                    <i className={`fa-regular ${showPassword ? 'fa-eye-slash' : 'fa-eye'} text-sm`}></i>
                  </button>
                </div>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="w-full bg-brand-charcoal hover:bg-brand-gold text-white text-xs uppercase font-bold tracking-widest py-3.5 shadow-xs hover:shadow-md transition-colors duration-300 cursor-pointer rounded-none border-none"
              >
                Access Account
              </button>

              <div className="bg-brand-ivory p-3.5 border border-brand-charcoal/5 text-[9px] leading-relaxed text-brand-charcoal/50 mt-4">
                <span className="font-bold text-brand-gold uppercase block mb-0.5">Admin Demo Login:</span>
                Input email <span className="font-bold text-brand-charcoal">admin@lunavogue.com</span> and any passcode to unlock the backend Admin dashboard directly.
              </div>

            </form>
          ) : (
            /* REGISTER FORM PANEL */
            <form onSubmit={handleRegisterSubmit} className="space-y-5">
              
              <div className="flex flex-col space-y-1">
                <label className="text-[9px] uppercase font-bold tracking-widest text-brand-charcoal/50">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jane Doe"
                  className="bg-brand-ivory border border-brand-charcoal/10 text-xs px-3.5 py-3 w-full focus:outline-none focus:border-brand-gold rounded-none"
                />
              </div>

              <div className="flex flex-col space-y-1">
                <label className="text-[9px] uppercase font-bold tracking-widest text-brand-charcoal/50">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jane@example.com"
                  className="bg-brand-ivory border border-brand-charcoal/10 text-xs px-3.5 py-3 w-full focus:outline-none focus:border-brand-gold rounded-none"
                />
              </div>

              <div className="flex flex-col space-y-1">
                <label className="text-[9px] uppercase font-bold tracking-widest text-brand-charcoal/50">Password</label>
                <div className="relative flex items-center">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create security password"
                    className="bg-brand-ivory border border-brand-charcoal/10 text-xs px-3.5 py-3 w-full focus:outline-none focus:border-brand-gold rounded-none pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 text-brand-charcoal/40 hover:text-brand-gold cursor-pointer"
                    aria-label="Toggle password view"
                  >
                    <i className={`fa-regular ${showPassword ? 'fa-eye-slash' : 'fa-eye'} text-sm`}></i>
                  </button>
                </div>
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start space-x-2 pt-1 text-[10px] text-brand-charcoal/60 leading-tight">
                <input type="checkbox" required className="accent-brand-gold cursor-pointer mt-0.5" id="terms-agree" />
                <label htmlFor="terms-agree" className="cursor-pointer font-light">I accept the terms of the private Vogue Guild code of ethics.</label>
              </div>

              {/* Register Submit */}
              <button
                type="submit"
                className="w-full bg-brand-charcoal hover:bg-brand-gold text-white text-xs uppercase font-bold tracking-widest py-3.5 shadow-xs hover:shadow-md transition-colors duration-300 cursor-pointer rounded-none border-none"
              >
                Establish Membership
              </button>

            </form>
          )}

          {/* GUEST CHECKOUT ALTERNATIVE */}
          <div className="border-t border-brand-charcoal/10 pt-6 mt-6 text-center space-y-3.5">
            <span className="text-[10px] text-brand-charcoal/40 uppercase tracking-widest block font-medium">Or</span>
            <button
              onClick={handleGuestCheckout}
              className="text-xs uppercase tracking-widest font-bold text-brand-gold hover:text-brand-gold-dark flex items-center justify-center space-x-2 mx-auto cursor-pointer"
            >
              <span>Continue Shopping Catalog</span>
              <i className="fa-solid fa-arrow-right-long text-[10px]"></i>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
